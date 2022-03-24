import { CardType } from './Card';
import { Combination } from './GameState';
import { PlayerInterface } from './Player';

type ActionType = 'PASS' | 'PLAY';

export interface ActionsInterface {
  pushAction: (a: Action) => void;
  getLastAction: () => Action | null;
}

export type Action = {
  player: PlayerInterface | null;
  action: ActionType;
  type?: Combination;
  length?: number;
  high?: CardType;
};

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
