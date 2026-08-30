import { useState } from "react";
import { FiX, FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import useCartStore from "../Store/cartStore";
import { Link } from "react-router-dom";


const SidebarCart = () => {


const [open,setOpen] = useState(false);



const cart = useCartStore(
(state)=>state.cart
);



const removeFromCart = useCartStore(
(state)=>state.removeFromCart
);



const updateQuantity = useCartStore(
(state)=>state.updateQuantity
);




const total = cart.reduce(

(sum,item)=>

sum + item.price * item.quantity

,0);



return (

<>


{/* Bouton flottant */}

<button

onClick={()=>setOpen(true)}

className="
fixed
right-6
bottom-6
z-40
bg-black
text-white
w-14
h-14
rounded-full
shadow-xl
"

>

🛒

</button>





<AnimatePresence>


{

open && (

<>


{/* Overlay */}

<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

exit={{
opacity:0
}}

onClick={()=>setOpen(false)}

className="
fixed
inset-0
bg-black/40
z-50
"

/>





{/* Sidebar */}

<motion.div

initial={{
x:"100%"
}}

animate={{
x:0
}}

exit={{
x:"100%"
}}

transition={{
duration:0.4
}}

className="
fixed
right-0
top-0
h-screen
w-full
sm:w-[420px]
bg-white
z-[60]
p-6
flex
flex-col
"


>


<div className="
flex
justify-between
items-center
border-b
pb-5
">


<h2 className="
text-2xl
font-bold
">

Panier

</h2>



<button

onClick={()=>setOpen(false)}

>

<FiX size={25}/>

</button>


</div>





<div className="
flex-1
overflow-y-auto
py-6
">



{

cart.length===0

?

(

<p className="
text-center
text-gray-500
">

Votre panier est vide

</p>

)

:

(

cart.map(item=>(


<div

key={item.id}

className="
flex
gap-4
mb-6
"


>


<img

src={item.image}

className="
w-20
h-24
object-cover
"

/>



<div className="
flex-1
">


<h3 className="
font-semibold
">

{item.name}

</h3>




<p>

{item.price.toLocaleString()} FCFA

</p>





<div className="
flex
items-center
gap-3
mt-3
">


<button

onClick={()=>updateQuantity(
item.id,
item.quantity-1
)}

>

<FiMinus/>

</button>



<span>

{item.quantity}

</span>



<button

onClick={()=>updateQuantity(
item.id,
item.quantity+1
)}

>

<FiPlus/>

</button>




<button

onClick={()=>removeFromCart(item.id)}

className="
text-red-500
ml-auto
"

>

<FiTrash2/>

</button>



</div>



</div>


</div>


))


)

}



</div>






<div className="
border-t
pt-6
">


<div className="
flex
justify-between
font-bold
text-xl
mb-6
">


<span>

Total

</span>


<span>

{total.toLocaleString()} FCFA

</span>


</div>





<Link

to="/cart"

onClick={()=>setOpen(false)}

className="
block
text-center
bg-black
text-white
py-4
uppercase
tracking-widest
hover:bg-yellow-500
hover:text-black
transition
"

>

Voir le panier

</Link>



</div>




</motion.div>



</>


)

}



</AnimatePresence>


</>

);


};


export default SidebarCart;