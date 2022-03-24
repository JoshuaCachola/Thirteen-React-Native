import { useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CardType } from '../classes/Card';
import InteractiveView from './InteractiveView';
import { HandContext } from '../context/HandContext';
import { calculatePositions, Position } from '../helper/calculatePositions';
import { PlayFromHandContext } from '../context/PlayFromHandContext';
import { sortCards } from '../helper/combinationHelpers';
import Button from './Button';
import { GameStateInterface } from '../classes/GameState';
import { PlayerInterface } from '../classes/Player';

interface HandProps {
  game: GameStateInterface;
  player: PlayerInterface;
}

// This component displays holding a hand of cards
export default function Hand({ game, player }: HandProps) {
  const [isValid, setIsValid] = useState(false);
  const [ableToPlay, setIsAbleToPlay] = useState(
    game.getCurrentPlayer()?.getName() === player.getName()
  );
  const { hand, setHand } = useContext(HandContext);
  const [positions, setPositions] = useState<Position[]>(() => {
    return calculatePositions(hand!.length);
  });
  const { playedCards, setPlayedCards } = useContext(PlayFromHandContext);

  useEffect(() => {
    if (game.getCurrentPlayer()?.getName() === player.getName()) {
      setIsAbleToPlay(true);
    }
    console.log(ableToPlay, game.getCurrentPlayer());
  }, [game]);

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
    const acceptedSequence: CardType[] = [];
    const newHand: CardType[] = [];
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
    setIsAbleToPlay(false);
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
        {hand!.map((card: CardType, idx: number) => {
          return (
            <InteractiveView
              key={`hand-${card.value}-${card.suit}`}
              idx={idx}
              card={card}
              cardPosition={positions[idx]}
              handlePlayCards={handlePlayCards}
              isValid={isValid}
              ableToPlay={ableToPlay}
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
