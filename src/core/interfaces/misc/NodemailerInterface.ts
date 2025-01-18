export interface NodemailerInterface {
  send(email: string, subject: string, text: string): Promise<void>;
}
