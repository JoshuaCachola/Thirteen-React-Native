import { useContext, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CardInterface } from '../classes/Card';
import InteractiveView from './InteractiveView';
import { HandContext } from '../context/HandContext';
import { calculatePositions, Position } from '../helper/calculatePositions';
import { PlayFromHandContext } from '../context/PlayFromHandContext';
import { sortCards } from '../helper/combinationHelpers';
import Button from './Button';
import { GameStateInterface } from '../classes/GameState';

interface HandProps {
  game: GameStateInterface;
  setGame: (g: GameStateInterface) => void;
}

// This component displays holding a hand of cards
export default function Hand({ game, setGame }: HandProps) {
  const [isValid, setIsValid] = useState(false);
  const { hand, setHand } = useContext(HandContext);
  const { playedCards, setPlayedCards } = useContext(PlayFromHandContext);
  const [positions, setPositions] = useState<Position[]>(() => {
    return calculatePositions(hand!.length);
  });

  // recalculates position of cards whenever a player plays a sequence
  // allows hand to be centered
  useMemo(() => {
    const newPositions = calculatePositions(hand!.length);
    setPositions(newPositions);
  }, [hand!.length]);

  useMemo(() => {
    const selected = hand!.filter((card) => card.selected);
    const [isCombinationValid] = game.canPlayCombination(selected);

    setIsValid(isCombinationValid);
  }, [hand]);

  // handles playing cards when cards are selected
  // and play button is pressed
  const handlePlayCards = () => {
    const acceptedSequence: CardInterface[] = [];
    const newHand: CardInterface[] = [];
    hand!.forEach((card) => {
      if (card.selected) {
        acceptedSequence.push(card);
      } else {
        newHand.push(card);
      }
      card.selected = false;
    });
    setPlayedCards([...playedCards, acceptedSequence]);
    setHand(newHand);
    game.playCards(acceptedSequence);
  };

  const handleSortCards = () => {
    const sorted = sortCards(hand!);
    setHand([...sorted]);
  };

  return (
    <View style={styles.container}>
      {/* Hand */}
      <View
        style={[
          styles.hand,
          {
            transform: [{ translateX: -20 * hand!.length }, { translateY: 0 }],
          },
        ]}
      >
        {hand!.map((card: CardInterface, idx: number) => {
          if (!card.played)
            return (
              <InteractiveView
                key={`hand-${card.value}-${card.suit}`}
                idx={idx}
                card={card}
                cardPosition={positions[idx]}
                handlePlayCards={handlePlayCards}
                isValid={isValid}
              />
              // <View style={[styles.card, positions[idx]]}>
              //   <PlayingCard
              //     idx={idx}
              //     value={card.value}
              //     suit={card.suit}
              //     selected={card.selected}
              //   />
              // </View>
            );
        })}
      </View>
      <Button title='Play' onPress={handlePlayCards} />
      <Button title='Sort Cards' onPress={handleSortCards} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hand: {
    marginVertical: 0,
    marginHorizontal: 'auto',
  },
  // card: {
  //   position: 'absolute',
  //   right: 0,
  //   transform: [
  //     {
  //       translateX: 50,
  //     },
  //   ],
  // },
});
