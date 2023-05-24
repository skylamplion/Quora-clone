// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMuww_JvSdkime1fVbYCCT-c7DQf_kuac",
  authDomain: "qoura-clone-in-marn.firebaseapp.com",
  projectId: "qoura-clone-in-marn",
  storageBucket: "qoura-clone-in-marn.appspot.com",
  messagingSenderId: "814255046938",
  appId: "1:814255046938:web:35892a05c1c6f336096ca3",
  measurementId: "G-QP6JFK8YJ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()
const Provider = new GoogleAuthProvider();

export { auth, Provider };