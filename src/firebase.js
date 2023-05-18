import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyC-zqO4K_a2r4ITMfETsK_UxA5JVMsYpuY",
  authDomain: "ready-set-gym.firebaseapp.com",
  projectId: "ready-set-gym",
  storageBucket: "ready-set-gym.appspot.com",
  messagingSenderId: "496201983543",
  appId: "1:496201983543:web:e435248c3a912b410b01b2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let storage = firebase.storage();

export { firebase, db, storage };