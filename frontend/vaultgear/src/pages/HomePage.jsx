import { useState, useEffect } from "react";
import Navigation from "../components/Navbar";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import api from "../lib/axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (e) {
        console.log(`Error fetching products: ${e}`);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      <div>
        {loading && <div>Loading products...</div>}
        <div className="product-listing">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
