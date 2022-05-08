import { derived } from 'svelte/store'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { browser } from '$app/env'
import { fbauth } from './fbauth'

function createFirebaseUser() {
  const { subscribe } = derived<typeof fbauth, User>(fbauth, ($fbauth, set) => {
    let unsubscribe = () => { };
    if (browser && $fbauth) {
      unsubscribe = onAuthStateChanged($fbauth, set);
    }
    else {
      set(null)
    }
    console.log("fbuser subscribe");
    return () => { unsubscribe(); console.log("fbuser unsubscribe") }
  }, null)

  return {
    subscribe
  }
}

export const fbuser = createFirebaseUser()