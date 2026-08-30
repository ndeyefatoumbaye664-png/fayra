import { Link } from "react-router-dom";
import categories from "../data/categories";


const CategorySection = () => {


return (

<section className="
py-20
bg-gray-50
">


<div className="
max-w-7xl
mx-auto
px-6
">



<div className="
text-center
mb-12
">


<p className="
text-yellow-500
uppercase
tracking-[5px]
">

Catégories

</p>


<h2 className="
text-4xl
font-bold
mt-4
">

Explorez nos univers

</h2>


</div>






<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-8
">


{

categories.map(category=>(

<Link

to={`/shop?category=${category.name}`}

key={category.id}

className="
group
relative
h-[350px]
overflow-hidden
"


>


<img

src={category.image}

className="
w-full
h-full
object-cover
group-hover:scale-110
transition
duration-700
"

/>



<div className="
absolute
inset-0
bg-black/40
flex
items-center
justify-center
">


<h3 className="
text-white
text-3xl
font-bold
"

>

{category.name}

</h3>



</div>



</Link>


))


}



</div>



</div>


</section>


);


};


export default CategorySection;