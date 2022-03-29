import { Game } from './Game';
import { CardType } from './Card';
import { Deck } from './Deck';
import { PlayerInterface } from './Player';
import { action, computed, makeObservable, observable } from 'mobx';
import { Computer } from './Computer';
import { Combination } from '../constants/CombinationConstants';
import { PlayerActions, PlayerActionsInterface } from './PlayerActions';
import { ActionType } from '../constants/Actions';
import { sortCards } from '../helper/combinationHelpers';

export interface GameStateInterface {
  playerRotation: PlayerInterface[];
  combinationType: Combination;
  highestCard: CardType | null;
  length: number;
  currentPlayer: PlayerInterface | null;
  _playerActions: PlayerActionsInterface;
  initGame: () => void;
  updateRotation: (t: ActionType) => void;
}

// GameState class
// will track updates to the state of the game
export class GameState extends Game implements GameStateInterface {
  _playerRotation: PlayerInterface[];
  _combinationType: Combination;
  _highestCard: CardType | null;
  _length: number;
  _currentPlayer: PlayerInterface | null;
  _playerActions: PlayerActionsInterface;

  constructor(room: string) {
    super(room);
    this._playerRotation = [];
    this._combinationType = null;
    this._highestCard = null;
    this._length = 0;
    this._currentPlayer = null;
    this._playerActions = new PlayerActions();

    makeObservable(this, {
      _playerRotation: observable,
      _combinationType: observable,
      _highestCard: observable,
      _length: observable,
      _currentPlayer: observable,
      playerRotation: computed,
      combinationType: computed,
      highestCard: computed,
      length: computed,
      currentPlayer: computed,
      updateRotation: action,
    });
  }

  public get playerRotation() {
    return this._playerRotation;
  }

  public set playerRotation(playerRotation: PlayerInterface[]) {
    this._playerRotation = playerRotation;
  }

  public get combinationType() {
    return this._combinationType;
  }

  public set combinationType(combinationType: Combination) {
    this._combinationType = combinationType;
  }

  public get highestCard() {
    return this._highestCard;
  }

  public set highestCard(highestCard: CardType | null) {
    this._highestCard = highestCard;
  }

  public get length() {
    return this._length;
  }

  public set length(length: number) {
    this._length = length;
  }

  public get currentPlayer() {
    return this._currentPlayer;
  }

  public set currentPlayer(currentPlayer: PlayerInterface | null) {
    this._currentPlayer = currentPlayer;
  }

  // action: pass - shifts the player out of rotation, if
  //                only 1 player left resets state
  // action: play - shifts player out and pushes them back in
  public updateRotation = (type: ActionType) => {
    const shifted = this._playerRotation.shift();

    if (type === ActionType.PLAY) {
      this._playerRotation.push(shifted!);
    }

    if (type === ActionType.PASS && this._playerRotation.length === 1) {
      const newRotation = this.createPlayerRotation(
        this._players.indexOf(this._playerRotation[0])
      );
      this._playerRotation = newRotation;
      this._combinationType = null;
      this._currentPlayer = this._playerRotation[0];
      this._highestCard = null;
    } else {
      this._currentPlayer = this._playerRotation[0];
    }
  };

  // creates the rotation of players
  private createPlayerRotation = (startingPlayerIdx: number) => {
    const rotation: PlayerInterface[] = [this._players[startingPlayerIdx]];
    for (
      let i = startingPlayerIdx + 1;
      i % this._players.length !== startingPlayerIdx;
      i++
    ) {
      rotation.push(this._players[i % this._players.length]);
    }
    return rotation;
  };

  // Starting player is the player with the lowest card
  // This is when there is no previous winner and is the first game player
  // finds the player with the lowest card
  // if there are four players return when the three of spades - suit: 0 - is found
  private findStartingPlayer = () => {
    let lowestCard = {
      value: Number.MAX_VALUE,
      suit: Number.MAX_VALUE,
      playerIdx: 0,
    };
    for (let p = 0; p < this._players.length; p++) {
      const hand = this._players[p].hand;
      for (let c = 0; c < hand.length; c++) {
        const card = hand[c];
        if (card.value === 3 && card.suit === 0) {
          console.log('found lowest 3', p);
          return p;
        }

        if (
          card.value < lowestCard.value ||
          (card.value === lowestCard.value && card.suit < lowestCard.suit)
        ) {
          lowestCard = { value: card.value, suit: card.suit, playerIdx: p };
        }
      }
    }

    return lowestCard.playerIdx;
  };

  public initGame = () => {
    for (let i = this._players.length; i < 4; i++) {
      this._players.push(new Computer(`Computer ${i}`));
    }
    this.deal();
    const startingPlayerIdx =
      this._lastWinner !== null ? this._lastWinner : this.findStartingPlayer();
    console.log(startingPlayerIdx);
    this._playerRotation = this.createPlayerRotation(startingPlayerIdx);
    this._currentPlayer = this._playerRotation[0];
  };

  // deals hands from a newly created and shuffled deck
  private deal() {
    const hands: CardType[][] = [[], [], [], []];
    const { deck } = new Deck();

    deck.forEach((card: CardType, idx) => {
      hands[idx % 4].push(card);
    });

    this._players.forEach((player, idx) => {
      if (!(player instanceof Computer)) {
        player.hand = hands[idx];
      } else {
        player.hand = sortCards(hands[idx]);
      }
    });
  }
}

// Starting player is the player with the lowest card
// This is when there is no previous winner and is the first game player
// finds the player with the lowest card
// if there are four players return when the three of spades - suit: 0 - is found
// private findStartingPlayer = (hands: CardType[][]) => {
//   let lowestCard = { value: Number.MAX_VALUE, suit: Number.MAX_VALUE, hand: 0 };
//   for (let h = 0; h < hands.length; h++) {
//     const hand = hands[h];
//     for (let c = 0; c < hand.length; c++) {
//       const card = hand[c];
//       if (card.value === 3 && card.suit === 0) {
//         return h;
//       }

//       if (
//         card.value < lowestCard.value ||
//         (card.value === lowestCard.value && card.suit < lowestCard.suit)
//       ) {
//         lowestCard = { value: card.value, suit: card.suit, hand: h };
//       }
//     }
//   }

//   return lowestCard.hand;
// };

// export const canPlayCombination = (
//   selected: CardType[]
// ): [boolean, Combination] => {
//   const [isValid, combination] = isValidCombination(selected);
//   return [isValid, combination];
// };

// starts the game and sets
// export const initGame = (
//   players: PlayerInterface[],
//   hands: CardType[][],
//   lastWinner: number | null
// ) => {
//   lastWinner = lastWinner !== null ? lastWinner : findLowestThree(hands)!;
//   const playerRotation = createPlayerRotation(lastWinner, players);

//   return {
//     playerRotation,
//     currentPlayer: players[lastWinner],
//   };
// };
