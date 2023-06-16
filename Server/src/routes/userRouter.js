import express from "express";
const router = express.Router();

import { signup } from "../controllers/userController/signUp.js";
import { login } from "../controllers/userController/login.js";
import { getFlights } from "../controllers/userController/getFlights.js";
import { bookFlight } from "../controllers/userController/bookFlight.js";
import { verifyEmail } from "../middleware/verifyEmail";
import { verifyJwt } from "../middleware/verifyJwt.js";

router.post("/signup", signup);
router.get("/verify", verifyEmail);
router.post("/login", login);
router.get("/Flights", verifyJwt, getFlights); // make Flights function to get flights ((id, name, seats, and price ) => of particular flight) going from source to destination on a particular date(searching flights by date source and desitnation) (you can use req.body or req.query to get the date, source and destination )
router.post("/book", verifyJwt, bookFlight); // make book function to book a flight (id, name, seats, and price ) => of particular flight going from source to destination on a particular date
// we can pass user id through req.params  to book flight for that particular user or we can also pass user through verifyJwt middleware and then we can get user id from req.user.id
export { router };
