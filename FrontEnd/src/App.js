import React,{useState,useEffect } from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Criminal from "./components/Criminal/Criminal";
import UpdateCriminal from "./components/Criminal/UpdateCriminal";
import CriminalList from "./components/Criminal/CriminalList";
import UserList from "./components/User/UserList";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Footer from "./components/Footer";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import UnauthorizedPage from "./components/UnauthorizedPage";
import DeleteCriminal from "./components/Criminal/DeleteCriminal";
import Court from "./components/Court/Court";
import CourtList from "./components/Court/CourtList";
import UpdateCourt from "./components/Court/UpdateCourt";
import DeleteCourt from "./components/Court/DeleteCourt";
import Fir from "./components/Fir/Fir";
import FIRList from "./components/Fir/FirList";
import  updateFIR  from "./components/Fir/UpdateFIR";
import PdfGenerator from "./components/PdfGenerator";

function App() {

  const [userRole, setRole] = useState(localStorage.getItem("userRole")); // Adding the role state from login.js componenet

  const handleRoleUpdate = (newRole) => {
    setRole(newRole); //handling and updating the role based on login/logout
  };

 

  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} className={"margin-top"}>
            <Routes>
              <Route path="/" element={<Welcome/>} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              <Route path="/login" element={<Login onRoleUpdate={handleRoleUpdate} />} />
              <Route path="/home" element={<PrivateRoute element={Home} allowedRoles={['CID','Investigator']} userRole={userRole} />} />
              <Route path="/criminal" element={<PrivateRoute element={Criminal} allowedRoles={['CID']} userRole={userRole} />} />
              <Route path="/court" element={<PrivateRoute element={Court} allowedRoles={['CID']} userRole={userRole} />} />
              <Route path="/court-list" element={<PrivateRoute element={CourtList} allowedRoles={['CID','Investigator']} userRole={userRole} />} />
              <Route path="/update-court/:id" element={<PrivateRoute element={UpdateCourt} allowedRoles={['CID']} userRole={userRole} />} />
              <Route path="/delete-court/:id" element={<PrivateRoute element={DeleteCourt} allowedRoles={['CID']} userRole={userRole} />} />
              <Route path="/criminal-list" element={<PrivateRoute element={CriminalList} allowedRoles={['CID','Investigator']} userRole={userRole} />} />
              <Route path="/update-criminal/:id" element={<PrivateRoute element={UpdateCriminal} allowedRoles={['CID']} userRole={userRole} />} />
              <Route path="/delete-criminal/:id" element={<PrivateRoute element={DeleteCriminal} allowedRoles={['CID']} userRole={userRole} />} />
              <Route path="/users-list" element={<PrivateRoute element={UserList} allowedRoles={['CID']} userRole={userRole} />} />
              <Route path="/fir" element={<PrivateRoute element={Fir} allowedRoles={['CID']} userRole={userRole} />} />
              <Route path="/fir-list" element={<PrivateRoute element={FIRList} allowedRoles={['CID','Investigator']} userRole={userRole} />} />
              <Route path="/update-fir/:id" element={<PrivateRoute element={updateFIR} allowedRoles={['CID']} userRole={userRole} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Welcome/>}/>
              
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
};


export default App;
