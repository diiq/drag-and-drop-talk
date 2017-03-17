import * as React from 'react';
import { observer } from 'mobx-react';
import { StateJSON, StateService } from 'state/state';
import { config } from 'action/action';
import { Spinner } from 'spinner/spinner.component';
import { Welcome } from 'welcome/welcome.component';
import { MicCheck } from 'mic-check/mic-check.component';
import { Emojlet } from 'emojlet/emojlet.component';

import * as style from './home.scss';

export interface HomeProps { name: string };

@observer
export class Home extends React.Component<HomeProps, {}> {
  interval: number = 0;
  state: {
    state: StateJSON
    timeStamp: number
    fetching: boolean
  } = {
    state: { name: "Sam", taskID: "ok" },
    timeStamp: 0,
    fetching: true
  }

  componentWillMount() {
    this.setState({ fetching: true })
    this.interval = setInterval(() => {
      StateService.get().then((state) => {
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
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentMap(name: string): JSX.Element {
    return {
      "welcome": <Welcome />,
      "census": <MicCheck timeStamp={this.state.timeStamp} />
    }[name];
  }

  render() {
    if (this.state.fetching) return <Spinner />

    const state = this.state.state;

    const component = this.componentMap(state.name);

    return (
      <div>
        {component}
        {config.verification && <div className={style.verification}>You are <Emojlet /></div>}
      </div>
    );

  }
}
