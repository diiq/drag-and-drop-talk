import * as React from 'react';

export interface RouteWrapperProps { }

export class RouteWrapper extends React.Component<RouteWrapperProps, {}> {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
