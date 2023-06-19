import jwt from "jsonwebtoken";
import { User } from "../models/user.mjs";
import dotenv from "dotenv";
dotenv.config();

export async function verifyEmail(req, res, next) {
  // nothing after this middleware
  try {
    const token = req.query.token;
    if (!token) {
      return res.status(400).json({ error: "Token not found" });
    }

    const decdoded_mail = jwt.verify(token, process.env.JWT_SECRET); // agar applicatio sa nahi a raha ha aur agar user fake token send kar rha ha query ma aur route open kar raha ha mail verify karana ka to decode hi nahi hota  isliya jwt use karta ha naki simple bas mail bjejta ha agar decode nahi hua matlab token invalid , matlab jo email dal raha ha vo bhi invalid ha because jo mail dal raha ha usi pa mail ja raha ha , ha to user database sa check nahi hoga kyuki user kuch ayaga hi nahi decode hoka
    // token is coded using email and secret key and then decoded using that token and secret key and then we get the email from the token and then we check if the email is present in the database or not
    const user = await User.findOneAndUpdate(
      { email: decdoded_mail.email, emailVerificationToken: token },
      { emailVerified: true }
    );

    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid email verification token" });
    }
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
