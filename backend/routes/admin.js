// backend/routes/admin.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Récupérer tous les utilisateurs (READ)
router.get("/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// Mettre à jour un utilisateur (UPDATE)
router.put("/users/:id", auth, admin, async (req, res) => {
  const { username, email, role } = req.body;
  try {
    const userToUpdate = await User.findById(req.params.id);
    if (!userToUpdate)
      return res.status(404).json({ msg: "Utilisateur introuvable" });

    if (username) userToUpdate.username = username;
    if (email) userToUpdate.email = email;
    if (role) userToUpdate.role = role;

    await userToUpdate.save();
    res.json(userToUpdate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// Supprimer un utilisateur (DELETE)
router.delete("/users/:id", auth, admin, async (req, res) => {
  try {
    const userToDelete = await User.findByIdAndDelete(req.params.id);
    if (!userToDelete)
      return res.status(404).json({ msg: "Utilisateur introuvable" });
    res.json({ msg: "Utilisateur supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

module.exports = router;
