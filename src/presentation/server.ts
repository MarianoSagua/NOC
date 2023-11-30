import { CheckService } from "../domain/use-cases/checks/checks-service";
import { CronService } from "./cron/cron-service";

export class Server {
  static start() {
    console.log("Server Started....");

    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://google.com";
      new CheckService(
        () => console.log(`${url} is ok!!`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
