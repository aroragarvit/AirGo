import { User } from "../../models/user.mjs";
import jwt from "jsonwebtoken";

export async function login(req, res) {
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

  if (isMatch) {
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
          domain: "localhost",
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
// I am sending token as cookie and auth heder to client so on accessing protected route having verify as a  middleware it will be sent from client to server and if we can decode it we will send user id and username also to client
