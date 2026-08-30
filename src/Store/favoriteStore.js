import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavoriteStore = create(
  persist(
    (set) => ({
      favorites: [],

      toggleFavorite: (product) =>
        set((state) => {
          const exist = state.favorites.find(
            (item) => item.id === product.id
          );

          if (exist) {
            return {
              favorites: state.favorites.filter(
                (item) => item.id !== product.id
              ),
            };
          }

          return {
            favorites: [
              ...state.favorites,
              product,
            ],
          };
        }),
    }),
    {
      name: "fayra-favorites",
    }
  )
);

export default useFavoriteStore;