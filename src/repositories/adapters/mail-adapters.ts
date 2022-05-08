export interface SendMailData {
  subject: string;
  body: string;
}

export interface MailAdapter {
  sandMail: (data: SendMailData) => void;  
}