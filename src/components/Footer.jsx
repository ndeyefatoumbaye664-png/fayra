import { Link } from "react-router-dom";
import {
FiInstagram,
FiFacebook,
FiTwitter
} from "react-icons/fi";


const Footer = () => {


return (

<footer className="
bg-black
text-white
pt-16
pb-8
">


<div className="
max-w-7xl
mx-auto
px-6
grid
grid-cols-1
md:grid-cols-4
gap-10
">





{/* LOGO */}


<div>


<h2 className="
text-4xl
font-bold
tracking-[8px]
mb-5
">

FAYRA

</h2>


<p className="
text-gray-400
leading-relaxed
">

Une marque de mode féminine
créée pour révéler votre élégance
au quotidien.

</p>




<div className="
flex
gap-5
mt-6
">


<a href="#">

<FiInstagram size={22}/>

</a>


<a href="#">

<FiFacebook size={22}/>

</a>


<a href="#">

<FiTwitter size={22}/>

</a>



</div>



</div>









{/* NAVIGATION */}


<div>


<h3 className="
text-xl
font-semibold
mb-6
">

Navigation

</h3>


<div className="
space-y-3
text-gray-400
">


<Link
to="/"
className="
block
hover:text-white
"
>

Accueil

</Link>


<Link
to="/shop"
className="
block
hover:text-white
"
>

Boutique

</Link>


<Link
to="/favorites"
className="
block
hover:text-white
"
>

Favoris

</Link>


<Link
to="/cart"
className="
block
hover:text-white
"
>

Panier

</Link>


</div>


</div>









{/* SERVICES */}


<div>


<h3 className="
text-xl
font-semibold
mb-6
">

Services

</h3>


<ul className="
space-y-3
text-gray-400
">


<li>

Livraison rapide

</li>


<li>

Paiement sécurisé

</li>


<li>

Retours faciles

</li>


<li>

Support client

</li>


</ul>


</div>









{/* NEWSLETTER */}


<div>


<h3 className="
text-xl
font-semibold
mb-6
">

Newsletter

</h3>


<p className="
text-gray-400
mb-5
">

Recevez nos nouveautés.

</p>



<div className="
flex
">


<input

placeholder="Votre email"

className="
bg-white
text-black
p-3
w-full
outline-none
"

/>



<button

className="
bg-yellow-500
text-black
px-5
"

>

OK

</button>



</div>



</div>







</div>








<div className="
border-t
border-gray-700
mt-12
pt-6
text-center
text-gray-500
text-sm
">


© {new Date().getFullYear()} FAYRA. Tous droits réservés.


</div>




</footer>


);


};


export default Footer;