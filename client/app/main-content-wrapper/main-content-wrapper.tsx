import * as React from 'react';

export interface MainContentWrapperProps {
};

export class MainContentWrapper extends React.PureComponent<MainContentWrapperProps, {}> {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}