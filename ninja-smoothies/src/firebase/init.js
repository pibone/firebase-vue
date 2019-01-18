import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDP4eDmldA9W8qrNA3_23RyLJCJNPTMSqA',
  authDomain: 'ninja-smoothies-75697.firebaseapp.com',
  databaseURL: 'https://ninja-smoothies-75697.firebaseio.com',
  projectId: 'ninja-smoothies-75697',
  storageBucket: 'ninja-smoothies-75697.appspot.com',
  messagingSenderId: '892456163284'
};

const fireApp = firebase.initializeApp(config);

export default fireApp.firestore();