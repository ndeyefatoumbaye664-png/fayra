import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import useProductStore from "../Store/productStore";

const ProductSection = () => {

  const products = useProductStore(
    (state) => state.products
  );

  const latestProducts = products.slice(0, 4);

  return (

    <section className="
      py-14
      sm:py-20
      bg-white
    ">

      <div className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
      ">

        {/* TITRE */}

        <div className="
          text-center
          mb-10
          sm:mb-14
        ">

          <p className="
            text-yellow-500
            uppercase
            tracking-[3px]
            sm:tracking-[5px]
            text-xs
            sm:text-sm
          ">
            Nos créations
          </p>

          <h2 className="
            text-3xl
            sm:text-5xl
            font-bold
            mt-3
            sm:mt-4
          ">
            Nouveautés FAYRA
          </h2>

          <p className="
            text-gray-500
            mt-4
            sm:mt-5
            max-w-xl
            mx-auto
            text-sm
            sm:text-base
          ">
            Découvrez nos pièces tendances pensées
            pour révéler votre élégance.
          </p>

        </div>

        {/* PRODUITS */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-5
          sm:gap-8
        ">

          {latestProducts.map((product) => (

            <ProductCard
              key={product._id || product.id}
              product={product}
            />

          ))}

        </div>

        {/* BOUTON */}

        <div className="
          text-center
          mt-10
          sm:mt-14
        ">

          <Link
            to="/shop"
            className="
              inline-block
              bg-black
              text-white
              px-7
              sm:px-10
              py-3.5
              sm:py-4
              text-xs
              sm:text-sm
              uppercase
              tracking-widest
              hover:bg-yellow-500
              hover:text-black
              transition
            "
          >
            Voir toute la collection
          </Link>

        </div>

      </div>

    </section>

  );
};

export default ProductSection;

