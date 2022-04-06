# Thirteen

## A card game originating from Southeast Asia made for mobile devices

## Technologies used

- React Native
- Mobx

## Code Highlight

_This snippet showcases the initial iteration of the Computer class._
_It inherits from the Player class and is able to create a playable_
_action by the combination type. I included the getMultiples_
_method because it showcased how I was able to reuse code for both_
_DOUBLES and TRIPLES._

```
export class Computer extends Player {
  constructor(name: string) {
    super(name, true);
  }

  // Computer creates an action dependent on the combination type
  public getAction(
    combinationType: Combination,
    highestCard: CardType | null,
    hand: CardType[],
    length: number,
    turn: number
  ): ActionPayload {
    // play lowest three on first turn
    if (turn === 1) {
      const [played, newHand] = this.playLowestThree(hand);
      const [_, type] = isValidCombination(
        played,
        combinationType,
        highestCard,
        length
      );
      return { action: ActionType.PLAY, type, played, newHand };
    }
    switch (combinationType) {
      // atm computer will always play single when they can play anything
      case null:
      case combinationConstants.SINGLE:
        return this.canPlaySingle(hand, highestCard, combinationType);
      case combinationConstants.DOUBLE:
      case combinationConstants.TRIPLE:
        return this.canPlayMultiple(hand, highestCard!, combinationType);
      case combinationConstants.STRAIGHT:
        return this.canPlayStraight(
          hand,
          highestCard!,
          combinationType,
          length
        );
      default:
        return {
          action: ActionType.PASS,
          type: combinationType,
          played: [],
          newHand: hand,
        };
    }

  // Reusable code for DOUBLE and TRIPLE combinations
  private canPlayMultiple(
    hand: CardType[],
    highestCard: CardType,
    combinationType: Combination
  ) {
    let payload: ActionPayload = {
      action: ActionType.PASS,
      type: combinationType,
      played: [],
      newHand: hand,
    };
    const doubles = getMultiples(hand, combinationType!);
    for (const [value, indicies] of Object.entries(doubles)) {
      const parsedValue = cardValues.indexOf(value);
      if (parsedValue === highestCard.value) {
        for (let i = 0; i < indicies.length; i++) {
          const high = indicies[i][indicies[i].length - 1];
          if (hand[high].suit > highestCard.suit) {
            return this.playCards(hand, indicies[i], payload);
          }
        }
      } else if (parsedValue > highestCard.value) {
        return this.playCards(hand, indicies[0], payload);
      }
    }
    return payload;
  }
}
```

## Still in progress

- Optimize and refactor
- Create backend with multiplayer through websockets
- Animated splash screen
- Maybe an mmr system
