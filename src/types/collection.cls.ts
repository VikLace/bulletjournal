import type { DocumentData } from 'firebase/firestore';
import { deleteObject, type StorageReference } from 'firebase/storage';
import { TDBRecord } from './dbrecord.cls';

export class TCollection extends TDBRecord {
  title: string;
  text: string;
  files: StorageReference[];

  constructor(data?: DocumentData) {
    super(data);
    this.files = [];
  }

  public async Delete(): Promise<void> {
    let farray = [...this.files];
    await super.Delete().then(() => {
      farray.forEach(file => {
        let name = file.name;
        deleteObject(file)
          .then(() => { console.log("deleted file", name) })
          .catch((error) => { console.log("failed to delete file", name, error.code) });
      });
    });
  }

  protected LoadAdditionalData(d: any): void {
    this.title = d.title;
    this.text = d.text;
  }

  protected SaveAdditionalData(): {} {
    return {
      title: this.title,
      text: this.text
    };
  }
}