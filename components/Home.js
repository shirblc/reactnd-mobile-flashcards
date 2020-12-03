import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
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
				{
					Object.values(this.props.decks).length
					? Object.values(this.props.decks).map(deck =>  <Deck deckName={deck.name} cardsNumber={deck.questions.length} />)
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
});

export default connect(mapStateToProps)(Home)