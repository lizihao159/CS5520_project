// Correct import from 'firebase/firestore'
import { collection, addDoc, deleteDoc, doc} from 'firebase/firestore'; 
import { database } from './firebaseSetup'; // Import the Firestore instance

export async function writeToDB(goal) {
  try {
    await addDoc(collection(database, 'goals'), goal); // Add the goal to the 'goals' collection
  } catch (err) {
    console.log(err);
  }
}
export async function deleteFromDB(id) {
    try {
      await deleteDoc(doc(database, 'goals', id)); // Delete the document from 'goals' collection
    } catch (err) {
      console.log(err);
    }
  }