const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    await db.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash]);
    res.status(201).json({ message: "User registered" });
  } catch {
    res.status(400).json({ error: "User already exists" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
  const user = rows[0];
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
