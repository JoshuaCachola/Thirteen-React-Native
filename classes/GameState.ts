import { CardInterface } from './Card';
import { PlayerInterface } from './Player';
import { Deck } from './Deck';
import { Game } from './Game';
import {
  getHighestCard,
  isValidCombination,
} from '../helper/combinationHelpers';
import { Action, Actions, ActionsInterface } from './Actions';

export type Combination =
  | 'SINGLE'
  | 'DOUBLE'
  | 'TRIPLE'
  | 'STRAIGHT'
  | 'BOMB'
  | 'DOUBLE_BOMB'
  | 'TRIPLE_BOMB'
  | null;

export interface GameStateInterface {
  getCombinationType: () => Combination;
  getHighestCard: () => CardInterface | null;
  deal: () => void;
  addPlayer: (p: PlayerInterface) => void;
  canPlayCombination: (c: CardInterface[]) => [boolean, Combination];
  playCards: (s: CardInterface[]) => void;
  setLength: (l: number) => void;
  getLength: () => number;
}

// Game object
// holds the state of the game
export class GameState extends Game implements GameStateInterface {
  players: PlayerInterface[];
  playerRotation: PlayerInterface[];
  currentPlayer: PlayerInterface | null;
  hands: CardInterface[][];
  combinationType: Combination;
  highestCard: CardInterface | null;
  actions: ActionsInterface;
  length: number;

  constructor(roomId: string) {
    super(roomId);
    this.players = [];
    this.currentPlayer = null;
    this.playerRotation = [];
    this.hands = [];
    this.combinationType = null;
    this.highestCard = null;
    this.actions = new Actions();
    this.length = 0;
  }

  public setLength(l: number) {
    this.length = l;
  }

  public getLength() {
    return this.length;
  }

  public playCards(s: CardInterface[]) {
    const [_, type] = this.canPlayCombination(s);
    if (type !== this.combinationType) {
      this.combinationType = type;
    }

    this.length = s.length;

    this.highestCard = getHighestCard(s);
    const action: Action = {
      player: this.currentPlayer,
      action: 'PLAY',
      type: this.combinationType,
      length: this.length,
      high: this.highestCard,
    };

    this.actions.pushAction(action);
  }

  public getCombinationType() {
    return this.combinationType;
  }

  public getHighestCard() {
    return this.highestCard;
  }

  // public setCombinationType(t: Combination) {
  //   this.combinationType = t;
  // }

  // creates the rotation of players
  private createPlayerRotation(startingPlayerIdx: number) {
    const rotation: PlayerInterface[] = [this.players[startingPlayerIdx]];
    for (
      let i = startingPlayerIdx + 1;
      i % this.players.length !== startingPlayerIdx;
      i++
    ) {
      rotation.unshift(this.players[i]);
    }
    return rotation;
  }

  // deals hands from a newly created and shuffled deck
  deal() {
    const hands: CardInterface[][] = [[], [], [], []];
    const { deck } = new Deck();
    deck.forEach((card: CardInterface, idx) => {
      hands[idx % 4].push(card);
    });

    hands.forEach((hand, idx) => this.players[idx].setHand(hand));
  }

  private findLowestThree() {
    this.hands.forEach((hand, idx) => {
      hand.forEach((cards) => {
        if (cards.value === 3 && cards.suit === 0) {
          return idx;
        }
      });
    });
  }

  public canPlayCombination(selected: CardInterface[]): [boolean, Combination] {
    const [isValid, combination] = isValidCombination(selected, this);
    console.log(this.combinationType);
    return [isValid, combination];
  }

  private getPlayers() {
    return this.players;
  }

  // starts the game and sets
  public start() {
    // if (!this.ableToStartGame) {
    //   return false;
    // }

    // deals cards and find either the player with the 3 of clubs
    // or the last winner and creates a player rotation
    this.deal();
    let playerIdx: number;
    if (!this.lastWinner) {
      playerIdx = this.findLowestThree()!;
    } else {
      playerIdx = this.lastWinner;
    }
    this.playerRotation = this.createPlayerRotation(playerIdx);

    // game loop
    while (!this.isGameWon) {
      const currentPlayer = this.playerRotation.pop();

      // if playerRotation length === 0
      //    - set combinationType to null, player can play any sequence
      //    - recreate playerRotation with all players
      if (this.playerRotation.length === 0) {
        this.combinationType = null;
        this.createPlayerRotation(this.players.indexOf(currentPlayer!));
      }

      if (currentPlayer?.getName().includes('Computer')) {
      }
    }
  }
}
