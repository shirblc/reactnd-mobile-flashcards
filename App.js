// General React-related imports
import React from 'react';
import { Text, View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

// App-specific imports
import reducer from './reducers/index';
import Home from './components/Home';
import AddDeck from './components/AddDeck';
import OpenDeck from './components/OpenDeck';
import AddQ from './components/AddQ';
import Quiz from './components/Quiz';
import Settings from './components/Settings';
import EditDeck from './components/EditDeck';

const store = createStore(reducer, applyMiddleware(thunk));

const Stack = createStackNavigator();
const TabsNav = createBottomTabNavigator();

/*
Function Name: HomeStack()
Function Description: Renders the Home / Quizzes stack navigator.
Parameters: None.
----------------
Programmer: Shir Bar Lev.
*/
function HomeStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Home' component={Home} />
			<Stack.Screen name='Add Deck' component={AddDeck} />
			<Stack.Screen name='Deck View' component={OpenDeck} options={{ title: 'Open Deck' }} />
			<Stack.Screen name='Add Card' component={AddQ} />
			<Stack.Screen name='Quiz' component={Quiz} />
			<Stack.Screen name='Edit Deck' component={EditDeck} options={{ title: 'Edit Deck' }} />
		</Stack.Navigator>
	)
}

export default class App extends React.Component {
	/*
  	Function Name: render()
  	Function Description: Renders the component.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	render() {
		return (
			<NavigationContainer>
				<Provider store={store}>
					<StatusBar style="auto" />
					<TabsNav.Navigator>
						<TabsNav.Screen name='Home' 
							component={HomeStack} 
							options={{
								tabBarIcon: ({color, size}) => (
									<Feather name="book-open" size={size} color={color} />
								)}} 
							/>
						<TabsNav.Screen name='Settings' 
							component={Settings} 
							options={{
								tabBarIcon: ({color, size}) => (
									<Feather name="settings" size={size} color={color} />
								)}} 
							/>
					</TabsNav.Navigator>
				</Provider>
			</NavigationContainer>
		);
	}
}
