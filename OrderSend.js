import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


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
const db = getFirestore(app); // Initialize Firestore here

const orderForm = document.getElementById("orderForm");

// We are using DOM manipulation to grab the form from the webpage

// We want to listen for the submit event on the form, and when it happens, we want to execute a function that will handle the order submission
orderForm.addEventListener("submit", async (e) => {
 e.preventDefault();

 const user = auth.currentUser;
 // whoever is currently logged in, we want to grab their user information so we can associate the order with that user in the database

 if (!user) {
   alert("You must be logged in.");
   return;
 }
 // if user is not logged in, send a alert

 const item = document.getElementById("item").value;
 const quantity = Number(document.getElementById("quantity").value);
 const total = Number(document.getElementById("total").value);
 // we are grabbing the values from the form inputs and converting quantity and total to numbers

 // try-catch is done for error handling
 try {
   await addDoc(collection(db, "orders"), {
     userId: user.uid,
     item: item,
     quantity: quantity,
     total: total,
     createdAt: serverTimestamp()
   });

   alert("Order placed successfully!");
   orderForm.reset();

 } catch (error) {
   console.error("Error adding order:", error);
   alert("Error placing order. Please try again.");
 }
});
