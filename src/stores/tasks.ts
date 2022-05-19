import { collection, getFirestore, onSnapshot, query, where, addDoc } from 'firebase/firestore';
import { TTask } from './../types/task.cls';
import { derived } from 'svelte/store';
import { fbapp } from './fbapp';
import { fbuser } from './fbuser';
import { date } from './date';
import type { TaskType } from './../types/task.type.enum';

function createTasksStore() {
  let colref = null;
  let uid: string = null;
  let curr_date: number = null;
  let unsub = () => { };

  const { subscribe } = derived<[typeof fbapp, typeof fbuser, typeof date], TTask[]>([fbapp, fbuser, date], ([$fbapp, $fbuser, $date], set) => {
    unsub();
    if ($fbapp && $fbuser) {
      uid = $fbuser.uid;
      curr_date = Math.floor($date.valueOf() / 8.64e7);
      colref = collection(getFirestore($fbapp), "tasks");
      const qry = query(colref, where("user_uid", "==", uid), where("date", "==", curr_date));
      unsub = onSnapshot(qry, (ss) => {
        let arr = [];
        ss.docs.forEach((d, i) => { arr[i] = new TTask(d) });
        set(arr);
      })
    }
    else {
      colref = null;
      uid = null;
      set([]);
      unsub = () => { };
    }

    console.log("tasks subscribe");

    return () => { unsub(); console.log("tasks unsubscribe") };
  }, [])

  function addTask(type: TaskType, text: string) {
    if (colref && uid && curr_date) {
      addDoc(colref, {
        user_uid: uid,
        date: curr_date,
        type: type,
        text: text,
        last_modified: Date.now(),
      })
    }
  }

  return {
    subscribe,
    addTask
  }
}

export const tasks = createTasksStore();