import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCourt } from "../../services/index";
import { getCourts } from "../../services/index";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Col } from "react-bootstrap";
import MyToast from "../MyToast";
import axios from "axios";

const UpdateCourt = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [court, setCourt] = useState({
    judgeName: "",
    courtLocation: "",
    courtType: "",
  });
  const [show, setShow] = useState(false);


  useEffect(() => {
    axios
      .get(`http://localhost:8081/rest/courts/id/${id}`)
      .then((response) => {
        const data = response.data;
        if (data) {
          setCourt(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCourt((prevCourt) => ({
      ...prevCourt,
      [name]: value,
    }));
  };

  const handleUpdateCourt = () => {
    dispatch(updateCourt(id, court))
    .then(() => {
      setShow(true);
      dispatch(getCourts()); 
     
    })
    .catch((error) => {
      console.log(error);
    });
    
};

  if (!court) {
    return null; // Return null or a loading indicator if court data is not available yet
  }

  return (
    <div>
      
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>Update Court</Card.Header>
        <Card.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formCourtName">
                <Form.Label>Judge Name</Form.Label>
                <Form.Control
                  type="text"
                  name="judgeName"
                  value={court.judgeName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formCourtAddress">
                <Form.Label>Court Location</Form.Label>
                <Form.Control
                  type="text"
                  name="courtLocation"
                  value={court.courtLocation}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formCourtType">
                <Form.Label>Court Type</Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="courtType"
                  value={court.courtType}
                  onChange={handleInputChange}
                  className="bg-dark text-white"
                >
                  <option value="">Select Court Type</option>
                  <option value="Supreme Court">Supreme Court</option>
                  <option value="High Court">High Court</option>
                  <option value="District Court">District Court</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
        </Card.Body>
        <Card.Footer style={{ textAlign: "right" }}>
          <Button variant="primary" onClick={handleUpdateCourt}>
            Update
          </Button>{" "}
          <Button variant="outline-danger" onClick={() => navigate("/court-list")}>
            Cancel
          </Button>
        </Card.Footer>
      </Card>

      {/* <MyToast show={show} message="Court Updated Successfully." type="success" onClose={() => {setShow(false);  navigate("/court-list")} }
       /> */}
       {show && (
        <MyToast
          show={show}
          message="Court Updated Successfully."
          type="success"
          onClose={() => {
            setShow(false);
            navigate("/court-list");
          }}
        />
      )}

    </div>
  );
};

export default UpdateCourt;
