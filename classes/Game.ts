import { makeObservable, computed, action } from 'mobx';
import { PlayerInterface } from './Player';

export interface GameInterface {
  addPlayer: (p: PlayerInterface) => void;
  players: PlayerInterface[];
  arePlayersReady: () => boolean;
  lastWinner: number | null;
}

export class Game implements GameInterface {
  readonly roomId: string;
  private _isGameWon: boolean;
  private _gameNumber: number;
  protected _players: PlayerInterface[];
  protected _lastWinner: number | null;

  constructor(roomId: string) {
    this.roomId = roomId;
    this._isGameWon = false;
    this._gameNumber = 1;
    this._players = [];
    this._lastWinner = null;

    makeObservable(this, {
      players: computed,
      addPlayer: action,
      arePlayersReady: action,
    });
  }

  public get lastWinner() {
    return this._lastWinner;
  }

  public set lastWinner(idx: number | null) {
    this._lastWinner = idx;
  }

  public get players() {
    return this._players;
  }

  public set players(players: PlayerInterface[]) {
    this._players = players;
  }

  public addPlayer(player: PlayerInterface) {
    this._players.push(player);
  }

  public arePlayersReady() {
    let ready = true;
    this._players.forEach((player) => {
      ready = ready && player.ready;
    });
    console.log(ready);
    return ready;
  }
}
