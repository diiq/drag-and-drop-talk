import * as React from 'react';
import { observable, computed, action } from 'mobx';
import { Hotkey } from '../hotkey/hotkey';

export type Key = string
export interface Remapping {
  action: string,
  context: string,
  mapping: string
}

// A ContextBlueprint describes a set of actions that can all be taken in the
// same context in the app. It's also used to store help messages for these
// contexts.
export interface ContextBlueprint {
  name?: string
  documentation?: JSX.Element | string
  // Usually, you can still call actions from contexts further out in the stack
  // but if a context is opaque, it blocks all keyboard shortcuts from the rest
  // of the stack.
  opaque?: boolean
  hidden?: boolean
  actions: { [id: string]: Action }
}

// Contexts nest -- a entry in the stack describes a context and the object the
// context
export interface ContextStackEntry {
  context: string
  argument: any
}

export type ActionEvent = React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement> | KeyboardEvent

// Actions have one free argument; when a context is pushed onto the stack, that
// argument is stored along with it. An ActionInContext closes over the argument
// so that the action can be called anywhere
export class ActionInContext {
  constructor(
    public action: Action,
    private contextName: string,
    private argument: any,
    private service: ActionContextServiceClass
  ) { }

  get hasArgument() {
    return !!this.argument;
  }

  act(e?: ActionEvent) {
    return this.action.actOn(this.argument, e);
  }

  context() {
    this.service.contexts[this.contextName];
  }
}

// An action is anything you can do in a given context. It can be mapped to a
// keyboard shortcut.
export class Action {
  @observable remappedKey?: Key
  name: string
  shortDocumentation: string
  searchTerms: string[]
  actOn: (argument: any, e?: ActionEvent) => void
  defaultKeys: Key[]

  // If true, hide from the action palette
  hidden: boolean

  constructor(description: {
    name: string,
    shortDocumentation: string,
    searchTerms: string[],
    actOn: (argument: any, e?: ActionEvent) => void,
    defaultKeys: Key[],
    hidden?: boolean
  }) {
    this.remappedKey = null;
    this.name = description.name;
    this.shortDocumentation = description.shortDocumentation;
    this.searchTerms = description.searchTerms;
    this.actOn = description.actOn;
    this.defaultKeys = description.defaultKeys;
    this.hidden = description.hidden;
  }

  @computed
  get keys() {
    if (this.remappedKey) return [this.remappedKey]
    return this.defaultKeys;
  }
}

export class ActionContextServiceClass {
  @observable contextStack: ContextStackEntry[];
  newContextStack: ContextStackEntry[];
  @observable contexts = observable.shallowMap({} as { [id: string]: ContextBlueprint });
  @observable remappingDirty: boolean;

  constructor() {
    this.newContextStack = [];
    this.contextStack = [];
  }

  @action
  addContext(name: string, context: ContextBlueprint) {
    if (this.contexts.has(name)) {
      console.warn("Replacing existing context blueprint: ", name);
    }
    this.contexts.set(name, context);
  }


  /* These three act together; make a new context, fill it
   * (front-to-back, most-focused to least), and then swap out the new
   * context with the old one. */
  @action
  newContext() {
    this.newContextStack = [];
  }

  @action
  pushNewContext(name: string, argument: any) {
    this.newContextStack.push({
      context: name,
      argument: argument
    });
  }

  @action
  enterNewContext() {
    this.contextStack = this.newContextStack.slice();
    this.newContextStack = [];
  }

  @computed
  get currentContext() {
    return this.contextStack[0].context;
  }

  /** Give a user-specific key command for an action. */
  @action
  remapAction(action: Action, newMapping: Key) {
    action.remappedKey = newMapping;
  }

  /** Remove a user-specific key command for an action. */
  @action
  unremapAction(action: Action) {
    action.remappedKey = null;
  }

  /** Remove a user-specific key command for an action. */
  @action
  unmapAction(action: Action) {
    action.remappedKey = "None";
  }

  /** Collect all user-remapped actions so that they can be saved */
  @computed
  get currentRemapping(): Remapping[] {
    const ll = this.contexts.keys().map((contextName) => {
      const context = this.contexts.get(contextName);
      return Object.keys(context.actions).map((actionName) => {
        const action = context.actions[actionName];
        if (!action.remappedKey) return;
        return {
          action: actionName,
          context: contextName,
          mapping: action.remappedKey
        };
      });
    });
    return [].concat.apply([], ll).filter((x: any) => x);
  }

  @action
  restoreRemapping(remapping: Remapping[]) {
    if (!remapping) return;
    remapping.map(m => {
      const action = this.contexts.get(m.context).actions[m.action]
      this.remapAction(action, m.mapping)
    })
  }

  /** Collect actions, along with the appropriate `this`, from all
   * contexts in the active stack, most recent context first */
  @computed
  get availableActions() {
    return this.actionsInContexts(this.contextStack);
  }

  actionsInContexts(contextStack: ContextStackEntry[]) {
    var accum: ActionInContext[] = [];
    for (var i = 0; i < contextStack.length; i++) {
      let contextEntry = contextStack[i];
      let context = this.contexts.get(contextEntry.context);
      if (!context) { console.error("Unknown action context:", contextEntry.context); }
      let actionsByName = context.actions;
      let actions = Object.keys(actionsByName).map(name => {
        return new ActionInContext(
          actionsByName[name],
          contextEntry.context,
          contextEntry.argument,
          this
        )
      })
      accum = accum.concat(actions);
      if (context.opaque) {
        // Keep the root context -- it has universal commands in it
        i = contextStack.length - 2;
        continue;
      }
    }
    return accum;
  }

  actionForKeypress(key: Key) {
    return this.availableActions.find(actionInContext => {
      const action = actionInContext.action;
      return action.keys.indexOf(key) >= 0;
    });
  }

  handleKeypress(event?: KeyboardEvent) {
    const key = Hotkey.canonicalKeyFromEvent(event);
    const keyAction = this.actionForKeypress(key);
    if (keyAction) {
      event.preventDefault();
      event.stopPropagation();
      keyAction.act(event);
    }
  }

  hasAction(context: string, action: string) {
    return this.contexts.has(context) && !!this.contexts.get(context).actions[action]
  }

  actionInContext(
    context: string,
    actionName: string,
    argument: any) {
    const action = this.contexts.get(context).actions[actionName];
    return new ActionInContext(
      action,
      context,
      argument,
      this
    )
  }

  actor(
    context: string,
    action: string,
    argument: any,
    propogate: boolean = false) {

    return (e?: ActionEvent) => {
      this.contexts.get(context).actions[action].actOn(argument, e);
      if (!propogate && e) {
        e.stopPropagation();
        e.preventDefault();
      }
    };
  }
};

export const ActionContextService = new ActionContextServiceClass()

export const act = (context: string, action: string, argument: any, propogate: boolean = false) => {
  return ActionContextService.actor(context, action, argument, propogate);
}

// In an opaque context, pass this action up-stack
export function pass(actionName: string) {
  return (c: any) => {
    const action = c.context.actionInContext(actionName);
    if (action) action.act();
  }
}
