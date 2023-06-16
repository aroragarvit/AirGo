import express from "express";
const adminRouter = express.Router();

import { verifyJwt } from "../middleware/verifyJwt.js";

import { adminLogin } from "../controllers/adminController/adminLogin.js";
import { addFlight } from "../controllers/adminController/addFlight.js";
import { removeFlight } from "../controllers/adminController/deleteFlight.js";
import { viewBookings } from "../controllers/adminController/viewBookings.js";
adminRouter.post("/login", adminLogin);
// Initially make without verifyJwt middleware and test with Postman to see if it works after adding verifyJwt middleware
adminRouter.post("/addFlight", verifyJwt, addFlight);
adminRouter.delete("/deleteFlight", verifyJwt, removeFlight);
adminRouter.get("/viewBookings", verifyJwt, viewBookings);

export { adminRouter };
