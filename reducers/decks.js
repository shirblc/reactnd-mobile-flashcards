import { ADD_DECKS, CREATE_DECK } from '../actions/decks';

// Decks reducer
export default function decksReducer(state = {}, action) {
	switch(action.type) {
		// if the incoming action is to add multiple decks, add them to the current state
		case ADD_DECKS:
			return { ...state, ...action.decks }
		// if the incoming action is to create a deck, add it to the current state
		case CREATE_DECK:
			return {
				...state,
				[action.deck.id]: {
					...action.deck.deck
				}
			}
		// otherwise return the state as is
		default:
			return state
	}
}