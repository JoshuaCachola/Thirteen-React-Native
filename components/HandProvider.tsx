import { useState } from 'react';
import { CardType } from '../classes/Card';
import { HandContext } from '../context/HandContext';

export default function HandProvider(props: any) {
  const [hand, setHand] = useState<CardType[]>([]);

  return (
    <HandContext.Provider value={{ hand, setHand }}>
      {props.children}
    </HandContext.Provider>
  );
}
