import { collection, getFirestore, onSnapshot, query, where, addDoc } from 'firebase/firestore';
import { TCollection } from './../types/collection.cls';
import { derived } from 'svelte/store';
import { fbapp } from './fbapp';
import { fbuser } from './fbuser';

function createCollectionsStore() {
  let colref = null;
  let uid: string = null;

  const { subscribe } = derived<any, TCollection[]>([fbapp, fbuser], ([$fbapp, $fbuser], set) => {
    let unsub = () => { };
    if ($fbapp && $fbuser) {
      unsub();
      uid = $fbuser.uid;
      colref = collection(getFirestore($fbapp), "collections");
      const qry = query(colref, where("user_uid", "==", uid));
      unsub = onSnapshot(qry, (ss) => {
        let cols = [];
        ss.docs.forEach((d, i) => { cols[i] = new TCollection(d) });
        set(cols);
      })
    }
    else
      set([]);

    console.log("collections subscribe");

    return () => { unsub(); console.log("collections unsubscribe") };
  })

  function addCollection(title: string, text: string) {
    if (colref && uid) {
      addDoc(colref, {
        user_uid: uid,
        title: title,
        text: text,
        last_modified: Date.now(),
      })
    }
  }

  return {
    subscribe,
    addCollection
  }
}

export const collections = createCollectionsStore();