import { SlackLoggerService } from './slack-logger.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { ConfigService } from './../config/config.service';
import { WinstonModule } from 'nest-winston';
import { ConfigModule } from './../config/config.module';
import { Global, Module } from '@nestjs/common';
import { AppLogger } from './app-logger.service';
import { createLoggerConfig } from './logger-factory';

@Global()
@Module({
  imports: [
    ConfigModule,
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return createLoggerConfig(config.appConfig);
      },
      inject: [ConfigService],
    }),
    MorganModule
  ],
  providers: [
    AppLogger,
    SlackLoggerService
  ],
  exports: [AppLogger, SlackLoggerService],
})
export class LoggerModule { }
