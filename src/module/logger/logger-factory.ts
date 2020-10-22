import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export function createLoggerConfig(appConfig: any) {
  const transport = new DailyRotateFile({
    filename: appConfig.log.fileName,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: appConfig.log.maxSize,
    maxFiles: appConfig.log.maxDays,
    level: appConfig.log.level,
  });

  let config;
  if (appConfig.debug) {
    config = {
      format: winston.format.simple(),
      transports: [
        new (winston.transports.Console)({
          level: appConfig.log.level,
        }),
        transport,
      ],
    };
  } else {
    config = {
      format: winston.format.simple(),
      transports: [
        transport,
      ],
    };
  }
  return config;

}
