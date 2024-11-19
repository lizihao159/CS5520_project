import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

export async function verifyPermission() {
  // Get current notification permissions
  const { granted } = await Notifications.getPermissionsAsync();

  if (granted) {
    return true; // Permissions already granted
  }

  // Request permissions if not already granted
  const { granted: newGranted } = await Notifications.requestPermissionsAsync();
  return newGranted; // Return whether permission is now granted
}

export default function NotificationManager() {
  const scheduleNotificationHandler = async () => {
    const hasPermission = await verifyPermission(); // Check or request permissions

    if (!hasPermission) {
      Alert.alert('Permission Denied', 'You need to enable notifications to use this feature.');
      return;
    }

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Reminder',
          body: 'This is your scheduled reminder!',
          data: { info: 'Additional data can go here' },
        },
        trigger: {
          seconds: 5, // Trigger after 5 seconds
        },
      });

      Alert.alert('Notification Scheduled', `Notification ID: ${notificationId}`);
    } catch (err) {
      console.error('Error scheduling notification:', err);
      Alert.alert('Error', 'Failed to schedule notification.');
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Set Reminder"
        onPress={scheduleNotificationHandler}
        color="#28a745"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
});
