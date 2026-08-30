import {
  FiUser,
  FiPackage,
  FiHeart,
  FiMapPin,
  FiPhone,
  FiMail,
  FiEdit3,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // ================= RECUPERER UTILISATEUR =================

  useEffect(() => {
    const savedUser =
      localStorage.getItem("fayraUser");

    const loggedIn =
      localStorage.getItem("fayraLoggedIn");

    if (!savedUser || loggedIn !== "true") {
      navigate("/login");
      return;
    }

    try {
      setUser(JSON.parse(savedUser));
    } catch (error) {
      console.error(
        "Erreur lors de la lecture du compte :",
        error
      );

      navigate("/login");
    }
  }, [navigate]);

  // ================= DECONNEXION =================

  const handleLogout = () => {
    localStorage.removeItem("fayraLoggedIn");

    navigate("/");

    window.location.reload();
  };

  // ================= CHARGEMENT =================

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900 pt-24">

      {/* ================= HEADER ================= */}

      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-14">

          <p
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-gray-400
              mb-4
            "
          >
            Mon espace
          </p>

          <h1
            className="
              text-3xl
              md:text-4xl
              font-light
              tracking-tight
            "
          >
            Bonjour {user.name}
          </h1>

          <p
            className="
              mt-3
              text-sm
              text-gray-500
              max-w-xl
            "
          >
            Gérez vos informations personnelles, vos commandes
            et vos préférences.
          </p>

        </div>
      </section>

      {/* ================= CONTENU ================= */}

      <section
        className="
          max-w-6xl
          mx-auto
          px-6
          py-12
        "
      >
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[260px_1fr]
            gap-10
          "
        >

          {/* ================= SIDEBAR ================= */}

          <aside
            className="
              bg-white
              border
              border-gray-200
              h-fit
            "
          >

            <div
              className="
                px-6
                py-6
                border-b
                border-gray-200
              "
            >

              <div
                className="
                  w-14
                  h-14
                  rounded-full
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                  mb-4
                "
              >
                <FiUser
                  size={24}
                  strokeWidth={1.5}
                />
              </div>

              <h2
                className="
                  text-lg
                  font-medium
                "
              >
                {user.name}
              </h2>

              <p
                className="
                  text-xs
                  text-gray-400
                  mt-1
                "
              >
                Cliente FAYRA
              </p>

            </div>

            <nav className="p-3">

              {/* PROFIL */}

              <Link
                to="/profile"
                className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  bg-gray-100
                  text-black
                  text-sm
                "
              >
                <FiUser size={18} />

                <span>
                  Mon profil
                </span>
              </Link>

              {/* COMMANDES */}

              <Link
                to="/orders"
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
                <FiPackage size={18} />

                <span>
                  Mes commandes
                </span>
              </Link>

              {/* FAVORIS */}

              <Link
                to="/favorites"
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
                <FiHeart size={18} />

                <span>
                  Mes favoris
                </span>
              </Link>

              {/* DECONNEXION */}

              <button
                onClick={handleLogout}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  mt-2
                  text-gray-600
                  text-sm
                  hover:bg-gray-50
                  hover:text-black
                  transition
                "
              >
                <FiLogOut size={18} />

                <span>
                  Se déconnecter
                </span>
              </button>

            </nav>
          </aside>

          {/* ================= CONTENU PRINCIPAL ================= */}

          <div className="space-y-6">

            {/* INFORMATIONS PERSONNELLES */}

            <div
              className="
                bg-white
                border
                border-gray-200
              "
            >

              <div
                className="
                  px-6
                  md:px-8
                  py-6
                  border-b
                  border-gray-200
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <h2
                    className="
                      text-xl
                      font-medium
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
                    Vos informations de contact
                  </p>

                </div>

                <button
                  className="
                    w-10
                    h-10
                    border
                    border-gray-200
                    flex
                    items-center
                    justify-center
                    hover:bg-black
                    hover:text-white
                    transition
                  "
                >
                  <FiEdit3 size={17} />
                </button>

              </div>

              <div
                className="
                  px-6
                  md:px-8
                  py-7
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-x-12
                  gap-y-7
                "
              >

                {/* NOM */}

                <div>
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-wider
                      text-gray-400
                      mb-2
                    "
                  >
                    Nom complet
                  </p>

                  <p
                    className="
                      text-sm
                      font-medium
                    "
                  >
                    {user.name}
                  </p>
                </div>

                {/* EMAIL */}

                <div>
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-wider
                      text-gray-400
                      mb-2
                    "
                  >
                    Adresse e-mail
                  </p>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <FiMail
                      size={16}
                      className="text-gray-400"
                    />

                    <p className="text-sm">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* TELEPHONE */}

                <div>
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-wider
                      text-gray-400
                      mb-2
                    "
                  >
                    Téléphone
                  </p>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <FiPhone
                      size={16}
                      className="text-gray-400"
                    />

                    <p className="text-sm">
                      {user.phone}
                    </p>
                  </div>
                </div>

                {/* ADRESSE */}

                <div>
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-wider
                      text-gray-400
                      mb-2
                    "
                  >
                    Adresse
                  </p>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <FiMapPin
                      size={16}
                      className="text-gray-400"
                    />

                    <p className="text-sm">
                      Dakar, Sénégal
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* COMMANDES */}

            <div
              className="
                bg-white
                border
                border-gray-200
              "
            >

              <div
                className="
                  px-6
                  md:px-8
                  py-6
                  border-b
                  border-gray-200
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <h2
                    className="
                      text-xl
                      font-medium
                    "
                  >
                    Mes commandes
                  </h2>

                  <p
                    className="
                      text-sm
                      text-gray-400
                      mt-1
                    "
                  >
                    Retrouvez vos dernières commandes
                  </p>

                </div>

                <Link
                  to="/orders"
                  className="
                    text-sm
                    flex
                    items-center
                    gap-1
                    hover:underline
                  "
                >
                  Voir tout
                  <FiChevronRight size={16} />
                </Link>

              </div>

              <div
                className="
                  px-6
                  md:px-8
                  py-6
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  justify-between
                  gap-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <div
                    className="
                      w-12
                      h-12
                      bg-gray-100
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <FiPackage size={20} />
                  </div>

                  <div>

                    <p
                      className="
                        text-sm
                        font-medium
                      "
                    >
                      Commande #FAYRA001
                    </p>

                    <p
                      className="
                        text-xs
                        text-gray-400
                        mt-1
                      "
                    >
                      Votre commande est en cours de traitement
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-5">

                  <span
                    className="
                      text-xs
                      px-3
                      py-2
                      bg-gray-100
                      text-gray-600
                    "
                  >
                    En traitement
                  </span>

                  <Link
                    to="/orders"
                    className="
                      text-sm
                      underline
                      underline-offset-4
                    "
                  >
                    Détails
                  </Link>

                </div>

              </div>
            </div>

            {/* RACCOURCIS */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              "
            >

              {/* FAVORIS */}

              <Link
                to="/favorites"
                className="
                  bg-white
                  border
                  border-gray-200
                  p-7
                  flex
                  items-center
                  gap-5
                  hover:border-black
                  transition
                  group
                "
              >

                <div
                  className="
                    w-12
                    h-12
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                    group-hover:bg-black
                    group-hover:text-white
                    transition
                  "
                >
                  <FiHeart size={20} />
                </div>

                <div className="flex-1">

                  <h3
                    className="
                      text-base
                      font-medium
                    "
                  >
                    Mes favoris
                  </h3>

                  <p
                    className="
                      text-sm
                      text-gray-400
                      mt-1
                    "
                  >
                    Retrouvez vos articles préférés
                  </p>

                </div>

                <FiChevronRight
                  size={18}
                  className="text-gray-400"
                />

              </Link>

              {/* COMMANDES */}

              <Link
                to="/orders"
                className="
                  bg-white
                  border
                  border-gray-200
                  p-7
                  flex
                  items-center
                  gap-5
                  hover:border-black
                  transition
                  group
                "
              >

                <div
                  className="
                    w-12
                    h-12
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                    group-hover:bg-black
                    group-hover:text-white
                    transition
                  "
                >
                  <FiPackage size={20} />
                </div>

                <div className="flex-1">

                  <h3
                    className="
                      text-base
                      font-medium
                    "
                  >
                    Historique des commandes
                  </h3>

                  <p
                    className="
                      text-sm
                      text-gray-400
                      mt-1
                    "
                  >
                    Consultez toutes vos commandes
                  </p>

                </div>

                <FiChevronRight
                  size={18}
                  className="text-gray-400"
                />

              </Link>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;

