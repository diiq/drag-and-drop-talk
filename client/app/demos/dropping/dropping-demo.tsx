
import * as React from 'react';
import { styles, css } from 'styles/css';
import { DragContext } from 'drag-drop/drag-context';
import { DropDragee } from './drop-dragee';

export interface DropDemoProps {
  title: JSX.Element
  locationStrategy: "top-left" | "centroid" | "mouse",
};

export class DropDemo extends React.PureComponent<DropDemoProps, {}> {
  render() {
    return (
      <DragContext contextName="demo" css={css({maxHeight: '100%', overflow:'auto'})}>
        <div {...style.slide}>
          <h2 {...style.title}>{this.props.title}</h2>
          <DropDragee text="" {...this.props} />
          <DropDragee text="" {...this.props} />
          <DropDragee text="The Troubles begin in Northern Ireland" {...this.props} />
          <DropDragee text="Death of Vladimir Lenin" {...this.props} />
          <DropDragee text="The first modern trampoline" {...this.props} />
          <DropDragee text="Tim Berners-Lee invents the World Wide Web" {...this.props} />
          <DropDragee text="The United States occupation of Haiti begins" {...this.props} />
          <DropDragee text="Triangle Shirtwaist Factory fire" {...this.props} />
          <DropDragee text="Woodstock" {...this.props} />
          <DropDragee text="The teddy bear is invented" {...this.props} />
          <DropDragee text="First controlled heavier-than-air flight of the Wright Brothers" {...this.props} />
          <DropDragee text="The discovery of penicillin" {...this.props} />
        </div>
      </DragContext>
    );
  }
}

const style = styles({
  slide: {
    margin: '0 auto',
    maxWidth: 320,
    padding: 10,
  },
  title: {
    fontSize: 40,
    padding: '20px 0',
    fontWeight: 300
  }
})