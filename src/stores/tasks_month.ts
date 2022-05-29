import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { TTask } from '../types/task.cls';
import { derived } from 'svelte/store';
import { fbapp } from './fbapp';
import { fbuser } from './fbuser';
import { monthdate } from './date';
import { emptyFunction, firstDayOfMonth, fullDays, lastDayOfMonth } from './../utils/utils';
import { curr_filter } from './curr_filter';

function createMonthTasksStore() {
  let colref = null;
  let uid: string = null;
  let firstDay: number = null;
  let lastDay: number = null;
  let unsub = emptyFunction;

  const { subscribe } = derived<[typeof fbapp, typeof fbuser, typeof monthdate], TTask[]>([fbapp, fbuser, monthdate], ([$fbapp, $fbuser, $monthdate], set) => {
    unsub();
    if ($fbapp && $fbuser && $monthdate) {
      firstDay = fullDays(firstDayOfMonth($monthdate));
      lastDay = fullDays(lastDayOfMonth($monthdate));

      uid = $fbuser.uid;
      colref = collection(getFirestore($fbapp), "tasks");
      const qry = query(colref, where("user_uid", "==", uid), where("date", ">=", firstDay), where("date", "<=", lastDay));
      unsub = onSnapshot(qry, (ss) => {
        const arr = [];
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
      unsub = emptyFunction;
    }

    return unsub;
  }, [])

  return {
    subscribe,
  }
}

export const month_tasks = createMonthTasksStore();

function createMonthTasksCountStore() {
  const { subscribe } = derived<[typeof month_tasks, typeof curr_filter], Map<number,number>>([month_tasks, curr_filter], ([$month_tasks, $curr_filter], set) => {
    if ($month_tasks && $month_tasks.length > 0) {
      const arr = new Map<number,number>();
      for (const task of $month_tasks) {
        if ($curr_filter && task.type != $curr_filter)
          continue;
        const day = new Date(new Date(0).setDate(task.date)).getDate();
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

    return emptyFunction;
  }, null)

  return {
    subscribe,
  }
}

export const month_tasks_count = createMonthTasksCountStore();