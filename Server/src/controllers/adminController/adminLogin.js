import { User } from "../../models/user.mjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../../utils/sendMail.js";
import dotenv from "dotenv";
dotenv.config();

export async function adminLogin(req, res) {
  const { username, email, password } = req.body;

  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!user.emailVerified) {
    await sendMail(user.email, user.emailVerificationToken);
    return res
      .status(401)
      .json({ error: "Email not verified. Verification email sent." });
  }

  const isMatch = await user.comparePassword(password);

  if (isMatch && user.isAdmin) {
    jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal server error" });
        }

        res.setHeader("Authorization", `Bearer ${token}`);

        res.cookie("token", token, {
          httpOnly: false,
          maxAge: 3600000, // 1 hour
          path: "/",
          domain: "airgo-3t6h.onrender.com",
        });

        return res.status(200).send({
          msg: "Login successful",
          token: token,
          username: user.username,
        });
      }
    );
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
}
