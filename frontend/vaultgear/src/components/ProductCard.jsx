import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductCard = ({ product }) => {
  const API_BASE = "http://localhost:5001";

  return (
    <Link
      to={`/product/${product._id}`}
      key={product._id}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        className="shadow-sm border-0 rounded-4 overflow-hidden h-100"
        style={{
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        }}
      >
        <Card.Img
          variant="top"
          src={
            product.image
          }
          alt={product.title}
          style={{ objectFit: "cover", height: "200px" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="fw-bold text-truncate">
            {product.title}
          </Card.Title>
          <Card.Text
            className="text-muted flex-grow-1"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description}
          </Card.Text>
          <Button
            variant="primary"
            className="mt-2 rounded-pill fw-semibold"
            style={{ alignSelf: "flex-start" }}
          >
            View Details
          </Button>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCard;
