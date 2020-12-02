import { ADD_QUESTIONS } from '../actions/questions';

// Questions reducer
export default function questionsReducer(state = {}, action) {
	switch(action.type) {
		// if the incoming action is to add multiple questions, add them to the current state
		case ADD_QUESTIONS:
			return { ...state, ...action.questions }
		// otherwise return the state as is
		default:
			return state
	}
}