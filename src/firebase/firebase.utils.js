import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB74UQfCLl7rC7GXAkBrOH_1Pjjr3-Tuwg",
  authDomain: "crwn-db-824bf.firebaseapp.com",
  databaseURL: "https://crwn-db-824bf.firebaseio.com",
  projectId: "crwn-db-824bf",
  storageBucket: "crwn-db-824bf.appspot.com",
  messagingSenderId: "1084354268444",
  appId: "1:1084354268444:web:816c5f13f2cdd4d3a0fed9",
  measurementId: "G-12V3XW08HP",
};

export const createUserProfileDocument = async (userAuth, addittionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addittionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
