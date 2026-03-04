import { auth, db } from "./firebase-config.js"; // Import the initialized Firebase authentication and Firestore database instances from the firebase-config.js file DH
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"; // Import the functions to listen for authentication state changes and sign out a user from the Firebase Authentication SDK DH
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"; // Import the functions to create a collection reference, add a document, and get the server timestamp from the Firebase Firestore SDK DH

document.addEventListener("DOMContentLoaded", () => { // Ensure the DOM is fully loaded before accessing elements DH
  const orderForm = document.getElementById("orderForm"); // Get the order form element DH
  const userStatus = document.getElementById("userStatus"); // Get the user status element to display login information DH
  const logoutBtn = document.getElementById("logoutBtn"); // Get the logout button element DH

  // Listen for auth state changes
  onAuthStateChanged(auth, (user) => { // Listen for changes in the user's authentication state DH
    if (user) { // If a user is logged in, display their email in the user status element DH
      userStatus.textContent = "Logged in as: " + user.email; // Display the logged-in user's email in the user status element DH
    } else { // If no user is logged in, display a message and redirect to the login page after a short delay DH
      userStatus.textContent = "Not logged in. Redirecting..."; // Display a message indicating that the user is not logged in in the user status element DH
      setTimeout(() => { // Set a timeout to redirect the user to the login page after 2 seconds DH
        window.location.href = "login.html"; // Redirect to the login page DH
      }, 2000); // Delay of 2000 milliseconds (2 seconds) before redirecting DH
    } // End of if-else block for user authentication state DH
  }); // End of onAuthStateChanged listener DH

  // Handle order submission
  orderForm.addEventListener("submit", async (event) => { // Add submit event listener to the order form DH
    event.preventDefault(); // Prevent the default form submission behavior DH

    const user = auth.currentUser; // Get the currently authenticated user DH

    if (!user) { // If no user is logged in, alert the user and redirect to the login page DH
      alert("Please log in to place an order"); // Alert the user that they need to log in to place an order DH
      window.location.href = "login.html"; // Redirect to the login page DH
      return; // Exit the function to prevent further execution DH
    } // End of if block to check for authenticated user DH

    const item = document.getElementById("item").value; // Get the item input value from the order form DH
    const quantity = Number(document.getElementById("quantity").value); // Get the quantity input value from the order form and convert it to a number DH
    const totalPrice = Number(document.getElementById("totalPrice").value); // Get the total price input value from the order form and convert it to a number DH

    try { // Try to add the order to the Firestore database and handle any errors that may occur DH
      await addDoc(collection(db, "orders"), { // Add a new document to the "orders" collection in Firestore with the order details DH
        userId: user.uid, // Store the user's UID in the order document DH
        email: user.email, // Store the user's email in the order document DH
        item: item, // Store the ordered item in the order document DH
        quantity: quantity, //  Store the ordered quantity in the order document DH
        totalPrice: totalPrice, // Store the total price of the order in the order document DH
        timestamp: serverTimestamp() // Store the server timestamp of when the order was placed in the order document DH
      }); // Await the completion of adding the order document to Firestore DH
      alert("Order placed successfully!"); // Alert the user that their order was placed successfully DH
      orderForm.reset(); // Reset the order form after successful submission DH
    } catch (error) { // Catch and handle any errors that occur during the order submission process DH
      alert("Error placing order: " + error.message); // Alert the user that there was an error placing their order and display the error message DH
      console.error("Order error:", error); // Log the error to the console for debugging purposes DH
    } // End of try-catch block for order submission DH
  }); // End of submit event listener for the order form DH

  // Handle logout
  logoutBtn.addEventListener("click", async () => { // Add click event listener to the logout button DH
    try { // Try to sign out the user and handle any errors that may occur DH
      await signOut(auth); // Sign out the currently authenticated user DH
      alert("Logged out successfully!"); // Alert the user that they have been logged out successfully DH
      window.location.href = "login.html"; // Redirect to the login page after successful logout DH
    } catch (error) { // Catch and handle any errors that occur during the logout process DH
      alert("Error logging out: " + error.message); // Alert the user that there was an error logging out and display the error message DH
    } // End of try-catch block for logout DH
  }); // End of click event listener for the logout button DH
}); // End of DOMContentLoaded event listener DH