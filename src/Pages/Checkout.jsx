import {
  FiCheckCircle,
  FiPackage,
  FiHeart,
  FiCreditCard,
  FiMapPin,
  FiPhone,
  FiUser,
  FiShield,
  FiArrowLeft,
  FiUpload,
  FiX,
} from "react-icons/fi";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useCartStore from "../store/cartStore";

const Checkout = () => {
  const navigate = useNavigate();

  // =========================
  // ÉTATS
  // =========================

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [paymentProof, setPaymentProof] = useState(null);
  const [proofFile, setProofFile] = useState(null);

  // =========================
  // PANIER
  // =========================

  const cart = useCartStore((state) => state.cart);

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  // =========================
  // FORMULAIRE
  // =========================

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    payment: "Wave",
  });

  // =========================
  // WAVE
  // =========================

  const waveLink =
    "https://pay.wave.com/m/M_sn_Tj5ijUsoHLZ7/c/sn/";

  // =========================
  // TOTAL
  // =========================

  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const deliveryFee = 2000;

  const total = subtotal + deliveryFee;

  // =========================
  // CHANGEMENT FORMULAIRE
  // =========================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // PREUVE DE PAIEMENT
  // =========================

  const handleProof = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Vérification type
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Veuillez sélectionner une image PNG, JPG ou JPEG."
      );
      return;
    }

    // Taille max 5 MB
    if (file.size > 5 * 1024 * 1024) {
      alert(
        "La preuve de paiement ne doit pas dépasser 5 MB."
      );
      return;
    }

    // Supprimer l'ancienne URL
    if (paymentProof) {
      URL.revokeObjectURL(paymentProof);
    }

    setProofFile(file);

    setPaymentProof(
      URL.createObjectURL(file)
    );
  };

  // =========================
  // SUPPRIMER PREUVE
  // =========================

  const removeProof = () => {
    if (paymentProof) {
      URL.revokeObjectURL(paymentProof);
    }

    setPaymentProof(null);
    setProofFile(null);
  };

  // =========================
  // PAIEMENT WAVE
  // =========================

  const handleWavePayment = () => {
    window.open(
      waveLink,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // =========================
  // ENVOYER COMMANDE AU BACKEND
  // =========================

  const sendOrderToBackend = async () => {
    /*
      IMPORTANT :

      Si ton frontend Vite tourne sur :
      http://localhost:5173

      et ton serveur Node sur :
      http://localhost:5000

      on utilise :
      http://localhost:5000/api/orders
    */

    const API_URL =
      import.meta.env.VITE_API_URL ||
      "http://localhost:5000";

    // Produits adaptés au modèle MongoDB
    const products = cart.map((item) => ({
      productId: String(
        item._id || item.id
      ),

      name: item.name,

      image: item.image || "",

      price: Number(item.price),

      quantity: Number(
        item.quantity || 1
      ),
    }));

    const orderData = {
      customer: {
        name: form.name.trim(),

        phone: form.phone.trim(),

        address: form.address.trim(),

        city: form.city.trim(),
      },

      products,

      subtotal: Number(subtotal),

      deliveryFee: Number(
        deliveryFee
      ),

      total: Number(total),

      paymentMethod: form.payment,

      status: "En attente",
    };

    console.log(
      "📦 Commande envoyée au serveur :",
      orderData
    );

    const response = await fetch(
      `${API_URL}/api/orders`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          orderData
        ),
      }
    );

    const data =
      await response.json();

    console.log(
      "📥 Réponse serveur :",
      data
    );

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Impossible d'enregistrer la commande."
      );
    }

    return data;
  };

  // =========================
  // CONFIRMER COMMANDE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Panier vide
    if (cart.length === 0) {
      alert(
        "Votre panier est vide."
      );
      return;
    }

    // Nom
    if (!form.name.trim()) {
      alert(
        "Veuillez renseigner votre nom."
      );
      return;
    }

    // Téléphone
    if (!form.phone.trim()) {
      alert(
        "Veuillez renseigner votre numéro de téléphone."
      );
      return;
    }

    // Adresse
    if (!form.address.trim()) {
      alert(
        "Veuillez renseigner votre adresse de livraison."
      );
      return;
    }

    // Ville
    if (!form.city.trim()) {
      alert(
        "Veuillez renseigner votre ville."
      );
      return;
    }

    // Preuve Wave
    if (
      form.payment === "Wave" &&
      !proofFile
    ) {
      alert(
        "Veuillez effectuer votre paiement Wave puis ajouter la preuve de paiement."
      );
      return;
    }

    try {
      setLoading(true);

      // ====================================
      // ENREGISTREMENT DANS MONGODB
      // ====================================

      const result =
        await sendOrderToBackend();

      console.log(
        "✅ COMMANDE ENREGISTRÉE DANS MONGODB :",
        result
      );

      // ====================================
      // VIDER LE PANIER
      // ====================================

      clearCart();

      // ====================================
      // AFFICHER SUCCÈS
      // ====================================

      setSuccess(true);
    } catch (error) {
      console.error(
        "❌ ERREUR COMMANDE :",
        error
      );

      alert(
        error.message ||
          "Une erreur est survenue lors de l'enregistrement de votre commande."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // PAGE SUCCÈS
  // =========================

  if (success) {
    return (
      <section
        className="
          min-h-screen
          bg-gray-50
          pt-32
          pb-20
          flex
          items-center
          justify-center
          px-6
        "
      >
        <div
          className="
            fixed
            inset-0
            bg-black/60
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-[9999]
            p-5
          "
        >
          <div
            className="
              bg-white
              w-full
              max-w-lg
              rounded-2xl
              shadow-2xl
              p-8
              md:p-12
              text-center
            "
          >
            {/* ICON */}

            <div
              className="
                w-20
                h-20
                mx-auto
                rounded-full
                bg-green-50
                text-green-600
                flex
                items-center
                justify-center
                mb-7
              "
            >
              <FiCheckCircle
                size={44}
              />
            </div>

            {/* FAYRA */}

            <p
              className="
                text-xs
                uppercase
                tracking-[0.35em]
                text-gray-400
                mb-4
              "
            >
              FAYRA
            </p>

            {/* TITRE */}

            <h2
              className="
                text-3xl
                md:text-4xl
                font-serif
                font-bold
                mb-5
              "
            >
              Commande confirmée
            </h2>

            {/* MESSAGE */}

            <p
              className="
                text-gray-500
                leading-relaxed
              "
            >
              Merci {form.name} pour
              votre commande.

              <FiHeart
                className="
                  inline
                  ml-2
                  text-red-500
                "
              />

              <br />

              Votre commande a bien été
              enregistrée.

              <br />

              Notre équipe vous contactera
              prochainement pour confirmer
              la livraison.
            </p>

            {/* STATUT */}

            <div
              className="
                mt-8
                bg-gray-50
                p-5
                text-left
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  mb-3
                "
              >
                <FiPackage />

                <span className="font-semibold">
                  Statut de la commande
                </span>
              </div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                En attente de confirmation
              </p>
            </div>

            {/* RETOUR */}

            <button
              type="button"
              onClick={() =>
                navigate("/")
              }
              className="
                mt-8
                w-full
                bg-black
                text-white
                py-4
                flex
                items-center
                justify-center
                gap-3
                hover:bg-gray-800
                transition
              "
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </section>
    );
  }

  // =========================
  // CHECKOUT
  // =========================

  return (
    <main
      className="
        min-h-screen
        bg-gray-50
        pt-28
        pb-20
      "
    >
      {/* =========================
          HEADER
      ========================= */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          mb-10
        "
      >
        <button
          type="button"
          onClick={() =>
            navigate("/cart")
          }
          className="
            flex
            items-center
            gap-2
            text-sm
            text-gray-500
            hover:text-black
            transition
            mb-8
          "
        >
          <FiArrowLeft />

          Retour au panier
        </button>

        <p
          className="
            text-xs
            uppercase
            tracking-[0.35em]
            text-gray-400
            mb-4
          "
        >
          FAYRA
        </p>

        <h1
          className="
            text-4xl
            md:text-6xl
            font-serif
            font-bold
          "
        >
          Finaliser ma commande
        </h1>
      </section>

      {/* =========================
          CONTENU
      ========================= */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
        "
      >
        <form
          onSubmit={handleSubmit}
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1fr_420px]
            gap-8
            items-start
          "
        >
          {/* =========================
              GAUCHE
          ========================= */}

          <div className="space-y-6">

            {/* INFORMATIONS */}

            <div
              className="
                bg-white
                p-6
                md:p-8
                shadow-sm
                border
                border-gray-100
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  mb-7
                "
              >
                <div
                  className="
                    w-10
                    h-10
                    bg-black
                    text-white
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FiUser />
                </div>

                <div>
                  <h2
                    className="
                      text-xl
                      font-semibold
                    "
                  >
                    Informations personnelles
                  </h2>

                  <p
                    className="
                      text-sm
                      text-gray-400
                      mt-1
                    "
                  >
                    Où devons-nous vous livrer ?
                  </p>
                </div>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-5
                "
              >
                {/* NOM */}

                <div>
                  <label
                    className="
                      block
                      text-sm
                      font-medium
                      mb-2
                    "
                  >
                    Nom complet
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Votre nom complet"
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

                {/* TELEPHONE */}

                <div>
                  <label
                    className="
                      block
                      text-sm
                      font-medium
                      mb-2
                    "
                  >
                    Téléphone
                  </label>

                  <div className="relative">
                    <FiPhone
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                      "
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+221 XX XXX XX XX"
                      className="
                        w-full
                        border
                        border-gray-200
                        pl-11
                        pr-4
                        py-4
                        outline-none
                        focus:border-black
                        transition
                      "
                    />
                  </div>
                </div>

                {/* ADRESSE */}

                <div className="md:col-span-2">
                  <label
                    className="
                      block
                      text-sm
                      font-medium
                      mb-2
                    "
                  >
                    Adresse de livraison
                  </label>

                  <div className="relative">
                    <FiMapPin
                      className="
                        absolute
                        left-4
                        top-5
                        text-gray-400
                      "
                    />

                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Quartier, rue, numéro..."
                      rows="3"
                      className="
                        w-full
                        border
                        border-gray-200
                        pl-11
                        pr-4
                        py-4
                        outline-none
                        focus:border-black
                        transition
                        resize-none
                      "
                    />
                  </div>
                </div>

                {/* VILLE */}

                <div>
                  <label
                    className="
                      block
                      text-sm
                      font-medium
                      mb-2
                    "
                  >
                    Ville
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Dakar"
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
              </div>
            </div>

            {/* =========================
                PAIEMENT
            ========================= */}

            <div
              className="
                bg-white
                p-6
                md:p-8
                shadow-sm
                border
                border-gray-100
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  mb-7
                "
              >
                <div
                  className="
                    w-10
                    h-10
                    bg-black
                    text-white
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FiCreditCard />
                </div>

                <div>
                  <h2
                    className="
                      text-xl
                      font-semibold
                    "
                  >
                    Mode de paiement
                  </h2>

                  <p
                    className="
                      text-sm
                      text-gray-400
                      mt-1
                    "
                  >
                    Choisissez votre moyen de paiement
                  </p>
                </div>
              </div>

              <div className="space-y-4">

                {/* WAVE */}

                <label
                  className="
                    block
                    border-2
                    border-black
                    p-5
                    cursor-pointer
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-4
                      "
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="Wave"
                        checked={
                          form.payment ===
                          "Wave"
                        }
                        onChange={handleChange}
                      />

                      <div>
                        <p className="font-semibold">
                          Wave
                        </p>

                        <p
                          className="
                            text-sm
                            text-gray-500
                          "
                        >
                          Paiement mobile
                        </p>
                      </div>
                    </div>

                    <FiCreditCard
                      size={24}
                    />
                  </div>
                </label>

                {/* LIVRAISON */}

                <label
                  className="
                    block
                    border
                    border-gray-200
                    p-5
                    cursor-pointer
                    hover:border-black
                    transition
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="Paiement à la livraison"
                      checked={
                        form.payment ===
                        "Paiement à la livraison"
                      }
                      onChange={handleChange}
                    />

                    <div>
                      <p className="font-semibold">
                        Paiement à la livraison
                      </p>

                      <p
                        className="
                          text-sm
                          text-gray-500
                        "
                      >
                        Payez lors de la réception
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* =========================
                  WAVE
              ========================= */}

              {form.payment ===
                "Wave" && (
                <div
                  className="
                    mt-6
                    border
                    border-gray-200
                    bg-gray-50
                    p-6
                  "
                >
                  <div className="text-center">

                    <FiCreditCard
                      size={30}
                      className="mx-auto mb-3"
                    />

                    <h3
                      className="
                        font-semibold
                        text-lg
                      "
                    >
                      Payer avec Wave
                    </h3>

                    <p
                      className="
                        text-sm
                        text-gray-500
                        mt-2
                        leading-relaxed
                      "
                    >
                      Cliquez sur le bouton
                      ci-dessous pour ouvrir
                      directement l'espace de
                      paiement Wave.
                    </p>

                    {/* BOUTON WAVE */}

                    <button
                      type="button"
                      onClick={
                        handleWavePayment
                      }
                      className="
                        mt-5
                        w-full
                        bg-black
                        text-white
                        py-4
                        flex
                        items-center
                        justify-center
                        gap-3
                        hover:bg-gray-800
                        transition
                      "
                    >
                      <FiCreditCard />

                      Payer avec Wave
                    </button>

                    {/* PREUVE */}

                    <div
                      className="
                        mt-7
                        text-left
                      "
                    >
                      <label
                        className="
                          block
                          font-semibold
                          mb-3
                        "
                      >
                        Preuve de paiement
                      </label>

                      <label
                        className="
                          border-2
                          border-dashed
                          border-gray-300
                          bg-white
                          min-h-[130px]
                          flex
                          flex-col
                          items-center
                          justify-center
                          text-center
                          p-5
                          cursor-pointer
                          hover:border-black
                          transition
                        "
                      >
                        <FiUpload
                          size={25}
                          className="mb-3"
                        />

                        <span className="font-medium">
                          Ajouter une capture
                        </span>

                        <span
                          className="
                            text-xs
                            text-gray-400
                            mt-1
                          "
                        >
                          PNG, JPG ou JPEG
                        </span>

                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          onChange={
                            handleProof
                          }
                          className="hidden"
                        />
                      </label>

                      {/* APERÇU */}

                      {paymentProof && (
                        <div
                          className="
                            relative
                            mt-5
                            inline-block
                          "
                        >
                          <img
                            src={paymentProof}
                            alt="Preuve de paiement"
                            className="
                              max-w-[220px]
                              max-h-[300px]
                              object-contain
                              border
                              border-gray-200
                            "
                          />

                          <button
                            type="button"
                            onClick={
                              removeProof
                            }
                            className="
                              absolute
                              -top-3
                              -right-3
                              w-8
                              h-8
                              bg-black
                              text-white
                              rounded-full
                              flex
                              items-center
                              justify-center
                            "
                          >
                            <FiX />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* =========================
                SÉCURITÉ
            ========================= */}

            <div
              className="
                flex
                gap-4
                items-start
                bg-white
                border
                border-gray-100
                p-5
              "
            >
              <FiShield
                size={24}
                className="shrink-0"
              />

              <div>
                <h3
                  className="
                    font-semibold
                    mb-1
                  "
                >
                  Commande sécurisée
                </h3>

                <p
                  className="
                    text-sm
                    text-gray-500
                    leading-relaxed
                  "
                >
                  Vos informations sont
                  utilisées uniquement pour
                  traiter votre commande et
                  organiser votre livraison.
                </p>
              </div>
            </div>
          </div>

          {/* =========================
              DROITE
          ========================= */}

          <aside
            className="
              bg-white
              border
              border-gray-100
              shadow-sm
              p-6
              md:p-8
              lg:sticky
              lg:top-28
            "
          >
            <h2
              className="
                text-2xl
                font-serif
                font-bold
                mb-7
              "
            >
              Votre commande
            </h2>

            {cart.length === 0 ? (
              <div
                className="
                  text-center
                  py-10
                "
              >
                <FiPackage
                  size={42}
                  className="
                    mx-auto
                    mb-4
                    text-gray-300
                  "
                />

                <p
                  className="
                    text-gray-500
                  "
                >
                  Votre panier est vide.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/shop")
                  }
                  className="
                    mt-5
                    bg-black
                    text-white
                    px-6
                    py-3
                  "
                >
                  Découvrir la boutique
                </button>
              </div>
            ) : (
              <>
                {/* PRODUITS */}

                <div
                  className="
                    space-y-5
                    max-h-[420px]
                    overflow-y-auto
                    pr-1
                  "
                >
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="
                        flex
                        gap-4
                        border-b
                        border-gray-100
                        pb-5
                      "
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-20
                          h-24
                          object-cover
                          bg-gray-100
                        "
                      />

                      <div className="flex-1">
                        <h3
                          className="
                            font-semibold
                            text-sm
                            leading-relaxed
                          "
                        >
                          {item.name}
                        </h3>

                        <p
                          className="
                            text-sm
                            text-gray-400
                            mt-1
                          "
                        >
                          Quantité :{" "}
                          {item.quantity}
                        </p>

                        <p
                          className="
                            font-semibold
                            mt-2
                          "
                        >
                          {(
                            Number(
                              item.price
                            ) *
                            Number(
                              item.quantity
                            )
                          ).toLocaleString()}{" "}
                          FCFA
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* TOTAL */}

                <div
                  className="
                    border-t
                    border-gray-200
                    mt-7
                    pt-6
                    space-y-4
                  "
                >
                  <div
                    className="
                      flex
                      justify-between
                      text-gray-500
                    "
                  >
                    <span>
                      Sous-total
                    </span>

                    <span>
                      {subtotal.toLocaleString()}{" "}
                      FCFA
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      justify-between
                      text-gray-500
                    "
                  >
                    <span>
                      Livraison
                    </span>

                    <span>
                      {deliveryFee.toLocaleString()}{" "}
                      FCFA
                    </span>
                  </div>

                  <div
                    className="
                      border-t
                      border-gray-200
                      pt-5
                      flex
                      justify-between
                      text-xl
                      font-bold
                    "
                  >
                    <span>
                      Total
                    </span>

                    <span>
                      {total.toLocaleString()}{" "}
                      FCFA
                    </span>
                  </div>
                </div>

                {/* CONFIRMATION */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    mt-7
                    w-full
                    bg-black
                    text-white
                    py-5
                    uppercase
                    tracking-[0.2em]
                    text-sm
                    font-medium
                    hover:bg-gray-800
                    transition
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  {loading
                    ? "Enregistrement..."
                    : "Confirmer la commande"}
                </button>

                <p
                  className="
                    text-center
                    text-xs
                    text-gray-400
                    mt-4
                    leading-relaxed
                  "
                >
                  En confirmant votre
                  commande, vous acceptez
                  les conditions de vente
                  de FAYRA.
                </p>
              </>
            )}
          </aside>
        </form>
      </section>
    </main>
  );
};

export default Checkout;

