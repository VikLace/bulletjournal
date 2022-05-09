import { writable } from "svelte/store";

function createDateStore() {
  const storedDate = localStorage?.getItem("SavedDate");
  let locDate: Date = new Date(storedDate ? Date.parse(storedDate) : Date.now());

  const innerStore = writable<Date>(locDate, () => {
    console.log("date subscribe");
    return () => {
      localStorage?.setItem("SavedDate", locDate.toDateString());
      console.log("date unsubscribe");
    }
  });

  const update = (fn) => {
    fn(locDate);
    set(locDate);
  }
    
  const set = (val) => {
    locDate = val;
    locDate?.setHours(0,0,0,0);
    innerStore.set(val);
  }

  return {
    subscribe: innerStore.subscribe,
    set,
    update,
    reset: () => {
      locDate = new Date(Date.now()); 
      set(locDate); 
      localStorage?.removeItem("SavedDate")
    },
    addMonth: (m: number) => innerStore.update(dt => new Date(dt.setMonth(dt.getMonth() + m))),
    addDay: (d: number) => innerStore.update(dt => new Date(dt.setDate(dt.getDate() + d)))
  }
}

export const date = createDateStore();