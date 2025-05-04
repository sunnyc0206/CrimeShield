import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo, faList } from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import { createCriminal } from '../../services/criminal/criminalActions';
import { useNavigate } from 'react-router-dom';

const Criminal = ({ createCriminal }) => {
  const [state, setState] = useState({
    aadharNumber: '',
    criminalDOB: '',
    criminalEthnicity: '',
    criminalGender: '',
    criminalHeight: 0,
    criminalLocation: '',
    criminalName: '',
    show: false,
  });
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      aadharNumber,
      criminalDOB,
      criminalEthnicity,
      criminalGender,
      criminalHeight,
      criminalLocation,
      criminalName,
    } = state;

    // Create new criminal
    const newCriminal = {
      aadharNumber,
      criminalDOB,
      criminalEthnicity,
      criminalGender,
      criminalHeight,
      criminalLocation,
      criminalName,
    };

    createCriminal(newCriminal);
    setState((prevState) => ({
      ...prevState,
      show: true,
      aadharNumber: '',
      criminalDOB: '',
      criminalEthnicity: '',
      criminalGender: '',
      criminalHeight: 0,
      criminalLocation: '',
      criminalName: '',
    }));

  setShowToast(true);

  };
  
  const {
    aadharNumber,
    criminalDOB,
    criminalEthnicity,
    criminalGender,
    criminalHeight,
    criminalLocation,
    criminalName,
  } = state;
 
  const handleReset = () => {
    setState({
      aadharNumber: '',
      criminalDOB: '',
      criminalEthnicity: '',
      criminalGender: '',
      criminalHeight: 0,
      criminalLocation: '',
      criminalName: '',
      show: false,
    });
   
  };
  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div>
 
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>
          <FontAwesomeIcon icon={faPlusSquare} /> Add New Criminal
        </Card.Header>
        <Form onSubmit={handleSubmit} id="criminalFormId">
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCriminalName">
                <Form.Label>Criminal Name</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="criminalName"
                  value={criminalName}
                  onChange={handleChange}
                  className="bg-dark text-white"
                  placeholder="Enter Criminal Name"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCriminalDOB">
                <Form.Label>Criminal Date of Birth</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="date"
                  name="criminalDOB"
                  value={criminalDOB}
                  onChange={handleChange}
                  className="bg-dark text-white"
                  placeholder="Enter Criminal DOB"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCriminalGender">
                <Form.Label>Criminal Gender</Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="criminalGender"
                  value={criminalGender}
                  onChange={handleChange}
                  className="bg-dark text-white"
                >
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCriminalHeight">
                <Form.Label>Criminal Height</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="number"
                  name="criminalHeight"
                  value={criminalHeight}
                  onChange={handleChange}
                  className="bg-dark text-white"
                  placeholder="Enter Criminal Height"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCriminalEthnicity">
                <Form.Label>Criminal Ethnicity</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="criminalEthnicity"
                  value={criminalEthnicity}
                  onChange={handleChange}
                  className="bg-dark text-white"
                  placeholder="Enter Criminal Ethnicity"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCriminalLocation">
                <Form.Label>Criminal Location</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="criminalLocation"
                  value={criminalLocation}
                  onChange={handleChange}
                  className="bg-dark text-white"
                  placeholder="Enter Criminal Location"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridAadharNumber">
                <Form.Label>Aadhar Number</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="aadharNumber"
                  value={aadharNumber}
                  onChange={handleChange}
                  className="bg-dark text-white"
                  placeholder="Enter Aadhar Number"
                />
              </Form.Group>
            </Form.Row>
          </Card.Body>
          <Card.Footer style={{ textAlign: 'right' }}>
            <Button size="sm" variant="success" type="submit">
              <FontAwesomeIcon icon={faSave} /> Save
            </Button>{' '}
            <Button size="sm" variant="info" type="reset" onClick={handleReset}>
              <FontAwesomeIcon icon={faUndo} /> Reset
            </Button>{' '}
            <Button size="sm" variant="info" type="button" onClick={() => navigate('/criminal-list')}>
              <FontAwesomeIcon icon={faList} /> Criminal List
            </Button>
          </Card.Footer>
        </Form>
      </Card>
      <MyToast
        show={showToast}
        type="success"
        message="Criminal saved successfully."
        onClose={handleCloseToast}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCriminal: (criminal) => dispatch(createCriminal(criminal)),
  };
};

export default connect(null, mapDispatchToProps)(Criminal);
