import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "rv-test-153.firebaseapp.com",
  databaseURL: "https://rv-test-153.firebaseio.com",
  projectId: "rv-test-153",
  storageBucket: "rv-test-153.appspot.com",
  messagingSenderId: "xxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxxxxxxx",
  measurementId: "xxxxxxxxxxxxxxxxxxx"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
