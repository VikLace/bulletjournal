import type { TaskType } from "./task.type.enum";
import type { DocumentData } from 'firebase/firestore';

export class TTask {
  id: string;
  user_uid: string;
  date: number; //days since epoch = Math.floor(now/8.64e7)
  text: string;
  type: TaskType;
  done?: boolean;
  start?: number; //minutes (since day start)
  duration?: number; //minutes

  constructor(data: DocumentData) {
    this.id = data.id;
    let d = data.data();
    this.user_uid = d.user_uid;
    this.date = d.date;
    this.text = d.text;
    this.type = d.type;
    if (d.done) this.done = d.done;
    if (d.start) this.start = d.start;
    if (d.duration) this.duration = d.duration;
  }
}