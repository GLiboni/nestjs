import { UserService } from './user.service';
import { Controller, Get, Param, Body, Post, Put, HttpCode, Delete, ParseIntPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get('')
  getAll(): Promise<any[]> {
    return this.service.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id): Promise<any> {
    return this.service.getOneOrThrow(id);
  }

  @Post()
  create(@Body() body: any): Promise<any> {
    return this.service.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id, @Body() body: any) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.service.remove(id);
  }
}
