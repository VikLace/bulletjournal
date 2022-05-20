export const fullDays = (dt: Date) => Math.floor(dt.valueOf() / 8.64e7) + 1; //24*60*60*1000 ms/day

export const today = () => {
  let dt = new Date();
  return new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
}

export const daysInMonth = (m: number, y: number) => {
  return m === 2
    ? y & 3 || (!(y % 25) && y & 15)
      ? 28
      : 29
    : 30 + ((m + (m >> 3)) & 1);
}

export const firstDayOfMonth = (dt: Date) => new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), 1));

export const lastDayOfMonth = (dt: Date) => new Date(Date.UTC(dt.getFullYear(), dt.getMonth() + 1, 0));