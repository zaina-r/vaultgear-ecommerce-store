import { useState, useEffect } from "react";
import Navigation from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import api from "../lib/axios";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

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
      <Container className="py-5">
        <h1 className="fw-bold mb-4 text-center">Our Products</h1>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
            <Spinner animation="border" role="status" variant="primary" />
            <span className="ms-2">Loading products...</span>
          </div>
        ) : products.length === 0 ? (
          <Alert variant="info" className="text-center">
            No products available at the moment.
          </Alert>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {products.map((product) => (
              <Col key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default HomePage;
