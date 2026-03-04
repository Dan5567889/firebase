import {auth, db} from "./firebase-config.js"; // Import the initialized Firebase authentication and Firestore database instances from the firebase-config.js file DH
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"; // Import the function to create a user with email and password from the Firebase Authentication SDK DH
import {doc,setDoc,serverTimestamp} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"; // Import the functions to create a document, set a document, and get the server timestamp from the Firebase Firestore SDK DH

document.getEventListener("DOMContentLoaded", () => { // Ensure the DOM is fully loaded before accessing elements DH
  const signupForm = document.getElementById("signupForm"); // Get the signup form element DH

  signupForm.addEventListener("submit", async (event) => { // Add submit event listener to the form DH
    event.preventDefault(); // Prevent the default form submission behavior DH

    const username = document.getElementById("username").value; // Get the username input value DH
    const email = document.getElementById("email").value; // Get the email input value DH
    const password = document.getElementById("password").value; // Get the password input value DH

    try { // Try to create a new user and handle any errors that may occur DH
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Create a new user with the provided email and password DH
      const user = userCredential.user; // Get the created user object DH

      // Create a Firestore document for the new user DH
      await setDoc(doc(db, "users", user.uid), { // Create a document in the "users" collection with the user's UID as the document ID DH
        username: username, // Store the username in the Firestore document DH
        email: email, //  Store the email in the Firestore document DH
        createdAt: serverTimestamp() // Store the account creation timestamp in the Firestore document DH
      }); // Await the completion of the Firestore document creation DH

      alert("Signup successful! You can now log in."); // Alert the user that signup was successful DH
      window.location.href = "order.html"; // Redirect to login page after successful signup DH
    } catch (error) { // Catch and handle any errors that occur during signup DH
      alert(`Signup failed: ${error.message}`); // Alert the user that signup failed and display the error message DH
      console.error("Error during signup:", error); // Log the error to the console for debugging purposes DH
    } // End of try-catch block DH
  }); // End of submit event listener DH
}); // End of DOMContentLoaded event listener DH