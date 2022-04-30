import { UserCreationRequestDTO, UserUpdateRequestDTO } from './user.types';
import { CrudController } from './../../common/controller/crud.controller';
import { User } from './../../entity/user.entity';
import { UserService } from './user.service';
import { Body, Controller, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MorganInterceptor } from 'nest-morgan';

@ApiTags('user')
@Controller('user')
@UseInterceptors(MorganInterceptor('combined'))
export class UserController extends CrudController<User, UserCreationRequestDTO, UserUpdateRequestDTO, number> {
  constructor(service: UserService) {
    super(service);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() body: UserCreationRequestDTO): Promise<User> {
    return this.service.create(body);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: number, @Body() body: UserUpdateRequestDTO): Promise<User> {
    return this.service.update(id, body);
  }
}
