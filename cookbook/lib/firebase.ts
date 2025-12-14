// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDwRE9BU9t433JF8_eFzy3l6jUGDZFhYQ",
  authDomain: "cookbook-8b75f.firebaseapp.com",
  projectId: "cookbook-8b75f",
  storageBucket: "cookbook-8b75f.firebasestorage.app",
  messagingSenderId: "985180911472",
  appId: "1:985180911472:web:6dd1764601ae7d2c39c1b5",
  measurementId: "G-91121G9HKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

let analytics: Analytics | undefined;
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    isSupported().then(supported => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { analytics };