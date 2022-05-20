import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { TTask } from '../types/task.cls';
import { derived } from 'svelte/store';
import { fbapp } from './fbapp';
import { fbuser } from './fbuser';
import { monthdate } from './date';
import { firstDayOfMonth, fullDays, lastDayOfMonth } from './../utils/utils';

function createMonthTasksStore() {
  let colref = null;
  let uid: string = null;
  let firstDay: number = null;
  let lastDay: number = null;
  let unsub = () => { };

  const { subscribe } = derived<[typeof fbapp, typeof fbuser, typeof monthdate], number[][]>([fbapp, fbuser, monthdate], ([$fbapp, $fbuser, $monthdate], set) => {
    unsub();
    if ($fbapp && $fbuser && $monthdate) {
      firstDay = fullDays(firstDayOfMonth($monthdate));
      lastDay = fullDays(lastDayOfMonth($monthdate));

      uid = $fbuser.uid;
      colref = collection(getFirestore($fbapp), "tasks");
      const qry = query(colref, where("user_uid", "==", uid), where("date", ">=", firstDay), where("date", "<=", lastDay));
      unsub = onSnapshot(qry, (ss) => {
        let arr: number[][] = [];
        ss.docs.forEach((d) => { 
          let data: TTask = new TTask(d);
          let day = new Date(new Date(0).setDate(data.date)).getDate();
          let row = arr[day];
          if (!row)
            arr[day] = [];
          let val = arr[day][data.type];
          arr[day][data.type] = val ? ++val : 1;
        });
        set(arr);
      })
    }
    else {
      colref = null;
      uid = null;
      firstDay = null;
      lastDay = null;
      set([]);
      unsub = () => { };
    }

    console.log("monthtasks subscribe");

    return () => { unsub(); console.log("monthtasks unsubscribe") };
  }, [])

  return {
    subscribe,
  }
}

export const month_tasks = createMonthTasksStore();