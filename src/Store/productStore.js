import { create } from "zustand";

const API_URL = "https://fayra-api.onrender.com/api/products";

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  // =========================
  // RÉCUPÉRER LES PRODUITS
  // =========================
  fetchProducts: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await fetch(API_URL);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(
          errorData.message ||
            `Erreur serveur (${response.status})`
        );
      }

      const data = await response.json();

      console.log("📦 Produits reçus du serveur :", data);

      // Le backend peut renvoyer :
      // [produit1, produit2]
      // OU
      // { products: [produit1, produit2] }
      const products = Array.isArray(data)
        ? data
        : Array.isArray(data.products)
        ? data.products
        : [];

      set({
        products,
        loading: false,
        error: null,
      });

      return products;

    } catch (error) {
      console.error(
        "❌ Erreur récupération produits :",
        error
      );

      set({
        products: [],
        loading: false,
        error: error.message,
      });

      return [];
    }
  },

  // =========================
  // AJOUTER UN PRODUIT
  // =========================
  addProduct: async (product) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: product.name,
          description: product.description || "",
          price: Number(product.price),
          oldPrice:
            product.oldPrice !== ""
              ? Number(product.oldPrice)
              : null,
          category: product.category,
          image: product.image || "",
          stock: Number(product.stock) || 0,
          featured: Boolean(product.featured),
        }),
      });

      const data = await response.json();

      console.log("✅ Produit ajouté :", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Impossible d'ajouter le produit"
        );
      }

      // Le backend peut renvoyer :
      // { product: {...} }
      // OU directement {...}
      const newProduct =
        data.product || data;

      set((state) => ({
        products: [
          newProduct,
          ...state.products,
        ],
        loading: false,
        error: null,
      }));

      return newProduct;

    } catch (error) {
      console.error(
        "❌ Erreur ajout produit :",
        error
      );

      set({
        loading: false,
        error: error.message,
      });

      throw error;
    }
  },

  // =========================
  // SUPPRIMER UN PRODUIT
  // =========================
  deleteProduct: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Impossible de supprimer le produit"
        );
      }

      set((state) => ({
        products: state.products.filter(
          (product) =>
            String(product._id) !== String(id)
        ),
        loading: false,
        error: null,
      }));

    } catch (error) {
      console.error(
        "❌ Erreur suppression produit :",
        error
      );

      set({
        loading: false,
        error: error.message,
      });

      throw error;
    }
  },
}));

export default useProductStore;