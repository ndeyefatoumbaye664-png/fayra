import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // ================= CHANGEMENT DES CHAMPS =================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // ================= CONNEXION =================

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification des champs
    if (!form.email || !form.password) {
      setError(
        "Veuillez renseigner votre adresse e-mail et votre mot de passe."
      );
      return;
    }

    // ================= RECUPERER LE COMPTE =================

    const savedUser = localStorage.getItem("fayraUser");

    if (!savedUser) {
      setError(
        "Aucun compte FAYRA n'a été trouvé. Veuillez créer un compte."
      );
      return;
    }

    let user;

    try {
      user = JSON.parse(savedUser);
    } catch (error) {
      console.error(
        "Erreur lors de la lecture du compte :",
        error
      );

      setError(
        "Une erreur est survenue avec votre compte."
      );

      return;
    }

    // ================= VERIFICATION EMAIL =================

    if (
      user.email.toLowerCase() !==
      form.email.trim().toLowerCase()
    ) {
      setError(
        "Adresse e-mail ou mot de passe incorrect."
      );
      return;
    }

    // ================= VERIFICATION MOT DE PASSE =================

    if (user.password !== form.password) {
      setError(
        "Adresse e-mail ou mot de passe incorrect."
      );
      return;
    }

    // ================= SESSION =================

    localStorage.setItem(
      "fayraLoggedIn",
      "true"
    );

    setSuccess(true);

    // ================= REDIRECTION =================

    setTimeout(() => {
      navigate("/profile");
    }, 800);
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#fafafa]
        text-gray-900
        pt-24
        flex
        items-center
      "
    >
      <section
        className="
          w-full
          max-w-md
          mx-auto
          px-6
          py-16
        "
      >
        {/* ================= LOGO ================= */}

        <div className="text-center mb-12">
          <h1
            className="
              text-3xl
              font-light
              tracking-[0.2em]
            "
          >
            FAYRA
          </h1>

          <p
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-gray-400
              mt-4
            "
          >
            Mon espace
          </p>
        </div>

        {/* ================= TITRE ================= */}

        <div className="mb-8">
          <h2
            className="
              text-2xl
              font-medium
            "
          >
            Connexion
          </h2>

          <p
            className="
              text-sm
              text-gray-500
              mt-2
            "
          >
            Connectez-vous à votre compte FAYRA.
          </p>
        </div>

        {/* ================= FORMULAIRE ================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* EMAIL */}

          <div>
            <label
              className="
                block
                text-xs
                uppercase
                tracking-wider
                text-gray-400
                mb-2
              "
            >
              Adresse e-mail
            </label>

            <div className="relative">
              <FiMail
                size={18}
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
                placeholder="Votre adresse e-mail"
                className="
                  w-full
                  border
                  border-gray-200
                  bg-white
                  px-11
                  py-4
                  text-sm
                  outline-none
                  placeholder:text-gray-300
                  focus:border-black
                  transition
                "
              />
            </div>
          </div>

          {/* MOT DE PASSE */}

          <div>
            <div
              className="
                flex
                items-center
                justify-between
                mb-2
              "
            >
              <label
                className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-gray-400
                "
              >
                Mot de passe
              </label>

              <button
                type="button"
                className="
                  text-xs
                  text-gray-500
                  hover:text-black
                  hover:underline
                "
              >
                Mot de passe oublié ?
              </button>
            </div>

            <div className="relative">
              <FiLock
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Votre mot de passe"
                className="
                  w-full
                  border
                  border-gray-200
                  bg-white
                  px-11
                  pr-12
                  py-4
                  text-sm
                  outline-none
                  placeholder:text-gray-300
                  focus:border-black
                  transition
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  hover:text-black
                  transition
                "
              >
                {showPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* ERREUR */}

          {error && (
            <div
              className="
                border
                border-gray-200
                bg-gray-50
                px-4
                py-3
                text-sm
                text-gray-600
              "
            >
              {error}
            </div>
          )}

          {/* SUCCES */}

          {success && (
            <div
              className="
                border
                border-gray-200
                bg-gray-50
                px-4
                py-3
                text-sm
                text-gray-700
              "
            >
              Connexion réussie. Redirection...
            </div>
          )}

          {/* BOUTON */}

          <button
            type="submit"
            className="
              w-full
              bg-black
              text-white
              py-4
              flex
              items-center
              justify-center
              gap-3
              text-sm
              hover:bg-gray-800
              transition
            "
          >
            Se connecter
            <FiArrowRight size={17} />
          </button>
        </form>

        {/* ================= CREATION COMPTE ================= */}

        <div
          className="
            mt-10
            pt-8
            border-t
            border-gray-200
            text-center
          "
        >
          <p className="text-sm text-gray-500">
            Vous n'avez pas encore de compte ?
          </p>

          <Link
            to="/register"
            className="
              inline-block
              mt-3
              text-sm
              font-medium
              underline
              underline-offset-4
              hover:text-gray-500
              transition
            "
          >
            Créer un compte
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Login;

