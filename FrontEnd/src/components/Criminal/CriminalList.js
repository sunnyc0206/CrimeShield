import React, { useState, useEffect } from "react";
import { Card, Table, ButtonGroup, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTrash, faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

const CriminalList = () => {
  const [criminals, setCriminals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    findAllCriminals();
  }, []);

  const findAllCriminals = () => {
    axios
      .get(`http://localhost:8081/rest/criminals`)
      .then((response) => response.data)
      .then((data) => {
        setCriminals(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
  };

  const filteredCriminals = criminals.filter((criminal) =>
    criminal.criminalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header>
          <div style={{ float: "left" }}>
            <FontAwesomeIcon icon={faList} /> Criminal List
          </div>
          <div style={{ float: "right" }}>
            <Form.Control
              type="text"
              placeholder="Search by name/location"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </Card.Header>
        <Card.Body>
          <Table bordered hover striped className="criminal-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Ethnicity</th>
                <th>DOB</th>
                <th>Height</th>
                <th>Location</th>
                <th>Aadhar Number</th>
                <th>Gender</th>
                <th>ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCriminals.length === 0 ? (
                <tr>
                  <td colSpan="9">No criminals available.</td>
                </tr>
              ) : (
                filteredCriminals.map((criminal) => (
                  <tr key={criminal.cid}>
                    <td>{criminal.criminalName}</td>
                    <td>{criminal.criminalEthnicity}</td>
                    <td>{criminal.criminalDOB}</td>
                    <td>{criminal.criminalHeight}</td>
                    <td>{criminal.criminalLocation}</td>
                    <td>{criminal.aadharNumber}</td>
                    <td>{criminal.criminalGender}</td>
                    <td>{criminal.cid}</td>
                    <td>
                      <ButtonGroup>
                        <Link
                          to={`/update-criminal/${criminal.cid}`}
                          className="btn btn-sm btn-outline-success"
                        
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>{" "}
                      </ButtonGroup>
                      <ButtonGroup>
                        <Link
                          to={`/delete-criminal/${criminal.cid}`}
                          className="btn btn-sm btn-outline-danger"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Link>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CriminalList;
