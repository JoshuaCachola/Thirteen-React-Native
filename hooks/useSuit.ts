// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHeart,
  faCube,
  faSpa,
  faDiamond,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useEffect, useState } from 'react';
import { CardSuits } from '../helper/Card';

export default function useSuit(suit: CardSuits) {
  const [cardSuitIcon, setSuitIcon] = useState<IconDefinition>(faCube);

  // switch case for setting state of suit on first render
  useEffect(() => {
    switch (suit) {
      case 0:
        return setSuitIcon(faHeart);
      case 1:
        return setSuitIcon(faDiamond);
      case 2:
        return setSuitIcon(faSpa);
      case 3:
        return setSuitIcon(faCube);
    }
  }, []);

  return cardSuitIcon;
}
