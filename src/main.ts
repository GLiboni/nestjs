import { ConfigService } from './module/config/config.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import nestjsConfig from './module/config/app.nestjs.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  nestjsConfig(app);
  const port = configService.appConfig.port;
  await app.listen(port);
}
bootstrap();
