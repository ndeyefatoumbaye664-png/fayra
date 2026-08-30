import { Link } from "react-router-dom";
import useFavoriteStore from "../store/favoriteStore";
import {
  FiHeart,
  FiShoppingBag,
  FiEye,
} from "react-icons/fi";
import { motion } from "framer-motion";
import useCartStore from "../store/cartStore";

const ProductCard = ({ product }) => {
  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  const toggleFavorite = useFavoriteStore(
    (state) => state.toggleFavorite
  );

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  // ==========================================
  // ID UNIQUE DU PRODUIT
  // ==========================================

  const productId = String(
    product._id || product.id
  );

  // ==========================================
  // FAVORIS
  // ==========================================

  const liked = favorites.some(
    (item) =>
      String(item._id || item.id) === productId
  );

  // ==========================================
  // AJOUTER AU PANIER
  // ==========================================

  const handleAddCart = () => {
    const cartProduct = {
      ...product,

      // IMPORTANT :
      // on utilise TOUJOURS id dans le panier
      id: productId,

      // On garde aussi _id si le produit vient de MongoDB
      _id: product._id || productId,

      // Toujours commencer à 1
      quantity: 1,
    };

    addToCart(cartProduct);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="
        group
        relative
        bg-white
        overflow-hidden
        shadow-sm
        hover:shadow-xl
        transition
        duration-500
      "
    >
      {/* ==========================================
          IMAGE
      ========================================== */}

      <div
        className="
          relative
          overflow-hidden
          h-[380px]
        "
      >
        <img
          src={product.image}
          alt={product.name}
          className="
            w-full
            h-full
            object-cover
            group-hover:scale-110
            transition
            duration-700
          "
        />

        {/* ==========================================
            DISCOUNT
        ========================================== */}

        {product.discount && (
          <span
            className="
              absolute
              top-4
              left-4
              bg-black
              text-white
              text-xs
              px-3
              py-2
            "
          >
            -{product.discount}%
          </span>
        )}

        {/* ==========================================
            FAVORIS
        ========================================== */}

        <button
          type="button"
          onClick={() => toggleFavorite(product)}
          className="
            absolute
            top-4
            right-4
            bg-white
            w-10
            h-10
            rounded-full
            flex
            items-center
            justify-center
            shadow
            hover:scale-105
            transition
          "
        >
          <FiHeart
            className={
              liked
                ? "text-red-500 fill-red-500"
                : ""
            }
          />
        </button>

        {/* ==========================================
            ACTIONS
        ========================================== */}

        <div
          className="
            absolute
            bottom-5
            left-0
            right-0
            flex
            justify-center
            gap-3
            opacity-0
            group-hover:opacity-100
            transition
          "
        >
          {/* VOIR */}

          <Link
            to={`/product/${productId}`}
            className="
              bg-white
              w-12
              h-12
              rounded-full
              flex
              items-center
              justify-center
              hover:bg-gray-100
              transition
            "
            title="Voir le produit"
          >
            <FiEye />
          </Link>

          {/* PANIER */}

          <button
            type="button"
            onClick={handleAddCart}
            className="
              bg-black
              text-white
              w-12
              h-12
              rounded-full
              flex
              items-center
              justify-center
              hover:bg-yellow-500
              hover:text-black
              transition
            "
            title="Ajouter au panier"
          >
            <FiShoppingBag />
          </button>
        </div>
      </div>

      {/* ==========================================
          INFORMATIONS
      ========================================== */}

      <div className="p-5">

        <p
          className="
            text-xs
            uppercase
            tracking-widest
            text-gray-400
          "
        >
          FAYRA Collection
        </p>

        <h3
          className="
            text-lg
            font-semibold
            mt-2
          "
        >
          {product.name}
        </h3>

        {/* ==========================================
            PRIX
        ========================================== */}

        <div
          className="
            flex
            gap-3
            items-center
            mt-3
          "
        >
          <span className="font-bold">
            {Number(product.price).toLocaleString()} FCFA
          </span>

          {product.oldPrice && (
            <span
              className="
                text-gray-400
                line-through
                text-sm
              "
            >
              {Number(
                product.oldPrice
              ).toLocaleString()} FCFA
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;