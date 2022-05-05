import { TDBRecord } from './dbrecord.cls';

export class TCollection extends TDBRecord {
  title: string;
  text: string;

  protected LoadAdditionalData(d: any): void {
    this.title = d.title;
    this.text = d.text;
  }
}