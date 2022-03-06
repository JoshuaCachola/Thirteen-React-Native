import { createObj } from '../helper/combinationHelpers';
import { CardInterface } from './Card';
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
