import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'mobileFlashcardsData';
let NEXT_DECK_ID = 0;
let NEXT_QUESTION_ID = 0;
const SETTINGS_KEY = 'mobileFlashcardsSettings';

// Get all saved data from AsyncStorage
export function getData() {
	return AsyncStorage.getItem(STORAGE_KEY).then(data => {
		let returnData;
		// if there's any existing data, update the value for the question and deck added next
		if(data) {
			returnData = JSON.parse(data);
			NEXT_DECK_ID = Number(Object.keys(returnData.decks)[Object.keys(returnData.decks).length-1] + 1);
			NEXT_QUESTION_ID = Object.keys(returnData.questions).length ? Number(Object.keys(returnData.questions)[Object.keys(returnData.questions).length-1] + 1) : 0;
		}
		// otherwise return empty objects
		else {
			returnData = { decks: {}, questions: {} };
		}
		
		return returnData;
	});
}

// Create a new deck of cards and handle the result
export function createDeck(deckName) {
	// if successful, return the new deck and update the next ID
	return addDeck(deckName).then(updatedData => {
		// since mergeItem returns data and setItem doesn't, the way the new deck is fetched depends on whether there's
		// any return data. If there is, get the deck information from there; if there isn't, assume it's deck 0 and create a deck object.
		const newDeckID = NEXT_DECK_ID;
		const deck = updatedData ? JSON.parse(updatedData).decks[newDeckID] : {
			name: deckName,
			questions: []
		};
		
		NEXT_DECK_ID = Number(NEXT_DECK_ID) + 1;
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
			},
			questions: { }
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

// Edit a deck's name in async storage
export function editDeckName(deckID, newName) {
	// merge the new name into async storage
	return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
		decks: {
			[deckID]: {
				name: newName
			}
		}
	// then return the updated deck's data
	})).then(updatedData => {
		const parsedData = JSON.parse(updatedData);
		const updatedDeck = parsedData ? parsedData.decks[deckID] : {
			name: newName
		};
		
		return updatedDeck;
	})
}

// Delete deck in async storage
export function deleteDeck(deckID) {
	return AsyncStorage.getItem(STORAGE_KEY).then(data => {
		const deckToDelete = data.decks[deckID];
		
		//  delete the questions
		deckToDelete.questions.forEach(question => {
			delete data.questions[question]
		});
		
		// delete the deck
		delete data.decks[deckID];
		
		return AsyncStorage.setItem(STORAGE_KEY, data);
	})
}

// Add a new question to async storage
export function addQuestion(question, answer, deck) {
	// update the relevant deck with the new question's ID and update the questions
	// object with the new question
	return AsyncStorage.getItem(STORAGE_KEY).then(data => {
		const deckQuestions = JSON.parse(data).decks[deck].questions;
		
		return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
			decks: {
				[deck]: {
					questions: [ ...deckQuestions, NEXT_QUESTION_ID]
				}
			},
			questions: {
				[NEXT_QUESTION_ID]: {
					deck,
					question,
					answer
				}
			}
		}))
	// once that's done, get the new question's information and return it
	}).then(updatedData => {
		const newQID = NEXT_QUESTION_ID;
		const newQData = updatedData ? JSON.parse(updatedData).questions[NEXT_QUESTION_ID] : {
			deck,
			question,
			answer
		};
		NEXT_QUESTION_ID = Number(NEXT_QUESTION_ID) + 1;
		return {
			id: newQID,
			question: newQData
		}
	});
}

// Get the user's settings from AsyncStorage (if there are any)
export function getSettings() {
	return AsyncStorage.getItem(SETTINGS_KEY).then(data => {
		if(data) {
			return JSON.parse(data);
		}
		else {
			return null;
		}
	});
}

// Update the user's currently saved settings
export function updateSettings(newSettings) {
	return AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
}