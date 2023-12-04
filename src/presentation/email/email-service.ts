import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/evns.plugins";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

interface Attachments {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    try {
      const subject = "Logs del servidor";
      const htmlBody = `
        <h3> Logs de sistema - NOC </h3>
        <p> fsdfjdspfjsdpifsdlkfnsdlkfnsdlkfnsdfdslkfnsdfksdfsd </p>
        <p> Ver archivos adjuntos </p>
      `;

      const attachments: Attachments[] = [
        { filename: "logs-all.log", path: "./logs/logs-all.log" },
        { filename: "logs-high.log", path: "./logs/logs-high.log" },
        { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
      ];

      return this.sendEmail({
        to,
        subject,
        attachments,
        htmlBody,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
