import { writable, derived, type Updater } from "svelte/store";
import { browser } from "$app/env";
import { firstDayOfMonth, fullDays, lastDayOfMonth } from "./../utils/utils";

function createDateStore() {
  const storedDate = browser ? localStorage.getItem("SavedDate") : null;
  let locDate: Date = new Date(storedDate ? Date.parse(storedDate) : Date.now());
  
  const innerStore = writable<Date>(locDate, () => {
    console.log("date subscribe");
    return () => {
      if (browser) localStorage.setItem("SavedDate", locDate.toDateString());
      console.log("date unsubscribe");
    }
  });

  const update = (fn: Updater<Date>) => {
    locDate = fn(locDate);
    innerStore.set(locDate);
  }

  const set = (val: Date) => {
    locDate = val;
    innerStore.set(val);
  }

  return {
    subscribe: innerStore.subscribe,
    set,
    update,
    reset: () => {
      locDate = new Date();
      set(locDate);
      if (browser) localStorage?.removeItem("SavedDate");
    },
    addMonth: (m: number) => update((dt) => {
      let nd = new Date(dt);
      nd = new Date(nd.setMonth(nd.getMonth() + m));
      if (nd.getMonth()+(nd.getFullYear()*12) != dt.getMonth()+(dt.getFullYear()*12) + m)
      {
        nd = new Date(nd.setDate(0));
      }
      return nd;
    }),
    addDay: (d: number) => update((dt) => {
      let nd = new Date(dt);
      return new Date(nd.setDate(nd.getDate() + d))
    })
  }
}

export const date = createDateStore();

function createFirstLastMonthDayStore() {
  let firstDay: number = null;
  let lastDay: number = null;

  const innerStore = derived<typeof date, Date>(date, ($date, set) => {
    console.log("firstlastmonthday subscribe");
    if ($date) {
      let dt = fullDays($date);
      if (!firstDay || !lastDay || dt < firstDay || dt > lastDay)
      {
        firstDay = fullDays(firstDayOfMonth($date));
        lastDay = fullDays(lastDayOfMonth($date));
        set($date);
      }
    }
    else {
      firstDay = null;
      lastDay = null;
      set(null);
    }

    return () => { console.log("firstlastmonthday unsubscribe") };
  }, null)

  return {
    subscribe: innerStore.subscribe,
  }
}

export const monthdate = createFirstLastMonthDayStore();