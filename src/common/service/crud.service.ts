import { EntityWithId } from './../entity/base.entity';
import { CreationRequestDTO, UpdateRequestDTO } from './../types/base.types';
import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';

@Injectable()
export abstract class CrudService<T extends EntityWithId> extends BaseService<T> {
  public async create(entity: CreationRequestDTO): Promise<T> {
    return super.create(entity);
  }

  public async update<idType>(id: idType, entityToUpdate: UpdateRequestDTO): Promise<T> {
    return super.update(id, entityToUpdate);
  }
}
