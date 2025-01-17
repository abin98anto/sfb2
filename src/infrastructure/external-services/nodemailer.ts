import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import { MailInterface } from "../../core/interfaces/misc/MailInterface";

const MAIL = process.env.MAIL;
const MAIL_PASS = process.env.MAIL_PASS;

export class EmailService implements MailInterface {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT || "587", 10),
      secure: false,
      auth: {
        user: MAIL,
        pass: MAIL_PASS,
      },
    });
  }

  async send(email: string, subject: string, text: string): Promise<void> {
    try {
      const mailOptions = {
        from: MAIL,
        to: email,
        subject: subject,
        text: text,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log("error sending OTP mail", error);
    }
  }
}
