import { ADD_DECKS } from '../actions/decks';

// Decks reducer
export default function decksReducer(state = {}, action) {
	switch(action.type) {
		// if the incoming action is to add multiple decks, add them to the current state
		case ADD_DECKS:
			return { ...state, ...action.decks }
		// otherwise return the state as is
		default:
			return state
	}
}