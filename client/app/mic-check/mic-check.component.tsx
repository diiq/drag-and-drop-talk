import * as React from 'react';
import { ActionJSON, ActionService } from 'action/action';
import { Thanks } from 'thanks/thanks.component';
import { Spinner } from 'spinner/spinner.component';

//import * as style from './mic-check.scss';

export interface MicCheckProps { timeStamp: number };

export class MicCheck extends React.Component<MicCheckProps, {}> {
  state: {
    action?: ActionJSON
  } = {}

  time() {
    return (new Date()).getTime() - this.props.timeStamp;
  }

  componentWillMount() {
    ActionService.create("446ed2be-6665-44ae-b48c-de41695acbb6", this.time()).then(
      action => { this.setState({ action: action }) }
    )
  }

  render() {
    if (this.state.action) {
      return (
        <div>
          <Thanks />
        </div>
      );
    } else {
      return <Spinner />
    }
  }
}
