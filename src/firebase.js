// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDohYb65xJnBWRXeUDyv2u70xDR2IlNsKI",
  authDomain: "aahang-learning.firebaseapp.com",
  projectId: "aahang-learning",
  storageBucket: "aahang-learning.appspot.com",
  messagingSenderId: "547239475314",
  appId: "1:547239475314:web:1c9a890f658a9894522aeb",
  measurementId: "G-YKBRPVV002"
};

firebase.initializeApp(firebaseConfig);
 export const firebaseAuth = firebase.auth();

 export const firestore = firebase.firestore();

 export const storageRef = firebase.storage().ref();
 export const refer = firebase.storage();

 export default firebase;