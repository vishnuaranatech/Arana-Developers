import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDj3uN6hLkfWe257z6IfYB0UQXElYbw5hs",
  authDomain: "arana-developers.firebaseapp.com",
  projectId: "arana-developers",
  storageBucket: "arana-developers.firebasestorage.app",
  messagingSenderId: "556435343276",
  appId: "1:556435343276:web:e4462308e986ec887ddc09",
};

const app = initializeApp(firebaseConfig);

// ✅ ADD THESE (THIS FIXES YOUR ERROR)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


