
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Identifiants administrateur
    const ADMIN_EMAIL = "admin@fayra.com";
    const ADMIN_PASSWORD = "fayra123";

    if (
      email.trim() === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("fayra-admin", "true");

      navigate("/admin");
    } else {
      setError("Adresse e-mail ou mot de passe incorrect.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-md">

        {/* RETOUR */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-8"
        >
          <FiArrowLeft />
          Retour au site
        </button>

        {/* LOGO */}
        <div className="text-center mb-10">
          <p className="text-3xl font-bold tracking-[8px]">
            FAYRA
          </p>

          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mt-3">
            Administration
          </p>
        </div>

        {/* FORMULAIRE */}
        <div className="bg-white border border-gray-100 shadow-sm p-8">

          <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-6">
            <FiLock size={22} />
          </div>

          <h1 className="text-2xl font-bold">
            Connexion administrateur
          </h1>

          <p className="text-sm text-gray-500 mt-2 mb-8">
            Connectez-vous pour gérer votre boutique FAYRA.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Adresse e-mail
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@fayra.com"
                required
                className="w-full border border-gray-200 px-4 py-4 outline-none focus:border-black transition"
              />
            </div>

            {/* MOT DE PASSE */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Mot de passe
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  required
                  className="w-full border border-gray-200 px-4 py-4 pr-12 outline-none focus:border-black transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>

              </div>
            </div>

            {/* BOUTON */}
            <button
              type="submit"
              className="w-full bg-black text-white py-4 font-medium hover:bg-gray-800 transition"
            >
              Se connecter
            </button>

          </form>

        </div>

      </div>

    </main>
  );
};

export default AdminLogin;

