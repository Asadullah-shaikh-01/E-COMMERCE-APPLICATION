import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/auth/Register";
import Login1 from "./pages/auth/Login1";
import Deshboard from "./pages/user/Deshboard";
import PrivateRoute from "./components/Routes/Private";
import ForgetPassword from "./pages/auth/ForgetPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDeshboard from "./pages/Admin/AdminDeshboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import User from './pages/Admin/User';
import Profile from "./pages/user/Profile";
import Oders from "./pages/user/Oders";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails.js";
import Categories from "./pages/Categories.js";
import CategoryProduct from "./pages/CategoryProduct.js";
import CartPage from "./pages/CartPage.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/deshboard" element={<PrivateRoute />}>
          <Route path="user" element={<Deshboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Oders />} />

        </Route>
        <Route path="/deshboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDeshboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<User />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login1 />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
