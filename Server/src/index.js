import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connect from "./utils/connect.js";

import userRoutes from "./routes/userRouter.js";
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["my-custom-header"],
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
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use("/user", userRoutes);

// Start server
server.listen(port, async () => {
  console.log(server.address);
  const host = server.address().address;
  const port = server.address().port;
  console.log("Server is running on port " + port + " on host " + host);
  await connect();
});
