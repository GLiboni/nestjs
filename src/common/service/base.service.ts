import { CMFirestoreRepository } from './../class/firebase/CMFirestoreRepository';
import { EntityWithId } from './../entity/base.entity';
import { Processor } from './../processors/processor.interface';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BaseService<T extends EntityWithId> {
  preProcessorList: Processor[] = [];
  postProcessorList: Processor[] = [];
  repository: CMFirestoreRepository<T>;

  public addPostProcessor(p: Processor) {
    this.postProcessorList.push(p);
  }

  public addPreProcessor(p: Processor) {
    this.preProcessorList.push(p);
  }

  public processOutput(t: any): any {
    let result = t;
    for (const processor of this.postProcessorList) {
      result = processor.process(result);
    }
    return result;
  }

  public processInput(t: any): any {
    let result = t;
    for (const processor of this.preProcessorList) {
      result = processor.process(result);
    }
    return result;
  }

  public setRepository(repo: CMFirestoreRepository<T>) {
    this.repository = repo;
  }

  public async getAll(): Promise<T[]> {
		return this.processOutput(await this.repository.find());
  }

  public async getOneOrThrow<idType>(id: idType): Promise<T> {
    const found = await this.repository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }

    return this.processOutput(found);
  }

  public async create(entity: any): Promise<T> {
    const processed = this.processInput(entity);
    const saved = await this.repository.save(processed);
    return this.processOutput(await this.repository.findOne(saved.id));
  }

  public async update<idType>(id: idType, entity: any): Promise<T> {
    const found: T = await this.getOneOrThrow(id);
    const entityToSave = this.repository.create(entity);
    entityToSave.id = found.id;
    const processed = this.processInput(entityToSave);
    await this.repository.save(processed);
    return this.processOutput(await this.repository.findOne(id));
  }

  async remove<idType>(id: idType): Promise<void> {
    await this.repository.delete(id);
  }
}
