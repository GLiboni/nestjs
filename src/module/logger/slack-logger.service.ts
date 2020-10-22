import { Injectable } from '@nestjs/common';
import slack from 'slack-incoming-webhook';
import { ConfigService } from '../config/config.service';

@Injectable()
export class SlackLoggerService {
  private readonly enabled: boolean;
  private readonly url: string | undefined;

  constructor(config: ConfigService) {
    this.enabled = config.appConfig.slack.enabled;
    this.url = config.appConfig.slack.url;
  }

  public log(text: string) {
    if (!this.enabled || !this.url) {
      return;
    }
    slack(text, {
      url: this.url,
    });
  }
}
