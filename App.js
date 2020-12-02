import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import Home from './components/Home';

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {
	// render
	render() {
		return (
			<Provider store={store}>
				<View style={styles.container}>
					<Text>Open up App.js to start working on your app!</Text>
					<Home />
					<StatusBar style="auto" />
				</View>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
