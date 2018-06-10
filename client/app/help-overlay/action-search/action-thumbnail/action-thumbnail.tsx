import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { Hotkey, ActionInContext, Action, ActionContextService } from 'focus';

// Components
import { KeyCommand } from 'key-command/key-command';
import { ActionButton } from 'action-button/action-button';
import { Focusable } from 'focus';

// CSS
import { styles, vars } from 'styles/css';


export interface ActionThumbnailProps {
  action: ActionInContext,
  onTrigger: () => void,
  focused: boolean,
  stealFocus: () => void
};

ActionContextService.addContext("action-thumbnail", {
  name: "Command palette item",
  documentation: `This represents a single action you can take where you're currently
focused. Along with the name and a brief description, you
can see any hotkeys assigned to this action. Clicking the edit icon
allows you to add, remove, or change the hotkey for this action.`,
  actions: {
    rebind: new Action({
      name: "Change Hotkey",
      shortDocumentation: "Rebind the hotkey for this action",
      searchTerms: ["remap", "rebind", "change", "hotkey"],
      actOn: (c: ActionThumbnail) => c.startRemapping(),
      defaultKeys: ["c"]
    }),

    unmap: new Action({
      name: "Remove Hotkey",
      shortDocumentation: "No key will perform this action",
      searchTerms: ["remap", "rebind", "change", "hotkey"],
      actOn: (c: ActionThumbnail) => c.unmap(),
      defaultKeys: ["r"]
    }),

    unremap: new Action({
      name: "Restore defaults",
      shortDocumentation: "Restore the default hotkeys for this action",
      searchTerms: ["remap", "rebind", "change", "hotkey", "defaults"],
      actOn: (c: ActionThumbnail) => c.unremap(),
      defaultKeys: ["d"]
    }),

    edit: new Action({
      name: "Edit keybinding",
      shortDocumentation: "Open a menu for changing the keybinding of this action",
      searchTerms: ["remap", "rebind", "change", "hotkey"],
      actOn: (c: ActionThumbnail) => c.toggleEditing(),
      defaultKeys: ["e"]
    }),
  }
});

@observer
export class ActionThumbnail extends React.Component<ActionThumbnailProps, {}> {
  state = {
    editing: false,
    remapping: false
  }
  firstMenuButton: ActionButton
  keyInput: HTMLInputElement

  saveMapping() {
    alert("not implemented")
  }

  startRemapping() {
    this.setState({ remapping: true }, () => this.keyInput.select());
  }

  stopRemapping() {
    this.setState({ remapping: false });
    this.toggleEditing()
  }

  toggleEditing() {
    this.setState({ editing: !this.state.editing }, () => this.focusFirstMenuButton());
  }

  focusFirstMenuButton() {
    const node = ReactDOM.findDOMNode(this.firstMenuButton) as HTMLElement;
    const self = ReactDOM.findDOMNode(this) as HTMLElement;
    if (node) node.focus(); else self.focus();
  }

  remap = (e: React.KeyboardEvent<HTMLElement>) => {
    const newMapping = Hotkey.canonicalKeyFromEvent(e.nativeEvent as KeyboardEvent);
    if (!newMapping) return;

    ActionContextService.remapAction(
      this.props.action.action,
      newMapping);

    e.stopPropagation();
    e.preventDefault();
    this.stopRemapping();
    this.saveMapping();
  }

  unmap() {
    ActionContextService.unmapAction(this.props.action.action);
    this.saveMapping();
    this.toggleEditing()
  }

  unremap() {
    ActionContextService.unremapAction(this.props.action.action);
    this.saveMapping();
    this.toggleEditing()
  }

  editMenu() {
    return (
      <div {...style.menu}>
        <ActionButton action="rebind" flex square ref={r => this.firstMenuButton = r} />
        <ActionButton action="unmap" flex square />
        <ActionButton action="unremap" flex square />
      </div>
    );
  }

  editButton() {
    return (
      <ActionButton
        action="edit"
        replacementCss={style.edit}
        tabIndex={this.props.focused ? 0 : -1}>
        <i role="presentation" className="fa fa-pencil" />
      </ActionButton>
    );
  }

  displayKeys() {
    const keys = this.props.action.action.keys;
    return Hotkey.displayKey(keys[0] || "");
  }

  render() {
    const action = this.props.action.action;

    return (
      <Focusable
        context="action-thumbnail"
        contextComponent={this}
        focused={this.props.focused}
        stealFocus={this.props.stealFocus}
        css={this.state.editing && { marginBottom: 10 }}
        role="button"
        trigger={() => {
          this.props.onTrigger();
          this.props.action.act();
        }}>

        <div {...style.thumbnail}>
          <div style={{ flex: 1 }}>
            <div {...style.name}>{action.name}</div>
            <div {...style.docs}>{action.shortDocumentation}</div>
          </div>

          {this.state.remapping &&
            <input ref={r => this.keyInput = r}
              {...style.keyInput}
              onKeyDown={this.remap}
              value={this.displayKeys()}
              size={this.displayKeys().length}
              onChange={() => { }} />}
          {!this.state.remapping &&
            <div>
              <KeyCommand action={action} />
              {this.editButton()}
            </div>}
        </div>

        {this.state.editing && this.editMenu()}
      </Focusable >
    );
  }
}

const style = styles({
  thumbnail: {
    cursor: 'pointer',
    position: 'relative',
    label: 'action-thumbnail',
    padding: 15,
    backgroundColor: vars.color.lightest,
    border: vars.borderSimple,
    borderTopWidth: 0,
    display: "flex",
    alignItems: "center",
    marginBottom: -1,
    '&:first-of-type': {
      borderTopWidth: 1
    }
  },

  name: {
    label: 'name',
    fontSize: 20,
    marginBottom: 5
  },

  docs: {
    label: 'docs',
    fontSize: 16,
  },

  keyInput: {
    padding: 5,
    fontSize: 14,
    display: 'inline-block'
  },

  edit: {
    display: 'inline-block',
    marginLeft: 10,
    position: 'relative',
    top: 2,
    color: "#aaa",
    ':hover': {
      color: "#888"
    }
  },

  menu: {
    display: "flex",
    justifyContent: "space-between",
  }
});
