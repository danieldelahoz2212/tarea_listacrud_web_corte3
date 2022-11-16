// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDcMQyJokThOaZWlmC1sYeCnQqvSNeafY",
    authDomain: "tarea2-web.firebaseapp.com",
    projectId: "tarea2-web",
    storageBucket: "tarea2-web.appspot.com",
    messagingSenderId: "798456837890",
    appId: "1:798456837890:web:385c4b072426fa625e341b"
};

// Initialize Firebase
const Fireapp = initializeApp(firebaseConfig);
const listaC = getFirestore(Fireapp);
export default Fireapp;
export { listaC }; 