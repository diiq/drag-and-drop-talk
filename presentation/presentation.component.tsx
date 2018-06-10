import * as React from 'react';
import { observer } from 'mobx-react';
import { StateJSON, StateService } from 'state/state';
import { Spinner } from 'spinner/spinner.component';
import { history } from 'app-history';
import slides from 'slides'

//import * as style from './presentation.scss';

export interface PresentationProps { params: { slide: string } };

@observer
export class Presentation extends React.Component<PresentationProps, {}> {
  state = {
    slideIndex: -1,
    fetching: true
  }

  currentSlide() { return slides[this.state.slideIndex] }

  componentWillMount() {
    const slide = this.props.params.slide || "0";
    this.gotoSlide(parseInt(slide));
    window.onkeydown = this.onKeyDown;
  }

  componentWillReceiveProps(props: PresentationProps) {
    const slide = props.params.slide || "0";
    this.gotoSlide(parseInt(slide));
  }

  gotoSlide(slide: number) {
    StateService.set(slides[slide].state, slides[slide].taskID).then(() => {
      this.setState({
        slideIndex: slide,
        fetching: false
      });
    });
  }

  onKeyDown = (e: any) => {
    if (e.key === "ArrowLeft") {
      history.push(`presentation/${this.state.slideIndex - 1}`);
    } else if (e.key === "ArrowRight" || e.key === " ") {
      history.push(`presentation/${this.state.slideIndex + 1}`);
    } else if (e.key === "K") {
      StateService.delete();
    }
  }

  render() {
    if (this.state.slideIndex < 0 || this.state.fetching) return <Spinner />

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
