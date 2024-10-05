import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCchGzWY79bzUlhx6qYNt1io1JxET_hgKc",
  authDomain: "firebae-586a8.firebaseapp.com",
  projectId: "firebae-586a8",
  storageBucket: "firebae-586a8.appspot.com",
  messagingSenderId: "627446747639",
  appId: "1:627446747639:web:d6fef0b12b3bd1411ddef2",
  measurementId: "G-X2MTWP8VGD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
