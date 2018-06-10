import * as React from 'react';
//import * as style from './type-some-text-task.scss';

export interface TypeSomeTextTaskProps { name: string };

export class TypeSomeTextTask extends React.Component<TypeSomeTextTaskProps, {}> {
  render() {
    return <h1>Hello from {this.props.name}!</h1>;
  }
}
