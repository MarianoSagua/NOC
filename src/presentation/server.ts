import { CheckService, SendEmailLogs } from "../domain";
import { FileSystemDataSource, LogRepositoryImpl } from "../infrastructure";
import { EmailService } from "./email/email-service";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

const emailService = new EmailService();

export class Server {
  static start() {
    console.log("Server Started....");

    new SendEmailLogs(emailService, fileSystemLogRepository).execute([
      "marianosagua4343@outlook.com",
    ]);

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

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "http://localhost:3000";

    //   new CheckService(fileSystemLogRepository, undefined, undefined).execute(
    //     url
    //   );
    // });
  }
}
