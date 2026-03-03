// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

import { getFirestore, collection, addDoc, serverTimestamp }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtMmiy4yVEQZITJuSfOQCqpCVjHYm_Qw0",
  authDomain: "storage-ce5f6.firebaseapp.com",
  projectId: "storage-ce5f6",
  storageBucket: "storage-ce5f6.firebasestorage.app",
  messagingSenderId: "71261543399",
  appId: "1:71261543399:web:4bc1d774dd634fcc9e3b42"
};

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent form submission

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("Creating Account...");
    window.location.href = "login.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Error: " + errorMessage);
    // ..
  }
);
}
);
