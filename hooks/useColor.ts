import { useEffect, useState } from "react";
import { CardSuits } from "./useSuit";

export default function useColor(suit: CardSuits) {
  const [suitColor, setSuitColor] = useState("red");

  useEffect(() => {
    if (suit === 2 || suit === 3) {
      setSuitColor("black");
    }
  }, []);

  return suitColor;
}
