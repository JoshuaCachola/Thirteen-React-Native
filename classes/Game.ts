import { PlayerInterface } from './Player';

export class Game {
  roomId: string;
  isGameWon: boolean;
  gameNumber: number;
  players: PlayerInterface[];
  lastWinner: PlayerInterface | null;

  constructor(roomId: string) {
    this.roomId = roomId;
    this.isGameWon = false;
    this.gameNumber = 1;
    this.players = [];
    this.lastWinner = null;
  }

  public addPlayer(player: PlayerInterface) {
    this.players.push(player);
  }
}
