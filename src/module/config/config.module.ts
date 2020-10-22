import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './../../filter/error.filter';
import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './db.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return dbConfig(config.appConfig);
      },
      inject: [ConfigService],
    })
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
