import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { cancelDailyNotification } from '../utils/notifications';

class Quiz extends React.Component {
	state = {
		correctAnswers: 0,
		currentQuestion: 0,
		currentlyShowing: 'question',
		otherOption: 'answer'
	}

	/*
  	Function Name: changeView()
  	Function Description: Change the text currently showing; if the user's viewing the question, show the answer, and vice versa.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	changeView() {
		this.setState(currentState => ({
			currentlyShowing: currentState['currentlyShowing'] === 'question' ? 'answer' : 'question',
			otherOption: currentState['otherOption'] === 'answer' ? 'question' : 'answer'
		}))
	}

	/*
  	Function Name: nextQuestion()
  	Function Description: Updates the user's score (if needed) and the current question in order to continue the quiz.
  	Parameters: correctAnswer (boolean) - indicating whether the user answered correctly.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	nextQuestion(correctAnswer) {
		// if this wasn't the last question, update the state to show the next question and update the user's score (if needed)
		this.setState(currentState => ({
			correctAnswers: correctAnswer ? (currentState.correctAnswers + 1) : currentState.correctAnswers,
			currentQuestion: currentState.currentQuestion + 1,
			currentlyShowing: 'question',
			otherOption: 'answer'
		}));
		
		// if it was the last question, add the completed quiz to the state and to async storage
		if(this.state.currentQuestion + 1 >= this.props.questions.length) {
			cancelDailyNotification(new Date());
		}
	}

	/*
  	Function Name: redoQuiz()
  	Function Description: Starts the quiz over.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	redoQuiz() {
		this.setState(currentState => ({
			correctAnswers: 0,
			currentQuestion: 0,
			currentlyShowing: 'question',
			otherOption: 'answer'
		}));
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
			<SafeAreaView style={styles.container}>
			{
				this.state.currentQuestion + 1 <= this.props.questions.length ?
				(<ScrollView style={styles.scrollContainer}>
					<Text style={styles.currentQ}>{ this.state.currentQuestion + 1 } / { this.props.questions.length }</Text>
					<Text style={styles.qText}>{ this.props.questions[this.state.currentQuestion][this.state.currentlyShowing] }</Text>
					<TouchableOpacity style={styles.borderlessBtn} onPress={() => (this.changeView())}><Text style={styles.buttonText}>Click to view the { this.state.otherOption }</Text></TouchableOpacity>

					<TouchableOpacity style={styles.questButton} onPress={() => (this.nextQuestion(true))}><Text style={styles.buttonText}>Correct</Text></TouchableOpacity>
					<TouchableOpacity style={styles.questButton} onPress={() => (this.nextQuestion(false))}><Text style={styles.buttonText}>Incorrect</Text></TouchableOpacity>
				</ScrollView>)
				: (<View style={styles.container}>
					<Text style={styles.currentQ}>Quiz: { this.props.deck.name }</Text>
					<Text style={styles.qText}>You scored { this.state.correctAnswers } out of { this.props.questions.length }!</Text>
					<Text style={styles.currentQ}>That's about { (this.state.correctAnswers / this.props.questions.length * 100).toFixed(2) }% right! </Text>
					<TouchableOpacity style={styles.questButton}><Text style={styles.buttonText} onPress={() => (this.redoQuiz())}>Redo Quiz</Text></TouchableOpacity>
					<TouchableOpacity style={styles.questButton}><Text style={styles.buttonText} onPress={() => (this.props.navigation.navigate('Deck View', {
								deckID: this.props.route.params.deckID
							}))}>Back to Deck</Text></TouchableOpacity>
					<TouchableOpacity style={styles.questButton}><Text style={styles.buttonText} onPress={() => (this.props.navigation.navigate('Home'))}>Back to Home</Text></TouchableOpacity>
				</View>)
			}
		</SafeAreaView>
		)
	}
}

// Map State to Props
// Gets the details of all the questions of this specific deck
function mapStateToProps({ decks, questions }, { route }) {
	const deckID = route.params.deckID;
	
	return {
		deck: decks[deckID],
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
	scrollContainer: {
		flex: 1,
		padding: 5,
	},
	currentQ: {
		alignSelf: 'flex-start',
		fontSize: 18,
		padding: 5,
		margin: 5
	},
	qText: {
		fontSize: 26,
		padding: 10,
		alignSelf: 'center'
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
		fontSize: 16,
		alignSelf: 'center'
	}
});

export default connect(mapStateToProps)(Quiz)