import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class Quiz extends React.Component {
	state = {
		correctAnswers: 0,
		currentQuestion: 0,
		currentlyShowing: 'question',
		otherOption: 'answer'
	}

	// Change the text currently showing; if the user's viewing the question, show the answer, and vice versa
	changeView() {
		this.setState(currentState => ({
			currentlyShowing: currentState['currentlyShowing'] === 'question' ? 'answer' : 'question',
			otherOption: currentState['otherOption'] === 'answer' ? 'question' : 'answer'
		}))
	}

	// render method
	render() {
		return (
			<View>
				<Text>{ this.state.currentQuestion + 1 } / { this.props.questions.length }</Text>
				<Text>{ this.props.questions[this.state.currentQuestion][this.state.currentlyShowing] }</Text>
				<TouchableOpacity onPress={() => (this.changeView())}><Text>Click to view the { this.state.otherOption }</Text></TouchableOpacity>
				
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