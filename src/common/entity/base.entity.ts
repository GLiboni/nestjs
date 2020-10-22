import { VersionColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { UpdateDateColumn } from 'typeorm';
import { Entity as EntityAnnotation, PrimaryGeneratedColumn } from 'typeorm';

@EntityAnnotation()
export class Entity {
  @UpdateDateColumn()
  public updated_date: Date;

  @CreateDateColumn()
  public created_date: Date;

  @VersionColumn()
  public version: number;
}

export class EntityWithId<T = number> extends Entity {
  @PrimaryGeneratedColumn()
  id: T;
}
