// backend/routes/ads.js
const express = require("express");
const router = express.Router();
const Ad = require("../models/Ad");
const auth = require("../middleware/authMiddleware");

// Créer une annonce
router.post("/", auth, async (req, res) => {
  const { title, description, price, category } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({ msg: "Champs requis manquants" });
  }

  try {
    const newAd = new Ad({
      title,
      description,
      price,
      category,
      author: req.user.id, // Injecté automatiquement par le middleware JWT
    });
    await newAd.save();
    res.status(201).json(newAd);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// Récupérer toutes les annonces
router.get("/", auth, async (req, res) => {
  try {
    const ads = await Ad.find().populate("author", "username email");
    res.json(ads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// Mettre à jour une annonce (non restreint à l'auteur dans cet exemple)
router.put("/:id", auth, async (req, res) => {
  const { title, description, price, category } = req.body;
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ msg: "Annonce introuvable" });

    ad.title = title || ad.title;
    ad.description = description || ad.description;
    ad.price = price || ad.price;
    ad.category = category || ad.category;

    await ad.save();
    res.json(ad);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

// Supprimer une annonce
router.delete("/:id", auth, async (req, res) => {
  try {
    const ad = await Ad.findByIdAndDelete(req.params.id);
    if (!ad) return res.status(404).json({ msg: "Annonce introuvable" });
    res.json({ msg: "Annonce supprimée" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

module.exports = router;
