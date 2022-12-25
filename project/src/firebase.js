// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, getIdToken } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getMessaging, getToken} from "firebase/messaging"
const firebaseConfig = {
  apiKey: "AIzaSyD2NKrrgk27bk5aUdhvXJzYcSqx94K4zUU",
  authDomain: "pdbb-chat.firebaseapp.com",
  projectId: "pdbb-chat",
  storageBucket: "pdbb-chat.appspot.com",
  messagingSenderId: "261423407229",
  appId: "1:261423407229:web:d470972f0897a33b95d114"
};
export const app = initializeApp(firebaseConfig);

// function requestPermission() {
//   console.log('Requesting permission...');
//   Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       console.log('Notification permission granted.');
//       const messaging = getMessaging(app)
//       getToken(messaging,{vapidKey: 'BDqjGxkUI5EbrVSllKxDBbXyvZoVqfoN33DhdOBT-vr_4C-urbR9KlyNhEuJFMdrg-DJ4Gz_hbNcwmhGouV8ypY'});
      
//     }
//     else{
//       console.log('permission not granted');
//     }})}
// requestPermission();
// Initialize Firebase
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();