import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourt, updateCourt } from "../../services/index";
import { Card, Table, ButtonGroup, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTrash, faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyToast from "../MyToast";
import axios from "axios";
import UnauthorizedPage from "../UnauthorizedPage";

const CourtList = () => {
  const [courts, setCourts] = useState([]);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    findAllCourts();
  }, []);

  const findAllCourts = () => {
    axios
      .get(`http://localhost:8081/rest/courts`)
      .then((response) => response.data)
      .then((data) => {
        setCourts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
  };

  const filteredCourts = courts.filter((court) =>
    court.courtLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {showDeleteSuccess && (
        <MyToast
          show={showDeleteSuccess}
          message="Court deleted successfully."
          type="danger"
        />
      )}
      {showUpdateSuccess && (
        <MyToast
          show={showUpdateSuccess}
          message="Court updated successfully."
          type="success"
        />
      )}
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header>
          <div style={{ float: "left" }}>
            <FontAwesomeIcon icon={faList} /> Court List
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
          <Table bordered hover striped className="court-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Location</th>
                <th>Judge Name</th>
                <th>Type</th>
                <th>Active Cases</th>
                <th>Solved Cases</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourts.length === 0 ? (
                <tr>
                  <td colSpan="4">No courts available.</td>
                </tr>
              ) : (
                filteredCourts.map((court) => (
                  <tr key={court.courtId}>
                    <td>{court.courtId}</td>
                    <td>{court.courtLocation}</td>
                    <td>{court.judgeName}</td>
                    <td>{court.courtType}</td>
                    <td>{court.activeCases}</td>
                    <td>{court.solvedCases}</td>
                    <td>
                      <ButtonGroup>
                        <Link
                          to={`/update-court/${court.courtId}`}
                          className="btn btn-sm btn-outline-success"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>{" "}
                        <Link
                          to={`/delete-court/${court.courtId}`}
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

export default CourtList;
