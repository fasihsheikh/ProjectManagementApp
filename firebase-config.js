// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS8Tt8HNYTTkcnhctt6THl4PGqfKzeliI",
  authDomain: "projectmanagementapp-5a7f0.firebaseapp.com",
  projectId: "projectmanagementapp-5a7f0",
  storageBucket: "projectmanagementapp-5a7f0.firebasestorage.app",
  messagingSenderId: "18436412161",
  appId: "1:18436412161:web:b5db8ade01e38765d4c100",
  measurementId: "G-B8PFZWPX6E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Initialize Firestore
const analytics = getAnalytics(app);  // Initialize Analytics

// Export Firestore db so you can use it elsewhere
export { db };
