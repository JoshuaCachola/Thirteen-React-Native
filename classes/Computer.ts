// import { combinationConstants } from '../constants/CombinationConstants';
// import { createHandMap } from '../helper/combinationHelpers';
// import { Combination } from './GameState';
import { Player } from './Player';

export class Computer extends Player {
  constructor(name: string, ready: boolean = true) {
    super(name, ready);
  }

  // play(t: Combination) {
  //   switch (t) {
  //     case null:
  //     case combinationConstants.SINGLE: {
  //       const indicies: Set<number> = this.playLowest(game);
  //       if (!indicies.has(-1)) {
  //         this.updateCards(indicies);
  //         game.playCards(this.getHand()!);
  //       } else {
  //         game.pass();
  //       }
  //     }
  //   }
  // }

  // playLowest(game: GameStateInterface) {
  //   const handMap = createHandMap(this.hand!);
  //   const currentHighCard = game.getHighestCard();
  //   const filterOut: Set<number> = new Set();
  //   for (const [value, indicies] of Object.entries(handMap)) {
  //     if (currentHighCard === null || parseInt(value) > currentHighCard.value) {
  //       filterOut.add(indicies[0]);
  //       return filterOut;
  //     }
  //     if (parseInt(value) === currentHighCard!.value) {
  //       for (let idx = 0; idx < indicies.length; idx++) {
  //         if (this.hand![idx].suit > currentHighCard!.suit) {
  //           filterOut.add(idx);
  //           return filterOut;
  //         }
  //       }
  //     }
  //   }
  //   filterOut.add(-1);
  //   return filterOut;
  // }

  // updateCards(indicies: Set<number>) {
  //   const filtered = this.hand?.filter((_, idx) => !indicies.has(idx));
  //   this.setHand(filtered!);
  // }
}
