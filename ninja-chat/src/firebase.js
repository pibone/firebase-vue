import firebase from "firebase/app";
import "firebase/firestore";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDHvV9UeSG_IEv2b3967172UBtorsE3PP0",
  authDomain: "pibone-ninja-chat.firebaseapp.com",
  databaseURL: "https://pibone-ninja-chat.firebaseio.com",
  projectId: "pibone-ninja-chat",
  storageBucket: "pibone-ninja-chat.appspot.com",
  messagingSenderId: "906605438228"
};

const fireApp = firebase.initializeApp(config);

export default fireApp.firestore();
