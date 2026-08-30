
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiShoppingBag,
  FiHeart,
} from "react-icons/fi";

import useCartStore from "../Store/cartStore";
import useFavoriteStore from "../Store/favoriteStore";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // ================= CART =================

  const cart = useCartStore((state) => state.cart);

  // ================= FAVORITES =================

  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  // ================= COUNTS =================

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const favoriteCount = favorites.length;

  // ================= LINKS =================

  const links = [
    {
      name: "Accueil",
      path: "/",
    },
    {
      name: "Boutique",
      path: "/shop",
    },
    {
      name: "Favoris",
      path: "/favorites",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100 relative z-50">

      {/* ================= NAVBAR ================= */}

      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="
            text-3xl
            font-bold
            tracking-[8px]
            text-black
          "
        >
          FAYRA
        </Link>

        {/* ================= MENU DESKTOP ================= */}

        <div className="hidden md:flex items-center gap-10">

          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="
                uppercase
                text-sm
                tracking-widest
                text-gray-700
                hover:text-yellow-500
                transition
              "
            >
              {link.name}
            </Link>
          ))}

        </div>

        {/* ================= ICONES ================= */}

        <div className="flex items-center gap-3">

          {/* ================= FAVORIS ================= */}

          <Link
            to="/favorites"
            className="
              relative
              w-10
              h-10
              flex
              items-center
              justify-center
              rounded-full
              hover:bg-gray-100
              transition
            "
            aria-label="Favoris"
          >
            <FiHeart
              size={21}
              strokeWidth={1.8}
            />

            {favoriteCount > 0 && (
              <span
                className="
                  absolute
                  -top-1
                  -right-1
                  bg-black
                  text-white
                  text-[10px]
                  font-semibold
                  w-5
                  h-5
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
              >
                {favoriteCount}
              </span>
            )}
          </Link>

          {/* ================= PANIER ================= */}

          <Link
            to="/cart"
            className="
              relative
              w-10
              h-10
              flex
              items-center
              justify-center
              rounded-full
              hover:bg-gray-100
              transition
            "
            aria-label="Panier"
          >
            <FiShoppingBag
              size={21}
              strokeWidth={1.8}
            />

            {cartCount > 0 && (
              <span
                className="
                  absolute
                  -top-1
                  -right-1
                  bg-yellow-500
                  text-black
                  text-[10px]
                  font-semibold
                  w-5
                  h-5
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* ================= MENU MOBILE ================= */}

          <button
            onClick={() => setOpen(!open)}
            className="
              md:hidden
              w-10
              h-10
              flex
              items-center
              justify-center
            "
            aria-label="Menu"
          >
            {open ? (
              <FiX size={23} />
            ) : (
              <FiMenu size={23} />
            )}
          </button>

        </div>
      </nav>

      {/* ================= MENU MOBILE ================= */}

      {open && (
        <div
          className="
            md:hidden
            border-t
            border-gray-100
            bg-white
            px-6
            py-6
          "
        >

          <div className="flex flex-col gap-6">

            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className="
                  uppercase
                  tracking-widest
                  text-sm
                  text-gray-700
                  hover:text-yellow-500
                  transition
                "
              >
                {link.name}
              </Link>
            ))}

            {/* ================= FAVORIS MOBILE ================= */}

            <Link
              to="/favorites"
              onClick={() => setOpen(false)}
              className="
                flex
                items-center
                gap-3
                text-sm
                text-gray-700
              "
            >
              <FiHeart size={19} />

              <span>
                Mes favoris
              </span>

              {favoriteCount > 0 && (
                <span
                  className="
                    bg-black
                    text-white
                    text-[10px]
                    font-semibold
                    w-5
                    h-5
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  {favoriteCount}
                </span>
              )}
            </Link>

            {/* ================= PANIER MOBILE ================= */}

            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="
                flex
                items-center
                gap-3
                text-sm
                text-gray-700
              "
            >
              <FiShoppingBag size={19} />

              <span>
                Mon panier
              </span>

              {cartCount > 0 && (
                <span
                  className="
                    bg-yellow-500
                    text-black
                    text-[10px]
                    font-semibold
                    w-5
                    h-5
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  {cartCount}
                </span>
              )}
            </Link>

          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;
