import { ADD_DECKS, CREATE_DECK } from '../actions/decks';

// Decks reducer
export default function decksReducer(state = {}, action) {
	switch(action.type) {
		// if the incoming action is to add multiple decks, add them to the current state
		case ADD_DECKS:
			return { ...state, ...action.decks }
		// if the incoming action is to create a deck, add it to the current state
		case CREATE_DECK:
			// add 1 to the last deck's ID or if there's no deck, make the ID 0
			const id = Object.keys(state).length ? (Object.keys(state)[Object.keys(state).length-1] + 1) : 0;
			return {
				...state,
				[id]: {
					...action.deck
				}
			}
		// otherwise return the state as is
		default:
			return state
	}
}