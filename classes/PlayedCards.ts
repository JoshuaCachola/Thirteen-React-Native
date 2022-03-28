import { CardType } from './Card';
import { makeObservable, observable, computed } from 'mobx';
import { PlayerInterface } from './Player';
import { Combination } from './GameState';
import { ActionType } from './Actions';

type PlayedCardsType = {
  cards?: CardType[];
  player: PlayerInterface;
  type: Combination;
  length?: number;
  action: ActionType;
};
export class PlayedCards {
  deque: PlayedCardsType[];

  constructor() {
    makeObservable(this, {
      deque: observable,
      unshift: computed,
    });
    this.deque = [];
  }

  public unshift(played: PlayedCardsType) {
    this.deque.unshift(played);
  }
}
