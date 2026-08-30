import { useEffect } from "react";
import {
  FiPackage,
  FiBox,
  FiStar,
  FiDollarSign,
} from "react-icons/fi";

import useProductStore from "../Store/productStore";

const Dashboard = () => {
  const products = useProductStore(
    (state) => state.products
  );

  const fetchProducts = useProductStore(
    (state) => state.fetchProducts
  );

  const loading = useProductStore(
    (state) => state.loading
  );

  // =========================
  // CHARGER LES PRODUITS
  // =========================

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // =========================
  // STATISTIQUES RÉELLES
  // =========================

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) =>
      total + (Number(product.stock) || 0),
    0
  );

  const featuredProducts = products.filter(
    (product) => product.featured === true
  ).length;

  const stockValue = products.reduce(
    (total, product) =>
      total +
      (Number(product.price) || 0) *
        (Number(product.stock) || 0),
    0
  );

  // =========================
  // CATÉGORIES
  // =========================

  const categories = {};

  products.forEach((product) => {
    const category = product.category || "Autres";

    categories[category] =
      (categories[category] || 0) + 1;
  });

  // =========================
  // FORMAT PRIX
  // =========================

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("fr-FR");
  };

  return (
    <div>

      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-10">

        <p className="
          text-xs
          uppercase
          tracking-[0.3em]
          text-gray-400
          mb-3
        ">
          Administration FAYRA
        </p>

        <h1 className="
          text-4xl
          md:text-5xl
          font-bold
        ">
          Dashboard
        </h1>

        <p className="
          text-gray-500
          mt-3
        ">
          Vue d'ensemble de votre boutique.
        </p>

      </div>

      {/* =========================
          CHARGEMENT
      ========================= */}

      {loading && (
        <div className="
          bg-white
          border
          border-gray-100
          p-4
          mb-6
          text-sm
          text-gray-500
        ">
          Actualisation des données...
        </div>
      )}

      {/* =========================
          STATISTIQUES
      ========================= */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
        mb-10
      ">

        {/* PRODUITS */}

        <div className="
          bg-white
          border
          border-gray-100
          p-6
          shadow-sm
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-sm
                text-gray-500
              ">
                Produits
              </p>

              <p className="
                text-4xl
                font-bold
                mt-3
              ">
                {totalProducts}
              </p>

            </div>

            <div className="
              w-12
              h-12
              bg-gray-100
              flex
              items-center
              justify-center
            ">
              <FiPackage size={22} />
            </div>

          </div>

        </div>

        {/* STOCK */}

        <div className="
          bg-white
          border
          border-gray-100
          p-6
          shadow-sm
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-sm
                text-gray-500
              ">
                Stock total
              </p>

              <p className="
                text-4xl
                font-bold
                mt-3
              ">
                {totalStock}
              </p>

            </div>

            <div className="
              w-12
              h-12
              bg-gray-100
              flex
              items-center
              justify-center
            ">
              <FiBox size={22} />
            </div>

          </div>

        </div>

        {/* PRODUITS EN VEDETTE */}

        <div className="
          bg-white
          border
          border-gray-100
          p-6
          shadow-sm
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-sm
                text-gray-500
              ">
                En vedette
              </p>

              <p className="
                text-4xl
                font-bold
                mt-3
              ">
                {featuredProducts}
              </p>

            </div>

            <div className="
              w-12
              h-12
              bg-gray-100
              flex
              items-center
              justify-center
            ">
              <FiStar size={22} />
            </div>

          </div>

        </div>

        {/* VALEUR DU STOCK */}

        <div className="
          bg-black
          text-white
          p-6
          shadow-sm
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-sm
                text-gray-400
              ">
                Valeur du stock
              </p>

              <p className="
                text-2xl
                font-bold
                mt-3
              ">
                {formatPrice(stockValue)} FCFA
              </p>

            </div>

            <div className="
              w-12
              h-12
              bg-white
              text-black
              flex
              items-center
              justify-center
            ">
              <FiDollarSign size={22} />
            </div>

          </div>

        </div>

      </div>

      {/* =========================
          DEUX COLONNES
      ========================= */}

      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-8
      ">

        {/* =========================
            CATÉGORIES
        ========================= */}

        <div className="
          bg-white
          border
          border-gray-100
          p-8
        ">

          <h2 className="
            text-xl
            font-semibold
            mb-6
          ">
            Produits par catégorie
          </h2>

          {Object.keys(categories).length === 0 ? (

            <p className="
              text-gray-500
              text-sm
            ">
              Aucun produit disponible.
            </p>

          ) : (

            <div className="space-y-5">

              {Object.entries(categories).map(
                ([category, count]) => (

                  <div
                    key={category}
                    className="
                      flex
                      items-center
                      justify-between
                      border-b
                      border-gray-100
                      pb-4
                    "
                  >

                    <span className="
                      text-gray-600
                    ">
                      {category}
                    </span>

                    <span className="
                      font-semibold
                    ">
                      {count}
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </div>

        {/* =========================
            DERNIERS PRODUITS
        ========================= */}

        <div className="
          bg-white
          border
          border-gray-100
          p-8
        ">

          <div className="
            flex
            items-center
            justify-between
            mb-6
          ">

            <h2 className="
              text-xl
              font-semibold
            ">
              Derniers produits
            </h2>

            <span className="
              text-xs
              text-gray-400
            ">
              MongoDB
            </span>

          </div>

          {products.length === 0 ? (

            <p className="
              text-gray-500
              text-sm
            ">
              Aucun produit disponible.
            </p>

          ) : (

            <div className="space-y-4">

              {products
                .slice(0, 5)
                .map((product) => (

                  <div
                    key={product._id}
                    className="
                      flex
                      items-center
                      gap-4
                      border-b
                      border-gray-100
                      pb-4
                    "
                  >

                    {/* IMAGE */}

                    <div className="
                      w-14
                      h-14
                      bg-gray-100
                      overflow-hidden
                      flex-shrink-0
                    ">

                      {product.image ? (

                        <img
                          src={product.image}
                          alt={product.name}
                          className="
                            w-full
                            h-full
                            object-cover
                          "
                        />

                      ) : (

                        <div className="
                          w-full
                          h-full
                          flex
                          items-center
                          justify-center
                          text-gray-400
                        ">
                          <FiPackage />
                        </div>

                      )}

                    </div>

                    {/* INFOS */}

                    <div className="
                      flex-1
                      min-w-0
                    ">

                      <p className="
                        font-medium
                        truncate
                      ">
                        {product.name}
                      </p>

                      <p className="
                        text-xs
                        text-gray-400
                        mt-1
                      ">
                        {product.category}
                      </p>

                    </div>

                    {/* PRIX */}

                    <p className="
                      font-semibold
                      text-sm
                    ">
                      {formatPrice(product.price)} FCFA
                    </p>

                  </div>

                ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;

