import firebase from "firebase/app";
import 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyBjBFv9HZDegxJ-iCtrmzO0jXKcuaX8O9E",
  authDomain: "store-itrans.firebaseapp.com",
  projectId: "store-itrans",
  storageBucket: "store-itrans.appspot.com",
  messagingSenderId: "657670444575",
  appId: "1:657670444575:web:0b51c7809036c50e77672a",
  measurementId: "G-2BHSF34F3D"
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
