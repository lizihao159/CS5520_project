// Import Firestore functions
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'; 
import { database } from './firebaseSetup'; // Import the Firestore instance

// Add a new goal to Firestore
export async function writeToDB(goal) {
  try {
    await addDoc(collection(database, 'goals'), goal); // Add the goal to the 'goals' collection
  } catch (err) {
    console.log(err);
  }
}

// Delete a goal from Firestore
export async function deleteFromDB(id) {
  try {
    await deleteDoc(doc(database, 'goals', id)); // Delete the document from 'goals' collection
  } catch (err) {
    console.log(err);
  }
}

// Update a goal to set the warning flag to true
export async function setWarningFlag(id) {
  try {
    const goalRef = doc(database, 'goals', id); // Get a reference to the document
    await updateDoc(goalRef, { warning: true }); // Update the document with the warning flag
  } catch (err) {
    console.log(err);
  }
}
