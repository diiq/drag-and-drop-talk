import * as React from 'react';
import { ActionContextService, ContextStackEntry } from 'focus';
import { Button } from 'button/button';

import { styles, vars } from 'styles/css';

export interface HelpBodyProps {
  contextStack: ContextStackEntry[]
};

export class HelpBody extends React.Component<HelpBodyProps, {}> {
  state = {
    selectedContextIndex: 0
  }

  componentDidMount() {
    this.setState({ selectedContextIndex: this.visibleContexts().length - 1 });
  }

  visibleContexts() {
    return this.props.contextStack.map(
      c => ActionContextService.contexts.get(c.context)
    ).filter(c => !c.hidden).reverse();
  }

  setContextIndex(i: number) {
    this.setState({ selectedContextIndex: i });
  }

  render() {
    const current = this.visibleContexts()[this.state.selectedContextIndex];
    return (
      <div {...style.help}>
        {this.visibleContexts().length > 2 && <nav>
          {this.visibleContexts().map((context, i) => {
            return (
              <span key={i}>{!!i && <span role="presentation"> &gt; </span>}
                <Button theme="link" action={() => this.setContextIndex(i)}>{context.name}</Button>
              </span>
            );
          })}
        </nav>}
        <div {...style.text}>
          <h2>{current.name}</h2>
          {current.documentation}
        </div>
      </div>
    );
  }
}

const style = styles({
  help: {
    flex: 1.5,
    minWidth: 550,
    padding: 30,
    overflowY: 'auto',
    '@media(max-width:875px)': {
      minWidth: '100%'
    },

    ' h2': {
      margin: `${vars.spacing}px 0px`
    }
  },
  text: {
    maxWidth: 550,
    margin: '0 auto'
  }
});
