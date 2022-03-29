export const combinationConstants: { [key: string]: Combination } = {
  SINGLE: 'SINGLE',
  DOUBLE: 'DOUBLE',
  TRIPLE: 'TRIPLE',
  STRAIGHT: 'STRAIGHT',
  BOMB: 'BOMB',
  DOUBLE_BOMB: 'DOUBLE_BOMB',
  TRIPLE_BOMB: 'TRIPLE_BOMB',
};

export type Combination =
  | 'SINGLE'
  | 'DOUBLE'
  | 'TRIPLE'
  | 'STRAIGHT'
  | 'BOMB'
  | 'DOUBLE_BOMB'
  | 'TRIPLE_BOMB'
  | null;
