import { INestApplication } from '@nestjs/common';
import ExpressRequestId from 'express-request-id';

export default (app: INestApplication) => {
  app.use(ExpressRequestId());
};