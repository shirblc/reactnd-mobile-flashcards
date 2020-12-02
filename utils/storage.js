import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'mobileFlashcards';

// Get all saved data from AsyncStorage
export function getData() {
	return AsyncStorage.getItem(STORAGE_KEY).then(data => {
		return data ? { decks, questions } : { decks: {}, questions: {} }
	});
}