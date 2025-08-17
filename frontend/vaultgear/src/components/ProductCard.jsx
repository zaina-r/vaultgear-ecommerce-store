import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductCard = ({ product }) => {
  return (
    <>
      <Link
        to={`/product/${product._id}`}
        key={product._id}
        style={{ textDecoration: "none", color: "inherit" }} // remove default link styling
      >
        <Card style={{ width: "18rem", cursor: "pointer" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </>
  );
};

export default ProductCard;
