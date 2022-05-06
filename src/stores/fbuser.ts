import { readable } from 'svelte/store'
import type { User } from 'firebase/auth'
import { browser } from '$app/env'

function createFirebaseUser() {
  const { subscribe } = readable<User>(undefined, set => {
    let unsubscribe = () => { };
    async function init() {
      if (browser) {
        const { fbauth } = await import('./fbauth');
        const { onAuthStateChanged } = await import('firebase/auth');
        fbauth.subscribe((auth) => { if (auth) { unsubscribe = onAuthStateChanged(auth, set) } });
      }
      else {
        set(null)
      }
    }
    init();
    return () => unsubscribe();
  })

  return {
    subscribe
  }
}

export const fbuser = createFirebaseUser()