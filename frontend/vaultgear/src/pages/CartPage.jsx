import { useCart } from "../context/cartContext";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <Container className="my-5">
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2>Your Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item._id}>
              <td>
                <div className="d-flex align-items-center">
                  <img 
                    src={item.images?.[0]} 
                    alt={item.title}
                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                  />
                  {item.title}
                </div>
              </td>
              <td>
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                >
                  -
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  +
                </Button>
              </td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Row className="mt-4">
        <Col md={6}>
          <Button variant="danger" onClick={clearCart}>
            Clear Cart
          </Button>
        </Col>
        <Col md={6} className="text-end">
          <h4>Total Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;