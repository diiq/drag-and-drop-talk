import * as React from 'react';
import { observer } from 'mobx-react';
// import { StateJSON, StateService } from 'state/state';

import { styles } from 'styles/css';
import { Link } from 'link/link';



export interface ImaLinkProps { };

@observer
export class ImaLink extends React.Component<ImaLinkProps, {}> {
  render() {
    return <div {...style.slide}>
      <p>There's nothing here, this page is just here to prove that each item is a link.</p>
      <Link to="/">&lt; Back</Link>
    </div>;
  }
}

const style = styles({
  slide: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: 30
  }
})