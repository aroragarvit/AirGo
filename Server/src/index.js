import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connect from "./utils/connect.js";
import dotenv from "dotenv";
dotenv.config();

import { userRouter } from "./routes/userRouter.js";
import { adminRouter } from "./routes/adminRouter.js";
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://air-go.vercel.app/",
  methods: ["GET", "POST"],
  allowedHeaders: ["my-custom-header", "Content-Type", "Authorization"],
  credentials: true,
};

const app = express(); // Create express app

// Middleware for CORS and Headers
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://air-go.vercel.app/");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use("/user", userRouter);
app.use("/admin", adminRouter);

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connect();
});
