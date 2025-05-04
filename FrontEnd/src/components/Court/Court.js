import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo, faList } from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import { createCourt } from '../../services/court/courtActions';
import { useNavigate } from 'react-router-dom';

const Court = ({ createCourt }) => {
  const [state, setState] = useState({
    judgeName: '',
    courtLocation: '',
    courtType: '',
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
    const { judgeName, courtLocation, courtType } = state;

    // Create new court
    const newCourt = {
      judgeName,
      courtLocation,
      courtType,
    };

    createCourt(newCourt);
    setState((prevState) => ({
      ...prevState,
      show: true,
      judgeName: '',
      courtLocation: '',
      courtType: '',
    }));
    setShowToast(true);
  };

  const handleReset = () => {
    setState({
      judgeName: '',
      courtLocation: '',
      courtType: '',
      show: false,
    });
  };
  const handleCloseToast = () => {
    setShowToast(false);
  };


  const { judgeName, courtLocation, courtType } = state;

  return (
    <div>
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>
          <FontAwesomeIcon icon={faPlusSquare} /> Add New Court
        </Card.Header>
        <Form onSubmit={handleSubmit} id="courtFormId">
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridJudgeName">
                <Form.Label>Judge Name</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="judgeName"
                  value={judgeName}
                  onChange={handleChange}
                  className="bg-dark text-white"
                  placeholder="Enter Judge Name"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCourtLocation">
                <Form.Label>Court Location</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="courtLocation"
                  value={courtLocation}
                  onChange={handleChange}
                  className="bg-dark text-white"
                  placeholder="Enter Court Location"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCourtType">
            <Form.Label>Court Type</Form.Label>
            <Form.Control
                required
                as="select"
                name="courtType"
                value={courtType}
                onChange={handleChange}
                className="bg-dark text-white"
            >
                <option value="">Select Court Type</option>
                <option value="Supreme Court">Supreme Court</option>
                <option value="High Court">High Court</option>
                <option value="District Court">District Court</option>
            </Form.Control>
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
            <Button size="sm" variant="info" type="button" onClick={() => navigate('/court-list')}>
              <FontAwesomeIcon icon={faList} /> Court List
            </Button>
          </Card.Footer>
        </Form>
      </Card>
      <MyToast
        show={showToast}
        type="success"
        message="Court saved successfully."
        onClose={handleCloseToast}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCourt: (court) => dispatch(createCourt(court)),
  };
};

export default connect(null, mapDispatchToProps)(Court);
