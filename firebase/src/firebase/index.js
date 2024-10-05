
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBGDB3gkd4CQsmSghhVQb0mpF52pdhBTyE",
  authDomain: "fir-f87e4.firebaseapp.com",
  projectId: "fir-f87e4",
  storageBucket: "fir-f87e4.appspot.com",
  messagingSenderId: "333922006850",
  appId: "1:333922006850:web:ea17d1bc35ea483752fadb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };