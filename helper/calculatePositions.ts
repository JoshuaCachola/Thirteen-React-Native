export interface Position {
  transform: [{ rotate: string }, { perspective: number }];
  bottom: number;
  left: number;
  zIndex: number;
}

export function calculatePositions(handLength: number): Position[] {
  const positions: Position[] = [];
  const mid = Math.floor(handLength / 2);

  for (let i = 0; i < handLength; i++) {
    positions.push({
      transform: [
        {
          rotate: `${(i - mid) * 3}deg`,
        },
        {
          perspective: 1000,
        },
      ],
      bottom: i <= mid ? -4 * (mid - i) : handLength - i - 1,
      left: i * 40,
      zIndex: i,
    });
  }
  return positions;
}

export const getRandLeft = () => {
  return Math.random() * (80 - 20) + 20;
};

export const getRandBottom = () => {
  return Math.floor(Math.random() * 80);
};

export const getRandRotation = () => {
  return Math.floor(Math.random() * 75) + 'deg';
};
