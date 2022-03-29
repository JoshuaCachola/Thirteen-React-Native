import { ActionPayload, ActionType } from '../constants/Actions';
import {
  Combination,
  combinationConstants,
} from '../constants/CombinationConstants';
import {
  CardValues,
  cardValues,
  getMultiples,
  getStraights,
  isValidCombination,
} from '../helper/combinationHelpers';
import { CardType } from './Card';
import { Player } from './Player';

export class Computer extends Player {
  constructor(name: string) {
    super(name, true);
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
        return this.canPlaySingle(hand, highestCard, combinationType);
      case combinationConstants.DOUBLE:
      case combinationConstants.TRIPLE:
        return this.canPlayMultiple(hand, highestCard!, combinationType);
      case combinationConstants.STRAIGHT:
        return this.canPlayStraight(
          hand,
          highestCard!,
          combinationType,
          length
        );
      default:
        return {
          action: ActionType.PASS,
          type: combinationType,
          played: [],
          newHand: hand,
        };
    }
  }

  private canPlayStraight(
    hand: CardType[],
    highestCard: CardType,
    combinationType: Combination,
    length: number
  ) {
    let payload: ActionPayload = {
      action: ActionType.PASS,
      type: combinationType,
      played: [],
      newHand: hand,
    };

    // const straights = getStraights(hand, length, highestCard);
    // console.log(straights);
    return payload;
  }

  private canPlayMultiple(
    hand: CardType[],
    highestCard: CardType,
    combinationType: Combination
  ) {
    let payload: ActionPayload = {
      action: ActionType.PASS,
      type: combinationType,
      played: [],
      newHand: hand,
    };
    const doubles = getMultiples(hand, combinationType!);
    console.log(doubles);
    for (const [value, indicies] of Object.entries(doubles)) {
      const parsedValue = cardValues.indexOf(value);
      if (parsedValue === highestCard.value) {
        for (let i = 0; i < indicies.length; i++) {
          return this.playCards(hand, indicies[i], payload);
        }
      } else if (parsedValue > highestCard.value) {
        return this.playCards(hand, indicies[0], payload);
      }
    }
    return payload;
  }

  private playCards(
    hand: CardType[],
    indicies: number[],
    payload: ActionPayload
  ) {
    const played: CardType[] = [];
    const newHand: CardType[] = [];

    hand.forEach((card, idx) => {
      if (indicies.includes(idx)) {
        played.push(card);
      } else {
        newHand.push(card);
      }
    });

    payload.played = played;
    payload.newHand = newHand;
    payload.action = ActionType.PLAY;

    return payload;
  }

  private playLowestThree(hand: CardType[]) {
    // const updatedHands: [CardType[], CardType[]] = [[], []];
    // for (let idx = 0; idx < hand.length; idx++) {
    //   const card = hand[idx];
    //   if (card.value === 3 && card.suit === 0) {
    //     updatedHands[0] = [card];
    //     updatedHands[1] = [...hand.slice(0, idx), ...hand.slice(idx + 1)];
    //     break;
    //   }
    // }
    // return updatedHands;
    return [[hand[0]], hand.slice(1)];
  }

  private canPlaySingle(
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
