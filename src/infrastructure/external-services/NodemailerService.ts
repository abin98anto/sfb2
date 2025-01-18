import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import { NodemailerInterface } from "../../core/interfaces/misc/NodemailerInterface";
import { comments } from "../../shared/constants/comments";

const MAIL = process.env.MAIL;
const MAIL_PASS = process.env.MAIL_PASS;

export class NodemailerService implements NodemailerInterface {
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
      console.log(comments.OTP_FAIL, error);
    }
  }
}
