import { SlackLoggerService } from './../module/logger/slack-logger.service';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { AppLogger } from './../module/logger/app-logger.service';

@Catch()
export class ErrorFilter<T> implements ExceptionFilter {
  constructor(private logger: AppLogger, private slackLogger: SlackLoggerService) { }

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorString = this.getErrorString(request, response, exception);
    this.logger.error(errorString);
    this.slackLogger.log(errorString);

    // TODO Send more info if debug

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url
    });
  }

  private getErrorString(req: any, res: any, err: any) {
    let str = 'Request (X-Request-Id: ' + res.getHeader('X-Request-Id') + '):\n';
    str += req.method + ' ' + req.url + '\n';

    for (let i = 0; i < req.rawHeaders.length; i = i + 2) {
      str += req.rawHeaders[i] + ': ' + req.rawHeaders[i + 1] + '\n'
    }

    //TODO non loggare il multipart
    if (Object.keys(req.body).length !== 0) {
      str += '\n' + JSON.stringify(req.body) + '\n'
    }

    str += this.getErrorFromMessage(err);

    return str
  }

  private getErrorFromMessage(err: any) {
    let str = "";
    str += '\nError:'
    if (!(err instanceof Object)) {
      str += '\nStack Trace: ' + err
    } else {
      str += '\nName: ' + err.name;
      str += '\nCode: ' + err.code;
      str += '\nMessage: ' + err.message;
      if (err instanceof HttpException) {
        const response: any = err.getResponse();
        if (!!response && !!response.message && Array.isArray(response.message)) {
          str += '\nResponse Message: ' + (response.message || []).join(', ')
        }
      }
      str += '\nStack Trace: ' + err.stack
    }

    return str;
  }
}
