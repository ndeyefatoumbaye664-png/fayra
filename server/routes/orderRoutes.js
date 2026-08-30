import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ======================================================
// GET : RÉCUPÉRER TOUTES LES COMMANDES
// ======================================================

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    console.error(
      "Erreur récupération commandes :",
      error
    );

    res.status(500).json({
      message:
        "Impossible de récupérer les commandes.",
    });
  }
});


// ======================================================
// GET : UNE COMMANDE
// ======================================================

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        message: "Commande introuvable.",
      });
    }

    res.status(200).json(order);

  } catch (error) {
    console.error(
      "Erreur récupération commande :",
      error
    );

    res.status(500).json({
      message:
        "Impossible de récupérer la commande.",
    });
  }
});


// ======================================================
// POST : CRÉER UNE COMMANDE
// ======================================================

router.post("/", async (req, res) => {
  try {

    const {
      customer,
      products,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      paymentProof,
    } = req.body;


    // -------------------------------
    // VALIDATION CLIENT
    // -------------------------------

    if (!customer?.name?.trim()) {
      return res.status(400).json({
        message:
          "Le nom du client est obligatoire.",
      });
    }


    if (!customer?.phone?.trim()) {
      return res.status(400).json({
        message:
          "Le téléphone est obligatoire.",
      });
    }


    if (!customer?.address?.trim()) {
      return res.status(400).json({
        message:
          "L'adresse est obligatoire.",
      });
    }


    // -------------------------------
    // VALIDATION PRODUITS
    // -------------------------------

    if (
      !Array.isArray(products) ||
      products.length === 0
    ) {
      return res.status(400).json({
        message:
          "La commande doit contenir au moins un produit.",
      });
    }


    // -------------------------------
    // TRANSFORMATION PRODUITS
    // -------------------------------

    const formattedProducts = products.map(
      (product) => ({
        productId: String(
          product.productId ||
          product.id ||
          product._id
        ),

        name: product.name,

        image: product.image || "",

        price: Number(product.price),

        quantity: Number(
          product.quantity || 1
        ),
      })
    );


    // -------------------------------
    // VALIDATION PRODUITS
    // -------------------------------

    for (const product of formattedProducts) {

      if (!product.productId) {
        return res.status(400).json({
          message:
            "Un produit ne possède pas d'identifiant.",
        });
      }

      if (!product.name) {
        return res.status(400).json({
          message:
            "Un produit ne possède pas de nom.",
        });
      }

      if (
        Number.isNaN(product.price) ||
        product.price < 0
      ) {
        return res.status(400).json({
          message:
            "Le prix d'un produit est invalide.",
        });
      }

      if (
        Number.isNaN(product.quantity) ||
        product.quantity < 1
      ) {
        return res.status(400).json({
          message:
            "La quantité d'un produit est invalide.",
        });
      }
    }


    // -------------------------------
    // VALIDATION TOTAL
    // -------------------------------

    const finalSubtotal = Number(
      subtotal || 0
    );

    const finalDeliveryFee = Number(
      deliveryFee || 0
    );

    const finalTotal = Number(total);


    if (
      Number.isNaN(finalTotal) ||
      finalTotal <= 0
    ) {
      return res.status(400).json({
        message:
          "Le montant de la commande est invalide.",
      });
    }


    // -------------------------------
    // CRÉATION COMMANDE
    // -------------------------------

    const order = new Order({

      customer: {
        name: customer.name,
        email: customer.email || "",
        phone: customer.phone,
        address: customer.address,
        city: customer.city || "",
      },

      products: formattedProducts,

      subtotal: finalSubtotal,

      deliveryFee: finalDeliveryFee,

      total: finalTotal,

      paymentMethod:
        paymentMethod ||
        "Non précisé",

      paymentProof:
        paymentProof || "",

      status: "En attente",
    });


    // -------------------------------
    // SAUVEGARDE MONGODB
    // -------------------------------

    const savedOrder =
      await order.save();


    console.log(
      "✅ Nouvelle commande enregistrée :",
      savedOrder._id
    );


    // -------------------------------
    // RÉPONSE
    // -------------------------------

    res.status(201).json({
      message:
        "Commande enregistrée avec succès !",

      order: savedOrder,
    });


  } catch (error) {

    console.error(
      "❌ Erreur création commande :",
      error
    );

    res.status(500).json({
      message:
        "Impossible d'enregistrer la commande.",

      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
});


// ======================================================
// PATCH : MODIFIER LE STATUT
// ======================================================

router.patch("/:id/status", async (req, res) => {

  try {

    const { status } = req.body;


    const allowedStatuses = [
      "En attente",
      "Confirmée",
      "Expédiée",
      "Livrée",
      "Annulée",
    ];


    if (
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        message:
          "Statut de commande invalide.",
      });
    }


    const order =
      await Order.findByIdAndUpdate(
        req.params.id,

        { status },

        {
          new: true,
          runValidators: true,
        }
      );


    if (!order) {
      return res.status(404).json({
        message:
          "Commande introuvable.",
      });
    }


    res.status(200).json({
      message:
        "Statut modifié avec succès.",

      order,
    });


  } catch (error) {

    console.error(
      "Erreur modification statut :",
      error
    );

    res.status(500).json({
      message:
        "Impossible de modifier le statut.",
    });
  }
});


// ======================================================
// DELETE : SUPPRIMER UNE COMMANDE
// ======================================================

router.delete("/:id", async (req, res) => {

  try {

    const order =
      await Order.findByIdAndDelete(
        req.params.id
      );


    if (!order) {
      return res.status(404).json({
        message:
          "Commande introuvable.",
      });
    }


    res.status(200).json({
      message:
        "Commande supprimée avec succès.",
    });


  } catch (error) {

    console.error(
      "Erreur suppression commande :",
      error
    );

    res.status(500).json({
      message:
        "Impossible de supprimer la commande.",
    });
  }
});


export default router;