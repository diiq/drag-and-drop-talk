import * as React from 'react';
import { observer } from 'mobx-react';
import { StateJSON, StateService } from 'state/state';
import { config } from 'action/action';
import { Spinner } from 'spinner/spinner.component';
import { MicCheck } from 'mic-check/mic-check.component';
import { Census } from 'home/census/census.component';
import { OneNumberEstimate } from 'home/one-number-estimate/one-number-estimate.component';
import { TwoNumberEstimate } from 'home/two-number-estimate/two-number-estimate.component';
import { TypingAction } from 'home/typing-action/typing-action.component';
import { SimpleAction } from 'home/simple-action/simple-action.component';
import { Waiting } from 'home/waiting/waiting.component';
import { Emojlet } from 'emojlet/emojlet.component';
import poll from 'poll';

import * as style from './home.scss';

export interface HomeProps { name: string };

@observer
export class Home extends React.Component<HomeProps, {}> {
  interval?: () => void
  state: {
    state: StateJSON
    timeStamp: number
    fetching: boolean
  } = {
    state: { name: "Sam", task_id: "ok" },
    timeStamp: 0,
    fetching: true
  }

  componentWillMount() {
    this.setState({ fetching: true })
    this.interval = poll(() => {
      return StateService.get().then((state) => {
        const newState = {
          state: state,
          fetching: false,
          timeStamp: this.state.timeStamp
        }
        if (this.state.state.name !== state.name) {
          newState.timeStamp = (new Date()).getTime();
        }
        this.setState(newState)
      })
    })
  }

  componentWillUnmount() {
    this.interval();
  }

  componentMap(name: string, task: string): JSX.Element {
    return {
      "welcome": <Waiting />,
      "mic-check": <MicCheck taskID={task} />,
      "census": <Census taskID={task} />,
      "one-number-estimate": <OneNumberEstimate taskID={task} />,
      "two-number-estimate": <TwoNumberEstimate taskID={task} />,
      "typing-action": <TypingAction taskID={task} />,
      "simple-action": <SimpleAction taskID={task} />,
      "waiting": <Waiting />
    }[name];
  }

  render() {
    if (this.state.fetching) return <Spinner />

    const state = this.state.state;

    const component = this.componentMap(state.name, state.task_id);

    return (
      <div>
        {component}
        {config.emoji &&
          state.name !== "waiting" &&
          state.name !== "mic-check" &&
          <div className={style.verification}>You are <Emojlet /></div>}
      </div>
    );

  }
}
