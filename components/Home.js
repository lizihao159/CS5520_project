import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, FlatList, Text, Alert } from 'react-native';
import Header from './Header';
import { useState } from 'react';
import Input from './Input';
import GoalItem from './GoalItem';
import PressableButton from './PressableButton'; // Import the PressableButton component

export default function Home({ navigation }) {
  const appName = 'Welcome to My awesome app!';
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputData = (text) => {
    const newGoal = { text: text, id: Math.random() };
    setGoals((currentGoals) => [...currentGoals, newGoal]);
    setModalVisible(false);
  };

  const handleDeleteGoal = (goalId) => {
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== goalId));
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleDeleteAllGoals = () => {
    Alert.alert(
      'Delete All Goals',
      'Are you sure you want to delete all goals?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => setGoals([]),
        },
      ],
      { cancelable: true }
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

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
        renderItem={({ item }) => (
          <GoalItem 
            goal={item} 
            onDelete={handleDeleteGoal} 
            onNavigate={navigateToDetails} // Pass goal as argument
          />
        )}
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
        ItemSeparatorComponent={renderSeparator}
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
    height: 5,
    backgroundColor: 'grey',
    borderRadius: 6,
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
