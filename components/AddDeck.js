import React from 'react';
import { KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createDeckAsync } from '../actions/decks';

class AddDeck extends React.Component {
	state = {
		deckName: ''
	}

	// Update the name of the new deck
	updateName(newName) {
		this.setState({
			deckName: newName
		});
	}

	// Create a new deck with the given deck name
	addDeck() {
		new Promise((res, rej) => {
			this.props.dispatch(createDeckAsync(this.state.deckName))
			// after enough time passed, redirect the user to the newly created deck
			setTimeout(() => {
				this.props.navigation.navigate('Deck View', {
				   deckID: this.props.lastDeck
			   });
				 res()
			}, 500)
		})
	}

	// Disables/Enables the 'add deck' button depending on whether the text field is empty
	checkEmptyField  = () => {
		return this.state.deckName.length === 0;
	}

	// render method
	render() {
		return (
			<KeyboardAvoidingView style={styles.container}>
				<Text style={styles.fieldTitle}>Deck Name:</Text>
				<TextInput style={styles.textField} onChangeText={(text) => (this.updateName(text))} placeholder='Deck title'></TextInput>
				<TouchableOpacity style={styles.submit} onPress={() => (this.addDeck())} disabled={this.checkEmptyField()}><Text>Add Deck</Text></TouchableOpacity>
			</KeyboardAvoidingView>
		)
	}
}

// Map State to Props
// Gets the new deck
function mapStateToProps({ decks }) {
	return {
		lastDeck: Object.keys(decks)[Object.keys(decks).length - 1]
	}
}

// Styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		alignItems: 'center'
	},
	fieldTitle: {
		fontSize: 20,
		padding: 10
	},
	textField: {
		height: 30,
		width: 200,
		borderWidth: 1,
		borderColor: 'black',
		padding: 5,
		margin: 10
	},
	submit: {
		padding: 5,
		margin: 10,
		borderWidth: 1,
		borderColor: 'black'
	}
});

export default connect(mapStateToProps)(AddDeck);