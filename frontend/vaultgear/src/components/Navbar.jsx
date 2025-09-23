import { Navbar, Container, Nav, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/cartContext";// Add this import

const Navigation = () => { // Remove cartCount prop since we'll get it from context
  const { cartCount } = useCart(); // Get cartCount from context

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          VaultGear
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="fw-medium">
              Home
            </Nav.Link>
          </Nav>

          <Button
            as={Link}
            to="/cart"
            variant="outline-light"
            className="position-relative"
          >
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 start-100 translate-middle"
              >
                {cartCount}
              </Badge>
            )}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;