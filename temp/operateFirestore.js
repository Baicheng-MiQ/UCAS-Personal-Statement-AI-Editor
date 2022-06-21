import { app, auth, db } from '../src/firebase/config.js';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { collection, doc, addDoc, getDoc, onSnapshot, updateDoc, serverTimestamp, orderBy, limit, query, getDocs } from "firebase/firestore"; 

const provider = new GoogleAuthProvider();

signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                const userDetail = user;

            });

const docRef = doc(db, 'user/oCL6qh8vpsgPWMEpRvwDzs7DMDw2');
const docSnap = await getDoc(docRef);
console.log(docSnap);