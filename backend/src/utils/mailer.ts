import { createTransport } from "nodemailer";

const mailer = async ({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) => {
  const transport = createTransport({
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  transport.options = {
    from: process.env.SMTP_MAIL,
    to,
    subject,
    html: body,
  };
  const mail = await transport.sendMail(transport.options);
  return !!mail;
};
export default mailer;
