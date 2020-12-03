import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class Quiz extends React.Component {
	state = {
		correctAnswers: 0,
		currentQuestion: 0
	}

	// render method
	render() {
		return (
			<View>
				<Text>{ this.state.currentQuestion + 1 } / { this.props.questions.length }</Text>
				<Text>{ this.props.questions[this.state.currentQuestion].question }</Text>
				<TouchableOpacity><Text>Click to view the answer</Text></TouchableOpacity>
				
				<TouchableOpacity><Text>Correct</Text></TouchableOpacity>
				<TouchableOpacity><Text>Incorrect</Text></TouchableOpacity>
			</View>
		)
	}
}

function mapStateToProps({ decks, questions }, { route }) {
	const deckID = route.params.deckID;
	
	return {
		questions: decks[deckID].questions.map(question => questions[question])
	}
}

export default connect(mapStateToProps)(Quiz)