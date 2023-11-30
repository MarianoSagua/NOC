import { CronJob } from "cron";

type CronTime = string | Date;
type onTick = () => void;

export class CronService {
  static createJob(cronTime: CronTime, onTick: onTick): CronJob {
    return new CronJob(cronTime, onTick, null, true);
  }
}
