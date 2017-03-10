import * as React from 'react';
import { observer } from 'mobx-react';
import { StateJSON, StateService } from 'state/state';
import { Spinner } from 'spinner/spinner.component';
import { Welcome } from 'welcome/welcome.component';
import { MicCheck } from 'mic-check/mic-check.component';

import * as style from './home.scss';

export interface HomeProps { name: string };

@observer
export class Home extends React.Component<HomeProps, {}> {
  interval: number = 0;
  state: {
    state: StateJSON
    fetching: boolean
  }

  componentWillMount() {
    this.setState({ fetching: true })
    this.interval = setInterval(() => {
      StateService.get().then((state) => {
        this.setState({ state: state, fetching: false })
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentMap: { [index: string]: JSX.Element } = {
    "welcome": <Welcome />,
    "mic_check": <MicCheck />
  }

  render() {
    if (this.state.fetching) return <Spinner />

    const state = this.state.state;

    const component = this.componentMap[state.name];

    return component;

  }
}
