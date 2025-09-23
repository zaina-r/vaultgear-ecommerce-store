import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <Card
      className="shadow-sm border-0 rounded-4 overflow-hidden h-100"
      style={{
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        background: "#ffffff",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
    >
      {product.images?.length > 0 && (
        <Card.Img
          variant="top"
          src={product.images[0]}
          style={{
            objectFit: "cover",
            height: "220px",
            transition: "transform 0.3s ease",
          }}
        />
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title
          className="fw-bold text-truncate"
          style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}
        >
          {product.title}
        </Card.Title>
        <Card.Text
          className="text-muted flex-grow-1"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontSize: "0.95rem",
          }}
        >
          {product.description}
        </Card.Text>
        <div className="mt-3">
          <Button
            variant="primary"
            className="rounded-pill fw-semibold px-4 py-2"
            style={{
              background: "linear-gradient(90deg, #4f46e5, #6366f1)",
              border: "none",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
