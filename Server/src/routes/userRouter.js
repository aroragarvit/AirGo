import express from "express";
const router = express.Router();
// Routes
router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.post("/signup", signup);
router.post("/login", login);
router.get("/protected", verifyToken, (req, res) => {
  res.end();
});
router.get("/verify", verifyEmail);
router.post("/logout", verifyToken, logout);
router.get("/onboard", verifyToken, onboard);
router.use(function (req, res, next) {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

// / and /signup  /login /protected /verify /logout /onboard
export default router;
