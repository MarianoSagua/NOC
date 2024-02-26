import {
  CheckService,
  CheckServiceMultiple,
  LogSeverityLevel,
  SendEmailLogs,
} from "../domain";
import {
  FileSystemDataSource,
  LogRepositoryImpl,
  MongoLogDataSource,
  PostgresLogDataSource,
} from "../infrastructure";
import { EmailService } from "./email/email-service";
import { CronService } from "./cron/cron-service";
import { envs } from "../config/plugins/evns.plugins";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource()
);

// const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server Started....");

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "marianosagua4343@outlook.com",
    // ]);

    // const emailService = new EmailService();
    // emailService.sendEmailWithFileSystemLogs(["marianosagua4343@outlook.com"]);

    // emailService.sendEmail({
    //   to: "marianosagua4343@outlook.com",
    //   subject: "Logs de sistema",
    //   htmlBody: `
    //     <h3> Logs de sistema - NOC </h3>
    //     <p> fsdfjdspfjsdpifsdlkfnsdlkfnsdlkfnsdfdslkfnsdfksdfsd </p>
    //     <p> Ver archivos adjuntos </p>
    //   `,
    // });

    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    CronService.createJob("*/5 * * * * *", () => {
      new CheckService(
        fsLogRepository,
        () => console.log(`${envs.URL} is ok!`),
        (error) => console.log(error)
      ).execute(envs.URL);
    });

    // CronService.createJob("*/3 * * * * *", () => {
    //   const url = envs.URL;

    //   new CheckServiceMultiple(
    //     [fsLogRepository, mongoLogRepository, postgresLogRepository],
    //     () => console.log(`${url} is ok!`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
