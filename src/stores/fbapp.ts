import { initializeApp, type FirebaseApp } from "firebase/app";
import { readable } from 'svelte/store';

const firebaseConfig = {
  apiKey: "AIzaSyCCEM-_JPZ_-9cFTwXxUGaaBGMsCm5Zd14",
  authDomain: "bulletjournal-fe44c.firebaseapp.com",
  projectId: "bulletjournal-fe44c",
  storageBucket: "bulletjournal-fe44c.appspot.com",
  messagingSenderId: "815049421468",
  appId: "1:815049421468:web:414f3732399f8b46f57359",
};

function createFirebaseApp() {

  const { subscribe } = readable<FirebaseApp>(null, set => {
    let fbapp = initializeApp(firebaseConfig);
    set(fbapp);
    console.log("fbapp subscribe");

    return () => { console.log("fbapp unsubscribe") };
  })

  return {
    subscribe
  }
}

export const fbapp = createFirebaseApp();