import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      // =========================
      // AJOUTER AU PANIER
      // =========================
      addToCart: (product) =>
        set((state) => {
          const productId = String(product.id);

          const existingProduct = state.cart.find(
            (item) => String(item.id) === productId
          );

          // Si le produit existe déjà
          // on augmente uniquement sa quantité
          if (existingProduct) {
            return {
              cart: state.cart.map((item) =>
                String(item.id) === productId
                  ? {
                      ...item,
                      quantity: Number(item.quantity || 1) + 1,
                    }
                  : item
              ),
            };
          }

          // Si c'est un nouveau produit,
          // on l'ajoute comme nouvelle ligne
          return {
            cart: [
              ...state.cart,
              {
                ...product,
                id: product.id,
                quantity: 1,
              },
            ],
          };
        }),

      // =========================
      // SUPPRIMER UN PRODUIT
      // =========================
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => String(item.id) !== String(id)
          ),
        })),

      // =========================
      // MODIFIER LA QUANTITÉ
      // =========================
      updateQuantity: (id, quantity) =>
        set((state) => {
          const newQuantity = Number(quantity);

          // Si quantité = 0, on supprime
          if (newQuantity <= 0) {
            return {
              cart: state.cart.filter(
                (item) => String(item.id) !== String(id)
              ),
            };
          }

          return {
            cart: state.cart.map((item) =>
              String(item.id) === String(id)
                ? {
                    ...item,
                    quantity: newQuantity,
                  }
                : item
            ),
          };
        }),

      // =========================
      // VIDER LE PANIER
      // =========================
      clearCart: () =>
        set({
          cart: [],
        }),
    }),

    {
      name: "fayra-cart",
    }
  )
);

export default useCartStore;