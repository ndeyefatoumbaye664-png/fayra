import { Link } from "react-router-dom";


const NotFound = () => {


return (

<section className="
min-h-screen
flex
items-center
justify-center
bg-black
text-white
">


<div className="
text-center
">


<h1 className="
text-8xl
font-bold
">

404

</h1>


<p className="
text-xl
mt-5
text-gray-300
">

Cette page n'existe pas.

</p>



<Link

to="/"

className="
inline-block
mt-8
bg-yellow-500
text-black
px-8
py-4
uppercase
tracking-widest
"

>

Retour accueil

</Link>


</div>


</section>

);


};


export default NotFound;