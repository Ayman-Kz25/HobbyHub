import nodemailer from "nodemailer";

// Create a transporter using Ethereal test credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "",
    pass: "",
  },
});

const sendEmail = async ({ to, subject, body }) => {
  const response = await transporter.sendMail({
    from: "",
    to,
    subject,
    html: body,
  });
};

export default sendEmail;
