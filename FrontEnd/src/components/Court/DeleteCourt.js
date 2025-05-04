// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { deleteCourt } from "../../services/index";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button, Card } from "react-bootstrap";
// import axios from "axios";
// import MyToast from "../MyToast";

// const DeleteCourt= () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [court, setCourt] = useState(null);
//   const [showToast, setShowToast] = useState(false);

//   useEffect(() => {
    
//     axios
//       .get(`http://localhost:8081/rest/courts/id/${id}`)
//       .then((response) => {
//         setCourt(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [id]);

//   const handleConfirmDelete = () => {
//     dispatch(deleteCourt(id, court))
//       .then(() => {
//         setShowToast(true);
//         navigate("/court-list");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleCancelDelete = () => {
//     navigate("/court-list");
//   };

//   return (
//     <div>
//       <Card className="border border-dark bg-dark text-white">
//         <Card.Header>Delete Court</Card.Header>
//         <Card.Body>
//           {court && (
//             <div>
//               <p>Are you sure you want to delete the following court?</p>
//               <p>Judge Name: {court.judgeName}</p>
//               <p>Court Type: {court.courtType}</p>
//               <p>Location: {court.courtLocation}</p>
//               {/* Add more details as needed */}
//             </div>
//           )}
//         </Card.Body>
//         <Card.Footer style={{ textAlign: "right" }}>
//           <Button variant="danger" onClick={handleConfirmDelete}>
//             Delete
//           </Button>{" "}
//           <Button variant="outline-danger" onClick={handleCancelDelete}>
//             Cancel
//           </Button>
//         </Card.Footer>
//       </Card>
//       {showToast && (
//         <MyToast
//           show={showToast}
//           message="Court deleted successfully."
//           type="success"
//         />
//       )}
//     </div>
//   );
// };

// export default DeleteCourt;
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteCourt } from "../../services/index";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import MyToast from "../MyToast";

const DeleteCourt = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [court, setCourt] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Fetch court data based on ID
    axios
      .get(`http://localhost:8081/rest/courts/id/${id}`)
      .then((response) => {
        setCourt(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleConfirmDelete = () => {
    dispatch(deleteCourt(id, court))
      .then(() => {
        setShowToast(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelDelete = () => {
    navigate("/court-list");
  };

  return (
    <div>
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>Delete Court</Card.Header>
        <Card.Body>
          {court && (
            <div>
              <p>Are you sure you want to delete the following court?</p>
              <p>Judge Name: {court.judgeName}</p>
              <p>Court Type: {court.courtType}</p>
              <p>Location: {court.courtLocation}</p>
              {/* Add more details as needed */}
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
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        {showToast && (
          <MyToast
            show={showToast}
            message="Court deleted successfully."
            type="success"
            onClose={() => {
              setShowToast(false);
              navigate("/court-list");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DeleteCourt;
