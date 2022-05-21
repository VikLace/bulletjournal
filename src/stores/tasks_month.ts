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

  const { subscribe } = derived<[typeof fbapp, typeof fbuser, typeof monthdate], TTask[]>([fbapp, fbuser, monthdate], ([$fbapp, $fbuser, $monthdate], set) => {
    unsub();
    if ($fbapp && $fbuser && $monthdate) {
      firstDay = fullDays(firstDayOfMonth($monthdate));
      lastDay = fullDays(lastDayOfMonth($monthdate));

      uid = $fbuser.uid;
      colref = collection(getFirestore($fbapp), "tasks");
      const qry = query(colref, where("user_uid", "==", uid), where("date", ">=", firstDay), where("date", "<=", lastDay));
      unsub = onSnapshot(qry, (ss) => {
        let arr = [];
        ss.docs.forEach((d, i) => { arr[i] = new TTask(d) });
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

    console.log("month_tasks subscribe");

    return () => { unsub(); console.log("month_tasks unsubscribe") };
  }, [])

  return {
    subscribe,
  }
}

export const month_tasks = createMonthTasksStore();

function createMonthTasksCountStore() {
  const { subscribe } = derived<typeof month_tasks, Map<number,number>>(month_tasks, ($month_tasks, set) => {
    if ($month_tasks && $month_tasks.length > 0) {
      let arr = new Map<number,number>();
      for (const task of $month_tasks) {
        let day = new Date(new Date(0).setDate(task.date)).getDate();
        if (arr.has(day))
        {
          let val = arr.get(day);
          arr.set(day, ++val);
        }
        else
          arr.set(day, 1);
      }
      set(arr);
    }
    else
      set(null);

    console.log("month_tasks_count subscribe");

    return () => { console.log("month_tasks_count unsubscribe") };
  }, null)

  return {
    subscribe,
  }
}

export const month_tasks_count = createMonthTasksCountStore();