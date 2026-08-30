import {
  FiUser,
  FiBell,
  FiLock,
  FiMapPin,
  FiMail,
  FiPhone,
  FiSave,
} from "react-icons/fi";

import { useState } from "react";

const Settings = () => {

  const [form, setForm] = useState({
    name: "Fatou",
    email: "cliente@fayra.com",
    phone: "+221 XX XXX XX XX",
    address: "Dakar, Sénégal",
  });

  const [notifications, setNotifications] = useState(true);

  const [saved, setSaved] = useState(false);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setSaved(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };


  return (
    <main className="
      min-h-screen
      bg-[#fafafa]
      text-gray-900
      pt-24
    ">

      {/* ================= HEADER ================= */}

      <section className="
        bg-white
        border-b
        border-gray-200
      ">

        <div className="
          max-w-6xl
          mx-auto
          px-6
          py-14
        ">

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
            Paramètres
          </h1>


          <p className="
            mt-3
            text-sm
            text-gray-500
          ">
            Gérez vos informations et vos préférences.
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

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-[260px_1fr]
          gap-10
        ">


          {/* ================= MENU ================= */}

          <aside className="
            bg-white
            border
            border-gray-200
            h-fit
          ">

            <div className="
              px-6
              py-6
              border-b
              border-gray-200
            ">

              <div className="
                w-14
                h-14
                rounded-full
                bg-gray-100
                flex
                items-center
                justify-center
                mb-4
              ">

                <FiUser
                  size={24}
                  strokeWidth={1.5}
                />

              </div>


              <h2 className="
                text-lg
                font-medium
              ">
                Fatou
              </h2>


              <p className="
                text-xs
                text-gray-400
                mt-1
              ">
                Cliente FAYRA
              </p>

            </div>


            <nav className="p-3">

              <a
                href="/profile"
                className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-gray-600
                  text-sm
                  hover:bg-gray-50
                  hover:text-black
                  transition
                "
              >

                <FiUser size={18} />

                Mon profil

              </a>


              <a
                href="/orders"
                className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-gray-600
                  text-sm
                  hover:bg-gray-50
                  hover:text-black
                  transition
                "
              >

                <FiBell size={18} />

                Mes commandes

              </a>


              <div className="
                flex
                items-center
                gap-3
                px-4
                py-3
                bg-gray-100
                text-black
                text-sm
              ">

                <FiLock size={18} />

                Paramètres

              </div>

            </nav>

          </aside>



          {/* ================= PARAMETRES ================= */}

          <div className="space-y-6">


            {/* INFORMATIONS PERSONNELLES */}

            <div className="
              bg-white
              border
              border-gray-200
            ">

              <div className="
                px-6
                md:px-8
                py-6
                border-b
                border-gray-200
              ">

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <FiUser size={20} />

                  <h2 className="
                    text-xl
                    font-medium
                  ">
                    Informations personnelles
                  </h2>

                </div>


                <p className="
                  text-sm
                  text-gray-400
                  mt-2
                ">
                  Modifiez les informations associées à votre compte.
                </p>

              </div>


              <form
                onSubmit={handleSubmit}
                className="
                  px-6
                  md:px-8
                  py-7
                  space-y-6
                "
              >


                {/* NOM */}

                <div>

                  <label className="
                    block
                    text-xs
                    uppercase
                    tracking-wider
                    text-gray-400
                    mb-2
                  ">
                    Nom complet
                  </label>


                  <div className="
                    relative
                  ">

                    <FiUser
                      size={17}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                      "
                    />


                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="
                        w-full
                        border
                        border-gray-200
                        px-11
                        py-3.5
                        text-sm
                        outline-none
                        focus:border-black
                        transition
                      "
                    />

                  </div>

                </div>


                {/* EMAIL */}

                <div>

                  <label className="
                    block
                    text-xs
                    uppercase
                    tracking-wider
                    text-gray-400
                    mb-2
                  ">
                    Adresse e-mail
                  </label>


                  <div className="relative">

                    <FiMail
                      size={17}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                      "
                    />


                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="
                        w-full
                        border
                        border-gray-200
                        px-11
                        py-3.5
                        text-sm
                        outline-none
                        focus:border-black
                        transition
                      "
                    />

                  </div>

                </div>


                {/* TELEPHONE */}

                <div>

                  <label className="
                    block
                    text-xs
                    uppercase
                    tracking-wider
                    text-gray-400
                    mb-2
                  ">
                    Téléphone
                  </label>


                  <div className="relative">

                    <FiPhone
                      size={17}
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
                      className="
                        w-full
                        border
                        border-gray-200
                        px-11
                        py-3.5
                        text-sm
                        outline-none
                        focus:border-black
                        transition
                      "
                    />

                  </div>

                </div>


                {/* ADRESSE */}

                <div>

                  <label className="
                    block
                    text-xs
                    uppercase
                    tracking-wider
                    text-gray-400
                    mb-2
                  ">
                    Adresse de livraison
                  </label>


                  <div className="relative">

                    <FiMapPin
                      size={17}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                      "
                    />


                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      className="
                        w-full
                        border
                        border-gray-200
                        px-11
                        py-3.5
                        text-sm
                        outline-none
                        focus:border-black
                        transition
                      "
                    />

                  </div>

                </div>


                {/* MESSAGE */}

                {saved && (

                  <div className="
                    bg-gray-100
                    border
                    border-gray-200
                    px-4
                    py-3
                    text-sm
                  ">

                    Vos informations ont été enregistrées.

                  </div>

                )}


                {/* BOUTON */}

                <button
                  type="submit"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    bg-black
                    text-white
                    px-7
                    py-3.5
                    text-sm
                    hover:bg-gray-800
                    transition
                  "
                >

                  <FiSave size={17} />

                  Enregistrer les modifications

                </button>

              </form>

            </div>



            {/* NOTIFICATIONS */}

            <div className="
              bg-white
              border
              border-gray-200
            ">

              <div className="
                px-6
                md:px-8
                py-6
                border-b
                border-gray-200
              ">

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <FiBell size={20} />

                  <h2 className="
                    text-xl
                    font-medium
                  ">
                    Notifications
                  </h2>

                </div>


                <p className="
                  text-sm
                  text-gray-400
                  mt-2
                ">
                  Choisissez les notifications que vous souhaitez recevoir.
                </p>

              </div>


              <div className="
                px-6
                md:px-8
                py-6
                flex
                items-center
                justify-between
                gap-6
              ">

                <div>

                  <h3 className="
                    text-sm
                    font-medium
                  ">
                    Notifications de commande
                  </h3>


                  <p className="
                    text-sm
                    text-gray-400
                    mt-1
                  ">
                    Recevoir des informations concernant vos commandes.
                  </p>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setNotifications(!notifications)
                  }
                  className={`
                    relative
                    w-11
                    h-6
                    rounded-full
                    transition
                    ${
                      notifications
                        ? "bg-black"
                        : "bg-gray-300"
                    }
                  `}
                >

                  <span
                    className={`
                      absolute
                      top-1
                      w-4
                      h-4
                      bg-white
                      rounded-full
                      transition
                      ${
                        notifications
                          ? "left-6"
                          : "left-1"
                      }
                    `}
                  />

                </button>

              </div>

            </div>



            {/* SECURITE */}

            <div className="
              bg-white
              border
              border-gray-200
            ">

              <div className="
                px-6
                md:px-8
                py-6
                border-b
                border-gray-200
              ">

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <FiLock size={20} />

                  <h2 className="
                    text-xl
                    font-medium
                  ">
                    Sécurité
                  </h2>

                </div>


                <p className="
                  text-sm
                  text-gray-400
                  mt-2
                ">
                  Gérez la sécurité de votre compte.
                </p>

              </div>


              <div className="
                px-6
                md:px-8
                py-6
              ">

                <button
                  type="button"
                  className="
                    border
                    border-gray-200
                    px-6
                    py-3
                    text-sm
                    hover:border-black
                    transition
                  "
                >
                  Modifier mon mot de passe
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Settings;