// backend/server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const authRoutes = require("./routes/auth");
const adsRoutes = require("./routes/ads");
const adminRoutes = require("./routes/admin"); // Ajout de la route admin
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connexion DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ads", adsRoutes);
app.use("/api/admin", adminRoutes); // Utilisation de la route admin
const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
