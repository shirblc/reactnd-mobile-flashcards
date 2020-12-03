import React from 'react';
import { KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { createQuestionAsync } from '../actions/questions.js';

class AddQ extends React.Component {
	state = {
		question: '',
		answer: ''
	}
	
	// Update the question or answer currently inputted by the user
	updateCard(newText, updateField) {
		this.setState({
			[updateField]: newText
		});
	}

	// Add the question to the store and to AsyncStorage
	addQuestion() {
		this.props.dispatch(createQuestionAsync(this.state.question, this.state.answer, this.props.route.params.deckID));
		this.props.navigation.dispatch(CommonActions.goBack());
	}

	// render method
	render() {
		return (
			<KeyboardAvoidingView style={styles.container}>
				<Text style={styles.fieldTitle}>Enter the question:</Text>
				<TextInput style={styles.textField} onChangeText={(text) => (this.updateCard(text, 'question'))} placeholder='Question'></TextInput>
				<Text style={styles.fieldTitle}>Enter the answer:</Text>
				<TextInput style={styles.textField} onChangeText={(text) => (this.updateCard(text, 'answer'))} placeholder='Correct Answer'></TextInput>
				<TouchableOpacity style={styles.submit} onPress={() => (this.addQuestion())}><Text>Add Question</Text></TouchableOpacity>
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

export default connect()(AddQ);