import { ADD_DECKS, CREATE_DECK, EDIT_DECK } from '../actions/decks';
import { CREATE_QUESTION } from '../actions/questions';

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
		// if the incoming action is to add a new question, add its ID to the right deck's 'questions' arrray.
		case CREATE_QUESTION:
			return {
				...state,
				[action.question.deck]: {
					...state[action.question.deck],
					questions: [ ...state[action.question.deck].questions, action.id ]
				}
			}
		// if the incoming action is editing a deck's name, edit it
		case EDIT_DECK:
			return {
				...state,
				[action.id]: {
					name: action.updatedDeck.name,
					...state[action.id]
				}
			}
		// otherwise return the state as is
		default:
			return state
	}
}