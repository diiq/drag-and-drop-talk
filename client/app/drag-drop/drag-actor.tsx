//
// for each droppable, give Location => FastUpdate (move over/get bigger if needed) and Location => DropUpdate
// for each draggable predrag fastupdate (if mobile aimate drag icon), startdrag fastupdate (hide it!), drag renderer (to be put in an transformed box)
// scrollbucket -> dimensions. dimensions

import * as React from 'react';
import { object } from 'prop-types';
import { DragManager, DragLocation, Actor, DragPosition } from './drag-context';


// CSS
import { CompiledStyle } from 'styles/css';

export interface DragActorProps {
  contextName: string
  id: any
  fastUpdate?: (location: DragLocation, monitor: any) => void
  dragStop?: (monitor?: any, position?: DragPosition) => void
  dragStart?: (monitor: any) => void
  css?: CompiledStyle
  setRef?: (ref: HTMLDivElement) => void
};

export class DragActor extends React.Component<DragActorProps, {}> {
  static contextTypes = {
    dragManagers: object
  }
  actor: Actor

  manager() {
    return this.context.dragManagers[this.props.contextName] as DragManager;
  }

  componentDidMount() {
    this.actor = {
      fastUpdate: this.props.fastUpdate,
      dragStop: this.props.dragStop,
      dragStart: this.props.dragStart
    };
    this.manager().addActor(this.props.id, this.actor);
  }

  componentWillReceiveProps(props: DragActorProps) {
    this.actor = {
      fastUpdate: props.fastUpdate,
      dragStop: props.dragStop,
      dragStart: props.dragStart
    };
    this.manager().addActor(this.props.id, this.actor);
  }

  // TODO performance?
  componentWillUnmount() {
    this.manager().removeActor(this.props.id, this.actor);
  }

  render() {
    return <div {...this.props.css} ref={this.props.setRef}>
      {this.props.children}
    </div>
  }
}
