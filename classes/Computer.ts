import { Player } from './Player';

export class Computer extends Player {
  constructor(name: string) {
    super(name);
  }

  play(type?: string) {
    if (!type) {
      this.playLowest();
    }
  }

  playLowest() {}
}
