import express from "express";
const router = express.Router();

import { signup } from "../controllers/userController/signup.js";

import { verifyEmail } from "../middleware/verifyEmail";

router.post("/signup", signup);
router.get("/verify", verifyEmail);

// / and /signup  /login /protected /verify /logout /onboard
export { router };
