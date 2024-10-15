// Correct import from 'firebase/firestore'
import { collection, addDoc } from 'firebase/firestore'; 
import { database } from './firebaseSetup'; // Import the Firestore instance

export async function writeToDB(goal) {
  try {
    await addDoc(collection(database, 'goals'), goal); // Add the goal to the 'goals' collection
  } catch (err) {
    console.log(err);
  }
}
