import { StyleSheet, Text } from 'react-native';
import { CardType } from '../classes/Card';
import { PlayerActionsType } from '../classes/PlayerActions';
import PlayingCard from './PlayingCard';
import { View } from './Themed';

export default function Action(props: any) {
  console.log(props);
  if (props.action.action === 0) {
    return (
      <View style={styles.action}>
        {props.action.cards.map((card: CardType) => {
          return (
            <PlayingCard
              value={card.value}
              suit={card.suit}
              key={Math.random()}
            />
          );
        })}
      </View>
    );
  } else {
    return (
      <View style={styles.action}>
        <Text style={{ fontWeight: '500', fontSize: 16 }}>PASS</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  action: {},
});
