import * as firebase from 'firebase-admin';

export class CMFirestore {
  static async add(collection: string, data: any): Promise<any> {
    const docRef = await this.getFirestore().collection(collection).add(data);
    const doc = await docRef.get();
    return this.transform(doc);
  }

  static async get(collection: string): Promise<any[]> {
    const querySnapshot = await this.getFirestore()
      .collection(collection)
      .get();
    const docs: any[] = [];
    querySnapshot.forEach((doc) => {
      docs.push(this.transform(doc));
    });
    return docs;
  }

  static async getById(collection: string, id: string): Promise<any> {
    const doc = await this.getFirestore().collection(collection).doc(id).get();
    return doc.exists ? this.transform(doc) : null;
  }

  static async update(
    collection: string,
    id: string,
    data: any,
  ): Promise<boolean> {
    await this.getFirestore().collection(collection).doc(id).update(data);
    return true;
  }

  static async delete(collection: string, id: string): Promise<boolean> {
    await this.getFirestore().collection(collection).doc(id).delete();
    return true;
  }

  private static transform(doc: any) {
    return { id: doc.id, ...doc.data() };
  }

  private static getFirestore() {
    return firebase.firestore();
  }
}
