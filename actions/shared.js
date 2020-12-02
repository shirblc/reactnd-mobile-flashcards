import { getData } from '../utils/storage';
import { addDecks } from './decks';
import { addQuestions } from './questions';

// Get the initial data from AsyncStorage
export function getInitialData() {
	return (dispatch) => {
		return getData().then({ decks, questions } => {
			dispatch(addDecks(decks));
			dispatch(addQuestions(questions));
		})
	}
}