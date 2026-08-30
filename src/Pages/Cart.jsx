import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import useCartStore from "../Store/cartStore";


const Cart = () => {


const cart = useCartStore(
(state)=>state.cart
);


const removeFromCart = useCartStore(
(state)=>state.removeFromCart
);



const updateQuantity = useCartStore(
(state)=>state.updateQuantity
);




const subtotal = cart.reduce(

(total,item)=>

total + item.price * item.quantity

,0);



const delivery = cart.length > 0 ? 2000 : 0;


const total = subtotal + delivery;




return (

<section className="
pt-32
pb-20
bg-gray-50
min-h-screen
">


<div className="
max-w-7xl
mx-auto
px-6
">


<h1 className="
text-5xl
font-bold
mb-12
">

Votre panier

</h1>





<div className="
grid
grid-cols-1
lg:grid-cols-3
gap-10
">



<div className="
lg:col-span-2
bg-white
p-6
">



{
cart.length === 0

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
gap-6
border-b
pb-6
mb-6
"


>


<img

src={item.image}

className="
w-32
h-40
object-cover
"

/>




<div className="flex-1">


<h3 className="
text-xl
font-semibold
">

{item.name}

</h3>



<p className="
font-bold
mt-3
">

{item.price.toLocaleString()} FCFA

</p>




<div className="
flex
items-center
gap-4
mt-5
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
ml-5
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
bg-white
p-8
h-fit
">


<h2 className="
text-2xl
font-bold
mb-8
">

Résumé

</h2>



<div className="
flex
justify-between
mb-4
">

<span>

Sous-total

</span>


<span>

{subtotal.toLocaleString()} FCFA

</span>


</div>




<div className="
flex
justify-between
mb-6
">

<span>

Livraison

</span>


<span>

{delivery.toLocaleString()} FCFA

</span>


</div>




<div className="
border-t
pt-5
flex
justify-between
font-bold
text-xl
">


<span>

Total

</span>


<span>

{total.toLocaleString()} FCFA

</span>


</div>




<Link

to="/checkout"

className="
block
text-center
mt-8
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

Commander

</Link>



</div>




</div>



</div>


</section>


);


};


export default Cart;