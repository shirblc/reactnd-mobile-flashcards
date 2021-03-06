import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class OpenDeck extends React.Component {
	/*
  	Function Name: componentDidMount()
  	Function Description: Adjusts the name of the navigator screen upon inserting the component into the DOM. This method is automatically triggered by React.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	componentDidMount() {
		this.props.navigation.setOptions({ title: this.props.deck.name })
	}
	
	// 
	/*
  	Function Name: checkNumQuestions()
  	Function Description: Disables the quiz button if there are no existing questions.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	checkNumQuestions  = () => {
		return this.props.deck.questions.length === 0;
	}
	
	/*
  	Function Name: render()
  	Function Description: Renders the component.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.deckName}>{ this.props.deck.name }</Text>
				<Text style={styles.deckText}>{ this.props.deck.questions.length } questions</Text>
				
				<TouchableOpacity style={styles.deckButton} onPress={() => (this.props.navigation.navigate('Add Card', {
						deckID: this.props.route.params.deckID
					}))}><Text style={styles.buttonText}>Add Card</Text></TouchableOpacity>
				<TouchableOpacity style={styles.deckButton} onPress={() => (this.props.navigation.navigate('Quiz', {
						deckID: this.props.route.params.deckID
					}))} disabled={this.checkNumQuestions()}><Text style={styles.buttonText}>Start Quiz</Text></TouchableOpacity>
			</SafeAreaView>
		)
	}
}

// Map State to Props
// Gets the questions of this specific deck
function mapStateToProps({ decks }, { route }) {
	const deckID = route.params.deckID;
	
	return {
		deck: {
			...decks[deckID]
		}
	}
}

// styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		alignItems: 'center'
	},
	deckName: {
		fontSize: 24,
		padding: 10
	},
	deckText: {
		fontSize: 20,
		padding: 10
	},
	deckButton: {
		borderColor: '#000',
		borderStyle: 'solid',
		borderRadius: 5,
		borderWidth: 3,
		padding: 10,
		margin: 10
	},
	buttonText: {
		fontSize: 16
	}
});

export default connect(mapStateToProps)(OpenDeck);