import { combineReducers } from 'redux';
import decks from './decks';
import questions from './questions';

// Entry point for reducers
export default combineReducers({
	decks,
	questions
});