import React from 'react';
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { editDeckAsync } from '../actions/decks';

class EditDeck extends React.Component {
	state = {
		newName: this.props.deck.name
	}

	// update the new name as saved in the state.
	updateNameValue(name) {
		this.setState({
			newName: name
		});
	}

	// Make the request to update the name in the redux store and in async storage
	updateDeckName() {
		this.props.dispatch(editDeckAsync(this.props.route.params.deckID, this.state.newName));
		this.props.navigation.dispatch(CommonActions.goBack());
	}
	
	// render method
	render() {
		return (
			<KeyboardAvoidingView style={styles.container}>
				<Text style={styles.fieldTitle}>Deck Name:</Text>
				<TextInput style={styles.textField} defaultValue={this.props.deck.name} onChangeText={(name) => (this.updateNameValue(name))}></TextInput>
				<TouchableOpacity style={styles.submit} onPress={() => (this.updateDeckName())}><Text>Save New Name</Text></TouchableOpacity>
				<TouchableOpacity style={styles.submit}><Text>Delete Deck</Text></TouchableOpacity>
				<TouchableOpacity style={styles.submit}><Text>Clear Deck</Text></TouchableOpacity>
			</KeyboardAvoidingView>
		)
	}
}

// Map State to Props
// Gets the details of this specific deck
function mapStateToProps({ decks }, { route }) {
	const deckID = route.params.deckID;
	
	return {
		deck: decks[deckID]
	}
}

// styles
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

export default connect(mapStateToProps)(EditDeck);