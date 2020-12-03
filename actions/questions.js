import { addQuestion } from '../utils/storage';

export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const CREATE_QUESTION = 'CREATE_QUESTION';

// Add multiple questions to the redux store; is triggered by initial data fetch
export function addQuestions(questions) {
	return {
		type: ADD_QUESTIONS,
		questions
	}
}

// Create a new question in AsyncStorage and add the new question to the redux store
export function createQuestionAsync(question, answer, deck) {
	return (dispatch) => {
		addQuestion(question, answer, deck).then(question => {
			dispatch(createQuestion(question));
		})
	}
}

// Create a new question in the store
function createQuestion(question) {
	return {
		type: CREATE_QUESTION,
		id: question.id,
		question: question.question
	}
}