import { createDeck as createDeckInStorage } from '../utils/storage';

export const ADD_DECKS = 'ADD_DECKS';
export const CREATE_DECK = 'CREATE_DECK';

// Add multiple decks to the redux store; is triggered by initial data fetch
export function addDecks(decks) {
	return {
		type: ADD_DECKS,
		decks
	}
}

// Create a new deck in AsyncStorage and add the new deck to the redux store
export function createDeckAsync(deckName) {
	return (dispatch) => {
		createDeckInStorage(deckName).then(newDeck => {
			dispatch(createDeck(newDeck));
		})
	}
}

// Create a new deck
function createDeck(deck) {
	return {
		type: CREATE_DECK,
		deck
	}
}