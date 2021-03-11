import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDUAbOo_7BC7plrV9QOly_I1kZ2FLW1pqE",
    authDomain: "reddit-project-62372.firebaseapp.com",
    projectId: "reddit-project-62372",
    storageBucket: "reddit-project-62372.appspot.com",
    messagingSenderId: "775259665495",
    appId: "1:775259665495:web:3c8b113a01d73a0fa01f12",
  });

export const auth = app.auth();
export default app;