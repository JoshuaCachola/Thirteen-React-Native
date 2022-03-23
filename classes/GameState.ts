import { CardInterface } from './Card';
import { Computer } from './Computer';
import { Player, PlayerInterface } from './Player';
import { Deck } from './Deck';
import { Game } from './Game';

type combination = 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'STRAIGHT' | null;

// Game object
// holds the state of the game
export class GameState extends Game {
  players: PlayerInterface[];
  playerRotation: PlayerInterface[];
  currentPlayer: PlayerInterface | null;
  hands: CardInterface[][];
  combinationType: string | null;
  highestCard: CardInterface | null;

  constructor(roomId: string) {
    super(roomId);
    this.players = [];
    this.currentPlayer = null;
    this.playerRotation = [];
    this.hands = [];
    this.combinationType = null;
    this.highestCard = null;
  }

  // change to player object
  // addPlayer(player: PlayerInterface) {
  //   this.players.push(player);
  // }

  // checks to see if there are enough players to start a game
  // setAbleToStartGame() {
  //   if (this.players.length > 1) {
  //     return true;
  //   }
  //   return false;
  // }

  // creates the rotation of players
  createPlayerRotation(startingPlayerIdx: number) {
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

  findLowestThree() {
    this.hands.forEach((hand, idx) => {
      hand.forEach((cards) => {
        if (cards.value === 3 && cards.suit === 0) {
          return idx;
        }
      });
    });
  }

  getPlayers() {
    return this.players;
  }

  // starts the game and sets
  start() {
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
