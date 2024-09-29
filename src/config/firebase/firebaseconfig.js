import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAUrajyr2eKNWyY_OvnxQpCfehNz3dCk0U",
  authDomain: "reactblogapp-21422.firebaseapp.com",
  projectId: "reactblogapp-21422",
  storageBucket: "reactblogapp-21422.appspot.com",
  messagingSenderId: "837656406510",
  appId: "1:837656406510:web:39720d8dc4efd7ad02c6ff",
  measurementId: "G-REWMKS2Q3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
