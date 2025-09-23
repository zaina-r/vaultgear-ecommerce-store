import { useState, useCallback } from "react";

export const useProductManager = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, []);

  const createProduct = async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      setProducts((prev) => [...prev, data.data]);
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return { success: false, message: "Failed to create product" };
    }
  };

  const deleteProduct = async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      setProducts((prev) => prev.filter((p) => p._id !== pid));
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Failed to delete product" };
    }
  };

  const updateProduct = async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      setProducts((prev) =>
        prev.map((p) => (p._id === pid ? data.data : p))
      );
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Failed to update product" };
    }
  };

  return {
    products,
    fetchProducts,
    createProduct,
    deleteProduct,
    updateProduct,
  };
};
