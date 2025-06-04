import express from "express";
import db from "../config/Database.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const [users] = await db.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  if (users.length === 0)
    return res.status(401).json({ message: "Invalid credentials" });

  const user = users[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ userId: user.uuid, uuid: user.uuid });
});

// Verifikasi SRP
router.post("/verify-srp", async (req, res) => {
  const { userId, srpInput } = req.body;

  const [rows] = await db.query("SELECT * FROM srp WHERE user_id = ?", [
    userId,
  ]);
  if (rows.length === 0)
    return res.status(404).json({ message: "SRP not found" });

  const original = rows[0];
  for (let i = 0; i < 12; i++) {
    if (srpInput[i] !== original[`word${i + 1}`]) {
      return res
        .status(401)
        .json({ message: `Incorrect word at position ${i + 1}` });
    }
  }

  res.json({ message: "SRP Verified Successfully" });
});

router.get("/get-srp/:userId", async (req, res) => {
  const { userId } = req.params;
  const [rows] = await db.query("SELECT * FROM srp WHERE user_id = ?", [
    userId,
  ]);

  if (rows.length === 0)
    return res.status(404).json({ message: "SRP not found" });

  const srpWords = {};
  for (let i = 1; i <= 12; i++) {
    srpWords[`word${i}`] = rows[0][`word${i}`];
  }

  res.json(srpWords);
});

export default router;
