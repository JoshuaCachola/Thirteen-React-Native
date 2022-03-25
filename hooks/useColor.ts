import { useEffect, useState } from 'react';
import { CardSuits } from '../classes/Card';

export default function useColor(suit: CardSuits) {
  const [suitColor, setSuitColor] = useState('red');

  // set color of suit on first render
  // 0-1 === "black", 2-3 == "red". Refer to CardSuits enum
  useEffect(() => {
    if (suit === 0 || suit === 1) {
      setSuitColor('black');
    }
  }, []);

  return suitColor;
}
