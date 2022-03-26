import { combinationConstants } from '../constants/CombinationConstants';
import {
  createHandMap,
  isValidCombination,
} from '../helper/combinationHelpers';
import { Action } from './Actions';
import { CardType } from './Card';
import { ActionType, Combination } from './GameState';

export interface PlayerInterface {
  setReady: (r: boolean) => void;
  getName: () => string;
  getAction: (
    c: Combination,
    hi: CardType | null,
    h: CardType[],
    l: number,
    t: number
  ) => ActionPayload;
}

export type ActionPayload = {
  action: ActionType;
  type: Combination;
  played: CardType[];
  newHand: CardType[];
};

// 0 for human
// 1 for computer
export enum PlayerType {
  HUMAN,
  COMPUTER,
}

export class Player implements PlayerInterface {
  name: string;
  hand: CardType[];
  ready: boolean;
  type: PlayerType;

  constructor(name: string, ready: boolean, type: PlayerType) {
    this.name = name;
    this.hand = [];
    this.ready = ready;
    this.type = type;
  }

  public setReady() {
    this.ready = !this.ready;
  }

  public isReady() {
    return this.ready;
  }

  public getName() {
    return this.name;
  }

  public getAction(
    combinationType: Combination,
    highestCard: CardType | null,
    hand: CardType[],
    length: number,
    turn: number
  ): ActionPayload {
    // play lowest three on first turn
    if (turn === 0) {
      const [played, newHand] = this.playLowestThree(hand);
      const [_, type] = isValidCombination(
        played,
        combinationType,
        highestCard,
        length
      );
      return { action: ActionType.PLAY, type, played, newHand };
    }
    switch (combinationType) {
      // atm computer will always play single when they can play anything
      case null:
      case combinationConstants.SINGLE:
        return this.playSingle(hand, highestCard, combinationType);
      default:
        return {
          action: ActionType.PASS,
          type: combinationType,
          played: [],
          newHand: hand,
        };
    }
  }

  private playLowestThree(hand: CardType[]) {
    const updatedHands: [CardType[], CardType[]] = [[], []];
    for (let idx = 0; idx < hand.length; idx++) {
      const card = hand[idx];
      if (card.value === 3 && card.suit === 0) {
        updatedHands[0] = [card];
        updatedHands[1] = [...hand.slice(0, idx), ...hand.slice(idx + 1)];
        break;
      }
    }
    return updatedHands;
  }

  private playSingle(
    hand: CardType[],
    high: CardType | null,
    combinationType: Combination
  ) {
    const payload: ActionPayload = {
      action: ActionType.PASS,
      type: combinationType,
      played: [],
      newHand: hand,
    };
    for (let idx = 0; idx < hand.length; idx++) {
      const card = hand[idx];
      if (high === null) {
        payload.played.push(card);
        payload.type = combinationConstants.SINGLE;
        payload.action = ActionType.PLAY;
        return payload;
      }
      if (
        card.value > high.value ||
        (card.value === high.value && card.suit > high.suit)
      ) {
        const [isValid, type] = isValidCombination(
          [card],
          combinationType,
          high
        );

        if (isValid) {
          payload.played.push(card);
          payload.newHand = [...hand.slice(0, idx), ...hand.slice(idx + 1)];
          payload.action = ActionType.PLAY;
          payload.type = type;
          break;
        }
      }
    }

    return payload;
  }
}
