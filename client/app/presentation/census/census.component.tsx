import * as React from 'react';
import { ActionJSON, ActionService } from 'action/action';
import { StateService } from 'state/state';
import { Emojlet } from 'emojlet/emojlet.component';
import { Spinner } from 'spinner/spinner.component';
import * as style from './census.scss';

export interface CensusProps { title: JSX.Element, question: JSX.Element, taskID: string };

export class Census extends React.Component<CensusProps, {}> {
  state: {
    actions: ActionJSON[]
  } = {
    actions: []
  }

  interval = 0

  componentWillMount() {
    this.interval = setInterval(() => {
      ActionService.list(this.props.taskID).then((actions) => {
        this.setState({
          actions: actions,
        })
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  uniqueActions() {
    return this.state.actions.filter((f, i) => this.state.actions.findIndex(g => f.verification === g.verification) === i);
  }

  render() {
    return (
      <div className="slide basic-slide">
        <div className="title"><h1>{this.props.title}</h1></div>
        <div className="content two-columns">
          <div>
            {this.props.question}
          </div>
          <div className={style.connected} >
            <div className={style.spinnerBox}><Spinner /></div>
            <div>
              {this.uniqueActions().map((a, i) => <Emojlet url={a.verification} />)}
            </div >
          </div>
        </div>
      </div>
    );
  }
}
