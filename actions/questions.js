export const ADD_QUESTIONS = 'ADD_QUESTIONS';

// Add multiple questions to the redux store; is triggered by initial data fetch
export function addQuestions(questions) {
	return {
		type: ADD_QUESTIONS,
		questions
	}
}