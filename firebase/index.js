import firebase from "firebase-admin";
import serviceAccountKey from './serviceAccountKey.json';

// Initialize Firebase app

export const firebase = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccountKey),
});

  