import type { TaskType } from "./task.type.enum";
import { TDBRecord } from "./dbrecord.cls";

export class TTask extends TDBRecord {
  date: number; //days since epoch = Math.floor(now/8.64e7)
  text: string;
  type: TaskType;
  done?: boolean;
  start?: number; //minutes (since day start)
  duration?: number; //minutes

  protected LoadAdditionalData(d: any): void {
    this.date = d.date;
    this.text = d.text;
    this.type = d.type;
    if (d.done) this.done = d.done;
    if (d.start) this.start = d.start;
    if (d.duration) this.duration = d.duration;
  }
}