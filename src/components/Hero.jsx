import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] md:h-screen overflow-hidden">

      {/* ================= IMAGE ================= */}

      <img
        src="https://images.unsplash.com/photo-1496747611176-843222e1e57c"
        alt="Collection FAYRA"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-center
          md:object-center
        "
      />

      {/* ================= OVERLAY ================= */}

      <div className="absolute inset-0 bg-black/45" />

      {/* ================= CONTENU ================= */}

      <div className="
        relative
        z-10
        min-h-[90vh]
        md:h-full
        flex
        items-center
      ">

        <div className="
          w-full
          max-w-7xl
          mx-auto
          px-6
          sm:px-8
          md:px-10
          lg:px-12
          text-white
        ">

          {/* PETIT TITRE */}

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
              uppercase
              tracking-[5px]
              sm:tracking-[7px]
              text-xs
              sm:text-sm
              mb-5
              sm:mb-6
            "
          >
            Nouvelle collection
          </motion.p>

          {/* TITRE */}

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="
              text-4xl
              sm:text-5xl
              md:text-7xl
              lg:text-8xl
              font-bold
              leading-[1.05]
              max-w-4xl
            "
          >
            Révélez votre élégance avec FAYRA
          </motion.h1>

          {/* DESCRIPTION */}

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="
              mt-6
              sm:mt-8
              text-base
              sm:text-lg
              leading-relaxed
              max-w-xl
              text-gray-200
            "
          >
            Des pièces modernes pensées pour les femmes
            qui aiment le style, la confiance et l'élégance.
          </motion.p>

          {/* BOUTONS */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="
              flex
              flex-col
              sm:flex-row
              gap-3
              sm:gap-5
              mt-8
              sm:mt-10
              w-full
              sm:w-auto
            "
          >

            <Link
              to="/shop"
              className="
                w-full
                sm:w-auto
                text-center
                bg-white
                text-black
                px-8
                sm:px-10
                py-4
                uppercase
                tracking-widest
                text-xs
                sm:text-sm
                font-medium
                hover:bg-yellow-500
                transition
                duration-300
              "
            >
              Découvrir
            </Link>

            <Link
              to="/favorites"
              className="
                w-full
                sm:w-auto
                text-center
                border
                border-white
                px-8
                sm:px-10
                py-4
                uppercase
                tracking-widest
                text-xs
                sm:text-sm
                font-medium
                hover:bg-white
                hover:text-black
                transition
                duration-300
              "
            >
              Nos favoris
            </Link>

          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default Hero;

