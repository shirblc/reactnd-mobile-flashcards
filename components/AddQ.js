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
	
	/*
  	Function Name: updateCard()
  	Function Description: Update the question or answer currently inputted by the user.
  	Parameters: newText (string) - the updated text
							updateField (string) - the name of the field to update
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	updateCard(newText, updateField) {
		this.setState({
			[updateField]: newText
		});
	}

	/*
  	Function Name: addQuestion()
  	Function Description: Add the question to the store and to AsyncStorage.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	addQuestion() {
		this.props.dispatch(createQuestionAsync(this.state.question, this.state.answer, this.props.route.params.deckID));
		this.props.navigation.dispatch(CommonActions.goBack());
	}

	// Disables/Enables the 'add question' button depending on whether the text fields are empty
	checkEmptyField  = () => {
		return this.state.question.length === 0 || this.state.answer.length === 0;
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
			<KeyboardAvoidingView style={styles.container}>
				<Text style={styles.fieldTitle}>Enter the question:</Text>
				<TextInput style={styles.textField} onChangeText={(text) => (this.updateCard(text, 'question'))} placeholder='Question'></TextInput>
				<Text style={styles.fieldTitle}>Enter the answer:</Text>
				<TextInput style={styles.textField} onChangeText={(text) => (this.updateCard(text, 'answer'))} placeholder='Correct Answer'></TextInput>
				<TouchableOpacity style={styles.submit} onPress={() => (this.addQuestion())} disabled={this.checkEmptyField()}><Text>Add Question</Text></TouchableOpacity>
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