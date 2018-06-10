import * as React from 'react';
import { observer } from 'mobx-react';
// import { StateJSON, StateService } from 'state/state';
import { Spinner } from 'spinner/spinner';
import slides from 'slides'

//import * as style from './presentation.scss';

export interface PresentationProps { };

@observer
export class Presentation extends React.Component<PresentationProps, {}> {
  state = {
    slideIndex: 0
  }

  currentSlide() { return slides[this.state.slideIndex] }

  gotoSlide(slide: number) {
    // StateService.set(slides[slide].state, slides[slide].taskID).then(() => {
    //   this.setState({
    //     slideIndex: slide,
    //     fetching: false
    //   });
    // });
    this.setState({slideIndex: this.state.slideIndex + 1})
  }

  render() {
    if (this.state.slideIndex < 0) return <Spinner />

    const state = this.currentSlide();

    const componentClass = state.component;
    const args = state.arguments;
    args['taskID'] = state.taskID;
    const component = React.createElement(componentClass, args)

    return <div tabIndex={0} style={{ height: "100%" }}>
      {component}
    </div>;

  }
}
