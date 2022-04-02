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
      bottom: i <= mid ? 4 * i : 4 * (handLength - i),
      left: i * 40,
      zIndex: i,
    });
  }
  return positions;
}

export const getRandLeft = () => {
  return Math.random() * (200 - 25) + 25;
};

export const getRandTop = () => {
  return Math.random() * (40 - 20) + 20;
};

export const getRandRotation = () => {
  const random = Math.floor(Math.random() * 75);
  if (random % 2 === 0) {
    return random + 'deg';
  }
  return random * -1 + 'deg';
};
