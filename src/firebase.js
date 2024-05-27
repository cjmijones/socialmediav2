// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfVDLMBCI9OiTvUf4SZQQJsAXOb4sydis",
  authDomain: "twitter-clone-8519c.firebaseapp.com",
  projectId: "twitter-clone-8519c",
  storageBucket: "twitter-clone-8519c.appspot.com",
  messagingSenderId: "46452488042",
  appId: "1:46452488042:web:ba0e85403688faf70cd713",
  measurementId: "G-6LP48L0W90",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
