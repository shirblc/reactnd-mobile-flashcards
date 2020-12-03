import React from 'react';
import { KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class AddDeck extends React.Component {
	// render method
	render() {
		return (
			<KeyboardAvoidingView style={styles.container}>
				<Text style={styles.fieldTitle}>Deck Name:</Text>
				<TextInput style={styles.textField}></TextInput>
				<TouchableOpacity style={styles.submit}><Text>Add Deck</Text></TouchableOpacity>
			</KeyboardAvoidingView>
		)
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

export default connect()(AddDeck);