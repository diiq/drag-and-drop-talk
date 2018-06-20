import * as React from 'react';
import { observer } from 'mobx-react';
// import { StateJSON, StateService } from 'state/state';
import { Spinner } from 'spinner/spinner';

import slides from 'slides'
import { styles } from 'styles/css';
import { Slide } from 'models/slide';

export interface SecondScreenProps { };

@observer
export class SecondScreen extends React.Component<SecondScreenProps, {}> {
  state = {
    slideIndex: 0
  }

  currentSlide() { return slides[Slide.slide] }

  render() {
    const state = this.currentSlide();
    if (Slide.slide >= 0) {
      const componentClass = state.secondaryComponent;
      const args = state.secondaryArguments;
      var component = React.createElement(componentClass, args)
    }

    return <div {...style.slide} {...(state && !state.unhacked && style.hacked)}>
      {this.state.slideIndex < 0 && <Spinner />}
      {this.state.slideIndex >= 0 && component}
    </div>

  }
}

const style = styles({
  slide: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  hacked: {
    backgroundColor: '#000',
    color: "#0F0",
    fontFamily: "monospace"
  }
})