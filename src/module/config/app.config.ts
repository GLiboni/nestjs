import * as dotenv from "dotenv";
dotenv.config();

const appConfig = {
  port: +(process.env.PORT || 3000),
  db: {
    user: process.env.MYSQL_USER,
    psw: process.env.MYSQL_PASSWORD,
    databaseName: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: +(process.env.MYSQL_PORT || 3306),
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
  },
  debug: process.env.DEBUG === 'true',
  log: {
    maxDays: process.env.LOG_MAX_DAYS,
    maxSize: process.env.LOG_MAX_SIZE,
    fileName: process.env.LOG_FILENAME,
    level: process.env.LOG_LEVEL,
  },
  slack: {
    enabled: process.env.SLACK_LOGGER_ENABLED === 'true',
    url: process.env.SLACK_WEBHOOK_URL
  }
};

export default appConfig;
