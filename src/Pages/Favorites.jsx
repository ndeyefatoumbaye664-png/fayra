import ProductCard from "../components/ProductCard";
import useFavoriteStore from "../store/favoriteStore";


const Favorites = () => {


const favorites = useFavoriteStore(
(state)=>state.favorites
);



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

Mes favoris ❤️

</h1>



{

favorites.length === 0

?

(

<p className="
text-gray-500
">

Aucun favori pour le moment.

</p>

)

:

(


<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-8
">


{

favorites.map(product=>(


<ProductCard

key={product.id}

product={product}

/>


))


}


</div>


)

}



</div>


</section>

);


};


export default Favorites;