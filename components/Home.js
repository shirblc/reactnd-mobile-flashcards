import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons'; 
import { getInitialData } from '../actions/shared';
import Deck from './Deck';

class Home extends React.Component {
	// called automatically upon rendering the component
	componentDidMount() {
		this.props.dispatch(getInitialData());
	}
	
	// render
	render() {
		return (
			<View style={styles.container}>
				<Pressable style={styles.deck} onPress={() => (this.props.navigation.navigate('Add Deck'))}>
					<AntDesign name="plus" size={24} color="black" />
				</Pressable>
				{
					Object.values(this.props.decks).length
					? Object.entries(this.props.decks).map(entry =>  <Deck key={entry[0]} deckName={entry[1].name} cardsNumber={entry[1].questions.length} />)
					: <Text>No decks yet. Add your first one now!</Text>
				}
			</View>
		)
	}
}

// Map State to Props
// Gets a list of all available decks
function mapStateToProps({ decks }) {
	return {
		decks
	}
}

// Styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	deck: {
		borderColor: '#000',
		borderStyle: 'solid',
		borderRadius: 5,
		borderWidth: 3,
		padding: 10,
		margin: 10
	},
});

export default connect(mapStateToProps)(Home)