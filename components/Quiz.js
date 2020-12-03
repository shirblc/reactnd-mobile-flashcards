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
			<View style={styles.container}>
				<Text style={styles.currentQ}>{ this.state.currentQuestion + 1 } / { this.props.questions.length }</Text>
				<Text style={styles.qText}>{ this.props.questions[this.state.currentQuestion][this.state.currentlyShowing] }</Text>
				<TouchableOpacity style={styles.borderlessBtn} onPress={() => (this.changeView())}><Text style={styles.buttonText}>Click to view the { this.state.otherOption }</Text></TouchableOpacity>
				
				<TouchableOpacity style={styles.questButton}><Text style={styles.buttonText}>Correct</Text></TouchableOpacity>
				<TouchableOpacity style={styles.questButton}><Text style={styles.buttonText}>Incorrect</Text></TouchableOpacity>
			</View>
		)
	}
}

// Map State to Props
// Gets the details of all the questions of this specific deck
function mapStateToProps({ decks, questions }, { route }) {
	const deckID = route.params.deckID;
	
	return {
		questions: decks[deckID].questions.map(question => questions[question])
	}
}

// styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		alignItems: 'center'
	},
	currentQ: {
		alignSelf: 'flex-start',
		fontSize: 18,
		padding: 5,
		margin: 5
	},
	qText: {
		fontSize: 26,
		padding: 10
	},
	questButton: {
		borderColor: '#000',
		borderStyle: 'solid',
		borderRadius: 5,
		borderWidth: 3,
		padding: 10,
		margin: 10
	},
	borderlessBtn: {
		padding: 10,
		margin: 10
	},
	buttonText: {
		fontSize: 16
	}
});

export default connect(mapStateToProps)(Quiz)