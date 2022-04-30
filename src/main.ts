import { CMFirebase } from './common/class/firebase/CMFirebase';
import { SlackLoggerService } from './module/logger/slack-logger.service';
import { ConfigService } from './module/config/config.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import nestjsConfig from './module/config/app.nestjs.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const slackLogger = app.get(SlackLoggerService);
  const configService: ConfigService = app.get(ConfigService);
  slackLogger.log(`App starting..`);
  nestjsConfig(app);
  const port = configService.appConfig.port;
  CMFirebase.initializeApp('./serviceAccountKey.json');
  await app.listen(port);
  slackLogger.log(`App started on port ${port}`);
}
bootstrap();
