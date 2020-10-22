import { User } from './../../entity/user.entity';
import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  public async getAll(): Promise<User[]> {
    return this.repository.find();
  }

  public async getOneOrThrow(id: number): Promise<User> {
    const found = await this.repository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  public async create(entity: any): Promise<User> {
    this.checkIsArray(entity);
    delete entity.id;
    const saved = await this.repository.save(entity);
    return this.repository.findOne(saved.id);
  }

  public async update(id: number, entity: any): Promise<User> {
    this.checkIsArray(entity);
    const found = await this.getOneOrThrow(id);
    const entityToSave = this.repository.create(entity);
    entityToSave['id'] = found['id'];
    await this.repository.save(entityToSave);
    return this.repository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  protected checkIsArray(entity) {
    if (Array.isArray(entity)) {
      throw new NotAcceptableException();
    }
  }
}
