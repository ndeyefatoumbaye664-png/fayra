import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const CategoryCard = ({category}) => {


  return (

    <motion.div

      whileHover={{
        y:-10
      }}

      transition={{
        duration:0.3
      }}

      className="
      relative
      h-[420px]
      overflow-hidden
      group
      "

    >


      <img

        src={category.image}

        alt={category.name}

        className="
        w-full
        h-full
        object-cover
        group-hover:scale-110
        transition
        duration-700
        "

      />



      {/* Overlay */}

      <div className="
      absolute
      inset-0
      bg-black/30
      group-hover:bg-black/50
      transition
      " />




      <div className="
      absolute
      inset-0
      flex
      flex-col
      items-center
      justify-center
      text-white
      ">


        <h3 className="
        text-3xl
        font-bold
        uppercase
        tracking-widest
        mb-5
        ">

          {category.name}

        </h3>



        <Link

          to="/shop"

          className="
          border
          border-white
          px-7
          py-3
          text-sm
          uppercase
          tracking-widest
          hover:bg-white
          hover:text-black
          transition
          "

        >

          Découvrir

        </Link>



      </div>


    </motion.div>

  );

};


export default CategoryCard;