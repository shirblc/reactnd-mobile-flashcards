export const ADD_DECKS = 'ADD_DECKS';
export const CREATE_DECK = 'CREATE_DECK';

// Add multiple decks to the redux store; is triggered by initial data fetch
export function addDecks(decks) {
	return {
		type: ADD_DECKS,
		decks
	}
}

// Create a new deck
export function createDeck(deckName) {
	return {
		type: createDeck,
		deck: {
			name: deckName,
			questions: []
		}
	}
}