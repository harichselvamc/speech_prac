import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserPage.css';
import { Container, Row, Col, Card, Button, Modal, Navbar, Nav, Carousel } from 'react-bootstrap';

function UserPage() {
  const [yogaCategories, setYogaCategories] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  // Fetch Yoga API data
  useEffect(() => {
    fetch('https://yoga-api-nzy4.onrender.com/v1/categories')
      .then((response) => response.json())
      .then((data) => filterUniqueImages(data))
      .catch((error) => console.error('Error fetching yoga categories:', error));
  }, []);

  const filterUniqueImages = (categories) => {
    const seenImages = new Set();
    const uniqueCategories = categories.filter((category) => {
      const imageUrl = category.poses[0]?.url_png;
      if (!imageUrl || seenImages.has(imageUrl)) {
        return false;
      }
      seenImages.add(imageUrl);
      return true;
    });
    setUniqueCategories(uniqueCategories);
  };

  const handleShowMoreDetails = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  return (
    <div>
      {/* Styled Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#" className="navbar-brand-custom">My Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/breathing" className="nav-link-custom">Breathing Exercise</Nav.Link>
            <Nav.Link href="/speech" className="nav-link-custom">Speech Practice</Nav.Link>
            <Nav.Link href="/tips" className="nav-link-custom">Tips & Resources</Nav.Link>
            <Nav.Link href="/user" className="nav-link-custom">Home</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Display all categories directly */}
      <Container id="user-page-container" className="my-5">
        <Row>
          {uniqueCategories.map((category) => (
            <Col md={4} key={category.id} className="mb-4">
              <Card className="yoga-card text-center shadow">
                <div className="image-container">
                  <img src={category.poses[0]?.url_png} alt={category.category_name} className="profile-image" />
                </div>
                <Card.Body>
                  <Card.Title>{category.category_name}</Card.Title>
                  <Card.Text>
                    {category.category_description.substring(0, 100)}...
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleShowMoreDetails(category)}>
                    View More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal for showing more details about the category */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory?.category_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Description:</strong> {selectedCategory?.category_description}</p>
          <h5>Example Poses:</h5>
          <ul>
            {selectedCategory?.poses.map((pose) => (
              <li key={pose.id}>
                <strong>{pose.english_name}</strong> ({pose.sanskrit_name_adapted}) - {pose.pose_description}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserPage;
