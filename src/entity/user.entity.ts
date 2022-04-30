import { EntityWithId } from './../common/entity/base.entity';

export class User extends EntityWithId<number> {
  firstName: string;

  lastName: string;

  isActive: boolean;
}