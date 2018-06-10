import * as React from 'react';
import { observer } from 'mobx-react';
import { Action, ActionContextService, ContextStackEntry } from '../action-context/action-context';
import { ConstrainFocusService } from '../constrain-focus/constrain-focus';
import { func } from 'prop-types';

// Components
import { HelpOverlay } from 'help-overlay/help-overlay';

export interface FocusRootProps { };

// WARNING: The root context is ALWAYS in scope, and is NOT
// blocked by opaque contexts!
ActionContextService.addContext("focus-root", {
  name: "Root",
  // TODO make a better root help screen
  documentation: "Root help",
  actions: {
    help: new Action({
      name: "Get help",
      shortDocumentation: "",
      searchTerms: ["help", "command palette"],
      actOn: (c: FocusRoot) => {
        c.showHelp();
      },
      defaultKeys: ["Control+/", "Control+Shift+?"]
    })
  }
});

@observer
export class FocusRoot extends React.Component<FocusRootProps, {}> {
  static childContextTypes = {
    setActionContext: func,
    actionInContext: func
  }

  state = {
    showHelp: false,
    contextStack: [] as ContextStackEntry[]
  }
  wasFocused: HTMLElement

  removeHandler: () => void

  getChildContext() {
    return {
      setActionContext: () => this.setActionContext(),
      actionInContext: (action: string, context?: string) => {
        if (ActionContextService.hasAction("focus-root", action)) {
          return ActionContextService.actionInContext("focus-root", action, this);
        } else {
          console.warn("Action called but not found:", action);
        }
      }
    };
  }

  setActionContext() {
    ActionContextService.pushNewContext("focus-root", this);
    ActionContextService.enterNewContext();
  }

  handler(e: KeyboardEvent) {
    ActionContextService.handleKeypress(e);
  }

  componentWillMount() {
    window.removeEventListener("keydown", this.handler); // Mostly for HMR.
    window.addEventListener("keydown", this.handler);
    ConstrainFocusService.start();
  }

  componentWillUnount() {
    window.removeEventListener("keydown", this.handler);
    ConstrainFocusService.stop();
  }

  showHelp() {
    this.wasFocused = document.activeElement as HTMLElement;
    this.setState({ showHelp: true, contextStack: ActionContextService.contextStack.slice() })
  }

  hideHelp = () => {
    ActionContextService.contextStack = this.state.contextStack;
    this.setState({ showHelp: false, contextStack: [] }, () => this.wasFocused.focus());
  }

  render() {
    return (
      <div>
        {this.props.children}
        {this.state.showHelp && <HelpOverlay close={this.hideHelp} contextStack={this.state.contextStack} />}
      </div>
    );
  }
}
