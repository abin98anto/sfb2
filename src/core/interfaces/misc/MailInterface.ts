export interface MailInterface {
  send(email: string, subject: string, text: string): Promise<void>;
}
