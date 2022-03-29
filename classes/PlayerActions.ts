import { CardType } from './Card';
import { makeObservable, observable, computed, action } from 'mobx';
import { PlayerInterface } from './Player';
import { Combination } from '../constants/CombinationConstants';
import { ActionType } from '../constants/Actions';

export type PlayerActionsType = {
  cards?: CardType[];
  player: PlayerInterface;
  type: Combination;
  length?: number;
  action: ActionType;
};

export interface PlayerActionsInterface {
  deque: PlayerActionsType[];
  unshift: (d: PlayerActionsType) => void;
}

export class PlayerActions {
  _deque: PlayerActionsType[];

  constructor() {
    this._deque = [];
    makeObservable(this, {
      _deque: observable,
      deque: computed,
      unshift: action,
    });
  }

  public get deque() {
    return this._deque;
  }

  public set deque(deque: PlayerActionsType[]) {
    this._deque = deque;
  }

  public unshift(played: PlayerActionsType) {
    this._deque.unshift(played);
  }
}
