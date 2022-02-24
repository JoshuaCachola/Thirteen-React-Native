type combination = 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'STRAIGHT' | null;

export interface GameInterface {
  combination: {
    type: combination;
    length?: number;
  };
}

// Game object
// holds the state of the game
export class GameState implements GameInterface {
  combination: {
    type: combination;
    length: number;
  };
  players: string[];
  roomId: string;
  isGameWon: boolean;

  constructor(roomId: string) {
    this.combination = {
      type: null,
      length: 0,
    };
    this.players = [];
    this.roomId = roomId;
    this.isGameWon = false;
  }

  // change to player object
  addPlayer(player: string) {
    this.players.push(player);
  }
}
