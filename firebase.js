// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIVgcyflRaYXwaV5wSeKjb1wsocNdpd_8",
  authDomain: "student-ef9fa.firebaseapp.com",
  projectId: "student-ef9fa",
  storageBucket: "student-ef9fa.firebasestorage.app",
  messagingSenderId: "668986127367",
  appId: "1:668986127367:web:0afbc2b2f6424aeef766a2",
  measurementId: "G-Y8WK1F447D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
