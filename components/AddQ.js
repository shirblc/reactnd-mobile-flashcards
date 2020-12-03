import React from 'react';
import { KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class AddQ extends React.Component {
	// render method
	render() {
		return (
			<KeyboardAvoidingView styles={styles.container}>
				<Text styles={styles.fieldTitle}>Enter the question:</Text>
				<TextInput styles={styles.textField}></TextInput>
				<Text styles={styles.fieldTitle}>Enter the answer:</Text>
				<TextInput styles={styles.textField}></TextInput>
				<TouchableOpacity styles={styles.submit}>Add Question</TouchableOpacity>
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