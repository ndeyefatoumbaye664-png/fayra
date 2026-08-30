import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import useProductStore from "../Store/productStore";


const ProductSection = () => {

const products = useProductStore(
(state)=>state.products
);

const latestProducts = products.slice(0,4);

return (

<section className="
py-20
bg-white
">


<div className="
max-w-7xl
mx-auto
px-6
">





{/* TITRE */}

<div className="
text-center
mb-14
">


<p className="
text-yellow-500
uppercase
tracking-[5px]
text-sm
">

Nos créations

</p>



<h2 className="
text-5xl
font-bold
mt-4
">

Nouveautés FAYRA

</h2>


<p className="
text-gray-500
mt-5
max-w-xl
mx-auto
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
gap-8
">


{

latestProducts.map(product=>(


<ProductCard

key={product.id}

product={product}

/>


))


}



</div>







<div className="
text-center
mt-14
">


<Link

to="/shop"

className="
inline-block
bg-black
text-white
px-10
py-4
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