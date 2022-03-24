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
  setCombinationType: (t: Combination) => void;
  getHighestCard: () => CardInterface | null;
  deal: () => void;
  addPlayer: (p: PlayerInterface) => void;
  canPlayCombination: (c: CardInterface[]) => [boolean, Combination];
  playCards: (s: CardInterface[]) => void;
  setLength: (l: number) => void;
  getLength: () => number;
  getCurrentPlayer: () => PlayerInterface | null;
}

// Game object
// holds the state of the game
export class GameState extends Game implements GameStateInterface {
  playerRotation: PlayerInterface[];
  currentPlayer: PlayerInterface | null;
  hands: CardInterface[][];
  combinationType: Combination;
  highestCard: CardInterface | null;
  actions: ActionsInterface;
  length: number;

  constructor(roomId: string) {
    super(roomId);
    this.currentPlayer = null;
    this.playerRotation = [];
    this.hands = [];
    this.combinationType = null;
    this.highestCard = null;
    this.actions = new Actions();
    this.length = 0;
  }

  public getCurrentPlayer() {
    return this.currentPlayer;
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

  public setCombinationType(t: Combination) {
    this.combinationType = t;
  }

  public getHighestCard() {
    return this.highestCard;
  }

  // creates the rotation of players
  createPlayerRotation(startingPlayerIdx: number) {
    const rotation: PlayerInterface[] = [this.players[startingPlayerIdx]];
    for (
      let i = startingPlayerIdx + 1;
      i % this.players.length !== startingPlayerIdx;
      i++
    ) {
      rotation.push(this.players[i]);
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

    this.hands = hands;
    hands.forEach((hand, idx) => this.players[idx].setHand(hand));
  }

  findLowestThree() {
    let idx;
    for (let i = 0; i < this.hands.length; i++) {
      for (let j = 0; j < this.hands[i].length; j++) {
        const card = this.hands[i][j];
        if (card.value === 3 && card.suit === 0) {
          idx = i;
          break;
        }
      }
    }
    return idx;
  }

  public canPlayCombination(selected: CardInterface[]): [boolean, Combination] {
    const [isValid, combination] = isValidCombination(selected, this);
    return [isValid, combination];
  }

  // starts the game and sets
  public start() {
    // deals cards and find either the player with the 3 of clubs
    // or the last winner and creates a player rotation
    this.deal();
    let playerIdx: number;
    if (!this.lastWinner) {
      playerIdx = this.findLowestThree()!;
    } else {
      playerIdx = this.players.indexOf(this.lastWinner);
    }
  }
}
