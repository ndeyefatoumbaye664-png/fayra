import { create } from "zustand";

const API_URL = "http://localhost:5000/api/orders";

const useOrderStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,

  // =========================
  // RÉCUPÉRER LES COMMANDES
  // =========================
  fetchOrders: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          "Impossible de récupérer les commandes"
        );
      }

      const data = await response.json();

      set({
        orders: data,
        loading: false,
      });

      return data;
    } catch (error) {
      console.error(
        "Erreur récupération commandes :",
        error
      );

      set({
        loading: false,
        error: error.message,
      });

      return [];
    }
  },

  // =========================
  // AJOUTER UNE COMMANDE
  // =========================
  addOrder: async (order) => {
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

        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Impossible d'enregistrer la commande"
        );
      }

      set((state) => ({
        orders: [
          data.order,
          ...state.orders,
        ],
        loading: false,
      }));

      return data.order;
    } catch (error) {
      console.error(
        "Erreur création commande :",
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
  // SUPPRIMER UNE COMMANDE
  // =========================
  deleteOrder: async (id) => {
    try {
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
            "Impossible de supprimer la commande"
        );
      }

      set((state) => ({
        orders: state.orders.filter(
          (order) =>
            order._id !== id &&
            order.id !== id
        ),
      }));
    } catch (error) {
      console.error(
        "Erreur suppression commande :",
        error
      );

      set({
        error: error.message,
      });

      throw error;
    }
  },

  // =========================
  // MODIFIER LE STATUT
  // =========================
  updateOrderStatus: async (id, status) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Impossible de modifier le statut"
        );
      }

      set((state) => ({
        orders: state.orders.map(
          (order) =>
            order._id === id
              ? data.order
              : order
        ),
      }));

      return data.order;
    } catch (error) {
      console.error(
        "Erreur modification statut :",
        error
      );

      set({
        error: error.message,
      });

      throw error;
    }
  },
}));

export default useOrderStore;