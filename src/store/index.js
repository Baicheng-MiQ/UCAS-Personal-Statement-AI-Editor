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
            activeTab: 'researchView',
            uniList: null,
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
                // "apiKey": "A***********",
                // "appName": "[DEFAULT]"
                // }
            
            userIDtoken: null,
            userStatus: null,
                // Sample {
                //     "status": {
                //         "usage": {
                //             "gptLeft": 146,
                //             "gptToken": 0
                //         },
                //         "plan": "admin"
                //     },
                //     "application": {
                //         "round": "2022 Fall Entry",
                //         "majors": [
                //             "Art and Design"
                //         ],
                //         "fiveChoices": [
                //             {
                //                 "notes": "This is a test note",
                //                 "links": {
                //                     "uniPS": "https://www.ucl.ac.uk/prospective-students/writing-personal-statement",
                //                     "majPS": "https://www.ucas.com/undergraduate/applying-university/personal-statement-advice-computer-science",
                //                     "uniMainSite": "https://www.ucl.ac.uk/"
                //                 },
                //                 "major": "Computer Science",
                //                 "uniName": "University College London"
                //             }
                //         ]
                //     },
                //     "personalInfo": {
                //         "gapYear": true,
                //         "international": true,
                //         "workExp": true
                //     }
                // }

        // statement content
        
            contentID: null,
            major: [],
            content: {
                "type": "doc",
                "content": [
                    {
                        "type": "paragraph"
                    }
                    ]
                },
            appReady: false,            
            }
        },
    getters: {
        // content: (state) => {
        //     this
        // },
        pureContent: (state) => {
            var content = state.content;
            try {
            // grab array in content field
            var contentArray = content.content
            // iterate the content field of the array
            var pureContent = '';
            for (var i=0; i<contentArray.length; i++) {
                // if the content is a string, add it to the pure content
                pureContent += "\n";
                if (typeof contentArray[i].content === 'object') {
                    pureContent += contentArray[i].content[0].text;
                }
            }
            return pureContent.trim();} catch (e) {
                return '';
            }
        },
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

        switchTab (state, tab) {
            state.activeTab = tab;
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
                this.commit('notify', {
                    type: 'error',
                    title: 'Something went wrong',
                    message: error.message
                });
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
                this.commit('notify', {
                    type: 'error',
                    title: 'Something went wrong',
                    message: error.message
                });
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
                this.commit('notify', {
                    type: 'error',
                    title: 'Something went wrong',
                    message: error.message
                });;
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
                const updateContent = await updateDoc(contentSnapshot, updateDetail);
                // this.commit('notify', {
                //     type: 'success',
                //     title: 'Success',
                //     message: 'Your status has been updated'
                // });
            } catch(error) {
                this.commit('notify', {
                    type: 'error',
                    title: 'Something went wrong',
                    message: error.message
                });
            }
        },

        async dbGetUserStatement (state) {
            var statement = await getDoc(doc(db, `user/${state.state.userDetail.uid}/statements/0001`));
            if (statement.exists && typeof statement.data() !== 'undefined') {
                state.commit('setContent', statement.data().content);
                state.commit('setContentID', statement.id)
            } else {
                // new user: create new user statement
                const docRef = doc(db, 'user/0/statements/0001');
                const docSnap = await getDoc(docRef);
                setDoc(doc(db, "user", state.state.userDetail.uid, "statements", "0001"), docSnap.data());
                state.commit('setContent', statement.data().content);
                state.commit('setContentID', statement.id)
            }

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

        async getUniList(state){
            const docRefs = await getDoc(doc(db, `unis/all`));
            state.state.uniList = docRefs.data().uniNames;
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