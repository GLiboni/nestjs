import { LoggerModule } from './module/logger/logger.module';
import { UserModule } from './module/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './module/config/config.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
