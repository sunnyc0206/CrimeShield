import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFIR } from "../../services/index";
import { getFIRs } from "../../services/index";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Col } from "react-bootstrap";
import MyToast from "../MyToast";
import axios from "axios";

const UpdateFIR = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fir, setFir] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/rest/FIR/id/${id}`)
      .then((response) => {
        const data = response.data;
        if (data) {
          setFir(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFir((prevFir) => ({
      ...prevFir,
      [name]: value,
    }));
  };

  const handleUpdateFIR = () => {
    dispatch(updateFIR(id, fir))
      .then(() => {
        setShow(true);
        
        dispatch(getFIRs()); // Fetch updated FIRs after successful update
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!fir) {
    return null; // Return null or a loading indicator if FIR data is not available yet
  }

  return (
    <div>
     
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>Update FIR Case Status</Card.Header>
        <Card.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formFIRId">
                <Form.Label>FIR ID</Form.Label>
                <Form.Control
                  type="text"
                  name="fid"
                  value={fir.fid}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formCourtLocation">
                <Form.Label>Court Location</Form.Label>
                <Form.Control
                  type="text"
                  name="courtLocation"
                  value={fir.courtLocation}
                  disabled
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formCrimeLocation">
                <Form.Label>Crime Location</Form.Label>
                <Form.Control
                  type="text"
                  name="crimeLocation"
                  value={fir.crimeLocation}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formCrimeStatus">
                <Form.Label>Case Status</Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="crimeStatus"
                  value={fir.crimeStatus}
                  onChange={handleInputChange}
                  className="bg-dark text-white"
                >
                  <option value="">Select Case Status</option>
                  <option value="CasePending">Case Pending</option>
                  <option value="CaseClosed">Case Closed</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            {/* Add other FIR details here */}
          </Form>
        </Card.Body>
        <Card.Footer style={{ textAlign: "right" }}>
          <Button variant="primary" onClick={handleUpdateFIR}>
            Update
          </Button>{" "}
          <Button variant="outline-danger" onClick={() => navigate("/fir-list")}>
            Cancel
          </Button>
        </Card.Footer>
      </Card>
      {show && (
        <MyToast
          show={show}
          message="FIR Status Updated Successfully."
          type="success"
          onClose={() => {
            setShow(false);
            navigate("/fir-list");
          }}
        />
      )}"
      </div>
  
  );
};

export default UpdateFIR;
