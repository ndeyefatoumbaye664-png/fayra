import { Link } from "react-router-dom";
import useFavoriteStore from "../Store/favoriteStore";
import {
  FiHeart,
  FiShoppingBag,
  FiEye,
} from "react-icons/fi";
import { motion } from "framer-motion";
import useCartStore from "../Store/cartStore";

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

  const productId = String(
    product._id || product.id
  );

  const liked = favorites.some(
    (item) =>
      String(item._id || item.id) === productId
  );

  const handleAddCart = () => {
    const cartProduct = {
      ...product,
      id: productId,
      _id: product._id || productId,
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

      {/* IMAGE */}

      <div
        className="
          relative
          overflow-hidden
          h-[330px]
          sm:h-[380px]
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

        {/* DISCOUNT */}

        {product.discount && (
          <span
            className="
              absolute
              top-3
              left-3
              sm:top-4
              sm:left-4
              bg-black
              text-white
              text-[10px]
              sm:text-xs
              px-2.5
              py-1.5
              sm:px-3
              sm:py-2
            "
          >
            -{product.discount}%
          </span>
        )}

        {/* FAVORIS */}

        <button
          type="button"
          onClick={() => toggleFavorite(product)}
          className="
            absolute
            top-3
            right-3
            sm:top-4
            sm:right-4
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
            z-10
          "
          aria-label="Ajouter aux favoris"
        >
          <FiHeart
            size={18}
            className={
              liked
                ? "text-red-500 fill-red-500"
                : ""
            }
          />
        </button>

        {/* ACTIONS */}

        <div
          className="
            absolute
            bottom-4
            left-0
            right-0
            flex
            justify-center
            gap-3
            opacity-100
            md:opacity-0
            md:group-hover:opacity-100
            transition
            duration-300
          "
        >

          {/* VOIR DETAILS */}

          <Link
            to={`/product/${productId}`}
            className="
              bg-white
              text-black
              w-12
              h-12
              rounded-full
              flex
              items-center
              justify-center
              shadow-lg
              hover:bg-gray-100
              transition
            "
            title="Voir le produit"
            aria-label="Voir le produit"
          >
            <FiEye size={20} />
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
              shadow-lg
              hover:bg-yellow-500
              hover:text-black
              transition
            "
            title="Ajouter au panier"
            aria-label="Ajouter au panier"
          >
            <FiShoppingBag size={20} />
          </button>

        </div>

      </div>

      {/* INFORMATIONS */}

      <div className="p-4 sm:p-5">

        <p
          className="
            text-[10px]
            sm:text-xs
            uppercase
            tracking-[2px]
            sm:tracking-widest
            text-gray-400
          "
        >
          FAYRA Collection
        </p>

        <h3
          className="
            text-base
            sm:text-lg
            font-semibold
            mt-2
            line-clamp-2
          "
        >
          {product.name}
        </h3>

        {/* PRIX */}

        <div
          className="
            flex
            flex-wrap
            gap-2
            sm:gap-3
            items-center
            mt-3
          "
        >

          <span
            className="
              font-bold
              text-sm
              sm:text-base
            "
          >
            {Number(product.price).toLocaleString()} FCFA
          </span>

          {product.oldPrice && (
            <span
              className="
                text-gray-400
                line-through
                text-xs
                sm:text-sm
              "
            >
              {Number(
                product.oldPrice
              ).toLocaleString()} FCFA
            </span>
          )}

        </div>

        {/* BOUTONS MOBILE */}

        <div className="flex gap-2 mt-4 md:hidden">

          <Link
            to={`/product/${productId}`}
            className="
              flex-1
              border
              border-black
              text-black
              py-3
              text-xs
              font-medium
              uppercase
              tracking-wider
              text-center
              active:scale-95
              transition
            "
          >
            Détails
          </Link>

          <button
            type="button"
            onClick={handleAddCart}
            className="
              flex-1
              bg-black
              text-white
              py-3
              text-xs
              font-medium
              uppercase
              tracking-wider
              active:scale-95
              transition
            "
          >
            Ajouter
          </button>

        </div>

      </div>

    </motion.div>
  );
};

export default ProductCard;

