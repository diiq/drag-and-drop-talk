import API from '../api/api';
import { remove } from 'lodash';
import { observable, computed, action } from 'mobx';


export interface Meeting {
  name: string
  url: string
}

export interface TeamJSON {
  users: string[]
  meetings: Meeting[]
}

export class Team {
  @observable meetings: Meeting[]
  @observable users: string[]

  constructor(team: TeamJSON) {
    Object.assign(this, team);
  }

  @computed
  get json() {
    return {
      meetings: this.meetings,
      users: this.users
    }
  }

  @action
  addMeeting(meeting: Meeting) {
    this.meetings.push(meeting);
    TeamService.update(this.json).then(
      action(json => Object.assign(this, json))
    )
  }

  @action
  removeMeeting(meeting: Meeting) {
    remove(this.meetings, meeting);
    TeamService.update(this.json)
  }

  @action
  addUser(user: string) {
    this.users.push(user);
    return TeamService.update(this.json).then(
      action(json => Object.assign(this, json))
    )
  }

  @action
  removeUser(user: string) {
    this.users.remove(user);
    return TeamService.update(this.json)
  }
}


export const TeamService = new class {
  get(): Promise<Team> {
    return API.get('').then((res) => new Team(res));
  }

  update(team: Partial<TeamJSON>): Promise<TeamJSON> {
    return API.put('', team);
  }
}()
