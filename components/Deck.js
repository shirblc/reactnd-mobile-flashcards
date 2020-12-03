import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Deck of cards
class Deck extends React.Component {
	render() {
		return (
			<View style={styles.deck}>
				<Text style={styles.title}>{ this.props.deckName }</Text>
				<Text style={styles.number}>{ this.props.cardsNumber } cards</Text>
			</View>
		)
	}
}

// Styles
const styles = StyleSheet.create({
	deck: {
		borderColor: '#000',
		borderStyle: 'solid',
		borderRadius: 5,
		borderWidth: 3,
		padding: 10,
		margin: 5
	},
	title: {
		alignSelf: 'center',
		fontSize: 22,
		padding: 5
	},
	number: {
		alignSelf: 'center',
		fontSize: 18,
		padding: 5
	}
});

export default Deck;