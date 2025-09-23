import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { useCart } from "../context/cartContext";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, removeFromCart, cartItems } = useCart();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);

        // Transform images to full URLs
        const productWithFullUrls = {
          ...res.data.data,
          images: res.data.data.images?.map(
            (img) => `http://localhost:5001/images/${img}`
          ),
        };

        setProduct(productWithFullUrls);
        console.log(res.data);
      } catch (e) {
        toast.error("Failed to fetch product");
        console.log(`Error fetching product: ${e}`);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart!");
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product._id);
    toast.success("Removed from cart!");
  };

  const isInCart = cartItems.some(item => item._id === product?._id);

  if (loading) {
    return <div>LOADING...</div>;
  }

  return (
    <>
      <Container className="my-5">
        {/* Breadcrumb */}
        <p className="text-muted">Home / {product.title}</p>

        {/* Title + Description */}
        <h2>{product.title}</h2>
        <p className="text-secondary">{product.description}</p>

        {/* Images */}
        <Row className="mb-4">
          {product.images?.map((img, index) => (
            <Col md={4} key={index} className="mb-3">
              <img
                src={img}
                alt={product.title}
                className="img-fluid rounded shadow-sm"
              />
            </Col>
          ))}
        </Row>

        {/* Technical Specifications */}
        <h4>Technical Specifications</h4>
        <Table striped bordered hover responsive className="w-75">
          <tbody>
            <tr>
              <td>
                <strong>Model</strong>
              </td>
              <td>{product.specifications?.model}</td>
            </tr>
            {product.specifications?.batteryLife && (
              <tr>
                <td>
                  <strong>Battery Life</strong>
                </td>
                <td>{product.specifications.batteryLife}</td>
              </tr>
            )}
            {product.specifications?.weight && (
              <tr>
                <td>
                  <strong>Weight</strong>
                </td>
                <td>{product.specifications.weight}</td>
              </tr>
            )}
            {/* Extra dynamic specifications */}
            {product.specifications?.extra &&
              Object.entries(product.specifications.extra).map(
                ([key, value]) => (
                  <tr key={key}>
                    <td>
                      <strong>{key}</strong>
                    </td>
                    <td>{value}</td>
                  </tr>
                )
              )}
          </tbody>
        </Table>

        {/* Add to Cart + Delivery */}
         <Row className="mt-4">
          <Col md={6}>
            {isInCart ? (
              <Button variant="danger" className="mb-3" onClick={handleRemoveFromCart}>
                Remove from Cart
              </Button>
            ) : (
              <Button variant="primary" className="mb-3" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetails;
