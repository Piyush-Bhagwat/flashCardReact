import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAWubwct1EQqL50F6ge17cPE1UWwRjkGd4",
    authDomain: "flashcard-75ea0.firebaseapp.com",
    projectId: "flashcard-75ea0",
    storageBucket: "flashcard-75ea0.appspot.com",
    messagingSenderId: "949340562713",
    appId: "1:949340562713:web:67ffd499e1edffc4765188",
    measurementId: "G-GSVPJ8S5KK",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, provider);

export { db, storage, auth, signInWithGoogle };
