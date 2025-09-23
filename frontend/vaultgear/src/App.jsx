import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreateProduct from "./pages/CreateProduct";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage"; // Add this import
import Navigation from "./components/Navbar";
import { CartProvider } from "./context/cartContext";

const App = () => {
  return (
    <CartProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} /> {/* Add this route */}
      </Routes>
    </CartProvider>
  );
};

export default App;

