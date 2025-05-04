import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo, faList } from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import { createFIR } from '../../services/fir/firActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FIR = ({ createFIR }) => {
  const [state, setState] = useState({
    criminalId: '',
    courtId: '',
    crimeLocation: '',
    crimeStatus: 'CasePending',
    crimeType: '',
    crimeWeapon: '',
    victimName: '',
    victimAddress: '',
    victimPhone: '',
    show: false,
    criminalList: [],
    courtList: [],
  });

  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch criminal list
    axios
      .get('http://localhost:8081/rest/criminals')
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          criminalList: response.data,
        }));
      })
      .catch((error) => {
        console.log('Error fetching criminal list:', error);
      });

    // Fetch court list
    axios
      .get('http://localhost:8081/rest/courts')
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          courtList: response.data,
        }));
      })
      .catch((error) => {
        console.log('Error fetching court list:', error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCriminalSelection = (event) => {
    const selectedCriminalId = event.target.value;
    setState((prevState) => ({
      ...prevState,
      criminalId: selectedCriminalId,
    }));
  };

  const handleCourtSelection = (event) => {
    const selectedCourtId = event.target.value;
    setState((prevState) => ({
      ...prevState,
      courtId: selectedCourtId,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      criminalId,
      courtId,
      crimeLocation,
      crimeStatus,
      crimeType,
      crimeWeapon,
      victimName,
      victimAddress,
      victimPhone,
    } = state;

    // Create new FIR
    const newFIR = {
      criminalId,
      courtId,
      crimeLocation,
      crimeStatus,
      crimeType,
      crimeWeapon,
      victimName,
      victimAddress,
      victimPhone,
    };

    createFIR(newFIR);
    setState((prevState) => ({
      ...prevState,
      show: true,
      criminalId: '',
      courtId: '',
      crimeLocation: '',
      crimeStatus: 'CasePending',
      crimeType: '',
      crimeWeapon: '',
      victimName: '',
      victimAddress: '',
      victimPhone: '',
    }));

    setShowToast(true);
  };

  const handleReset = () => {
    setState({
      criminalId: '',
      courtId: '',
      crimeLocation: '',
      crimeStatus: 'CasePending',
      crimeType: '',
      crimeWeapon: '',
      victimName: '',
      victimAddress: '',
      victimPhone: '',
      show: false,
      criminalList: [],
      courtList: [],
    });
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const {
    criminalId,
    courtId,
    crimeLocation,
    crimeStatus,
    crimeType,
    crimeWeapon,
    victimName,
    victimAddress,
    victimPhone,
    show,
    criminalList,
    courtList,
  } = state;

  return (
    <div>
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>
          <FontAwesomeIcon icon={faPlusSquare} /> Register FIR
        </Card.Header>
        <Form onSubmit={handleSubmit} id="firFormId">
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCriminalId">
                <Form.Label>Criminal</Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="criminalId"
                  value={criminalId}
                  onChange={handleCriminalSelection}
                  className="bg-dark text-white"
                  placeholder="Select Criminal..."
                >
                  <option value="">Select Criminal...</option>
                  {criminalList.map((criminal) => (
                    <option key={criminal.cid} value={criminal.cid}>
                      {criminal.criminalName}-{criminal.cid}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCourtId">
                <Form.Label>Court</Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="courtId"
                  value={courtId}
                  onChange={handleCourtSelection}
                  className="bg-dark text-white"
                  placeholder="Select Court..."
                >
                  <option value="">Select Court...</option>
                  {courtList.map((court) => (
                    <option key={court.courtId} value={court.courtId}>
                      {court.courtLocation}-{court.courtId}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCrimeLocation">
                <Form.Label>Crime Location</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="crimeLocation"
                  value={crimeLocation}
                  onChange={handleChange}
                  className="bg-dark text-white"
                  placeholder="Enter Crime Location"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCrimeStatus">
                <Form.Label>Crime Status</Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="crimeStatus"
                  value={crimeStatus}
                  onChange={handleChange}
                  className="bg-dark text-white"
                >
                  <option value="CasePending">Case Pending</option>
                  <option value="UnderInvestigation">Under Investigation</option>
                  <option value="CaseClosed">Case Closed</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCrimeType">
                <Form.Label>Crime Type</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="crimeType"
                  value={crimeType}
                  onChange={handleChange}
                  className="bg-dark text-white"
                  placeholder="Enter Crime Type"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCrimeWeapon">
                <Form.Label>Crime Weapon</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="crimeWeapon"
                  value={crimeWeapon}
                  onChange={handleChange}
                  className="bg-dark text-white"
                  placeholder="Enter Crime Weapon"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridVictimName">
                <Form.Label>Victim Name</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="victimName"
                  value={victimName}
                  onChange={handleChange}
                  className="bg-dark text-white"
                  placeholder="Enter Victim Name"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridVictimAddress">
                <Form.Label>Victim Address</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="victimAddress"
                  value={victimAddress}
                  onChange={handleChange}
                  className="bg-dark text-white"
                  placeholder="Enter Victim Address"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridVictimPhone">
                <Form.Label>Victim Phone</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="victimPhone"
                  value={victimPhone}
                  onChange={handleChange}
                  className="bg-dark text-white"
                  placeholder="Enter Victim Phone"
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
            <Button size="sm" variant="info" type="button" onClick={() => navigate('/fir-list')}>
              <FontAwesomeIcon icon={faList} /> FIR List
            </Button>
          </Card.Footer>
        </Form>
      </Card>
      <MyToast
        show={showToast}
        type="success"
        message="FIR saved successfully."
        onClose={handleCloseToast}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createFIR: (fir) => dispatch(createFIR(fir)),
  };
};

export default connect(null, mapDispatchToProps)(FIR);
