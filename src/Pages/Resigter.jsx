import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

  // ================= INSCRIPTION =================

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification des champs
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    // Vérification du mot de passe
    if (form.password !== form.confirmPassword) {
      setError(
        "Les mots de passe ne correspondent pas."
      );
      return;
    }

    // Longueur minimale
    if (form.password.length < 6) {
      setError(
        "Le mot de passe doit contenir au moins 6 caractères."
      );
      return;
    }

    // ================= VERIFIER SI LE COMPTE EXISTE =================

    const existingUser = localStorage.getItem("fayraUser");

    if (existingUser) {
      try {
        const parsedUser = JSON.parse(existingUser);

        if (
          parsedUser.email.toLowerCase() ===
          form.email.trim().toLowerCase()
        ) {
          setError(
            "Un compte avec cette adresse e-mail existe déjà."
          );
          return;
        }
      } catch (error) {
        console.error(
          "Erreur lors de la lecture du compte :",
          error
        );
      }
    }

    // ================= CREATION DU COMPTE =================

    const user = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      password: form.password,
    };

    // Sauvegarde du compte
    localStorage.setItem(
      "fayraUser",
      JSON.stringify(user)
    );

    // Création de la session
    localStorage.setItem(
      "fayraLoggedIn",
      "true"
    );

    setSuccess(true);

    // Redirection vers le profil
    setTimeout(() => {
      navigate("/profile");
    }, 1200);
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
            Rejoignez-nous
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
            Créer un compte
          </h2>

          <p
            className="
              text-sm
              text-gray-500
              mt-2
            "
          >
            Créez votre compte FAYRA en quelques instants.
          </p>
        </div>

        {/* ================= FORMULAIRE ================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* NOM */}

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
              Nom complet
            </label>

            <div className="relative">
              <FiUser
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
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Votre nom complet"
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

          {/* TELEPHONE */}

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
              Téléphone
            </label>

            <div className="relative">
              <FiPhone
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
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+221 ..."
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
              Mot de passe
            </label>

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
                placeholder="Créer un mot de passe"
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

          {/* CONFIRMATION */}

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
              Confirmer le mot de passe
            </label>

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
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmer votre mot de passe"
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
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  hover:text-black
                "
              >
                {showConfirmPassword ? (
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
              Compte créé avec succès. Redirection...
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
            Créer mon compte
            <FiArrowRight size={17} />
          </button>
        </form>

        {/* ================= CONNEXION ================= */}

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
            Vous avez déjà un compte ?
          </p>

          <Link
            to="/login"
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
            Se connecter
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Register;

