// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import {getMessaging} from "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyD2NKrrgk27bk5aUdhvXJzYcSqx94K4zUU",
  authDomain: "pdbb-chat.firebaseapp.com",
  projectId: "pdbb-chat",
  storageBucket: "pdbb-chat.appspot.com",
  messagingSenderId: "261423407229",
  appId: "1:261423407229:web:d470972f0897a33b95d114"
};
export const app = initializeApp(firebaseConfig);
// export const token = null
// const messaging = getMessaging(app);
async function requestPermission(){
  console.log('Requesting permission...');
  const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // const messaging = getMessaging(app)
      // const token = await  getToken(messaging,{vapidKey: 'BDqjGxkUI5EbrVSllKxDBbXyvZoVqfoN33DhdOBT-vr_4C-urbR9KlyNhEuJFMdrg-DJ4Gz_hbNcwmhGouV8ypY'});
      // console.log("Token:",token)
    }
    else{
      console.log('permission not granted');
    }}
requestPermission()
// const tokenTemp=  requestPermission()
// tokenTemp.then(function(result){
//    const token=result
//    console.log(token)
// })
// let temp =null;
// requestPermission().then(function(result){
//   temp=result
// })

// messaging.onBackgroundMessage(function(payload) { 
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   window.self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });
// Initialize Firebase
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
