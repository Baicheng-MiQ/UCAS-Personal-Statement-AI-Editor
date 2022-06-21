// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKvuKUiZgn0OHmD0SezmAb1j0ndpK6F-E",
  authDomain: "ps-editor-49f49.firebaseapp.com",
  projectId: "ps-editor-49f49",
  storageBucket: "ps-editor-49f49.appspot.com",
  messagingSenderId: "206509227583",
  appId: "1:206509227583:web:925fba0bc0b8f7b96e828a",
  measurementId: "G-VH7GQBXWBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

// enableIndexedDbPersistence(db)
//   .catch((err) => {
//       if (err.code == 'failed-precondition') {
//           // Multiple tabs open, persistence can only be enabled
//           // in one tab at a a time.
//           console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
//         } else if (err.code == 'unimplemented') {
//           // The current browser does not support all of the
//           // features required to enable persistence
//         console.log('The current browser does not support all of the features required to enable persistence.');
//       }
//   });
// // Subsequent queries will use persistence, if it was enabled successfully

// connectAuthEmulator(auth, "http://localhost:9099");
// connectFirestoreEmulator(db, "http://localhost:8080");
export { app, auth, db };
