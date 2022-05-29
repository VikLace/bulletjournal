import { initializeApp, type FirebaseApp } from "firebase/app";
import { emptyFunction } from "./../utils/utils";
import { readable } from 'svelte/store';

const firebaseConfig = {
  apiKey: "AIzaSyCCEM-_JPZ_-9cFTwXxUGaaBGMsCm5Zd14",
  authDomain: "bulletjournal-fe44c.firebaseapp.com",
  projectId: "bulletjournal-fe44c",
  storageBucket: "bulletjournal-fe44c.appspot.com",
  messagingSenderId: "815049421468",
  appId: "1:815049421468:web:414f3732399f8b46f57359",
};

export const fbapp = readable<FirebaseApp>(null, set => {
  set(initializeApp(firebaseConfig));
  return emptyFunction;
});