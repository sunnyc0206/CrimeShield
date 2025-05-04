import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authToken from "../utils/authToken";
import { Alert, Card, Container, Row, Col, Button } from "react-bootstrap";
import courtImage from "../Images/court.png";
import criminalImage from "../Images/criminal.png";
import firImage from "../Images/fir.jpg";
import { useState } from "react";
const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Criminal",
      path: "/criminal",
      description: "Explore criminal records. ",
      image: criminalImage,
    },
    {
      title: "Court",
      path: "/court",
      description: "Access court-related information.",
      image: courtImage,
    },
    {
      title: "FIR",
      path: "/fir",
      description: "Register First-Incident-Response.",
      image: firImage,
    },
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <Alert style={{ backgroundColor: "#343A40", color: "#ffffff80" }}>
        Welcome To Crime Shield.
      </Alert>
      <Row>
        {cards.map((card, index) => (
          <Col key={index} sm={12} md={6} lg={4}>
            <Card className="mb-3 h-100">
              <div className="card-image-container">
                <Card.Img
                  variant="top"
                  src={card.image}
                  className="card-image"
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.description}</Card.Text>
                <div className="mt-auto">
                  <Button
                    variant="primary"
                    onClick={() => handleCardClick(card.path)}
                  >
                    Go to {card.title}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
