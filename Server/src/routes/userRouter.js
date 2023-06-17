import express from "express";
const userRouter = express.Router();

import { signup } from "../controllers/userController/signUp.js";
import { login } from "../controllers/userController/login.js";
import { getFlights } from "../controllers/userController/getFlights.js";
import { bookFlight } from "../controllers/userController/bookFlight.js";
import { bookings } from "../controllers/userController/myBookings.js";
import { verifyEmail } from "../middleware/verifyEmail.js";
import { verifyJwt } from "../middleware/verifyJwt.js";
import { onboard } from "../controllers/userController/onboard.js";

userRouter.post("/signup", signup);
userRouter.get("/verify", verifyEmail);
userRouter.post("/login", login);
userRouter.post("/flights", verifyJwt, getFlights); // make Flights function to get flights ((id, name, seats, and price ) => of particular flight) going from source to destination on a particular date(searching flights by date source and desitnation) (you can use req.body or req.query to get the date, source and destination )
userRouter.post("/book", verifyJwt, bookFlight); // make book function to book a flight (id, name, seats, and price ) => of particular flight going from source to destination on a particular date
// we can pass user id through req.params  to book flight for that particular user or we can also pass user through verifyJwt middleware and then we can get user id from req.user.id
userRouter.post("/mybookings", verifyJwt, bookings);
userRouter.post("/onboard", verifyJwt, onboard);

export { userRouter };
