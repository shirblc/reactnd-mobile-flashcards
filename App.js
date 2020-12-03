// General React-related imports
import React from 'react';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// App-specific imports
import reducer from './reducers/index';
import Home from './components/Home';
import AddDeck from './components/AddDeck';
import OpenDeck from './components/OpenDeck';

const store = createStore(reducer, applyMiddleware(thunk));

const Stack = createStackNavigator();

export default class App extends React.Component {
	// render
	render() {
		return (
			<NavigationContainer>
				<Provider store={store}>
					<StatusBar style="auto" />
					<Stack.Navigator>
						<Stack.Screen name='Home' component={Home} />
						<Stack.Screen name='Add Deck' component={AddDeck} />
						<Stack.Screen name='Deck View' component={OpenDeck} options={{ title: 'Open Deck' }} />
					</Stack.Navigator>
				</Provider>
			</NavigationContainer>
		);
	}
}
