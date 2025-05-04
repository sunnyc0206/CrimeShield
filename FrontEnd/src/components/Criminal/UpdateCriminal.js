// // import React, { Component } from "react";
// // import axios from "axios";
// // import { connect } from "react-redux";
// // import { updateCriminal } from "../../services/index";
// // import { Form, Button, Card, Col } from "react-bootstrap";
// // import MyToast from "../MyToast";

// // class UpdateCriminal extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       criminal: {
// //         criminalName: "",
// //         criminalEthnicity: "",
// //         criminalDOB: "",
// //         criminalHeight: "",
// //         criminalLocation: "",
// //         aadharNumber: "",
// //         criminalGender: "",
// //       },
// //       show: false,
// //     };
// //   }

// //   componentDidMount() {
// //     const { id } = this.props.match.params;
    
// //     axios
// //       .get(`http://localhost:8081/rest/criminals/id/${id}`)
// //       .then((response) => response.data)
// //       .then((data) => {
// //         this.setState({
// //           criminal: data,
// //         });
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //       });
// //   }

// //   handleInputChange = (event) => {
// //     const { name, value } = event.target;
// //     this.setState((prevState) => ({
// //       criminal: {
// //         ...prevState.criminal,
// //         [name]: value,
// //       },
// //     }));
// //   };
  

// //   updateCriminal = () => {
// //     const { id } = this.props.match.params;
// //     const { criminal } = this.state;
// //     this.props.updateCriminal(id, criminal);
// //     this.setState({ show: true }); // Set the show state to true to display the success message
// //     this.props.history.push("/criminal-list");
// //   };

// //   render() {
// //     const { criminal, show } = this.state;

// //     return (
// //       <div>
// //         <Card className="border border-dark bg-dark text-white">
// //           <Card.Header>Update Criminal</Card.Header>
// //           <Card.Body>
// //             <Form>
// //               <Form.Row>
// //                 <Form.Group as={Col} controlId="formCriminalName">
// //                   <Form.Label>Name</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="criminalName"
// //                     value={criminal.criminalName}
// //                     onChange={this.handleInputChange}
// //                   />
// //                 </Form.Group>
// //                 <Form.Group as={Col} controlId="formCriminalEthnicity">
// //                   <Form.Label>Ethnicity</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="criminalEthnicity"
// //                     value={criminal.criminalEthnicity}
// //                     onChange={this.handleInputChange}
// //                   />
// //                 </Form.Group>
// //               </Form.Row>
// //               <Form.Row>
// //                 <Form.Group as={Col} controlId="formCriminalDOB">
// //                   <Form.Label>Date of Birth</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="criminalDOB"
// //                     value={criminal.criminalDOB}
// //                     onChange={this.handleInputChange}
// //                   />
// //                 </Form.Group>
// //                 <Form.Group as={Col} controlId="formCriminalHeight">
// //                   <Form.Label>Height</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="criminalHeight"
// //                     value={criminal.criminalHeight}
// //                     onChange={this.handleInputChange}
// //                   />
// //                 </Form.Group>
// //               </Form.Row>
// //               <Form.Row>
// //               <Form.Group as={Col} controlId="formCriminalLocation">
// //               <Form.Label>Location</Form.Label>
// //               <Form.Control
// //                 type="text"
// //                 name="criminalLocation"
// //                 value={criminal.criminalLocation}
// //                 onChange={this.handleInputChange} 
// //               />
// //             </Form.Group>

// //                 <Form.Group as={Col} controlId="formAadharNumber">
// //                   <Form.Label>Aadhar Number</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="aadharNumber"
// //                     value={criminal.aadharNumber}
// //                     onChange={this.handleInputChange}
// //                   />
// //                 </Form.Group>
// //               </Form.Row>
// //               <Form.Group controlId="formCriminalGender">
// //                 <Form.Label>Gender</Form.Label>
// //                 <Form.Control
// //                   as="select"
// //                   name="criminalGender"
// //                   value={criminal.criminalGender}
// //                   onChange={this.handleInputChange}
// //                 >
// //                   <option value="Male">Male</option>
// //                   <option value="Female">Female</option>
// //                   <option value="Other">Other</option>
// //                 </Form.Control>
// //               </Form.Group>
// //             </Form>
// //           </Card.Body>
// //           <Card.Footer style={{ textAlign: "right" }}>
// //             <Button variant="primary" onClick={this.updateCriminal}>
// //               Update
// //             </Button>{" "}
// //             <Button variant="outline-danger"  onClick={() => this.props.history.push("/criminal-list")}>
// //             Cancel
// //           </Button>
// //           </Card.Footer>
// //         </Card>
// //         {show && <MyToast />} {
// //         /* Display the success message conditionally */}
// //       </div>
// //     );
// //   }
// // }

// // const mapDispatchToProps = (dispatch) => {
// //   return {
// //     updateCriminal: (id, criminal) => dispatch(updateCriminal(id, criminal)),
// //   };
// // };

// // export default connect(null, mapDispatchToProps)(UpdateCriminal);

// import React, { useState , useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { updateCriminal } from "../../services/index";
// import { useParams, useNavigate } from "react-router-dom";
// import { Form, Button, Card, Col } from "react-bootstrap";
// import { getCriminals } from "../../services/index";
// import MyToast from "../MyToast";
// import axios from "axios";

