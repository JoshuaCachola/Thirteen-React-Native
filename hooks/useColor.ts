import { useEffect, useState } from 'react';
import { CardSuits } from '../classes/Card';

export default function useColor(suit: CardSuits) {
  const [suitColor, setSuitColor] = useState('red');

  // set color of suit on first render
  // 0-1 === "red", 2-3 == "black". Refer to CardSuits enum
  useEffect(() => {
    if (suit === 2 || suit === 3) {
      setSuitColor('black');
    }
  }, []);

  return suitColor;
}
