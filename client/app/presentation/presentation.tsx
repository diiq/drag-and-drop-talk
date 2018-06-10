import * as React from 'react';
import { observer } from 'mobx-react';
// import { StateJSON, StateService } from 'state/state';
import { Spinner } from 'spinner/spinner';

import slides from 'slides'
import { ActionContextService, Action } from 'focus';
import { Focusable } from 'focus/focusable/focusable';
import { styles } from 'styles/css';


ActionContextService.addContext("presentation", {
  hidden: true,
  actions: {
    next: new Action({
      name: "Next slide",
      shortDocumentation: "",
      searchTerms: ["next"],
      actOn: (c: Presentation) => {
        console.log("goo")
        c.gotoSlide(c.state.slideIndex + 1)
      },
      defaultKeys: ["ArrowRight", "Space", "Enter"]
    }),
    previous: new Action({
      name: "Previous slide",
      shortDocumentation: "",
      searchTerms: ["previous"],
      actOn: (c: Presentation) => {
        c.gotoSlide(c.state.slideIndex - 1)
      },
      defaultKeys: ["ArrowLeft"]
    })
  }
});


export interface PresentationProps { };

@observer
export class Presentation extends React.Component<PresentationProps, {}> {
  state = {
    slideIndex: 0
  }

  currentSlide() { return slides[this.state.slideIndex] }

  gotoSlide(slide: number) {
    this.setState({slideIndex: Math.max(Math.min(slides.length - 1, slide), 0)})
  }

  render() {
    const state = this.currentSlide();

    const componentClass = state.component;
    const args = state.arguments;
    args['taskID'] = state.taskID;
    const component = React.createElement(componentClass, args)

    return <Focusable css={style.slide} context="presentation" contextComponent={this} focused={true}>
      {this.state.slideIndex < 0 && <Spinner />}
      {this.state.slideIndex >= 0 && component}
    </Focusable>;

  }
}

const style = styles({
  slide: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})