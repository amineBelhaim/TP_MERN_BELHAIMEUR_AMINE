// backend/routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const bcrypt = require("bcrypt");

// Récupérer son propre profil
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ msg: "Utilisateur introuvable" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// Mettre à jour ses infos
router.put("/me", auth, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ msg: "Utilisateur introuvable" });

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.json({ msg: "Informations mises à jour avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// Supprimer son compte
router.delete("/me", auth, async (req, res) => {
  try {
    const userToDelete = await User.findByIdAndDelete(req.user._id);
    if (!userToDelete)
      return res.status(404).json({ msg: "Utilisateur introuvable" });
    res.json({ msg: "Compte supprimé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

module.exports = router;
