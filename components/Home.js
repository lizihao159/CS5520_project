import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, FlatList, Text, Alert, Platform } from 'react-native';
import Header from './Header';
import { useState, useEffect } from 'react';
import Input from './Input';
import GoalItem from './GoalItem';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, database, storage } from '../Firebase/firebaseSetup';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { writeToDB, deleteFromDB } from '../Firebase/firestoreHelper';
import PressableButton from './PressableButton';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { verifyPermission } from './NotificationManager';

export default function Home({ navigation }) {
  const appName = 'Welcome to My awesome app!';
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(database, 'goals'),
      where('owner', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const updatedGoals = [];
        querySnapshot.forEach((doc) => {
          const goal = { id: doc.id, ...doc.data() };
          updatedGoals.push(goal);
        });
        setGoals(updatedGoals);
      },
      (error) => {
        console.error('Error retrieving goals:', error);
        Alert.alert('Error', 'You do not have permission to view these goals.');
      }
    );

    return () => unsubscribe();
  }, []);

  // Fetch the push token and set up notifications
  useEffect(() => {
    const setupPushNotifications = async () => {
      const hasPermission = await verifyPermission(); // Verify notification permissions

      if (!hasPermission) {
        Alert.alert('Permission Denied', 'You need to enable notifications to use this feature.');
        return;
      }

      // Set up Android-specific notification channel
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
        });
      }

      try {
        // Fetch the Expo push token
        const { data: pushToken } = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });

        console.log('Expo Push Token:', pushToken);
        // Typically, you would save the token to a database here
      } catch (error) {
        console.error('Error fetching push token:', error);
        Alert.alert('Error', 'Failed to fetch push token. Please try again.');
      }
    };

    setupPushNotifications();
  }, []);

  // Function to handle input data and upload images
  const handleInputData = async ({ text, imageUri }) => {
    const newGoal = { text, owner: auth.currentUser.uid };

    if (imageUri) {
      try {
        const response = await fetch(imageUri);
        if (!response.ok) {
          throw new Error('Failed to fetch the image URI.');
        }

        const blob = await response.blob();
        const imageName = `goal_images/${auth.currentUser.uid}_${Date.now()}.jpg`;
        const imageRef = ref(storage, imageName);
        await uploadBytes(imageRef, blob);
        const downloadURL = await getDownloadURL(imageRef);
        newGoal.imageUri = downloadURL;
      } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Error', 'Failed to upload image. Please try again.');
        return;
      }
    }

    try {
      await writeToDB(newGoal);
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding goal:', error);
      Alert.alert('Error', 'Failed to add goal. Please try again.');
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await deleteFromDB(goalId);
    } catch (error) {
      console.error('Error deleting goal:', error);
      Alert.alert('Error', 'Failed to delete goal. Please try again.');
    }
  };

  const handleCancel = () => setModalVisible(false);

  const renderItem = ({ item }) => (
    <GoalItem
      goal={item}
      onDelete={() => handleDeleteGoal(item.id)}
      onNavigate={() => navigateToDetails(item)}
    />
  );

  const navigateToDetails = (goal) => {
    navigation.navigate('Details', { goal });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topSection}>
        <Header name={appName} />
        <PressableButton
          title="Add a Goal"
          onPress={() => setModalVisible(true)}
          customStyles={styles.addButton}
        />
      </View>

      <FlatList
        style={styles.flatList}
        data={goals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContentContainer}
        ListEmptyComponent={() => (
          <View style={styles.noGoalsContainer}>
            <Text style={styles.noGoalsText}>No goals to show</Text>
          </View>
        )}
      />

      <Input
        autoFocus={true}
        isVisible={modalVisible}
        onConfirm={handleInputData}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  flatList: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    backgroundColor: '#d8bfd8',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
  },
  noGoalsContainer: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  noGoalsText: {
    fontSize: 20,
    color: '#800080',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
