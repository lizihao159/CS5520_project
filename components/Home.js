import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, FlatList, Text, Alert } from 'react-native';
import Header from './Header';
import { useState, useEffect } from 'react';
import Input from './Input';
import GoalItem from './GoalItem';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { database } from '../Firebase/firebaseSetup'; // Import Firestore database
import { writeToDB, deleteFromDB } from '../Firebase/firestoreHelper'; // Import writeToDB and deleteFromDB functions
import PressableButton from './PressableButton'; // Import the PressableButton component

export default function Home({ navigation }) {
  const appName = 'Welcome to My awesome app!';
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Listen for real-time updates from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'goals'), (querySnapshot) => {
      const updatedGoals = [];
      querySnapshot.forEach((doc) => {
        // Use spread syntax to add the Firestore document ID to each goal object
        const goal = { id: doc.id, ...doc.data() };
        updatedGoals.push(goal);
      });
      setGoals(updatedGoals); // Update the state with the fetched documents, including the Firestore ID
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  // Handle input data by adding a new goal to Firestore
  const handleInputData = async (text) => {
    const newGoal = { text }; // Only text is needed as Firestore will handle the ID
    try {
      await writeToDB(newGoal); // Add the new goal to Firestore
      setModalVisible(false); // Close the modal
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  // Delete goal from Firestore and update the state
  const handleDeleteGoal = async (goalId) => {
    try {
      await deleteFromDB(goalId); // Call deleteFromDB to delete the document from Firestore
      // No need to update the state manually as onSnapshot will handle this
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  // Delete all goals from Firestore
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
              const querySnapshot = await getDocs(collection(database, 'goals'));
              // Loop through all documents and delete them
              querySnapshot.forEach(async (doc) => {
                await deleteFromDB(doc.id); // Delete each document
              });
            } catch (error) {
              console.error('Error deleting all goals:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  // Modify the renderSeparator to handle highlighted state
  const renderSeparator = ({ highlighted }) => (
    <View
      style={[
        styles.separator,
        highlighted ? styles.highlightedSeparator : null, // Change separator color when highlighted
      ]}
    />
  );

  // Modify the renderItem function to use separators and change their appearance when pressed
  const renderItem = ({ item, separators }) => (
    <GoalItem
      goal={item}
      onDelete={() => handleDeleteGoal(item.id)} // Pass the goal's ID to handle deletion
      onNavigate={() => navigateToDetails(item)} // Pass goal as argument
      onHighlight={() => separators.highlight()} // Highlight separator when item is pressed
      onUnhighlight={() => separators.unhighlight()} // Unhighlight separator when released
    />
  );

  // Function to navigate to goal details
  const navigateToDetails = (goal) => {
    // Pass the goal object as a param
    navigation.navigate('Details', { goal });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Top section */}
      <View style={styles.topSection}>
        <Header name={appName}></Header>

        {/* Add a Goal button with custom styles */}
        <PressableButton 
          title="Add a Goal" 
          onPress={() => setModalVisible(true)} 
          customStyles={styles.addButton} // Custom styles for Add a Goal
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
              {/* Delete All button with custom styles */}
              <PressableButton 
                title="Delete all" 
                onPress={handleDeleteAllGoals} 
                customStyles={styles.deleteAllButton} // Custom styles for Delete All
              />
            </View>
          )
        }
        ItemSeparatorComponent={renderSeparator} // Update the ItemSeparatorComponent to use highlighted state
      />

      <Input autoFocus={true} isVisible={modalVisible} onConfirm={handleInputData} onCancel={handleCancel} />
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
    backgroundColor: 'grey', // Default color of the separator line
  },
  highlightedSeparator: {
    backgroundColor: 'transparent', // Transparent background
    borderBottomWidth: 2, // Change the border width
    borderBottomColor: '#007BFF', // Change the border color (separator color)
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
