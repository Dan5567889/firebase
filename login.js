// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtMmiy4yVEQZITJuSfOQCqpCVjHYm_Qw0",
  authDomain: "storage-ce5f6.firebaseapp.com",
  projectId: "storage-ce5f6",
  storageBucket: "storage-ce5f6.firebasestorage.app",
  messagingSenderId: "71261543399",
  appId: "1:71261543399:web:4bc1d774dd634fcc9e3b42"
};

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
  
  
    // When the submit button is clicked, trigger a function call
    const submit = document.getElementById("submit");
    submit.addEventListener("click", function(event) {
      event.preventDefault(); // Prevent form submission
      // Inputs
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      // Call the function to create a new user
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          alert("Logging in...");
          window.location.href = "Order.html";
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Invalid Password" + errorMessage);
        });
    });
  });
  


