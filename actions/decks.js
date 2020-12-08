import { createDeck as createDeckInStorage, editDeckName, deleteDeck as deleteDeckInStorage } from '../utils/storage';

export const ADD_DECKS = 'ADD_DECKS';
export const CREATE_DECK = 'CREATE_DECK';
export const EDIT_DECK = 'EDIT_DECK';
export const DELETE_DECK = 'DELETE_DECK';

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

// Edit the given deck's name in async storage and then update it in the redux store
export function editDeckAsync(deckID, deckName) {
	return (dispatch) => {
		editDeckName(deckID, deckName).then(updatedDeck => {
			dispatch(editDeck(updatedDeck, deckID));
		})
	}
}

// Edit a deck's name
function editDeck(updatedDeck, deckID) {
	return {
		type: EDIT_DECK,
		id: deckID,
		updatedDeck
	}
}

// Delete the given deck in async storage and then update it in the redux store
export function deleteDeckAsync(deckID) {
	return (dispatch) => {
		deleteDeckInStorage(deckID).then(() => {
			dispatch(deleteDeck(deckID))
		})
	}
}

// Delete the given deck
function deleteDeck(deckID) {
	return {
		type: DELETE_DECK,
		deckID
	}
}