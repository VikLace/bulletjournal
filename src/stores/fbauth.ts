import { derived } from 'svelte/store'
import { getAuth, type Auth } from 'firebase/auth'
import { browser } from '$app/env'
import { fbapp } from './fbapp';

function createFirebaseAuth() {
  let fba: Auth = null;

  const { subscribe } = derived<typeof fbapp, Auth>(fbapp, ($fbapp, set) => {
    fba = browser && $fbapp ? getAuth($fbapp) : null;
    set(fba);
    console.log("fbauth subscribe");
    return () => { console.log("fbauth unsubscribe") };
  }, null)

  async function signOut() {
    if (fba) {
      const { signOut } = await import('firebase/auth')
      await signOut(fba);
    }
  }

  return {
    subscribe,
    signOut
  }
}

export const fbauth = createFirebaseAuth()