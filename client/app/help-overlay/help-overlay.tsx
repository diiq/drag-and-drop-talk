import * as React from 'react';
import { ActionSearch } from './action-search/action-search';
import { ContextStackEntry } from 'focus';

// Components
import { HelpBody } from './help-body/help-body';
import { Modal } from 'modal/modal';

// CSS
import { styles, vars } from 'styles/css';


export interface HelpOverlayProps {
  close: () => void
  contextStack: ContextStackEntry[]
};

export class HelpOverlay extends React.Component<HelpOverlayProps, {}> {
  render() {
    return (
      <Modal toHide={this.props.close} dialogCss={{ maxWidth: 1200 }} showX>
        <div {...style.body}>
          <HelpBody contextStack={this.props.contextStack} />
          <ActionSearch
            contextStack={this.props.contextStack}
            beforeAction={this.props.close} />
        </div>
      </Modal>
    );
  }
}

const style = styles({
  body: {
    display: 'flex',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    height: '100%',
    overflowY: 'auto',
    ...vars.scrollbars
  }
});
