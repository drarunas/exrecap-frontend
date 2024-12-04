import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';  // Import Tailwind CSS here

// Import only the functions you need from Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
  apiKey: "AIzaSyCMvhRD7R7At0C4O7a1t704iJKdmnJRPVg",
  authDomain: "exrecapp.firebaseapp.com",
  projectId: "exrecapp",
  storageBucket: "exrecapp.appspot.com",
  messagingSenderId: "639963461436",
  appId: "1:639963461436:web:7ee7b40dad84b18af11039",
  measurementId: "G-NBYHPTG002"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);




createApp(App).mount('#app');
const db = getFirestore(app);

export { db };

export { analytics };
