import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiHeart, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";

import useProductStore from "../Store/productStore";
import useCartStore from "../store/cartStore";
import useFavoriteStore from "../store/favoriteStore";

const ProductDetails = () => {
  const { id } = useParams();

  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const loading = useProductStore((state) => state.loading);

  const addToCart = useCartStore((state) => state.addToCart);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");

  // Charger les produits depuis MongoDB
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Trouver le produit MongoDB
  const product = products.find(
    (item) => String(item._id) === String(id)
  );

  // Chargement
  if (loading && !product) {
    return (
      <div className="pt-40 text-center text-xl text-gray-500">
        Chargement du produit...
      </div>
    );
  }

  // Produit introuvable
  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Produit introuvable
        </h1>

        <p className="text-gray-500">
          Ce produit n'existe pas ou n'est plus disponible.
        </p>
      </div>
    );
  }

  return (
    <section className="pt-32 pb-20 bg-white min-h-screen">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* IMAGE */}
          <div>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[650px] object-cover"
            />

          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">

            <p className="text-gray-400 uppercase tracking-[5px] mb-4">
              FAYRA COLLECTION
            </p>

            <h1 className="text-5xl font-bold mb-6">
              {product.name}
            </h1>

            {/* PRIX */}
            <div className="flex gap-4 items-center mb-8">

              <span className="text-3xl font-bold">
                {Number(product.price).toLocaleString()} FCFA
              </span>

              {product.oldPrice && (
                <span className="line-through text-gray-400">
                  {Number(product.oldPrice).toLocaleString()} FCFA
                </span>
              )}

            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description ||
                "Une pièce FAYRA pensée pour les femmes qui aiment l'élégance et le style."}
            </p>

            {/* CATEGORIE */}
            <p className="text-sm text-gray-400 mb-6">
              Catégorie :{" "}
              <span className="text-black font-medium">
                {product.category}
              </span>
            </p>

            {/* TAILLE */}
            {product.category !== "Sacs" &&
              product.category !== "Accessoires" && (
                <div className="mb-8">

                  <h3 className="font-semibold mb-4">
                    Choisir une taille
                  </h3>

                  <div className="flex gap-3">

                    {["S", "M", "L", "XL"].map((item) => (
                      <button
                        key={item}
                        onClick={() => setSize(item)}
                        className={`
                          w-12
                          h-12
                          border
                          transition
                          ${
                            size === item
                              ? "bg-black text-white"
                              : "hover:border-black"
                          }
                        `}
                      >
                        {item}
                      </button>
                    ))}

                  </div>

                </div>
              )}

            {/* QUANTITE */}
            <div className="flex items-center gap-5 mb-8">

              <button
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
                className="w-10 h-10 border flex items-center justify-center hover:border-black"
              >
                <FiMinus />
              </button>

              <span className="text-xl">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity(quantity + 1)
                }
                className="w-10 h-10 border flex items-center justify-center hover:border-black"
              >
                <FiPlus />
              </button>

            </div>

            {/* ACTIONS */}
            <div className="flex gap-4">

              <button
                onClick={() =>
                  addToCart({
                    ...product,
                    quantity,
                    size,
                  })
                }
                className="
                  flex-1
                  bg-black
                  text-white
                  py-5
                  flex
                  justify-center
                  items-center
                  gap-3
                  uppercase
                  tracking-widest
                  hover:bg-yellow-500
                  hover:text-black
                  transition
                "
              >
                <FiShoppingBag />

                Ajouter au panier
              </button>

              <button
                onClick={() => toggleFavorite(product)}
                className="
                  w-16
                  border
                  flex
                  justify-center
                  items-center
                  hover:border-black
                  transition
                "
              >
                <FiHeart />
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ProductDetails;

