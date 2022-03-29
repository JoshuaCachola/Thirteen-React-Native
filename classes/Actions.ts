import { Action } from '../constants/Actions';

export interface ActionsInterface {
  pushAction: (a: Action) => void;
  getLastAction: () => Action | null;
}

export class Actions implements ActionsInterface {
  actions: Action[];

  constructor() {
    this.actions = [];
  }

  pushAction(a: Action) {
    this.actions.push(a);
  }

  getLastAction() {
    if (this.actions.length) return this.actions[this.actions.length - 1];
    else return null;
  }
}
