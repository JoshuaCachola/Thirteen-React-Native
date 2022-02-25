import { CardInterface } from './Card';
import { Deck } from './Deck';

type combination = 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'STRAIGHT' | null;

// Game object
// holds the state of the game
export class GameState {
  combination: {
    type: combination;
    length: number;
  };
  players: string[];
  playerRotation: string[];
  roomId: string;
  isGameWon: boolean;
  ableToStartGame: boolean;
  currentPlayer: string | null;
  hands: CardInterface[][];

  constructor(roomId: string) {
    this.combination = {
      type: null,
      length: 0,
    };
    this.players = ['player 1', 'player 2', 'player 3', 'player 4'];
    this.roomId = roomId;
    this.isGameWon = false;
    this.ableToStartGame = false;
    this.currentPlayer = null;
    this.playerRotation = [];
    this.hands = [];
  }

  // change to player object
  addPlayer(player: string) {
    this.players.push(player);
  }

  // checks to see if there are enough players to start a game
  setAbleToStartGame() {
    if (this.players.length > 1) {
      return true;
    }
    return false;
  }

  // creates the rotation of players
  createPlayerRotation(startingPlayerIdx: number) {
    const rotation: string[] = [this.players[startingPlayerIdx]];
    for (
      let i = startingPlayerIdx + 1;
      i % this.players.length !== startingPlayerIdx;
      i++
    ) {
      rotation.push(this.players[i]);
    }
    return rotation.reverse();
  }

  // deals four hands from a newly created and shuffled deck
  deal() {
    const hands: CardInterface[][] = [[], [], [], []];
    const { deck } = new Deck();
    deck.forEach((card: CardInterface, idx) => {
      hands[idx % 4].push(card);
    });
    return hands;
  }

  // starts the game and sets
  start() {
    if (!this.ableToStartGame) {
      return false;
    }

    const startingIdx = Math.random() * this.players.length;
    this.playerRotation = this.createPlayerRotation(startingIdx);
    this.currentPlayer = this.playerRotation[this.playerRotation.length - 1];
  }
}
