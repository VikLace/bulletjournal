import { readable } from 'svelte/store'
import type { Auth } from 'firebase/auth'
import { browser } from '$app/env'

function createFirebaseAuth() {
  let fbauth: Auth = null;

  const { subscribe } = readable<Auth>(undefined, set => {
    async function init() {
      if (browser) {
        const { fbapp } = await import('./fbapp');
        const { getAuth } = await import('firebase/auth');
        fbapp.subscribe((app) => {
          if (app) {
            fbauth = getAuth(app);
            set(fbauth)
          }
        });
      }
      else {
        set(null)
      }
    }
    init();
    return () => { };
  })

  async function signOut() {
    const { signOut } = await import('firebase/auth')
    await signOut(fbauth);
  }

  return {
    subscribe,
    signOut
  }
}

export const fbauth = createFirebaseAuth()