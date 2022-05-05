import { addDoc, collection, deleteDoc, getFirestore, type DocumentData, type DocumentReference } from 'firebase/firestore';

export abstract class TDBRecord {
  id: string;
  ref: DocumentReference;
  user_uid: string;
  last_modified: number;

  constructor(data: DocumentData) {
    this.id = data.id;
    this.ref = data.ref;
    let d = data.data();
    this.user_uid = d.user_uid;
    this.last_modified = d.last_modified;
    this.LoadAdditionalData(d);

    // this.colref = collection(getFirestore(), "collections");
  }

  protected abstract LoadAdditionalData(d: any): void;

  // public async Insert(obj: Object): Promise<DocumentReference> {
  //   return await addDoc(obj);
  // }

  public async Delete(): Promise<void> {
    await deleteDoc(this.ref);
  }
}