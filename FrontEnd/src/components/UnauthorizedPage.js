import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import unauthorizedImage from "../Images/unauthorized.jpg"; 

const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-page">
      <div className="unauthorized-content">
        <img src={unauthorizedImage} style={{ height: "550px" ,width:"1100px"}}  alt="Unauthorized Access" className="unauthorized-image" />
        
      </div>
      <Button variant="danger" as={Link} to="/home">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Home
        </Button>
    </div>
  );
};

export default UnauthorizedPage;
