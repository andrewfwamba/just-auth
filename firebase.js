// Import the functions you need from the SDKs you need
// import * as firebase from"firebase";
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// //compat
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhXV2TlDVqGBZRQ4UEni7GKuE3QneKL7M",
  authDomain: "fir-auth-60e18.firebaseapp.com",
  projectId: "fir-auth-60e18",
  storageBucket: "fir-auth-60e18.appspot.com",
  messagingSenderId: "412027315826",
  appId: "1:412027315826:web:c93470136bd8b88b7704eb",
  measurementId: "G-JBE2H92MJN"
};

// // Initialize Firebase
// let app;
// if(firebase.apps.length===0) {
//     app = firebase.initializeApp(firebaseConfig);

// } else {
//     app = firebase.app();
// }
// const auth = firebase.auth();
// export { auth };
// // const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);