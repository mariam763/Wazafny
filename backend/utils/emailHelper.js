// utils/mailHelper.js
import nodemailer from "nodemailer";

export const sendMail = async ({ to, subject, html }) => {
  console.log("SMTP_USER:", process.env.SMTP_USER);
  console.log("SMTP_PASS:", process.env.SMTP_PASS);

  const transporter = nodemailer.createTransport({
    service: "gmail", // or any other provider
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Wazafny" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
