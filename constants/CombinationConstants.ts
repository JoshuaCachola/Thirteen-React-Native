export const combinationConstants: { [key: string]: Combination } = {
  SINGLE: 'SINGLE',
  DOUBLE: 'DOUBLE',
  TRIPLE: 'TRIPLE',
  STRAIGHT: 'STRAIGHT',
  BOMB: 'BOMB',
  DOUBLE_BOMB: 'DOUBLE BOMB',
  TRIPLE_BOMB: 'TRIPLE BOMB',
};

export type Combination =
  | 'SINGLE'
  | 'DOUBLE'
  | 'TRIPLE'
  | 'STRAIGHT'
  | 'BOMB'
  | 'DOUBLE BOMB'
  | 'TRIPLE BOMB'
  | null;
