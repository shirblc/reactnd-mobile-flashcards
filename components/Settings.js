import React from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Settings extends React.Component {
	render() {
		return (
			<SafeAreaView>
				<Text>Notifications:</Text>
				<TouchableOpacity><Text>Enable</Text></TouchableOpacity>
			</SafeAreaView>
		)
	}
}

export default Settings;