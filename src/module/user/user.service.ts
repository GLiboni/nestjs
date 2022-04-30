import { CMFirestoreRepository } from './../../common/class/firebase/CMFirestoreRepository';
import { User } from './../../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/service/crud.service';

@Injectable()
export class UserService extends CrudService<User> {
  constructor() {
    super();

    const userRepository = new CMFirestoreRepository<User>('users');
    this.setRepository(userRepository);
  }
}
