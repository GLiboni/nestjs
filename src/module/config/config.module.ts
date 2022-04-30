import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './../../filter/error.filter';
import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [
  ],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`.env`),
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter
    }
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
