import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [model, setModel] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !model.trim()) {
      toast.error("Please enter all fields");
      return;
    }

    setLoading(true);

    try {
      const productData = {
        title,
        description,
        images: [image], // wrap single image in an array
        specifications: { model }, // wrap model in specifications object
      };
      await api.post("/new-product", productData);
      toast.success("Product created Successfully!");
      navigate("/");
    } catch (e) {
      toast.error("Failed to create Product");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Create New Product</h2>
      <Container className="d-flex justify-content-center mt-5">
        <Form style={{ width: "50%" }}>
          {/* Title */}
          <Form.Group as={Row} className="mb-3" controlId="formTitle">
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Device Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
          </Form.Group>

          {/* Description */}
          <Form.Group as={Row} className="mb-3" controlId="formDescription">
            <Form.Label column sm="2">
              Description
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formTitle">
            <Form.Label column sm="2">
              Image
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formTitle">
            <Form.Label column sm="2">
              Model
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Device Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
      </Container>
      <div className="text-center">
        <Button
          variant="light"
          type="submit"
          className="btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating Product..." : "Create Product"}
        </Button>
      </div>
    </>
  );
};

export default CreateProduct;
