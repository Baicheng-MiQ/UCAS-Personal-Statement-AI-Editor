import { createStore } from 'vuex'
import { notify } from "@kyvg/vue3-notification";
import { app, auth, db } from '../firebase/config.js';
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, addDoc, getDoc, onSnapshot, updateDoc, serverTimestamp, orderBy, limit, query, getDocs, setDoc } from "firebase/firestore"; 

// Initialize firebase Auth
const provider = new GoogleAuthProvider();

    
export default createStore({
    state () {
        return {
        // === Auth
            userDetail: null,
                // Sample {
                // "uid": "oCL6qh8vpsgPWMEpRvwDzs7DMDw2",
                // "email": "ybaicheng@gmail.com",
                // "emailVerified": true,
                // "displayName": "Baicheng Yin",
                // "isAnonymous": false,
                // "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GjZrkRPEQtmp84It7J706MttWSPpwg-EF-iceWREg=s96-c",
                // "providerData": [
                //     {
                //         "providerId": "google.com",
                //         "uid": "110495512272171116275",
                //         "displayName": "Baicheng Yin",
                //         "email": "ybaicheng@gmail.com",
                //         "phoneNumber": null,
                //         "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GjZrkRPEQtmp84It7J706MttWSPpwg-EF-iceWREg=s96-c"
                //     }
                // ],
                // "stsTokenManager": {
                //     "refreshToken": "abcdefg",
                //     "accessToken": "abcdefg",
                //     "expirationTime": 1655110137479
                // },
                // "createdAt": "1648882484841",
                // "lastLoginAt": "1654969003312",
                // "apiKey": "AIzaSyCKvuKUiZgn0OHmD0SezmAb1j0ndpK6F-E",
                // "appName": "[DEFAULT]"
                // }
            
            userIDtoken: null,
            userStatus: null,
                // Sample {
        //     "personalInfo": {
        //         "gapYear": true,
        //         "workExp": true,
        //         "international": true
        //     },
        //     "status": {
        //         "plan": "admin",
        //         "usage": {
        //             "gptToken": 0,
        //             "gptLeft": 999
        //         }
        //     },
        //     "application": {
        //         "round": "2022 Fall Entry",
        //         "majors": [
        //             "Computer Science",
        //             "Data Science"
        //         ],
        //         "fiveChoices": [
        //             "University College London (UCL)",
        //             "King's College London (KCL)",
        //             "University of Bristol",
        //             "University of Manchester",
        //             "Imperial College London"
        //         ]
        //     }
        //  }

        // statement content
        
            contentID: null,
            major: [],
            content: " ",
            appReady: false,            
            }
        },



    mutations: {
    // == Notification
        notify (state, { type, title, message }) {
            notify({
                type: type,
                title: title,
                text: message,
              });
        },


    // == Auth
        signIn (state) {
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                state.userDetail = user;
            }).catch((error) => {
                alert(error.message);
            });
        },

        signOut (state) {
            auth.signOut()
            .then(() => {
                state.userDetail = null;
                state.userCredentials = null;
                state.userIDtoken = null;
                state.content = "";
                state.major = [];
                state.contentID = null;
                state.appReady = false;
                this.unsubUserStatus();
                this.unsubUserStatement();
            })
            .catch((error) => {
                console.log(error);
            });
        },

        // after page refresh
        logBackUser (state, user) {
            state.userDetail = user;
        },

        // before calling backend service, update new userIDtoken
        setUserIDtoken (state, token) {
            state.userIDtoken = token;
        },

    // == Personal Statement and User
        // statement content (two way binding)
        setMajor (state, value) {
            state.major = value;
        },

        setContent (state, value) {
            state.content = value;
            state.appReady = true;
        },

        setContentID (state, value) {
            state.contentID = value;
        },

        // aka user metadata (gap year, work exp...)
        setUserStatus (state, value) {
            state.userStatus = value;
        },


    // == developer utils
        devInjectResult (state, payload) {
            state.GPTresult = payload;
            state.waitingResult = false;
            state.noSubmission = false;
            if (payload.pro === null && payload.con === null && payload.comm === null) {
                state.noSubmission = true;
            }
        },

        devLoadingState (state, onOrOff) {
            state.waitingResult = onOrOff;
            if (onOrOff) {
                state.noSubmission = false;
                state.GPTresult = { pro: null, con: null, comm: null };
            } else {
                state.noSubmission = true;
            }
        },

        devAppLoading (state) {
            state.appReady = !state.appReady
        },

        devSignIn(state, {email, password}) {
            // sign in with email and password
            signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result);
                // The signed-in user info.
                const user = result.user;
                state.userDetail = user;
                console.log(state.userDetail.uid);
            }).catch((error) => {
                alert(error.message);
            });
        }

},


    actions: {

        async getUserIDtoken (state) {
            await getAuth().currentUser.getIdToken(true)
            .then((idToken) => {
                state.commit('setUserIDtoken', idToken);
                console.log(idToken);
            })
            .catch((error) => {
                alert(error.message);
            });
            
        },

        async dbGetUserStatus (state) {
            this.unsubUserStatus = onSnapshot(doc(db, `user/${state.state.userDetail.uid}`),
                async (userStatus) => {
                    if (userStatus.exists && typeof userStatus.data() !== 'undefined') {
                        const status = userStatus.data();
                        state.commit('setUserStatus', status);
                        state.commit('setMajor', status.application.majors);
                    } else {
                        // new user: create new user status
                        const docRef = doc(db, 'user/0');
                        const docSnap = await getDoc(docRef);
                        setDoc(doc(db, "user", state.state.userDetail.uid), docSnap.data());

                    }
                });
        },

        async dbUpdateUserStatus (state, updateDetail) {
            const contentSnapshot = doc(db, 'user', state.state.userDetail.uid)
            try {
                const updateContent = await updateDoc(contentSnapshot, updateDetail)
            } catch(error) {
                alert(error)
            }
        },

        async dbGetUserStatement (state) {
            this.unsubUserStatement = onSnapshot(doc(db, `user/${state.state.userDetail.uid}/statements/0001`),
                async (statement) => {
                    if (statement.exists && typeof statement.data() !== 'undefined') {
                        state.commit('setContent', statement.data().content);
                        state.commit('setContentID', statement.id)
                    } else {
                        // new user: create new user statement
                        const docRef = doc(db, 'user/0/statements/0001');
                        const docSnap = await getDoc(docRef);
                        setDoc(doc(db, "user", state.state.userDetail.uid, "statements", "0001"), docSnap.data());
                    }
                });
        },

        async dbUpdateUserStatement (state) {
            if (state.state.userDetail && typeof state.state.userDetail !== 'undefined') {
            const docID = state.state.contentID;
            const contentSnapshot = doc(db, 'user', state.state.userDetail.uid, 'statements', docID)
            const updateContent = await updateDoc(
                contentSnapshot,
                {
                    content: state.state.content,
                    lastEditAt: serverTimestamp()
                }
                )
            } else {
                console.log('no user or content');
            }
        },


        // DEVELOPER TEST CODE HERE!
        // DEVELOPER TEST CODE HERE!
        // DEVELOPER TEST CODE HERE!
        async devDevCodeRunner(context) {
            console.log('=DEVELOPER=')
            const docRef = doc(db, 'user/oCL6qh8vpsgPWMEpRvwDzs7DMDw2/statements/0001');
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data());

            await setDoc(doc(db, 'user/0/statements/0001'), docSnap.data())
        },


    },
});