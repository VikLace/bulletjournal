import { collection, getFirestore, onSnapshot, query, where, addDoc } from 'firebase/firestore';
import { TCollection } from './../types/collection.cls';
import { derived } from 'svelte/store';
import { fbapp } from './fbapp';
import { fbuser } from './fbuser';
import { fbfiles } from './fbfiles';
import { listAll, ref, uploadBytes } from 'firebase/storage';

function createCollectionsStore() {
  let fbf = null;
  let colref = null;
  let uid: string = null;
  let unsub = () => { };

  const { subscribe } = derived<[typeof fbapp, typeof fbuser, typeof fbfiles], TCollection[]>([fbapp, fbuser, fbfiles], ([$fbapp, $fbuser, $fbfiles], set) => {
    unsub();
    if ($fbapp && $fbuser && $fbfiles) {
      fbf = $fbfiles;
      uid = $fbuser.uid;
      colref = collection(getFirestore($fbapp), "collections");
      const qry = query(colref, where("user_uid", "==", uid));
      unsub = onSnapshot(qry, (ss) => {
        let cols = [];
        ss.docs.forEach((d, i) => { 
          cols[i] = new TCollection(d);
          const listRef = ref(fbf, d.id);
          listAll(listRef)
            .then((res) => {res.items.forEach(iref => cols[i].files.push(iref)); console.log(`found ${cols[i].files.length} attached files`)})
            .catch((error) => { console.log("failed to listAll files for collection", error.code) });
        });
        set(cols);
      })
    }
    else
    {
      fbf = null;
      colref = null;
      uid = null;
      set([]);
      unsub = () => { };
    }

    console.log("collections subscribe");

    return () => { unsub(); console.log("collections unsubscribe") };
  },[])

  //todo: move to tdbrecord?
  function addCollection(title: string, text: string, files: File[]) {
    if (colref && uid) {
      addDoc(colref, {
        user_uid: uid,
        title: title,
        text: text,
        last_modified: Date.now(),
      }).then((dref) => {
        if (fbf && files && files.length > 0){
          let collStorage = ref(fbf, dref.id);
          files.forEach(f => {
            let fileStorage = ref(collStorage, f.name);
            uploadBytes(fileStorage, f).then(() => {
                console.log("uploaded file", f.name);
              },
              (error) => {
                console.log("failed to upload file", f.name, error.code);
              });
          });
        }
      })
    }
  }

  return {
    subscribe,
    addCollection
  }
}

export const collections = createCollectionsStore();