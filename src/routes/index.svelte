<script lang="ts">
  import { onMount } from "svelte";
  import { initializeApp } from "firebase/app";
  import {
    GoogleAuthProvider,
    getAuth,
    onAuthStateChanged,
  } from "firebase/auth";
  import type { User } from "firebase/auth";
  import { auth } from "firebaseui";
  import "firebaseui/dist/firebaseui.css";

  let user: User = null;

  const firebaseConfig = {
    apiKey: "AIzaSyCCEM-_JPZ_-9cFTwXxUGaaBGMsCm5Zd14",
    authDomain: "bulletjournal-fe44c.firebaseapp.com",
    projectId: "bulletjournal-fe44c",
    storageBucket: "bulletjournal-fe44c.appspot.com",
    messagingSenderId: "815049421468",
    appId: "1:815049421468:web:414f3732399f8b46f57359",
  };

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: function (
        authResult: any,
        redirectUrl: any
      ) {
        return false; //manually handle "redirect"
      },
    },
  };
  let ui: auth.AuthUI = null;

  const addSignInUI = () => {
    if (!user) {
      if (!ui) ui = new auth.AuthUI(getAuth());
      ui.start("#firebaseui-auth-container", uiConfig);
    }
  };

  onMount(() => {
    initializeApp(firebaseConfig);
    onAuthStateChanged(getAuth(), (u) => {
      user = u;
    });
    addSignInUI();
  });

  const signOut = () => {
    if (user) {
      getAuth()
        .signOut()
        .then(() => {
          addSignInUI();
        });
    }
  };
</script>

{#if user}
  <h1>Welcome to Your bullet journal, {user.displayName}!</h1>
  <button on:click={signOut}>Sign out</button>
{:else}
  <h1>Welcome to bullet journal</h1>
  <div id="firebaseui-auth-container" />
{/if}

<style>
</style>
