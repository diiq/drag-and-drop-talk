import * as React from 'react';

export interface EmptyProps { };

export class Empty extends React.Component<EmptyProps, {}> {
  render() {
    return <div></div>;
  }
}