import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


// =========================
// CONFIGURATION
// =========================

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


// =========================
// CONNEXION MONGODB
// =========================

connectDB();


// =========================
// MIDDLEWARES
// =========================

app.use(cors());

app.use(express.json({ limit: "10mb" }));


// =========================
// ROUTE PRINCIPALE
// =========================

app.get("/", (req, res) => {

  res.json({
    message: "API FAYRA fonctionne correctement ✅",
  });

});


// =========================
// ROUTES PRODUITS
// =========================

app.use(
  "/api/products",
  productRoutes
);


// =========================
// ROUTES COMMANDES
// =========================

app.use(
  "/api/orders",
  orderRoutes
);


// =========================
// ROUTE 404
// =========================

app.use((req, res) => {

  res.status(404).json({
    message: "Route introuvable",
  });

});


// =========================
// DÉMARRAGE SERVEUR
// =========================

app.listen(PORT, () => {

  console.log(
    `🚀 Serveur FAYRA lancé sur http://localhost:${PORT}`
  );

});

