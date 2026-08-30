import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import useProductStore from "../Store/productStore";
import categoriesFilter from "../data/categoriesFilter";
import { useSearchParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const Shop = () => {
  const [searchParams] = useSearchParams();

  const categoryURL = searchParams.get("category");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    categoryURL || "Tous"
  );

  const [sort, setSort] = useState("");

  const products = useProductStore(
    (state) => state.products
  );

  const loading = useProductStore(
    (state) => state.loading
  );

  const error = useProductStore(
    (state) => state.error
  );

  const fetchProducts = useProductStore(
    (state) => state.fetchProducts
  );

  // =========================
  // CHARGER MONGODB
  // =========================
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // =========================
  // FILTRAGE
  // =========================
  let filteredProducts = products.filter(
    (product) => {

      const matchSearch = product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "Tous"
          ? true
          : product.category === category;

      return matchSearch && matchCategory;
    }
  );

  // =========================
  // TRI
  // =========================
  if (sort === "low") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <section className="pt-32 pb-20 bg-gray-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-6">

        <BackButton />

        {/* HEADER */}
        <div className="text-center mb-12">

          <p className="text-yellow-500 uppercase tracking-[5px] text-sm">
            Boutique
          </p>

          <h1 className="text-5xl font-bold mt-4">
            Collection FAYRA
          </h1>

          <p className="text-gray-500 mt-4">
            Découvrez nos dernières collections.
          </p>

        </div>

        {/* FILTRES */}
        <div className="bg-white p-6 mb-12 grid grid-cols-1 md:grid-cols-3 gap-5">

          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border p-4 outline-none focus:border-black"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border p-4 outline-none"
          >

            {categoriesFilter.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}

          </select>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="border p-4 outline-none"
          >

            <option value="">
              Trier par
            </option>

            <option value="low">
              Prix croissant
            </option>

            <option value="high">
              Prix décroissant
            </option>

          </select>

        </div>

        {/* CHARGEMENT */}
        {loading && (
          <div className="text-center py-20">
            <p className="text-gray-500">
              Chargement des produits...
            </p>
          </div>
        )}

        {/* ERREUR */}
        {!loading && error && (
          <div className="text-center py-20">

            <p className="text-red-500 mb-4">
              Impossible de récupérer les produits.
            </p>

            <p className="text-sm text-gray-400 mb-5">
              {error}
            </p>

            <button
              onClick={fetchProducts}
              className="bg-black text-white px-6 py-3"
            >
              Réessayer
            </button>

          </div>
        )}

        {/* PRODUITS */}
        {!loading &&
          !error &&
          filteredProducts.length === 0 && (
            <p className="text-center text-gray-500">
              Aucun produit trouvé
            </p>
          )}

        {!loading &&
          !error &&
          filteredProducts.length > 0 && (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product._id || product.id}
                    product={product}
                  />
                )
              )}

            </div>

          )}

      </div>

    </section>
  );
};

export default Shop;