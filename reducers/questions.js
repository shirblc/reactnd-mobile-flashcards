import { ADD_QUESTIONS, CREATE_QUESTION } from '../actions/questions';

// Questions reducer
export default function questionsReducer(state = {}, action) {
	switch(action.type) {
		// if the incoming action is to add multiple questions, add them to the current state
		case ADD_QUESTIONS:
			return { ...state, ...action.questions }
		// if the incoming action is to add a new question, add it to the current state
		case CREATE_QUESTION:
			return {
				...state,
				[action.id]: {
					...action.question
				}
			}
		// otherwise return the state as is
		default:
			return state
	}
}