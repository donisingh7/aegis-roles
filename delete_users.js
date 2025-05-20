// createUsers.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// ——— अपनी firebaseConfig यहाँ पेस्ट करें ———
const firebaseConfig = {
  apiKey: "AIzaSyBxMewzHndNZ9zTlWDqRx7x7Ius_KBA_wQ",
  authDomain: "space-station-game-cfe1f.firebaseapp.com",
  databaseURL: "https://space-station-game-cfe1f-default-rtdb.firebaseio.com",
  projectId: "space-station-game-cfe1f",
  storageBucket: "space-station-game-cfe1f.appspot.com",
  messagingSenderId: "393751799223",
  appId: "1:393751799223:web:8d7f624af774e996483432"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ——— दो नए users यहाँ define करें ———
const newUsers = {
  // पहली user के लिए UID बदलें
  "21456789": {
    Parent_User_id: 10265485,
    currentBalance: 0,
    earnedBalance: 0,
    lostAmount: 0,
    password: "c7cad73bdd",
    userType: "player_user",
    userid: "21456789"
  },
  // दूसरी user के लिए UID बदलें
  "21456790": {
    Parent_User_id: 10265485,
    currentBalance: 0,
    earnedBalance: 0,
    lostAmount: 0,
    password: "c7cad73bdd",
    userType: "player_user",
    userid: "21456790"
  }
};

async function createUsers() {
  for (const [uid, userData] of Object.entries(newUsers)) {
    await set(ref(db, `users/${uid}`), userData);
    console.log(`Created user /users/${uid}`);
  }
  console.log("✅ All users created with the same structure!");
}

createUsers().catch(err => {
  console.error("Error creating users:", err);
  process.exit(1);
});
