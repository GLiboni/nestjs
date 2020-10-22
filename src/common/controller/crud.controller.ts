import { EntityWithId } from './../entity/base.entity';
import { CrudService } from '../service/crud.service';
import { Get, ParseIntPipe, Param, Post, Body, Put, Delete, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';

export class CrudController<T extends EntityWithId, CreationRequestDTO, UpdateRequestDTO, idType = number> {
  service: CrudService<T>;

  constructor(service: CrudService<T>) {
    this.service = service;
  }

  @Get('')
  getAll(): Promise<T[]> {
    return this.service.getAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  getOne(@Param('id') id: idType): Promise<T> {
    return this.service.getOneOrThrow(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreationRequestDTO): Promise<T> {
    return this.service.create(body);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: idType, @Body() body: UpdateRequestDTO): Promise<T> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  delete(@Param('id') id: idType): Promise<void> {
    return this.service.remove(id);
  }
}
