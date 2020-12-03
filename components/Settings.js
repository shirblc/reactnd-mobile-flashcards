import React from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { checkNotificationPermission } from '../utils/notifications';
import { getSettings, updateSettings } from '../utils/storage';

class Settings extends React.Component {
	state = {
		notificationsEnabled: false
	}

	// called automatically upon rendering the component
	componentDidMount() {
		// get the user's settings from AsyncStorage
		getSettings().then(data => {
			// if there are settings, set the component state to match those
			if(data) {
				this.setState({
					notificationsEnabled: data.notificationsEnabled
				})
			}
		})
	}
	
	// Updates notifications settings to the opposite of what it was
	updateNotificationsSetting() {
		this.setState(currentState => ({
			notificationsEnabled: !currentState.notificationsEnabled
		}));
		
		// update async storage with the new settings
		updateSettings({
			notificationsEnabled: !this.state.notificationsEnabled
		});
		
		checkNotificationPermission();
	}
	
	// render method
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.mainTitle}>Settings</Text>
				<Text style={styles.sectionTitle}>Notifications:</Text>
				<TouchableOpacity style={styles.button} onPress={() => (this.updateNotificationsSetting())}><Text style={styles.buttonText}>{ this.state.notificationsEnabled ? 'Disable' : 'Enable' }</Text></TouchableOpacity>
			</SafeAreaView>
		)
	}
}

// styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		alignItems: 'center'
	},
	mainTitle: {
		padding: 15,
		margin: 10,
		fontSize: 28
	},
	sectionTitle: {
		padding: 5,
		margin: 5,
		fontSize: 22
	},
	button: {
		borderColor: '#000',
		borderStyle: 'solid',
		borderRadius: 5,
		borderWidth: 2,
		padding: 10,
		margin: 10
	},
	buttonText: {
		fontSize: 18,
		alignSelf: 'center'
	}
});

export default Settings;