import firebase from "firebase/app";
import 'firebase/firebase-auth'

var firebaseConfig = {
  apiKey: "AIzaSyD0VOPNzQAU4DZB1uwI2VofVzbL22m5c9E",
  authDomain: "pomotimer-ac91d.firebaseapp.com",
  projectId: "pomotimer-ac91d",
  storageBucket: "pomotimer-ac91d.appspot.com",
  messagingSenderId: "771080494794",
  appId: "1:771080494794:web:7fbf4344844122d2bfde33",
  measurementId: "G-GW385EY845",
};
const fire = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default fire;
