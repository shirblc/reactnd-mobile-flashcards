import React from 'react';
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class EditDeck extends React.Component {
	render() {
		return (
			<KeyboardAvoidingView>
				<Text>Deck Name:</Text>
				<TextInput></TextInput>
				<TouchableOpacity><Text>Edit Deck Name</Text></TouchableOpacity>
				<TouchableOpacity><Text>Delete Deck</Text></TouchableOpacity>
				<TouchableOpacity><Text>Clear Deck</Text></TouchableOpacity>
			</KeyboardAvoidingView>
		)
	}
}

export default connect()(EditDeck);