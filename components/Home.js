import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, FlatList, Text, Alert } from 'react-native';
import Header from './Header';
import { useState, useEffect } from 'react';
import Input from './Input';
import GoalItem from './GoalItem';
import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore'; // Import necessary Firestore functions
import { auth, database } from '../Firebase/firebaseSetup'; // Import Firestore and Auth instance
import { writeToDB, deleteFromDB } from '../Firebase/firestoreHelper'; // Import Firestore helpers
import PressableButton from './PressableButton'; // Import the PressableButton component

export default function Home({ navigation }) {
  const appName = 'Welcome to My awesome app!';
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPermissionAlert, setShowPermissionAlert] = useState(false); // State to prevent repeated alerts

  // Listen for real-time updates from Firestore with query
  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      console.warn('No user is logged in');
      return; // Exit if no user is logged in
    }

    const q = query(
      collection(database, 'goals'),
      where('owner', '==', user.uid) // Only retrieve goals belonging to the current user
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const updatedGoals = [];
        querySnapshot.forEach((doc) => {
          const goal = { id: doc.id, ...doc.data() };
          updatedGoals.push(goal);
        });
        setGoals(updatedGoals); // Update state with user-specific goals
      },
      (error) => {
        console.error('Error retrieving goals:', error);
        if (!showPermissionAlert) {
          setShowPermissionAlert(true);
          Alert.alert('Error', 'You do not have permission to view these goals.', [
            {
              text: 'OK',
              onPress: () => setShowPermissionAlert(false),
            },
          ]);
        }
      }
    );

    return () => unsubscribe(); // Detach listener when component unmounts
  }, [showPermissionAlert]);

  const handleInputData = async (text) => {
    const newGoal = { text, owner: auth.currentUser.uid }; // Attach owner's UID to goal
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
      await deleteFromDB(goalId); // Call Firestore delete function
    } catch (error) {
      console.error('Error deleting goal:', error);
      Alert.alert('Error', 'Failed to delete goal. Please try again.');
    }
  };

  const handleCancel = () => setModalVisible(false);

  const handleDeleteAllGoals = async () => {
    Alert.alert(
      'Delete All Goals',
      'Are you sure you want to delete all goals?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const q = query(
                collection(database, 'goals'),
                where('owner', '==', auth.currentUser.uid) // Only delete the user's own goals
              );
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach(async (doc) => {
                await deleteFromDB(doc.id);
              });
            } catch (error) {
              console.error('Error deleting all goals:', error);
              Alert.alert('Error', 'Failed to delete all goals. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderSeparator = ({ highlighted }) => (
    <View
      style={[
        styles.separator,
        highlighted ? styles.highlightedSeparator : null,
      ]}
    />
  );

  const renderItem = ({ item, separators }) => (
    <GoalItem
      goal={item}
      onDelete={() => handleDeleteGoal(item.id)}
      onNavigate={() => navigateToDetails(item)}
      onHighlight={() => separators.highlight()}
      onUnhighlight={() => separators.unhighlight()}
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
        ListHeaderComponent={() =>
          goals.length > 0 && (
            <View style={styles.goalsHeader}>
              <Text style={styles.goalsHeaderText}>My Goal List</Text>
            </View>
          )
        }
        ListFooterComponent={() =>
          goals.length > 0 && (
            <View style={styles.deleteAllContainer}>
              <PressableButton
                title="Delete all"
                onPress={handleDeleteAllGoals}
                customStyles={styles.deleteAllButton}
              />
            </View>
          )
        }
        ItemSeparatorComponent={renderSeparator}
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
  goalsHeader: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#d8bfd8',
  },
  goalsHeaderText: {
    fontSize: 22,
    color: '#800080',
  },
  deleteAllContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  separator: {
    height: 2,
    borderRadius: 6,
    backgroundColor: 'grey',
  },
  highlightedSeparator: {
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: '#007BFF',
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteAllButton: {
    backgroundColor: '#800080',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
