import { describe, test } from '@jest/globals';
import { Card } from '../../Card';
import { Computer } from '../../Computer';
import { GameState } from '../../GameState';

const game = new GameState('test');
const computer = new Computer('Computer 1');
game.addPlayer(computer);

describe('Computer Actions', () => {
  describe('Computer playing cards', () => {
    test('play a single card leaves hand with no cards left', () => {});
  });
});
