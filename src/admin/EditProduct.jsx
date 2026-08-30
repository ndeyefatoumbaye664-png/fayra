import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProductStore from "../store/productStore";


const EditProduct = () => {


const {id} = useParams();

const navigate = useNavigate();



const products = useProductStore(
(state)=>state.products
);



const updateProduct = useProductStore(
(state)=>state.updateProduct
);




const product = products.find(

(item)=>item.id === Number(id)

);





const [form,setForm] = useState({

name:product?.name || "",

price:product?.price || "",

oldPrice:product?.oldPrice || "",

category:product?.category || "",

image:product?.image || "",

description:product?.description || ""

});







const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};






const handleSubmit=(e)=>{


e.preventDefault();



updateProduct(

Number(id),

{

...form,

price:Number(form.price),

oldPrice:Number(form.oldPrice)

}

);



alert("Produit modifié");

navigate("/admin/products");


};








if(!product){

return (

<p className="
pt-20
text-center
text-3xl
">

Produit introuvable

</p>

)

}






return (

<div>


<h1 className="
text-4xl
font-bold
mb-10
">

Modifier le produit

</h1>




<form

onSubmit={handleSubmit}

className="
bg-white
p-8
max-w-3xl
space-y-5
"


>


<input

name="name"

value={form.name}

onChange={handleChange}

className="
w-full
border
p-4
"

/>




<input

name="price"

type="number"

value={form.price}

onChange={handleChange}

className="
w-full
border
p-4
"

/>




<input

name="oldPrice"

type="number"

value={form.oldPrice}

onChange={handleChange}

className="
w-full
border
p-4
"

/>






<select

name="category"

value={form.category}

onChange={handleChange}

className="
w-full
border
p-4
"

>


<option>

Robes

</option>

<option>

Ensembles

</option>

<option>

Sacs

</option>

<option>

Accessoires

</option>


</select>






<input

name="image"

value={form.image}

onChange={handleChange}

className="
w-full
border
p-4
"

/>






<textarea

name="description"

value={form.description}

onChange={handleChange}

className="
w-full
border
p-4
h-32
"

/>






<button

className="
bg-black
text-white
px-8
py-4
"

>

Enregistrer

</button>



</form>



</div>

);


};


export default EditProduct;