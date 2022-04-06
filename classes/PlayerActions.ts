import { CardType } from './Card';
import { makeObservable, observable, computed, action } from 'mobx';
import { PlayerInterface } from './Player';
import { Combination } from '../constants/CombinationConstants';
import { ActionType } from '../constants/Actions';

export type PlayerActionsType = {
  cards?: CardType[];
  player: PlayerInterface;
  type?: Combination;
  length?: number;
  positions?: { bottom: number; left: number; rotate: string };
  action: ActionType;
};

export interface PlayerActionsInterface {
  stack: PlayerActionsType[];
  push: (s: PlayerActionsType) => void;
  clear: () => void;
}

export class PlayerActions {
  _stack: PlayerActionsType[];

  constructor() {
    this._stack = [];
    makeObservable(this, {
      _stack: observable,
      stack: computed,
      push: action,
      clear: action,
    });
  }

  public get stack() {
    return this._stack;
  }

  public set stack(stack: PlayerActionsType[]) {
    this._stack = stack;
  }

  public push(played: PlayerActionsType) {
    this._stack.push(played);
  }

  public clear() {
    this.stack = [];
  }
}
