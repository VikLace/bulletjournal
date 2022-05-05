import type { TaskType } from "./task.type.enum";
import type { DocumentData, DocumentReference } from 'firebase/firestore';

export class TTask {
  id: string;
  ref: DocumentReference;
  user_uid: string;
  date: number; //days since epoch = Math.floor(now/8.64e7)
  text: string;
  type: TaskType;
  last_modified?: number;
  done?: boolean;
  start?: number; //minutes (since day start)
  duration?: number; //minutes

  constructor(data: DocumentData) {
    this.id = data.id;
    this.ref = data.ref;
    let d = data.data();
    this.user_uid = d.user_uid;
    this.date = d.date;
    this.text = d.text;
    this.type = d.type;
    if (d.last_modified) this.last_modified = d.last_modified;
    if (d.done) this.done = d.done;
    if (d.start) this.start = d.start;
    if (d.duration) this.duration = d.duration;
  }
}