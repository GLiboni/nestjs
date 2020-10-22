import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export default function (appConfig: any): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    host: appConfig.db.host,
    port: appConfig.db.port,
    username: appConfig.db.user,
    password: appConfig.db.psw,
    database: appConfig.db.databaseName,
    entities: [path.resolve(path.join(__dirname, './../../entity/**.entity.{ts,js}'))],
    // Do you know the reason behind the "synchronization: false" option?
    // Every 'json' type field is always dropped then re-added on synchronization.
    // Further references:
    // https://github.com/typeorm/typeorm/issues/3636
    synchronize: appConfig.db.synchronize,
    logging: appConfig.debug,
    subscribers: [
      path.resolve(path.join(__dirname, './../../entity/**/**.subscriber.{ts,js}')),
    ],
    timezone: 'Z'
  } as TypeOrmModuleOptions;

}
