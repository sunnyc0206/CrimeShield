import React from "react";
import { Card } from "react-bootstrap";
import videoFile from "../Video/video.mp4";

const Welcome = (props) => {
  return (
    <Card bg="dark" text="light">
      <Card.Header>Hello! Welcome to Crime Shield. Stay Safe - Stay Alert</Card.Header>
      <Card.Body style={{ overflowY: "scroll", height: "570px", position: "relative" }}>
        <video src={videoFile} controls autoPlay style={{ width: "100%", height: "100%" }} />
      </Card.Body>
    </Card>
  );
};

export default Welcome;
