import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'mobileFlashcards';
let NEXT_DECK_ID = 0;
let NEXT_QUESTION_ID = 0;

// Get all saved data from AsyncStorage
export function getData() {
	return AsyncStorage.getItem(STORAGE_KEY).then(data => {
		// if there's any existing data, update the value for the question and deck added next
		if(data) {
			NEXT_DECK_ID = Number(Object.keys(data.decks)[Object.keys(data.decks).length-1] + 1);
			NEXT_QUESTION_ID = Number(Object.keys(data.questions)[Object.keys(data.questions).length-1] + 1);
		}
		// if there's any existing data, return it; otherwise return empty objects
		return data ? { decks, questions } : { decks: {}, questions: {} }
	});
}

// Create a new deck of cards and . handle the result
export function createDeck(deckName) {
	// if successful, return the new deck and update the next ID
	return addDeck(deckName).then(updatedData => {
		// since mergeItem returns data and setItem doesn't, the way the new deck is fetched depends on whether there's
		// any return data. If there is, get the deck information from there; if there isn't, assume it's deck 0 and create a deck object.
		const newDeckID = updatedData ? Object.keys(updatedData.decks)[Object.keys(updatedData.decks).length-1] : 0;
		const deck = updatedData ? updatedData.decks[newDeckID] : {
			name: deckName,
			questions: []
		};
		
		NEXT_DECK_ID++;
		return {
			id: newDeckID,
			deck: deck
		};
	// if there's an error, return it
	}).catch(err => {
		return err;
	})
}

// Create a new deck of cards in AsyncStorage
function addDeck(deckName) {
	return NEXT_DECK_ID ===  0 
		?
		// if this is the first deck to be added, use setItem to create the AsyncStorage object
		(AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
			decks: {
				[NEXT_DECK_ID]: {
					name: deckName,
					questions: []
				}
			}
		})))
		:
		// otherwise, merge the deck into the existing object
		(AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
			decks: {
				[NEXT_DECK_ID]: {
					name: deckName,
					questions: []
				}
			}
		})));
}