import { User } from './../../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../common/service/crud.service';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(@InjectRepository(User) userRepository: Repository<User>) {
    super();
    this.setRepository(userRepository);
  }
}
