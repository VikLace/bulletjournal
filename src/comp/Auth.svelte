<script lang="ts">
  import "firebaseui/dist/firebaseui.css";
  import { GoogleAuthProvider } from "firebase/auth";
  import { browser } from "$app/env";
  import { fbauth } from "./../stores/fbauth";
  import { fbuser } from "./../stores/fbuser";

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false //manually handle "redirect"
    },
  };

  const addSignInUI = async () => {
    if (browser && !$fbuser) {
      const { auth } = await import("firebaseui");
      let ui = auth.AuthUI.getInstance() ?? new auth.AuthUI($fbauth);
      ui.start("#firebaseui-auth-container", uiConfig);
    }
  };

  $: $fbuser, addSignInUI();
</script>

{#if $fbuser}
  <button on:click={() => fbauth.signOut()}>Sign out</button>
{:else}
  <div id="firebaseui-auth-container" />
{/if}
