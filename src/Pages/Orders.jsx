import {
  FiPackage,
  FiChevronRight,
  FiShoppingBag,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import useOrderStore from "../store/orderStore";

const Orders = () => {

  const orders = useOrderStore(
    (state) => state.orders
  );

const addOrder = useOrderStore(
  (state) => state.addOrder
);

  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900 pt-24">

      {/* ================= HEADER ================= */}

      <section className="bg-white border-b border-gray-200">

        <div className="max-w-6xl mx-auto px-6 py-14">

          <p className="
            text-xs
            uppercase
            tracking-[0.25em]
            text-gray-400
            mb-4
          ">
            Mon espace
          </p>

          <h1 className="
            text-3xl
            md:text-4xl
            font-light
            tracking-tight
          ">
            Mes commandes
          </h1>

          <p className="
            mt-3
            text-sm
            text-gray-500
          ">
            Retrouvez ici l'ensemble de vos commandes FAYRA.
          </p>

        </div>

      </section>


      {/* ================= CONTENU ================= */}

      <section className="
        max-w-6xl
        mx-auto
        px-6
        py-12
      ">

        {orders && orders.length > 0 ? (

          <div className="space-y-5">

            {orders.map((order) => (

              <div
                key={order.id}
                className="
                  bg-white
                  border
                  border-gray-200
                  hover:border-gray-400
                  transition
                "
              >

                {/* HEADER COMMANDE */}

                <div className="
                  px-6
                  md:px-8
                  py-5
                  border-b
                  border-gray-200
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-4
                ">

                  <div>

                    <p className="
                      text-xs
                      uppercase
                      tracking-wider
                      text-gray-400
                      mb-1
                    ">
                      Commande
                    </p>

                    <h2 className="
                      text-sm
                      font-medium
                    ">
                      #{order.id}
                    </h2>

                  </div>


                  <div className="
                    flex
                    items-center
                    gap-6
                  ">

                    <div>

                      <p className="
                        text-xs
                        text-gray-400
                        mb-1
                      ">
                        Statut
                      </p>

                      <span className="
                        inline-block
                        px-3
                        py-1.5
                        bg-gray-100
                        text-xs
                        text-gray-600
                      ">
                        {order.status || "En attente"}
                      </span>

                    </div>


                    <div>

                      <p className="
                        text-xs
                        text-gray-400
                        mb-1
                      ">
                        Total
                      </p>

                      <p className="
                        text-sm
                        font-medium
                      ">
                        {Number(order.total || 0).toLocaleString()} FCFA
                      </p>

                    </div>

                  </div>

                </div>


                {/* PRODUITS */}

                <div className="
                  px-6
                  md:px-8
                  py-6
                ">

                  <div className="
                    flex
                    items-center
                    gap-3
                    mb-5
                  ">

                    <FiPackage
                      size={18}
                      className="text-gray-500"
                    />

                    <h3 className="
                      text-sm
                      font-medium
                    ">
                      Articles commandés
                    </h3>

                  </div>


                  <div className="space-y-4">

                    {order.products?.map((product, index) => (

                      <div
                        key={`${product.id}-${index}`}
                        className="
                          flex
                          items-center
                          gap-4
                        "
                      >

                        {/* IMAGE */}

                        <div className="
                          w-16
                          h-20
                          bg-gray-100
                          overflow-hidden
                          shrink-0
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
                            ">

                              <FiShoppingBag
                                className="text-gray-400"
                              />

                            </div>

                          )}

                        </div>


                        {/* INFOS */}

                        <div className="flex-1">

                          <p className="
                            text-sm
                            font-medium
                          ">
                            {product.name}
                          </p>

                          <p className="
                            text-xs
                            text-gray-400
                            mt-1
                          ">
                            Quantité : {product.quantity || 1}
                          </p>

                        </div>


                        <p className="
                          text-sm
                          font-medium
                        ">
                          {(
                            Number(product.price || 0) *
                            Number(product.quantity || 1)
                          ).toLocaleString()} FCFA
                        </p>

                      </div>

                    ))}

                  </div>

                </div>


                {/* FOOTER COMMANDE */}

                <div className="
                  px-6
                  md:px-8
                  py-5
                  border-t
                  border-gray-200
                  flex
                  justify-end
                ">

                  <button
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      hover:underline
                      underline-offset-4
                    "
                  >

                    Voir les détails

                    <FiChevronRight size={16} />

                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* ================= AUCUNE COMMANDE ================= */

          <div className="
            bg-white
            border
            border-gray-200
            text-center
            py-20
            px-6
          ">

            <div className="
              w-16
              h-16
              mx-auto
              bg-gray-100
              flex
              items-center
              justify-center
              mb-6
            ">

              <FiPackage
                size={26}
                className="text-gray-500"
              />

            </div>


            <h2 className="
              text-xl
              font-medium
              mb-3
            ">
              Aucune commande
            </h2>


            <p className="
              text-sm
              text-gray-400
              max-w-md
              mx-auto
              leading-relaxed
            ">
              Vous n'avez pas encore passé de commande.
              Découvrez notre collection et trouvez vos
              prochaines pièces préférées.
            </p>


            <Link
              to="/shop"
              className="
                inline-flex
                items-center
                gap-2
                mt-8
                bg-black
                text-white
                px-7
                py-3.5
                text-sm
                hover:bg-gray-800
                transition
              "
            >

              Découvrir la collection

              <FiChevronRight size={17} />

            </Link>

          </div>

        )}

      </section>

    </main>
  );
};

export default Orders;