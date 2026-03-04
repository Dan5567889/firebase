import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtMmiy4yVEQZITJuSfOQCqpCVjHYm_Qw0",
  authDomain: "storage-ce5f6.firebaseapp.com",
  projectId: "storage-ce5f6",
  storageBucket: "storage-ce5f6.firebasestorage.app",
  messagingSenderId: "71261543399",
  appId: "1:71261543399:web:4bc1d774dd634fcc9e3b42"
};

// Initialize Firebase outside the event listener
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export {app, auth, db};