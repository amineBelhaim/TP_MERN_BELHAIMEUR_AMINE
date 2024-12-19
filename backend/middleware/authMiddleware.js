// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import du modèle User
require("dotenv").config();

module.exports = async function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403);

    try {
      // On récupère l'utilisateur complet (username, email, role, ...) depuis la base
      const user = await User.findById(decoded.id).select(
        "username email role"
      );
      if (!user) return res.sendStatus(404);

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  });
};
