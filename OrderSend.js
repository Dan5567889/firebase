// OrderSend.js

// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
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

// Get references to HTML elements (updated for new structure)
const foodItemSelect = document.getElementById('foodItem');
const quantityInput = document.getElementById('quantity');
const totalDisplaySpan = document.getElementById('totalDisplay');
const totalHiddenInput = document.getElementById('total');
const orderForm = document.getElementById('orderForm');

let currentUserId = null; // To store the authenticated user's ID

// Set up anonymous authentication listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUserId = user.uid;
    console.log("Logged in anonymously with UID:", currentUserId);
  } else {
    // If no user is logged in, sign in anonymously
    signInAnonymously(auth)
      .then(() => {
        // User is now logged in anonymously, onAuthStateChanged will be triggered again
      })
      .catch((error) => {
        console.error("Error signing in anonymously:", error);
        alert("Failed to authenticate. Please try again.");
      });
  }
});

// Function to calculate and update the total price
function calculateTotal() {
    // Ensure an option is selected before trying to read its data
    if (foodItemSelect.value === "") {
        totalDisplaySpan.textContent = '0.00';
        totalHiddenInput.value = '0.00';
        return;
    }

    const selectedOption = foodItemSelect.options[foodItemSelect.selectedIndex];
    const price = parseFloat(selectedOption.dataset.price || '0');
    const quantity = parseInt(quantityInput.value, 10);

    if (!isNaN(price) && price > 0 && !isNaN(quantity) && quantity > 0) {
        const total = (price * quantity).toFixed(2);
        totalDisplaySpan.textContent = total;
        totalHiddenInput.value = total; // Set hidden input value for form submission
    } else {
        totalDisplaySpan.textContent = '0.00';
        totalHiddenInput.value = '0.00';
    }
}

// Event listeners for changes in item selection or quantity to recalculate total
foodItemSelect.addEventListener('change', calculateTotal);
quantityInput.addEventListener('input', calculateTotal);

// Initial calculation when the page loads, after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Ensure a default item is selected for initial calculation if not already done by HTML
    if (foodItemSelect.value === "") {
        // Find the first non-disabled option and select it
        for (let i = 0; i < foodItemSelect.options.length; i++) {
            if (!foodItemSelect.options[i].disabled) {
                foodItemSelect.selectedIndex = i;
                break;
            }
        }
    }
    calculateTotal();
});


// Handle form submission
orderForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!currentUserId) {
        alert("Authentication in progress. Please wait a moment and try again.");
        return;
    }

    const selectedItemOption = foodItemSelect.options[foodItemSelect.selectedIndex];
    // We'll store the text of the selected option as the item name
    const item = selectedItemOption.textContent.split('(')[0].trim(); 
    const quantity = parseInt(quantityInput.value, 10);
    const total = parseFloat(totalHiddenInput.value); // Get the calculated total from the hidden input

    if (!item || quantity <= 0 || isNaN(total) || total <= 0) {
        alert("Please select a valid item and quantity.");
        return;
    }

    try {
        await addDoc(collection(db, "orders"), {
            userId: currentUserId, // Use the authenticated user's UID
            item: item,
            quantity: quantity,
            total: total,
            status: "pending", // Add the status field
            timestamp: serverTimestamp() // Use serverTimestamp for accuracy
        });

        alert("Order placed successfully!");
        orderForm.reset(); // Clear the form
        // Reset dropdown and recalculate total after clearing
        foodItemSelect.selectedIndex = 0; // Select the '-- Select an item --' option
        calculateTotal(); 

    } catch (error) {
        console.error("Error adding order:", error);
        alert("Error placing order. Please try again.");
    }
});
