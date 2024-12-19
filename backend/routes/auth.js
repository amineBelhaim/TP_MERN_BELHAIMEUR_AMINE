// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// backend/routes/auth.js
// backend/routes/auth.js
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Champs requis manquants" });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "Email déjà utilisé" });

    const hashedPassword = await bcrypt.hash(password, 10);
    let role = "user";
    if (email === "admin@example.com") {
      role = "admin";
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({ msg: "Utilisateur créé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Champs requis manquants" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Email ou mot de passe invalide" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ msg: "Email ou mot de passe invalide" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

module.exports = router;
