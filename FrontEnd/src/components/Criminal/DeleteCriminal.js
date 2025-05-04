import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteCriminal } from "../../services/index";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import MyToast from "../MyToast";

const DeleteCriminal = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [criminal, setCriminal] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Fetch criminal data based on ID
    axios
      .get(`http://localhost:8081/rest/criminals/id/${id}`)
      .then((response) => {
        setCriminal(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleConfirmDelete = () => {
    dispatch(deleteCriminal(id, criminal))
      .then(() => {
        setShowToast(true);
        // navigate("/criminal-list");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelDelete = () => {
    navigate("/criminal-list");
  };

  return (
    <div>
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>Delete Criminal</Card.Header>
        <Card.Body>
          {criminal && (
            <div>
              <p>Are you sure you want to delete the following criminal?</p>
              <p>Name: {criminal.criminalName}</p>
              <p>Ethnicity: {criminal.criminalEthnicity}</p>
              <p>Location: {criminal.criminalLocation}</p>
            </div>
          )}
        </Card.Body>
        <Card.Footer style={{ textAlign: "right" }}>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>{" "}
          <Button variant="outline-danger" onClick={handleCancelDelete}>
            Cancel
          </Button>
        </Card.Footer>
      </Card>
      {showToast && (
        <MyToast
          show={showToast}
          message="Criminal deleted successfully."
          type="success"
          onClose={() => {
            setShowToast(false);
            navigate("/criminal-list");
          }}
        />
      )}
    </div>
  );
};

export default DeleteCriminal;