import React from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { checkNotificationPermission, disableNotifications } from '../utils/notifications';
import { getSettings, updateSettings } from '../utils/storage';

class Settings extends React.Component {
	state = {
		notificationsEnabled: false
	}

	/*
  	Function Name: componentDidMount()
  	Function Description: Fetches existing settings and checks for notificatons permission upon inserting the component into the DOM. This method is automatically triggered by React.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	componentDidMount() {
		// get the user's settings from AsyncStorage
		getSettings().then(data => {
			// if there are settings, set the component state to match those
			if(data) {
				this.setState({
					notificationsEnabled: data.notificationsEnabled
				});
				
				// if notifications are enabled, schedule a notification
				if(data.notificationsEnabled) {
					checkNotificationPermission().then(value => {
						if(value === false) {
							this.setState({
								notificationsEnabled: false
							});
						}
					});
				}
			}
		})
	}
	
	/*
  	Function Name: checkNotificationsSettings()
  	Function Description: Check whether notifications settings can be updated.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	checkNotificationsSettings() {
		// if the user wants to enable notifications, check for permission
		if(!this.state.notificationsEnabled) {
			checkNotificationPermission().then(value => {
				// if there was an issue, don't change anything
				if(value !== false) {
					this.updateNotificationsSettings();
				}
			});
		}
		// otherwise cancel all scheduled notifications
		else {
			disableNotifications();
			this.updateNotificationsSettings();
		}
	}

	/*
  	Function Name: updateNotificationsSettings()
  	Function Description: Updates notifications settings to the opposite of what it was.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	updateNotificationsSettings() {
		// update the state
		this.setState(currentState => ({
			notificationsEnabled: !currentState.notificationsEnabled
		}));

		// update async storage with the new settings
		updateSettings({
			notificationsEnabled: !this.state.notificationsEnabled
		});
	}
	
	/*
  	Function Name: render()
  	Function Description: Renders the component.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.mainTitle}>Settings</Text>
				<Text style={styles.sectionTitle}>Notifications:</Text>
				<TouchableOpacity style={styles.button} onPress={() => (this.checkNotificationsSettings())}><Text style={styles.buttonText}>{ this.state.notificationsEnabled ? 'Disable' : 'Enable' }</Text></TouchableOpacity>
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