// Import Firestore functions
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { auth, database } from './firebaseSetup'; // Firestore instance

// Add a new goal to Firestore
export async function writeToDB(goal) {
  try {
    // Attach the current user's UID as the owner
    const goalWithOwner = { ...goal, owner: auth.currentUser.uid };
    await addDoc(collection(database, 'goals'), goalWithOwner);
  } catch (err) {
    console.error('Error writing to Firestore:', err);
  }
}

// Delete a goal from Firestore
export async function deleteFromDB(id) {
  try {
    await deleteDoc(doc(database, 'goals', id));
  } catch (err) {
    console.log(err);
  }
}

// Update goal with a warning flag
export async function setWarningFlag(id) {
  try {
    const goalRef = doc(database, 'goals', id);
    await updateDoc(goalRef, { warning: true });
  } catch (err) {
    console.log(err);
  }
}

// Add user data to the "users" subcollection of a specific goal
export async function addUsersToSubcollection(goalId, users) {
  try {
    const usersCollectionRef = collection(database, 'goals', goalId, 'users');
    const promises = users.map(user => addDoc(usersCollectionRef, user));
    await Promise.all(promises); // Add all users in parallel
  } catch (err) {
    console.log('Error adding users to subcollection:', err);
  }
}

// Check if users subcollection is empty
export async function isUsersSubcollectionEmpty(goalId) {
  const usersCollectionRef = collection(database, 'goals', goalId, 'users');
  const querySnapshot = await getDocs(usersCollectionRef);
  return querySnapshot.empty; // Return true if no documents are found
}
