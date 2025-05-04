import React, { useState, useEffect , } from "react";
import { Card, Table, Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { Link} from "react-router-dom";
import axios from "axios";
import PdfGenerator from "../PdfGenerator";
import {createRoot} from 'react-dom/client';

const FirList = () => {
  const [firs, setFirs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFIR, setSelectedFIR] = useState(null);

  useEffect(() => {
    findAllFirs();
  }, []);

  const findAllFirs = () => {
   
    axios
      .get(`http://localhost:8081/rest/FIR`)
      .then((response) => response.data)
      .then((data) => {
        setFirs(data); 
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
  };


  const handleFIRClick = (fir) => {
    setSelectedFIR(fir);
  };

  const handleGeneratePdf = () => {
    if (selectedFIR) {
      const newWindow = window.open("", "_blank");
      if (newWindow) {
        const container = newWindow.document.createElement("div");
        newWindow.document.body.appendChild(container);
        
        createRoot(container).render(<PdfGenerator firData={selectedFIR} />);
      }
    }
  };
  
  const handleCloseModal = () => {
    setSelectedFIR(null);
    
  };

  // Redux selectors
       const filteredFirs = firs.filter((fir) =>
        fir.crimeLocation.toLowerCase().includes(searchQuery.toLowerCase())
      );


  return (
    <div>
    
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header>
          <div style={{ float: "left" }}>
            <FontAwesomeIcon icon={faList} /> FIR List
          </div>
          <div style={{ float: "right" }}>
            <Form.Control
              type="text"
              placeholder="Search by location"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </Card.Header>
        <Card.Body>
          <Table bordered hover striped className="fir-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Court Location</th>
                <th>Crime Location</th>
                <th>Crime Status</th>
                <th>Fir Register Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredFirs.length === 0 ? (
                <tr>
                  <td colSpan="5">No FIRs available.</td>
                </tr>
              ) : (
                filteredFirs.map((fir) => (
                  <tr key={fir.fid} onClick={() => handleFIRClick(fir)}>
                    <td>{fir.fid}</td>
                    <td>{fir.courtLocation}</td>
                    <td>{fir.crimeLocation}</td>
                    <td>{fir.crimeStatus}</td>
                    <td>{fir.firRegisterDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {/* Modal to display FIR details */}
      <Modal show={selectedFIR !== null} onHide={handleCloseModal} centered>
  <Modal.Header closeButton>
    
    <Modal.Title>FIR Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    
    {selectedFIR && (
      <Card>
        <Card.Body>
          <Card.Text>
            <strong>FIR ID: </strong>
            {selectedFIR.fid}
          </Card.Text>
          <Card.Text>
            <strong>FIR Register Date: </strong>
            {selectedFIR.firRegisterDate}
          </Card.Text>
          <Card.Text>
            <strong>Criminal Name: </strong>
            {selectedFIR.criminalName}
          </Card.Text>
          <Card.Text>
            <strong>Crime Type: </strong>
            {selectedFIR.crimeType}
          </Card.Text>
          <Card.Text>
            <strong>Crime Weapon: </strong>
            {selectedFIR.crimeWeapon}
          </Card.Text>
          <Card.Text>
            <strong>Court Location: </strong>
            {selectedFIR.courtLocation}
          </Card.Text>
          <Card.Text>
            <strong>Criminal Location: </strong>
            {selectedFIR.criminalLocation}
          </Card.Text>
          <Card.Text>
            <strong>Crime Location: </strong>
            {selectedFIR.crimeLocation}
          </Card.Text>
          <Card.Text>
            <strong>Crime Status: </strong>
            {selectedFIR.crimeStatus}
          </Card.Text>
          
          <Card.Text>
            <strong>Criminal DOB: </strong>
            {selectedFIR.criminalDob}
          </Card.Text>
         
          <Card.Text>
            <strong>Victim Address: </strong>
            {selectedFIR.victimAddress}
          </Card.Text>
          <Card.Text>
            <strong>Victim Name: </strong>
            {selectedFIR.victimName}
          </Card.Text>
          <Card.Text>
            <strong>Victim Phone: </strong>
            {selectedFIR.victimPhone}
          </Card.Text>
        </Card.Body>
      </Card>
    )}
  </Modal.Body>
  <Modal.Footer>
    <div className="mr-auto">
      {selectedFIR && (
        <>
          <Link
            to={`/update-fir/${selectedFIR.fid}`}
            className="btn btn-outline-success mr-2"
          >
            Update
          </Link>
          <Button  onClick={handleGeneratePdf} >Generate PDF</Button>

        </>
      )}
    </div>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
    
  </Modal.Footer>
</Modal>
    </div>
    
  );

};


export default FirList;
