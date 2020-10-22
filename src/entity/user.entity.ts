import { EntityWithId } from './../common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends EntityWithId<number> {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}