import { CardType } from '../classes/Card';
import { PlayerInterface } from '../classes/Player';
import { Combination } from './CombinationConstants';

export enum ActionType {
  PLAY,
  PASS,
}

export type ActionPayload = {
  action: ActionType;
  type: Combination;
  played: CardType[];
  newHand: CardType[];
};

export type Action = {
  player: PlayerInterface | null;
  action: ActionType;
  type?: Combination;
  length?: number;
  high?: CardType;
};
