
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiLogOut,
  FiPlus,
  FiArrowLeft,
} from "react-icons/fi";

const AdminLayout = () => {
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("fayra-admin");

  // Protection
  if (isAdmin !== "true") {
    navigate("/admin/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("fayra-admin");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white fixed left-0 top-0 bottom-0 z-50">

        {/* LOGO */}
        <div className="h-20 border-b border-gray-800 flex items-center px-6">
          <span className="text-2xl font-bold tracking-[6px]">
            FAYRA
          </span>
        </div>

        {/* MENU */}
        <nav className="p-4 space-y-2">

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-gray-300 hover:bg-gray-900 hover:text-white"
              }`
            }
          >
            <FiGrid />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-gray-300 hover:bg-gray-900 hover:text-white"
              }`
            }
          >
            <FiPackage />
            Produits
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-gray-300 hover:bg-gray-900 hover:text-white"
              }`
            }
          >
            <FiShoppingBag />
            Commandes
          </NavLink>

          <NavLink
            to="/admin/products/add"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-gray-300 hover:bg-gray-900 hover:text-white"
              }`
            }
          >
            <FiPlus />
            Ajouter un produit
          </NavLink>

        </nav>

        {/* BAS */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">

          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-900 hover:text-white transition"
          >
            <FiArrowLeft />
            Retour au site
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-950 transition"
          >
            <FiLogOut />
            Déconnexion
          </button>

        </div>

      </aside>

      {/* CONTENU */}
      <main className="ml-64 flex-1 min-h-screen p-8">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;

