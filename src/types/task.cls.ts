import type { TaskType } from "./task.type.enum";
import { TDBRecord } from "./dbrecord.cls";

export class TTask extends TDBRecord {
  date: number; //days since epoch = utils.fullDays
  text: string;
  type: TaskType;
  done?: boolean;

  protected LoadAdditionalData(d: any): void {
    this.date = d.date;
    this.text = d.text;
    this.type = d.type;
    if (d.done) this.done = d.done;
  }

  protected SaveAdditionalData(): Record<string, any> {
    let res: Record<string, any> = {
      date: this.date,
      text: this.text,
      type: this.type
    };
    if (this.done != null) res = {...res, done: this.done};
    return res;
  }
}