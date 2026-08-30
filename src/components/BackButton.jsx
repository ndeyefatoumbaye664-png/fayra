import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition"
    >
      <FiArrowLeft size={18} />
      Retour
    </button>
  );
};

export default BackButton;