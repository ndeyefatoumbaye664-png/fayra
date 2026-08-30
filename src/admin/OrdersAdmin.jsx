import { useEffect } from "react";
import {
  FiPackage,
  FiUser,
  FiPhone,
  FiMapPin,
  FiCreditCard,
  FiTrash2,
  FiRefreshCw,
} from "react-icons/fi";

import useOrderStore from "../store/orderStore";

const OrdersAdmin = () => {
  // =========================
  // STORE
  // =========================

  const orders = useOrderStore(
    (state) => state.orders
  );

  const loading = useOrderStore(
    (state) => state.loading
  );

  const error = useOrderStore(
    (state) => state.error
  );

  const fetchOrders = useOrderStore(
    (state) => state.fetchOrders
  );

  const updateOrderStatus = useOrderStore(
    (state) => state.updateOrderStatus
  );

  const deleteOrder = useOrderStore(
    (state) => state.deleteOrder
  );

  // =========================
  // CHARGER LES COMMANDES
  // =========================

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // =========================
  // MODIFIER LE STATUT
  // =========================

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      await updateOrderStatus(id, status);
    } catch (error) {
      alert(
        "Impossible de modifier le statut."
      );
    }
  };

  // =========================
  // SUPPRIMER
  // =========================

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cette commande ?"
    );

    if (!confirmation) {
      return;
    }

    try {
      await deleteOrder(id);
    } catch (error) {
      alert(
        "Impossible de supprimer la commande."
      );
    }
  };

  // =========================
  // RAFRAÎCHIR
  // =========================

  const handleRefresh = () => {
    fetchOrders();
  };

  // =========================
  // FORMAT DATE
  // =========================

  const formatDate = (date) => {
    if (!date) return "Date inconnue";

    return new Date(date).toLocaleString(
      "fr-FR",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div className="pb-10">

      {/* ================= HEADER ================= */}

      <div
        className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-10
        "
      >

        <div>

          <p
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-gray-400
              mb-2
            "
          >
            FAYRA ADMIN
          </p>

          <h1
            className="
              text-4xl
              font-bold
            "
          >
            Commandes
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Gérez les commandes de vos clients.
          </p>

        </div>


        {/* BOUTON RAFRAÎCHIR */}

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading}
          className="
            flex
            items-center
            justify-center
            gap-2
            bg-black
            text-white
            px-5
            py-3
            hover:bg-gray-800
            transition
            disabled:opacity-50
          "
        >

          <FiRefreshCw
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Actualiser

        </button>

      </div>


      {/* ================= ERREUR ================= */}

      {error && (

        <div
          className="
            mb-6
            bg-red-50
            border
            border-red-200
            text-red-600
            p-4
          "
        >

          {error}

        </div>

      )}


      {/* ================= CHARGEMENT ================= */}

      {loading && orders.length === 0 ? (

        <div
          className="
            bg-white
            p-12
            text-center
            shadow-sm
          "
        >

          <FiRefreshCw
            size={30}
            className="
              mx-auto
              mb-4
              animate-spin
              text-gray-400
            "
          />

          <p className="text-gray-500">

            Chargement des commandes...

          </p>

        </div>

      ) : orders.length === 0 ? (

        /* ================= AUCUNE COMMANDE ================= */

        <div
          className="
            bg-white
            p-12
            text-center
            shadow-sm
          "
        >

          <FiPackage
            size={50}
            className="
              mx-auto
              mb-5
              text-gray-300
            "
          />

          <h2
            className="
              text-xl
              font-semibold
              mb-2
            "
          >

            Aucune commande

          </h2>

          <p
            className="
              text-gray-500
            "
          >

            Les nouvelles commandes
            apparaîtront ici.

          </p>

        </div>

      ) : (

        /* ================= COMMANDES ================= */

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order._id}
              className="
                bg-white
                shadow-sm
                border
                border-gray-100
                overflow-hidden
              "
            >

              {/* ================= HEADER COMMANDE ================= */}

              <div
                className="
                  p-6
                  md:p-8
                  border-b
                  border-gray-100
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                  gap-5
                "
              >

                <div>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      mb-2
                    "
                  >

                    <FiPackage />

                    <h2
                      className="
                        text-xl
                        font-bold
                      "
                    >

                      Commande #
                      {order._id.slice(-6).toUpperCase()}

                    </h2>

                  </div>

                  <p
                    className="
                      text-sm
                      text-gray-400
                    "
                  >

                    {formatDate(
                      order.createdAt
                    )}

                  </p>

                </div>


                {/* STATUT */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <span
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Statut :
                  </span>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order._id,
                        e.target.value
                      )
                    }
                    className="
                      border
                      border-gray-200
                      px-4
                      py-3
                      outline-none
                      focus:border-black
                      bg-white
                    "
                  >

                    <option value="En attente">
                      En attente
                    </option>

                    <option value="Confirmée">
                      Confirmée
                    </option>

                    <option value="Expédiée">
                      Expédiée
                    </option>

                    <option value="Livrée">
                      Livrée
                    </option>

                    <option value="Annulée">
                      Annulée
                    </option>

                  </select>

                </div>

              </div>


              {/* ================= INFORMATIONS ================= */}

              <div
                className="
                  p-6
                  md:p-8
                  grid
                  grid-cols-1
                  lg:grid-cols-2
                  gap-8
                "
              >

                {/* CLIENT */}

                <div>

                  <h3
                    className="
                      font-bold
                      text-lg
                      mb-5
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <FiUser />

                    Informations client

                  </h3>


                  <div
                    className="
                      space-y-3
                      text-sm
                      text-gray-600
                    "
                  >

                    <p>

                      <span className="font-semibold">
                        Nom :
                      </span>{" "}

                      {order.customer?.name ||
                        "Non renseigné"}

                    </p>


                    <p
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <FiPhone />

                      <span>
                        {order.customer?.phone ||
                          "Non renseigné"}
                      </span>

                    </p>


                    <p
                      className="
                        flex
                        items-start
                        gap-2
                      "
                    >

                      <FiMapPin
                        className="
                          mt-1
                          shrink-0
                        "
                      />

                      <span>

                        {order.customer?.address ||
                          "Non renseignée"}

                        {order.customer?.city &&
                          `, ${order.customer.city}`}

                      </span>

                    </p>


                    <p
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <FiCreditCard />

                      <span>

                        Paiement :
                        {" "}
                        {order.paymentMethod ||
                          "Non précisé"}

                      </span>

                    </p>

                  </div>

                </div>


                {/* PRODUITS */}

                <div>

                  <h3
                    className="
                      font-bold
                      text-lg
                      mb-5
                    "
                  >

                    Produits commandés

                  </h3>


                  <div className="space-y-4">

                    {order.products?.map(
                      (product, index) => (

                        <div
                          key={
                            product.productId ||
                            product.id ||
                            index
                          }
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

                          {product.image ? (

                            <img
                              src={product.image}
                              alt={product.name}
                              className="
                                w-16
                                h-20
                                object-cover
                                bg-gray-100
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
                              "
                            >

                              <FiPackage />

                            </div>

                          )}


                          {/* INFOS */}

                          <div className="flex-1">

                            <p
                              className="
                                font-semibold
                              "
                            >

                              {product.name}

                            </p>

                            <p
                              className="
                                text-sm
                                text-gray-400
                                mt-1
                              "
                            >

                              Quantité :
                              {" "}
                              {product.quantity}

                            </p>

                            <p
                              className="
                                text-sm
                                font-medium
                                mt-1
                              "
                            >

                              {Number(
                                product.price
                              ).toLocaleString()}{" "}

                              FCFA

                            </p>

                          </div>


                          {/* SOUS-TOTAL PRODUIT */}

                          <p
                            className="
                              font-bold
                              text-sm
                            "
                          >

                            {(
                              Number(
                                product.price
                              ) *
                              Number(
                                product.quantity
                              )
                            ).toLocaleString()}{" "}

                            FCFA

                          </p>

                        </div>

                      )
                    )}

                  </div>

                </div>

              </div>


              {/* ================= FOOTER ================= */}

              <div
                className="
                  p-6
                  md:p-8
                  bg-gray-50
                  border-t
                  border-gray-100
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-5
                "
              >

                <div>

                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >

                    Total de la commande

                  </p>

                  <p
                    className="
                      text-2xl
                      font-bold
                      mt-1
                    "
                  >

                    {Number(
                      order.total || 0
                    ).toLocaleString()}{" "}

                    FCFA

                  </p>

                </div>


                {/* SUPPRIMER */}

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(order._id)
                  }
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    border
                    border-red-200
                    text-red-500
                    px-5
                    py-3
                    hover:bg-red-50
                    transition
                  "
                >

                  <FiTrash2 />

                  Supprimer

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default OrdersAdmin;