// const UpdateCriminal = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [criminal, setCriminal] = useState({
//     criminalName: "",
//     criminalEthnicity: "",
//     criminalDOB: "",
//     criminalHeight: "",
//     criminalLocation: "",
//     aadharNumber: "",
//     criminalGender: "",
//   });
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     // Fetch criminal data based on ID
//     axios
//       .get(`http://localhost:8081/rest/criminals/id/${id}`)
//       .then((response) => response.data)
//       .then((data) => {
//         setCriminal(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [id]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCriminal((prevCriminal) => ({
//       ...prevCriminal,
//       [name]: value,
//     }));
//   };

//   // const handleUpdateCriminal = () => {
//   //   dispatch(updateCriminal(id, criminal));
//   //   setShow(true);
//   //   navigate("/criminal-list");
//   // };
//   const handleUpdateCriminal = () => {
//     dispatch(updateCriminal(id, criminal))
//       .then(() => {
//         setShow(true);
//         navigate("/criminal-list");
//         dispatch(getCriminals()); // Dispatch the getCriminals action to update the criminal list
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
  

//   return (
//     <div>
//       <div style={{ display: show ? 'block' : 'none' }}>
//         <MyToast show={show} message="Criminal Updated Successfully." type="success" />
//       </div>
//       <Card className="border border-dark bg-dark text-white">
//         <Card.Header>Update Criminal</Card.Header>
//         <Card.Body>
//           <Form>
//             <Form.Row>
//               <Form.Group as={Col} controlId="formCriminalName">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="criminalName"
//                   value={criminal.criminalName}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//               <Form.Group as={Col} controlId="formCriminalEthnicity">
//                 <Form.Label>Ethnicity</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="criminalEthnicity"
//                   value={criminal.criminalEthnicity}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </Form.Row>
//             <Form.Row>
//               <Form.Group as={Col} controlId="formCriminalDOB">
//                 <Form.Label>Date of Birth</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="criminalDOB"
//                   value={criminal.criminalDOB}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//               <Form.Group as={Col} controlId="formCriminalHeight">
//                 <Form.Label>Height</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="criminalHeight"
//                   value={criminal.criminalHeight}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </Form.Row>
//             <Form.Row>
//               <Form.Group as={Col} controlId="formCriminalLocation">
//                 <Form.Label>Location</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="criminalLocation"
//                   value={criminal.criminalLocation}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//               <Form.Group as={Col} controlId="formAadharNumber">
//                 <Form.Label>Aadhar Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="aadharNumber"
//                   value={criminal.aadharNumber}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </Form.Row>
//             <Form.Group controlId="formCriminalGender">
//               <Form.Label>Gender</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="criminalGender"
//                 value={criminal.criminalGender}
//                 onChange={handleInputChange}
//               >
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </Form.Control>
//             </Form.Group>
//           </Form>
//         </Card.Body>
//         <Card.Footer style={{ textAlign: "right" }}>
//           <Button variant="primary" onClick={handleUpdateCriminal}>
//             Update
//           </Button>{" "}
//           <Button variant="outline-danger" onClick={() => navigate("/criminal-list")}>
//             Cancel
//           </Button>
//         </Card.Footer>
//       </Card>
//     </div>
//   );
// };

// export default UpdateCriminal;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCriminal } from "../../services/index";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Col } from "react-bootstrap";
import { getCriminals } from "../../services/index";
import MyToast from "../MyToast";
import axios from "axios";

const UpdateCriminal = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [criminal, setCriminal] = useState({
    criminalName: "",
    criminalEthnicity: "",
    criminalDOB: "",
    criminalHeight: "",
    criminalLocation: "",
    aadharNumber: "",
    criminalGender: "",
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Fetch criminal data based on ID
    axios
      .get(`http://localhost:8081/rest/criminals/id/${id}`)
      .then((response) => response.data)
      .then((data) => {
        setCriminal(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCriminal((prevCriminal) => ({
      ...prevCriminal,
      [name]: value,
    }));
  };

  const handleUpdateCriminal = () => {
    dispatch(updateCriminal(id, criminal))
      .then(() => {
        setShowToast(true);
        dispatch(getCriminals()); // Dispatch the getCriminals action to update the criminal list
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>Update Criminal</Card.Header>
        <Card.Body>
                  <Form>
             <Form.Row>
              <Form.Group as={Col} controlId="formCriminalName">
                 <Form.Label>Name</Form.Label>
                 <Form.Control
                  type="text"
                  name="criminalName"
                  value={criminal.criminalName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formCriminalEthnicity">
                <Form.Label>Ethnicity</Form.Label>
                <Form.Control
                  type="text"
                  name="criminalEthnicity"
                  value={criminal.criminalEthnicity}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formCriminalDOB">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="text"
                  name="criminalDOB"
                  value={criminal.criminalDOB}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formCriminalHeight">
                <Form.Label>Height</Form.Label>
                <Form.Control
                  type="text"
                  name="criminalHeight"
                  value={criminal.criminalHeight}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formCriminalLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="criminalLocation"
                  value={criminal.criminalLocation}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formAadharNumber">
                <Form.Label>Aadhar Number</Form.Label>
                <Form.Control
                  type="text"
                  name="aadharNumber"
                  value={criminal.aadharNumber}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="formCriminalGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="criminalGender"
                value={criminal.criminalGender}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer style={{ textAlign: "right" }}>
          <Button variant="primary" onClick={handleUpdateCriminal}>
            Update
          </Button>{" "}
          <Button
            variant="outline-danger"
            onClick={() => navigate("/criminal-list")}
          >
            Cancel
          </Button>
        </Card.Footer>
      </Card>
      {showToast && (
        <MyToast
          show={showToast}
          message="Criminal Updated Successfully."
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

export default UpdateCriminal;
