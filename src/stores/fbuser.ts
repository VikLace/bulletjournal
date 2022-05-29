import { derived } from 'svelte/store'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { browser } from '$app/env'
import { fbauth } from './fbauth'
import { emptyFunction } from './../utils/utils'

export const fbuser = derived<typeof fbauth, User>(fbauth, ($fbauth, set) => {
  let unsubscribe = emptyFunction;
  if (browser && $fbauth) {
    unsubscribe = onAuthStateChanged($fbauth, set);
  }
  else {
    set(null);
  }
  return unsubscribe;
}, null);