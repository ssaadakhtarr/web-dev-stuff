// controllers/dashboardController.js

const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Dashboard accessed successfully!" });
});

function verifyToken(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: "Access Denied!" });
  }

  jwt.verify(token, "secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Unauthorized - Invalid token" });
    }

    req.user = user;
    next();
  });
}

module.exports = router;
