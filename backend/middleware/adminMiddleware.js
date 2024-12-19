// backend/middleware/adminMiddleware.js
module.exports = function (req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ msg: "Accès refusé: Administrateur requis" });
  }
};