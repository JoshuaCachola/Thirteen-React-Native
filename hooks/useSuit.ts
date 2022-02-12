// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHeart,
  faCube,
  faSpa,
  faDiamond,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from "react";

export type CardSuits = "heart" | "diamond" | "spade" | "club";

export default function useSuit(suit: CardSuits) {
  const [cardSuit, setSuit] = useState<IconDefinition>(faSpa);

  useEffect(() => {
    switch (suit) {
      case "spade":
        setSuit(faSpa);
      case "club":
        setSuit(faCube);
      case "heart":
        setSuit(faHeart);
      case "diamond":
        setSuit(faDiamond);
    }
  });

  return cardSuit;
}
