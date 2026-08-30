
import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// GET : récupérer tous les produits
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error("Erreur récupération produits :", error);

    res.status(500).json({
      message: "Impossible de récupérer les produits",
    });
  }
});

// POST : ajouter un produit
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image,
      stock,
      featured,
    } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        message: "Le nom, le prix et la catégorie sont obligatoires.",
      });
    }

    const product = new Product({
      name,
      description,
      price: Number(price),
      category,
      image,
      stock: Number(stock) || 0,
      featured: Boolean(featured),
    });

    const savedProduct = await product.save();

    res.status(201).json({
      message: "Produit ajouté avec succès !",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Erreur ajout produit :", error);

    res.status(500).json({
      message: "Impossible d'ajouter le produit",
    });
  }
});

// DELETE : supprimer un produit
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Produit introuvable.",
      });
    }

    res.status(200).json({
      message: "Produit supprimé avec succès !",
    });
  } catch (error) {
    console.error("Erreur suppression produit :", error);

    res.status(500).json({
      message: "Impossible de supprimer le produit",
    });
  }
});

export default router;

