import { User } from "../../models/userModel.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();
import { sendMail } from "../../utils/sendMail.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide username, email and password" });
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    // write code in case we have both email and username for existing user
    if (existingUser) {
      if (existingUser.email === email && existingUser.username === username) {
        return res
          .status(400)
          .json({ error: "Username and email already exist" });
      } else if (existingUser.username === username) {
        return res.status(400).json({ error: "Username already exists" });
      } else if (existingUser.email === email) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    // verification of email address using sending email to the user and then verifying the email address
    // if the user reveiver mail and himself verify the email address then only the user will be able to login and that means that email is valid
    // using decoding this token sent through mail and then verifying the email address dont send this usign cookie or response  because then it could be decoded and email will verified withoud even sending mail to the user
    const emailVerificationToken = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const user = new User({
      username,
      email,
      password,
      emailVerificationToken,
    });

    await user.save();

    await sendMail(email, emailVerificationToken); //  wwe a are running function sending  with mail and token as parameters

    return res.status(201).json({
      message: "User created successfully And email verification mail sent",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
