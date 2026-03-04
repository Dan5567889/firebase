import {auth} from "./firebase-config.js"; // Import the initialized Firebase authentication instance from the firebase-config.js file DH
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"; // Import the function to sign in a user with email and password from the Firebase Authentication SDK DH

document.getEventListener("DOMContentLoaded", () => { // Ensure the DOM is fully loaded before accessing elements DH
  const loginForm = document.getElementById("loginForm"); // Get the login form element DH

  loginForm.addEventListener("submit", async (event) => { // Add submit event listener to the form DH
    event.preventDefault(); // Prevent the default form submission behavior DH

    const email = document.getElementById("email").value; // Create the email input value DH
    const password = document.getElementById("password").value; // Create the password input value DH

    try{ // Try to sign in the user and handle any errors that may occur DH
      const userCredential = await signInWithEmailAndPassword(auth, email, password); // Sign in the user with the provided email and password DH
      alert("Logged in successful!"); // Alert the user that login was successful DH
      window.location.href = "order.html"; // Redirect to order page after successful login DH
      } catch (error) { // Catch and handle any errors that occur during login DH
        alert("Error logging in: " + error.message); // Alert the user that login failed and display the error message DH
        console.error("Login error:", error); // Log the error to the console for debugging purposes DH
      } // End of try-catch block DH
  }); // End of submit event listener DH
}); // End of DOMContentLoaded event listener DH