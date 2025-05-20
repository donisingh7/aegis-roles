// 1. Firebase SDK के माड्यूल इम्पोर्ट
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// 2. तुम्हारा firebaseConfig (screenshot से लिया हुआ)
const firebaseConfig = {
  apiKey: "AIzaSyBxMewzHndNZ9zTlWDqRx7x7Ius_KBA_wQ",
  authDomain: "space-station-game-cfe1f.firebaseapp.com",
  databaseURL: "https://space-station-game-cfe1f-default-rtdb.firebaseio.com",
  projectId: "space-station-game-cfe1f",
  storageBucket: "space-station-game-cfe1f.appspot.com",
  messagingSenderId: "393751799223",
  appId: "1:393751799223:web:8d7f624af774e996483432"
};

// 3. Initialize और Database एक्सपोर्ट
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
