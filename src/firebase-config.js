import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAA5dUZOe87C7Zi5burVvCCeh--XHrBJ68",
  authDomain: "project4-e9c5d.firebaseapp.com",
  projectId: "project4-e9c5d",
  storageBucket: "project4-e9c5d.appspot.com",
  messagingSenderId: "92482853123",
  appId: "1:92482853123:web:0ace5e56400fd62cc9b136",
  measurementId: "G-60VGLZ98FX"
};
  

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
const auth = getAuth(app); 

export { auth };
