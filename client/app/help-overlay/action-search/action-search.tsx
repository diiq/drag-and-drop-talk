import * as React from 'react';
import { ActionThumbnail } from './action-thumbnail/action-thumbnail';
import { ActionContextService, Action, ContextStackEntry } from 'focus';
import { css, vars } from 'styles/css';
import { observer } from 'mobx-react';
import { Unfocusable } from 'focus';

export interface ActionSearchProps {
  contextStack: ContextStackEntry[],
  beforeAction(): void
};

@observer
export class ActionSearch extends React.Component<ActionSearchProps, {}> {
  state = {
    focusedIndex: null as number
  };

  componentWillReceiveProps() {
    this.setState({ focusedIndex: 0 });
  }

  activeActions() {
    return ActionContextService
      .actionsInContexts(this.props.contextStack)
      .filter(a => !a.action.hidden);
  }

  maxIndex() {
    return this.activeActions().length - 1;
  }

  moveFocus(i: number) {
    this.setState({
      focusedIndex: Math.min(Math.max(this.state.focusedIndex + i, 0),
        this.activeActions().length - 1)
    });
  }

  setFocus(i: number) {
    this.setState({ focusedIndex: i });
  }

  render() {
    return (
      <Unfocusable context="command-palette" contextComponent={this} css={styling}>
        <h3>Available actions</h3>
        <p>Is one of the default keyboard shortcuts getting in the way? Change it from here!</p>
        <p>This list depends on what object you're focused on. Try pressing Control-? in different contexts, like while in a form, or while hovering over a feature thumbnail.</p>
        <div role="listbox">
          {this.activeActions().map((action, i) => {
            return <ActionThumbnail
              action={action}
              focused={i == this.state.focusedIndex}
              onTrigger={this.props.beforeAction}
              stealFocus={() => this.setFocus(i)}
              key={i} />;
          })}
        </div>
      </Unfocusable>
    );
  }
}

ActionContextService.addContext("command-palette", {
  name: "Command Palette",
  documentation: "Pick an action. Press enter to do it.",
  hidden: true,
  actions: {
    next: new Action({
      name: "Next",
      shortDocumentation: "",
      searchTerms: ["next", "command palette"],
      actOn: (c: ActionSearch) => c.moveFocus(1),
      defaultKeys: ["ArrowDown"]
    }),
    previous: new Action({
      name: "Previous",
      shortDocumentation: "",
      searchTerms: ["previous", "command palette"],
      actOn: (c: ActionSearch) => c.moveFocus(-1),
      defaultKeys: ["ArrowUp"]
    })
  }
});

let styling = css({
  flex: 1,
  minWidth: 325,
  label: 'action-search-styling',
  padding: vars.spacing,
  backgroundColor: vars.color.lightest,
  borderLeft: vars.borderSimple,
  overflowY: 'auto'
})
