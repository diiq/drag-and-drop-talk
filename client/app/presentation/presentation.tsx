import * as React from 'react';
import { observer } from 'mobx-react';
// import { StateJSON, StateService } from 'state/state';
import { Spinner } from 'spinner/spinner';

import slides from 'slides'
import { ActionContextService, Action } from 'focus';
import { Focusable } from 'focus/focusable/focusable';
import { styles } from 'styles/css';
import { Slide } from 'models/slide';

ActionContextService.addContext("presentation", {
  hidden: true,
  actions: {
    next: new Action({
      name: "Next slide",
      shortDocumentation: "",
      searchTerms: ["next"],
      actOn: (c: Presentation) => {
        c.gotoSlide(Slide.slide + 1)
      },
      defaultKeys: ["ArrowRight", "Space", "Enter"]
    }),
    previous: new Action({
      name: "Previous slide",
      shortDocumentation: "",
      searchTerms: ["previous"],
      actOn: (c: Presentation) => {
        c.gotoSlide(Slide.slide - 1)
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

  currentSlide() { return slides[Slide.slide] }

  gotoSlide(slide: number) {
    Slide.setSlide(Math.max(Math.min(slides.length - 1, slide), 0))
  }

  render() {
    const state = this.currentSlide();
    if (Slide.slide >= 0) {
      const componentClass = state.presentationComponent;
      const args = state.presentationArguments;
      var component = React.createElement(componentClass, args)
    }

    return <Focusable css={style.slide} context="presentation" contextComponent={this} focused={true}>
      {Slide.slide < 0 && <Spinner />}
      {Slide.slide >= 0 && component}
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