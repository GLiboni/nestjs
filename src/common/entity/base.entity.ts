export class Entity {
  public updated_date: Date;

  public created_date: Date;

  public version: number;
}

export class EntityWithId<T = number> extends Entity {
  id: T;
}
