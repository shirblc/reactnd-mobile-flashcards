import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATIONS_IDENTIFIER = 'mobileFlashcardsNotif';

// Check whether the user has given permission to notifications
export function checkNotificationPermission() {
	Notifications.getPermissionsAsync().then(response => {
		// if the user gave their permission, schedule a notification
		if(response.granted) {
			scheduleNotifications();
		}
		// if the status is undetermined, ask the user for permission
		else if(response.status === "undetermined") {
			Permissions.askAsync(Permissions.NOTIFICATIONS).then(response => {
				if(response.granted) {
					scheduleNotifications();
				}
			});
		}
		// otherwise, alert the user they can't need to enable notifications in their device's settings
		else {
			alert('You have disabled notifications in your device settings. In order to enable notifications, we need permission. Go to your device settings -> notifications -> Mobile Flashcards and enable notifications. Then enable them in the app.')
		}
	});
}

// Schedule notifications every day at 7pm
function scheduleNotifications() {
	// check there isn't already a scheduled notification
	AsyncStorage.getItem(NOTIFICATIONS_IDENTIFIER).then(identifier => {
		if(identifier === '') {
			// notification body
			const notification = {
				identifier: NOTIFICATIONS_IDENTIFIER,
				content: {
					title: 'Time to study!',
					body: 'You haven\'t done a quiz today. Time to study!'
				},
				trigger: {
					hour: 19,
					minute: 0,
					repeats: true
				}
			};

			// schedule it, then add the identifier to AsyncStorage
			Notifications.scheduleNotificationAsync(notification).then(notifIdentifier => {
				AsyncStorage.setItem(NOTIFICATIONS_IDENTIFIER, notifIdentifier)
			});
		}
	});
}

// Cancel the daily notification
export function cancelDailyNotification(currentTime) {
	// get the notifications identifier value from async storage
	AsyncStorage.getItem(NOTIFICATIONS_IDENTIFIER).then(identifier => {
		// if there's a saved identifier and the daily notification hasn't gone off yet
		if(identifier && currentTime.getHours() < 19) {
			// cancel the notification
			Notifications.cancelScheduledNotificationAsync(identifier);
			AsyncStorage.setItem(NOTIFICATIONS_IDENTIFIER, '');
		}
	})
}

// Disable all existing notifications
export function disableNotifications() {
	return Notifications.cancelAllScheduledNotificationsAsync().then(() => {
		return AsyncStorage.setItem(NOTIFICATIONS_IDENTIFIER, '');
	});
}