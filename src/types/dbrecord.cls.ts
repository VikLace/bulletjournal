import { deleteDoc, updateDoc, type DocumentData, type DocumentReference } from 'firebase/firestore';

export abstract class TDBRecord {
  id: string;
  ref: DocumentReference;
  user_uid: string;
  last_modified: number;

  constructor(data?: DocumentData) {
    if (data)
    {
      this.id = data.id;
      this.ref = data.ref;
      const d = data.data();
      this.user_uid = d.user_uid;
      this.last_modified = d.last_modified;
      this.LoadAdditionalData(d);
    }
  }

  protected abstract LoadAdditionalData(d: Record<string, any>): void;
  protected abstract SaveAdditionalData(): Record<string, any>;

  public async Delete(): Promise<void> {
    await deleteDoc(this.ref);
  }

  private toUpdateData(): Record<string, any>{
    return { last_modified: Date.now(), ...this.SaveAdditionalData() };
  }

  public async Update(): Promise<void>{
    await updateDoc(this.ref, this.toUpdateData());
  }
}