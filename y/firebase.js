// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF5ZoBL9U9u5zAa4b5J47HE6pxhFV6cIY",
  authDomain: "scrapmanagement-2f0ae.firebaseapp.com",
  projectId: "scrapmanagement-2f0ae",
  storageBucket: "scrapmanagement-2f0ae.appspot.com",
  messagingSenderId: "61024284114",
  appId: "1:61024284114:web:9db9ab612a04c79b6dac0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};