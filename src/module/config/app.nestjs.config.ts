import { AppLogger } from './../logger/app-logger.service';
import { INestApplication } from '@nestjs/common';
import ExpressRequestId from 'express-request-id';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default (app: INestApplication) => {
  app.use(ExpressRequestId());
  app.useLogger(app.get(AppLogger));

  const options = new DocumentBuilder()
    .setTitle('Nestjs')
    .setDescription('The Nestjs API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};