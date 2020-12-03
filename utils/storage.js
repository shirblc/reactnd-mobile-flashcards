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