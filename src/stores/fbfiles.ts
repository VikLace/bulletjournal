import { getStorage, ref, type StorageReference } from "firebase/storage";
import { derived } from 'svelte/store';
import { fbapp } from "./fbapp";
import { fbuser } from './fbuser';

export const fbfiles = derived<[typeof fbuser, typeof fbapp], StorageReference>([fbuser, fbapp], 
  ([$fbuser, $fbapp], set) => {
    if ($fbapp && $fbuser) {
      const storage = getStorage($fbapp);
      const userStorageRef = ref(storage, $fbuser.uid);
      set(userStorageRef);
    }
    else {
      set(null);
    }

    console.log("fbfiles subscribe");

    return () => { console.log("fbfiles unsubscribe") };
  }, null);