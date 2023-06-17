import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendMail = async (email, emailVerificationToken) => {
  try {
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // use SSL/TLS,

      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      text: `https://airgo-3t6h.onrender.com/verify?token=${emailVerificationToken}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

export { sendMail };
