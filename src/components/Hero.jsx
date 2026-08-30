import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const Hero = () => {


return (

<section className="
relative
h-screen
overflow-hidden
">


{/* IMAGE */}

<img

src="https://images.unsplash.com/photo-1483985988355-763728e1935b"

alt="FAYRA Fashion"

className="
absolute
inset-0
w-full
h-full
object-cover
"

/>





{/* OVERLAY */}

<div className="
absolute
inset-0
bg-black/50
">



</div>






{/* CONTENU */}


<div className="
relative
z-10
h-full
flex
items-center
">


<div className="
max-w-7xl
mx-auto
px-6
text-white
">





<motion.p

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.8
}}

className="
uppercase
tracking-[8px]
text-sm
mb-6
"

>

Nouvelle collection

</motion.p>






<motion.h1

initial={{
opacity:0,
y:50
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:1
}}

className="
text-6xl
md:text-8xl
font-bold
leading-tight
max-w-3xl
"

>

Révélez votre élégance avec FAYRA

</motion.h1>






<motion.p

initial={{
opacity:0,
y:40
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:1.2
}}

className="
mt-8
text-lg
max-w-xl
text-gray-200
"

>

Des pièces modernes pensées pour
les femmes qui aiment le style,
la confiance et l'élégance.

</motion.p>







<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

transition={{
duration:1.5
}}

className="
flex
gap-5
mt-10
"


>


<Link

to="/shop"

className="
bg-white
text-black
px-10
py-4
uppercase
tracking-widest
hover:bg-yellow-500
transition
"

>

Découvrir

</Link>




<Link

to="/favorites"

className="
border
border-white
px-10
py-4
uppercase
tracking-widest
hover:bg-white
hover:text-black
transition
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