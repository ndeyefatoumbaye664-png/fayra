
import useProductStore from "../Store/productStore";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const ProductsAdmin = () => {
  const products = useProductStore((state) => state.products);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const loading = useProductStore((state) => state.loading);

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer "${name}" ?`
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id);
      alert("Produit supprimé avec succès !");
    } catch (error) {
      alert("Impossible de supprimer le produit.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
            Administration FAYRA
          </p>

          <h1 className="text-4xl font-bold">
            Produits
          </h1>

          <p className="text-gray-500 mt-2">
            Gérez les produits de votre boutique.
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            bg-black
            text-white
            px-6
            py-3
            hover:bg-gray-800
            transition
          "
        >
          <FiPlus size={18} />
          Ajouter un produit
        </Link>

      </div>

      {/* PRODUITS */}
      <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">

        {loading && products.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            Chargement des produits...
          </div>
        ) : products.length === 0 ? (
          <div className="p-10 text-center">

            <p className="text-gray-500 mb-5">
              Aucun produit disponible.
            </p>

            <Link
              to="/admin/products/add"
              className="
                inline-flex
                items-center
                gap-2
                bg-black
                text-white
                px-6
                py-3
              "
            >
              <FiPlus />
              Ajouter votre premier produit
            </Link>

          </div>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">

                  <th className="p-5 text-left text-sm font-semibold">
                    Produit
                  </th>

                  <th className="p-5 text-left text-sm font-semibold">
                    Catégorie
                  </th>

                  <th className="p-5 text-left text-sm font-semibold">
                    Prix
                  </th>

                  <th className="p-5 text-left text-sm font-semibold">
                    Stock
                  </th>

                  <th className="p-5 text-right text-sm font-semibold">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {products.map((product) => (

                  <tr
                    key={product._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >

                    {/* PRODUIT */}
                    <td className="p-5">

                      <div className="flex items-center gap-4">

                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="
                              w-16
                              h-20
                              object-cover
                              border
                              border-gray-100
                            "
                          />
                        ) : (
                          <div
                            className="
                              w-16
                              h-20
                              bg-gray-100
                              flex
                              items-center
                              justify-center
                              text-xs
                              text-gray-400
                            "
                          >
                            Pas d'image
                          </div>
                        )}

                        <div>
                          <p className="font-semibold">
                            {product.name}
                          </p>

                          {product.description && (
                            <p className="text-xs text-gray-400 mt-1 max-w-xs truncate">
                              {product.description}
                            </p>
                          )}
                        </div>

                      </div>

                    </td>

                    {/* CATÉGORIE */}
                    <td className="p-5 text-sm text-gray-600">
                      {product.category}
                    </td>

                    {/* PRIX */}
                    <td className="p-5">

                      <p className="font-semibold">
                        {Number(product.price).toLocaleString("fr-FR")} FCFA
                      </p>

                    </td>

                    {/* STOCK */}
                    <td className="p-5 text-sm">

                      {product.stock ?? 0}

                    </td>

                    {/* ACTIONS */}
                    <td className="p-5">

                      <div className="flex justify-end items-center gap-4">

                        {/* MODIFIER */}
                        <Link
                          to={`/admin/products/edit/${product._id}`}
                          className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-blue-600
                            hover:text-blue-800
                            transition
                          "
                        >
                          <FiEdit size={16} />
                          Modifier
                        </Link>

                        {/* SUPPRIMER */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(product._id, product.name)
                          }
                          disabled={loading}
                          className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-red-600
                            hover:text-red-800
                            transition
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                          "
                        >
                          <FiTrash2 size={16} />
                          Supprimer
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default ProductsAdmin;

