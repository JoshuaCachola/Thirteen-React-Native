import { Game } from './Game';
import { CardType } from './Card';
import { Deck } from './Deck';
import { PlayerInterface } from './Player';
import { action, computed, makeObservable, observable } from 'mobx';
import { Computer } from './Computer';
import { Combination } from '../constants/CombinationConstants';
import { PlayerActions, PlayerActionsInterface } from './PlayerActions';
import { ActionType } from '../constants/Actions';
import { getHighestCard, sortCards } from '../helper/combinationHelpers';

export interface GameStateInterface {
  playerRotation: PlayerInterface[];
  combinationType: Combination;
  highestCard: CardType | null;
  length: number;
  currentPlayer: PlayerInterface | null;
  isGameWon: boolean;
  _playerActions: PlayerActionsInterface;
  initGame: () => void;
  updateRotation: (t: ActionType) => void;
  updateHighestCard: (c: CardType[]) => void;
  updateCurrentPlayer: (p: PlayerInterface) => void;
  updateCombinationType: (t: Combination) => void;
  updatePlayerRotation: (r: PlayerInterface[]) => void;
  updateLength: (l: number) => void;
  checkForWinner: () => boolean;
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
      updateHighestCard: action,
      updateCurrentPlayer: action,
      updateCombinationType: action,
      updatePlayerRotation: action,
      updateLength: action,
      checkForWinner: action,
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
    const shifted = this.playerRotation.shift();

    if (type === ActionType.PLAY) {
      this.playerRotation.push(shifted!);
    }

    if (type === ActionType.PASS && this.playerRotation.length === 1) {
      const newRotation = this.createPlayerRotation(
        this.players.indexOf(this.playerRotation[0])
      );
      this.playerRotation = newRotation;
      this.updateCombinationType(null);
      this.updateCurrentPlayer(this.playerRotation[0]);
      this.updateHighestCard([]);
    } else {
      this.updateCurrentPlayer(this.playerRotation[0]);
    }
  };

  public updatePlayerRotation(playerRotation: PlayerInterface[]) {
    this.playerRotation = playerRotation;
  }

  public updateCombinationType(type: Combination) {
    this.combinationType = type;
  }

  public updateHighestCard(cards: CardType[]) {
    if (cards.length === 0) {
      this.highestCard = null;
    } else {
      this.highestCard = getHighestCard(cards);
    }
  }

  public updateCurrentPlayer(currentPlayer: PlayerInterface | null) {
    this.currentPlayer = currentPlayer;
  }

  public updateLength(length: number) {
    this.length = length;
  }

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
    for (let p = 0; p < this.players.length; p++) {
      const hand = this.players[p].playerHand.hand;
      for (let c = 0; c < hand.length; c++) {
        const card = hand[c];
        if (card.value === 3 && card.suit === 0) {
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

  private reset() {
    this.players.forEach((player) => {
      player.clearHand();
    });
    this.updateCombinationType(null);
    this.updateHighestCard([]);
    this.updateCurrentPlayer(null);
  }

  // starts the game
  public initGame = () => {
    if (this.players.length < 4) {
      for (let i = this.players.length; i < 4; i++) {
        this.players.push(new Computer(`Computer ${i}`));
      }
    }

    this.reset();
    this.deal();
    const startingPlayerIdx =
      this.lastWinner !== null ? this.lastWinner : this.findStartingPlayer();
    this.updatePlayerRotation(this.createPlayerRotation(startingPlayerIdx));
    this.updateCurrentPlayer(this.playerRotation[0]);
  };

  // deals hands from a newly created and shuffled deck
  private deal() {
    const deck = new Deck();
    const hands = deck.deal();
    this.players.forEach((player, idx) => {
      if (!(player instanceof Computer)) {
        player.playerHand.updateHand(hands[idx]);
      } else {
        player.playerHand.updateHand(sortCards(hands[idx]));
      }
    });
  }

  // when player plays cards, checkForWinner will check is the current players
  // hand length === 0, if so the game has a winner
  public checkForWinner() {
    if (this.currentPlayer?.playerHand.hand.length === 0) {
      this.lastWinner = this.players.indexOf(this.currentPlayer);
      return true;
    }
    return false;
  }
}
