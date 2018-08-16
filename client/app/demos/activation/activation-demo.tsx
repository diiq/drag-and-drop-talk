
import * as React from 'react';
import { styles } from 'styles/css';
import { DragContext } from 'esdragon';
import { ActivationDragee } from './activation-dragee';

export interface ActivationDemoProps {
  title: JSX.Element
  touchStrategy: "waitForMotion" | "waitForTime" | "instant",
  mouseStrategy: "waitForMotion" | "waitForTime" | "instant"
};

export class ActivationDemo extends React.PureComponent<ActivationDemoProps, {}> {
  render() {
    return (
      <DragContext contextName="demo" style={{maxHeight: '100%', overflow:'auto'}}>
        <div {...style.slide}>
          <h2 {...style.title}>{this.props.title}</h2>
          <ActivationDragee text="the bright green snake" {...this.props} />
          <ActivationDragee text="the swift sweet deer" {...this.props} />
          <ActivationDragee text="the murmuring sparrows" {...this.props} />
          <ActivationDragee text="the love all in green" {...this.props} />
          <ActivationDragee text="the great horse of gold" {...this.props} />
          <ActivationDragee text="the lean hounds crouched low" {...this.props} />
          <ActivationDragee text="the famished arrow" {...this.props} />
          <ActivationDragee text="the silver dawn" {...this.props} />
          <ActivationDragee text="the pale daunting death" {...this.props} />
          <ActivationDragee text="the green mountain" {...this.props} />
          <ActivationDragee text="the slippered sleep" {...this.props} />
          <ActivationDragee text="the cruel bugle" {...this.props} />
        </div>
      </DragContext>
    );
  }
}

const style = styles({
  slide: {
    margin: '0 auto',
    maxWidth: 440,
    padding: 20,
  },
  title: {
    fontSize: 40,
    padding: '20px 0',
    fontWeight: 300
  }
})