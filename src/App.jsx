import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./admin/AdminLogin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Favorites from "./Pages/Favorites";


import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ProductsAdmin from "./admin/ProductsAdmin";
import AddProduct from "./admin/Addproduct";
import EditProduct from "./admin/EditProduct";
import OrdersAdmin from "./admin/OrdersAdmin";



const App = ()=>{


return (

<BrowserRouter>


<Navbar />


<Routes>

<Route
  path="/admin/login"
  element={<AdminLogin />}
/>


<Route

path="/contact"

element={<Contact />}

/>
{/* CLIENT */}


<Route

path="/"

element={<Home />}

/>


<Route

path="/shop"

element={<Shop />}

/>


<Route

path="/product/:id"

element={<ProductDetails />}

/>


<Route

path="/cart"

element={<Cart />}

/>


<Route

path="/checkout"

element={<Checkout />}

/>


<Route

path="/favorites"

element={<Favorites />}

/>







{/* ADMIN */}


<Route

path="/admin"

element={<AdminLayout />}

>


<Route

index

element={<Dashboard />}

/>



<Route

path="products"

element={<ProductsAdmin />}

/>



<Route

path="products/add"

element={<AddProduct />}

/>



<Route

path="products/edit/:id"

element={<EditProduct />}

/>



<Route

path="orders"

element={<OrdersAdmin />}

/>


</Route>



</Routes>





<Footer />


</BrowserRouter>


);


};


export default App;