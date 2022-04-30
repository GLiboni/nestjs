import { CMFirestore } from './CMFirestore';
import { EntityWithId } from './../../entity/base.entity';

export class CMFirestoreRepository<T extends EntityWithId> {
  collectionPath: string;

  constructor(collectionPath: string) {
    this.collectionPath = collectionPath;
  }

  async find(): Promise<T[]> {
    const rows = await CMFirestore.get(this.collectionPath);
    return rows as T[];
  }

  async findOne(id: any): Promise<T> {
    const row = await CMFirestore.getById(this.collectionPath, id);
    return row as T;
  }

  async delete(id: any): Promise<boolean> {
    return CMFirestore.delete(this.collectionPath, id);
  }

  async save(data: any): Promise<T> {
    const { id } = data;
    const isNew = !id;

    if (isNew) {
      return CMFirestore.add(this.collectionPath, data);
    }

    await CMFirestore.update(this.collectionPath, id, data);
    return this.findOne(id);
  }

  create(data: any): T {
    return data as T;
  }
}
