import { User } from "../../models/user.mjs";

export async function onboard(req, res) {
  // run this after protected middleware so that we can get the id from the token
  console.log("ONBOARDING");
  try {
    const user = await User.findById(req.id); // we are gtting id from verifyJWT.js middleware using payload decoding from token and setting it to req.id
    if (!user) {
      return res.status(404).json({ error: "User not found" }); // and then we are checking if that user exists or not
    } else {
      return res.status(200).json({ message: "User is logged in" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
