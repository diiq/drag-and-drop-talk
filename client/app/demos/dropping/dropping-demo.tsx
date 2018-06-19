
import * as React from 'react';
import { styles, css } from 'styles/css';
import { DragContext } from 'drag-drop/drag-context';
import { DropDragee } from './drop-dragee';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export interface DropDemoProps {
  title: JSX.Element
  locationStrategy: "topLeft" | "centroid" | "mouse",
};

class HistoricalEvent {
  @observable order: number
  constructor(public text: string, order: number) {
    this.order = order
  }
}

@observer
export class DropDemo extends React.Component<DropDemoProps, {}> {
  i = 1
  @observable events = [
    new HistoricalEvent("The Troubles begin in Northern Ireland", this.i++),
    new HistoricalEvent("Death of Vladimir Lenin", this.i++),
    new HistoricalEvent("The first modern trampoline", this.i++),
    new HistoricalEvent("Tim Berners-Lee invents the World Wide Web", this.i++),
    new HistoricalEvent("The United States occupation of Haiti begins", this.i++),
    new HistoricalEvent("Triangle Shirtwaist Factory fire", this.i++),
    new HistoricalEvent("Woodstock", this.i++),
    new HistoricalEvent("The teddy bear is invented", this.i++),
    new HistoricalEvent("First controlled heavier-than-air flight", this.i++),
    new HistoricalEvent("The discovery of penicillin", this.i++),
  ]

  sortedEvents() {
    return this.events.sort((a, b) => a.order - b.order)
  }

  previousOrder(i: number) {
    if (i == 0) {
      return this.sortedEvents()[i].order / 2
    }
    return (this.sortedEvents()[i].order + this.sortedEvents()[i - 1].order) / 2
  }

  render() {
    return (
      <div {...style.scroller} id="scroller">
        <DragContext contextName="demo" yScroller={() => document.getElementById("scroller")}>
          <div {...style.slide}>
            <h2 {...style.title}>{this.props.title}</h2>
            {this.sortedEvents().map((event, i) => <DropDragee key={event.text} item={event} {...this.props} previousOrder={this.previousOrder(i)} />)}
          </div>
        </DragContext>
      </div>
    );
  }
}

const style = styles({
  scroller: {
    maxHeight: '100%',
    overflow:'auto',
    paddingBottom: 200
  },
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