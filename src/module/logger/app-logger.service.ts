import { Injectable, LoggerService, Inject } from '@nestjs/common';
import { Logger } from 'winston';

@Injectable()
export class AppLogger implements LoggerService {
  constructor(@Inject('winston') private readonly logger: Logger) {
  }

  log(message: string) {
    this.logger.info(message);
  }
  error(message: string) {
    this.logger.error(message);
  }
  warn(message: string) {
    this.logger.warn(message);
  }
  debug(message: string) {
    this.logger.debug(message);
  }
  verbose(message: string) {
    this.logger.verbose(message);
  }
  info(message: string) {
    this.logger.info(message);
  }
}
