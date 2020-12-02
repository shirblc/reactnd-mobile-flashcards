export const ADD_DECKS = 'ADD_DECKS';

// Add multiple decks to the redux store; is triggered by initial data fetch
export function addDecks(decks) {
	return {
		type: ADD_DECKS,
		decks
	}
}