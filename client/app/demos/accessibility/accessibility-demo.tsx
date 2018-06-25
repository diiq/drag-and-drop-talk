
import * as React from 'react';
import { styles } from 'styles/css';
import { DragContext } from 'drag-drop/drag-context';
import { AccessibleDragee } from './accessible-dragee';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Action, ActionContextService } from 'focus';
import { Unfocusable } from 'focus/unfocusable/unfocusable';

export interface AccessibilityDemoProps {
  title: JSX.Element
  locationStrategy: "topLeft" | "centroid" | "mouse",
};

ActionContextService.addContext("accessibility-demo", {
  name: "The Feature Map",
  documentation: "",
  actions: {
    up: new Action({
      name: "Go up",
      shortDocumentation: "Move up",
      searchTerms: ["move", "cut", "drag"],
      actOn: (c: AccessibilityDemo) => {
        c.moveFocusUp();
      },
      defaultKeys: ["ArrowUp", "k"]
    }),
    down: new Action({
      name: "Go down",
      shortDocumentation: "Move down",
      searchTerms: ["move", "cut", "drag"],
      actOn: (c: AccessibilityDemo) => {
        c.moveFocusDown();
      },
      defaultKeys: ["ArrowDown", "j"]
    }),
    cut: new Action({
      name: "Move",
      shortDocumentation: "Move (cut and paste) the focused object",
      searchTerms: ["move", "cut", "drag"],
      actOn: (c: AccessibilityDemo) => {
        c.startMoving();
      },
      defaultKeys: ["Control+x", "Meta+x"]
    }),
    paste: new Action({
      name: "Paste",
      shortDocumentation: "Place (cut and paste) the moving object",
      searchTerms: ["move", "cut", "drag"],
      actOn: (c: AccessibilityDemo) => {
        c.stopMoving();
      },
      defaultKeys: ["Control+v", "Meta+v", "Enter"]
    }),
  }
});

class HistoricalEvent {
  @observable order: number
  constructor(public text: string, order: number) {
    this.order = order
  }
}

@observer
export class AccessibilityDemo extends React.Component<AccessibilityDemoProps, {}> {
  state = {
    moving: false,
    focused: 0
  }

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
    // Tremendously inefficient and easy to cache, but don't thing about that; make the prototype.
    return this.events.sort((a, b) => a.order - b.order)
  }

  previousOrder(i: number) {
    // Returns a rational number between the order of the i-1th event and the order of i-th event in the list.
    if (i <= 0) {
      return this.sortedEvents()[i].order / 2
    }
    return (this.sortedEvents()[i].order + this.sortedEvents()[i - 1].order) / 2
  }

  nextOrder(i: number) {
    // Returns a rational number between the order of the ith event and the order of i+1-th event in the list.
    if (i >= this.sortedEvents.length - 1) {
      return this.sortedEvents()[i].order + 1
    }
    return (this.sortedEvents()[i].order + this.sortedEvents()[i + 1].order) / 2
  }

  setFocus(i: number) {
    this.setState({focused: Math.min(Math.max(0, i), this.events.length - 1)});
  }

  moveFocusDown() {
    if (this.state.moving) {
      this.sortedEvents()[this.state.focused].order = this.nextOrder(this.state.focused + 1);
    }
    this.setFocus(this.state.focused + 1)
  }

  moveFocusUp() {
    if (this.state.moving) {
      this.sortedEvents()[this.state.focused].order = this.previousOrder(this.state.focused - 1);
    }
    this.setFocus(this.state.focused - 1)
  }

  startMoving() {
    this.setState({moving: true});
  }

  stopMoving() {
    this.setState({moving: false});
  }

  motionMessage() {
    if (!this.state.moving) return "";
    if (this.state.focused <= 0) {
      return "Moved to start of list"
    } else {
      return "Moved after " + this.sortedEvents()[this.state.focused - 1].text
    }
  }

  render() {
    console.log(this.state.focused)
    return (
      <div {...style.scroller} id="scroller">
        <Unfocusable context="accessibility-demo" contextComponent={this} constrainFocus>
          <DragContext contextName="demo" yScroller={() => document.getElementById("scroller")}>
            <div {...style.slide}>
              <h2 {...style.title}>{this.props.title}</h2>
              {this.sortedEvents().map((event, i) => <AccessibleDragee focused={i == this.state.focused} moving={i == this.state.focused && this.state.moving} key={event.text} item={event} {...this.props} previousOrder={this.previousOrder(i)} />)}
            </div>
          </DragContext>
          <div role="alert" {...style.alert}>{this.motionMessage()}</div>
        </Unfocusable>
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
  },
  alert: {
    position: 'relative',
    right: -10000000
  }
})