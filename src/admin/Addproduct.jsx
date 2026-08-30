import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiUpload,
  FiX,
  FiSave,
} from "react-icons/fi";
import useProductStore from "../Store/productStore";

const AddProduct = () => {
  const navigate = useNavigate();

  const addProduct = useProductStore(
    (state) => state.addProduct
  );

  const loading = useProductStore(
    (state) => state.loading
  );

  const [product, setProduct] = useState({
    name: "",
    price: "",
    oldPrice: "",
    category: "",
    image: "",
    description: "",
    stock: "",
    featured: false,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");

  // =========================
  // CHANGEMENT DES CHAMPS
  // =========================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  // =========================
  // IMAGE
  // =========================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image valide.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 2 Mo.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;

      setProduct((prev) => ({
        ...prev,
        image: imageData,
      }));

      setImagePreview(imageData);
      setError("");
    };

    reader.readAsDataURL(file);
  };

  // =========================
  // SUPPRIMER IMAGE
  // =========================
  const removeImage = () => {
    setProduct((prev) => ({
      ...prev,
      image: "",
    }));

    setImagePreview("");
  };

  // =========================
  // ENVOI
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // NOM
    if (!product.name.trim()) {
      setError("Veuillez entrer le nom du produit.");
      return;
    }

    // PRIX
    if (
      !product.price ||
      Number(product.price) <= 0
    ) {
      setError("Veuillez entrer un prix valide.");
      return;
    }

    // CATÉGORIE
    if (!product.category) {
      setError("Veuillez choisir une catégorie.");
      return;
    }

    // STOCK
    if (
      product.stock !== "" &&
      Number(product.stock) < 0
    ) {
      setError("Le stock ne peut pas être négatif.");
      return;
    }

    try {
      // =========================
      // PRODUIT ENVOYÉ À MONGODB
      // =========================
      const newProduct = {
        name: product.name.trim(),

        price: Number(product.price),

        category: product.category,

        image: product.image || "",

        description:
          product.description.trim(),

        stock:
          product.stock === ""
            ? 0
            : Number(product.stock),

        featured: product.featured,

        // IMPORTANT :
        // PAS DE id: Date.now()
        // MongoDB crée automatiquement _id
      };

      await addProduct(newProduct);

      // Retour à la liste
      navigate("/admin/products");

    } catch (error) {
      console.error(
        "Erreur lors de l'ajout :",
        error
      );

      setError(
        error.message ||
          "Impossible d'ajouter le produit."
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* =========================
          HEADER
      ========================= */}
      <div className="mb-10">

        <button
          type="button"
          onClick={() =>
            navigate("/admin/products")
          }
          className="
            flex
            items-center
            gap-2
            text-sm
            text-gray-500
            hover:text-black
            transition
            mb-6
          "
        >
          <FiArrowLeft size={18} />
          Retour aux produits
        </button>

        <p
          className="
            text-xs
            uppercase
            tracking-[0.3em]
            text-gray-400
            mb-3
          "
        >
          Administration FAYRA
        </p>

        <h1
          className="
            text-4xl
            md:text-5xl
            font-serif
            font-bold
          "
        >
          Ajouter un produit
        </h1>

        <p className="text-gray-500 mt-3">
          Ajoutez un nouvel article à votre
          collection.
        </p>

      </div>

      {/* =========================
          ERREUR
      ========================= */}
      {error && (
        <div
          className="
            mb-6
            bg-red-50
            border
            border-red-200
            text-red-600
            px-5
            py-4
            text-sm
          "
        >
          {error}
        </div>
      )}

      {/* =========================
          FORMULAIRE
      ========================= */}
      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          border
          border-gray-100
          shadow-sm
          p-6
          md:p-10
        "
      >

        {/* =========================
            INFORMATIONS
        ========================= */}
        <div className="mb-10">

          <h2
            className="
              text-xl
              font-semibold
              mb-6
            "
          >
            Informations du produit
          </h2>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
            "
          >

            {/* NOM */}
            <div className="md:col-span-2">

              <label
                className="
                  block
                  text-sm
                  font-medium
                  mb-2
                "
              >
                Nom du produit *
              </label>

              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Ex : Robe Élégance"
                className="
                  w-full
                  border
                  border-gray-200
                  px-4
                  py-4
                  outline-none
                  focus:border-black
                  transition
                "
                required
              />

            </div>

            {/* PRIX */}
            <div>

              <label
                className="
                  block
                  text-sm
                  font-medium
                  mb-2
                "
              >
                Prix *
              </label>

              <div className="relative">

                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="25000"
                  min="0"
                  className="
                    w-full
                    border
                    border-gray-200
                    px-4
                    py-4
                    pr-20
                    outline-none
                    focus:border-black
                    transition
                  "
                  required
                />

                <span
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-sm
                    text-gray-400
                  "
                >
                  FCFA
                </span>

              </div>

            </div>

            {/* ANCIEN PRIX */}
            <div>

              <label
                className="
                  block
                  text-sm
                  font-medium
                  mb-2
                "
              >
                Ancien prix
              </label>

              <div className="relative">

                <input
                  type="number"
                  name="oldPrice"
                  value={product.oldPrice}
                  onChange={handleChange}
                  placeholder="35000"
                  min="0"
                  className="
                    w-full
                    border
                    border-gray-200
                    px-4
                    py-4
                    pr-20
                    outline-none
                    focus:border-black
                    transition
                  "
                />

                <span
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-sm
                    text-gray-400
                  "
                >
                  FCFA
                </span>

              </div>

            </div>

            {/* CATÉGORIE */}
            <div>

              <label
                className="
                  block
                  text-sm
                  font-medium
                  mb-2
                "
              >
                Catégorie *
              </label>

              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-gray-200
                  px-4
                  py-4
                  outline-none
                  focus:border-black
                  transition
                  bg-white
                "
                required
              >

                <option value="">
                  Choisir une catégorie
                </option>

                <option value="Robes">
                  Robes
                </option>

                <option value="Ensembles">
                  Ensembles
                </option>

                <option value="Sacs">
                  Sacs
                </option>

                <option value="Accessoires">
                  Accessoires
                </option>

              </select>

            </div>

            {/* STOCK */}
            <div>

              <label
                className="
                  block
                  text-sm
                  font-medium
                  mb-2
                "
              >
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                placeholder="10"
                min="0"
                className="
                  w-full
                  border
                  border-gray-200
                  px-4
                  py-4
                  outline-none
                  focus:border-black
                  transition
                "
              />

            </div>

            {/* PRODUIT MIS EN AVANT */}
            <div className="md:col-span-2">

              <label
                className="
                  flex
                  items-center
                  gap-3
                  cursor-pointer
                "
              >

                <input
                  type="checkbox"
                  name="featured"
                  checked={product.featured}
                  onChange={handleChange}
                  className="w-4 h-4"
                />

                <span className="text-sm">
                  Mettre ce produit en avant
                </span>

              </label>

            </div>

          </div>

        </div>

        {/* =========================
            IMAGE
        ========================= */}
        <div
          className="
            border-t
            border-gray-100
            pt-10
            mb-10
          "
        >

          <h2
            className="
              text-xl
              font-semibold
              mb-2
            "
          >
            Image du produit
          </h2>

          <p className="text-sm text-gray-400 mb-6">
            Ajoutez une image JPG, JPEG ou PNG.
          </p>

          {!imagePreview ? (

            <label
              className="
                min-h-[220px]
                border-2
                border-dashed
                border-gray-300
                bg-gray-50
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
                hover:border-black
                hover:bg-white
                transition
                p-8
                text-center
              "
            >

              <div
                className="
                  w-14
                  h-14
                  bg-white
                  border
                  border-gray-200
                  flex
                  items-center
                  justify-center
                  mb-4
                "
              >
                <FiUpload size={24} />
              </div>

              <p className="font-medium">
                Ajouter une image
              </p>

              <p className="text-sm text-gray-400 mt-2">
                PNG, JPG ou JPEG — 2 Mo maximum
              </p>

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageChange}
                className="hidden"
              />

            </label>

          ) : (

            <div className="relative max-w-sm">

              <img
                src={imagePreview}
                alt="Aperçu du produit"
                className="
                  w-full
                  aspect-[3/4]
                  object-cover
                  border
                  border-gray-200
                "
              />

              <button
                type="button"
                onClick={removeImage}
                className="
                  absolute
                  top-3
                  right-3
                  w-9
                  h-9
                  bg-black
                  text-white
                  flex
                  items-center
                  justify-center
                  hover:bg-gray-800
                  transition
                "
                title="Supprimer l'image"
              >
                <FiX size={18} />
              </button>

            </div>

          )}

        </div>

        {/* =========================
            DESCRIPTION
        ========================= */}
        <div
          className="
            border-t
            border-gray-100
            pt-10
            mb-10
          "
        >

          <h2
            className="
              text-xl
              font-semibold
              mb-6
            "
          >
            Description
          </h2>

          <label
            className="
              block
              text-sm
              font-medium
              mb-2
            "
          >
            Description du produit
          </label>

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Décrivez votre produit..."
            rows="6"
            className="
              w-full
              border
              border-gray-200
              px-4
              py-4
              outline-none
              focus:border-black
              transition
              resize-none
            "
          />

        </div>

        {/* =========================
            ACTIONS
        ========================= */}
        <div
          className="
            border-t
            border-gray-100
            pt-8
            flex
            flex-col
            sm:flex-row
            gap-4
            justify-end
          "
        >

          <button
            type="button"
            onClick={() =>
              navigate("/admin/products")
            }
            disabled={loading}
            className="
              px-7
              py-4
              border
              border-gray-200
              text-sm
              font-medium
              hover:border-black
              transition
              disabled:opacity-50
            "
          >
            Annuler
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
              px-7
              py-4
              bg-black
              text-white
              text-sm
              font-medium
              flex
              items-center
              justify-center
              gap-3
              hover:bg-gray-800
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >

            <FiSave size={18} />

            {loading
              ? "Enregistrement..."
              : "Ajouter le produit"}

          </button>

        </div>

      </form>

    </div>
  );
};

export default AddProduct;

