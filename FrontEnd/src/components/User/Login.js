import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faEnvelope,
  faLock,
  faUndo,
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import { authenticateUser, logoutUser } from "../../services/index";
import MyToast from "../MyToast";

function Login(props) {
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { onRoleUpdate } = props;

  const initialState = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);

  const credentialChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateUser = () => {
    dispatch(authenticateUser(user.email, user.password))
      .then((response) => {
        setToastMessage("Login successful!");
        setShowToast(true);
        resetLoginForm();
        
        const domain = extractDomainFromEmail(user.email);
        const role = getRoleFromDomain(domain);

        // Update the role state
        onRoleUpdate(role);
        // Store the role in local storage
        localStorage.setItem("userRole", role);
        if (role === "CID") {
          navigate("/home");
        } else if (role === "Investigator") {
          navigate("/home");
        } else {
          navigate("/home");
        }
        
      })
      .catch((error) => {
        console.log(error.message);
        resetLoginForm();
        setToastMessage("Invalid email and password");
        setShowToast(true);
      });
  };

  const extractDomainFromEmail = (email) => {
    const parts = email.split("@");
    if (parts.length === 2) {
      return parts[1].toLowerCase();
    }
    return "";
  };

  const getRoleFromDomain = (domain) => {
    if (domain === "crimeshield.com") {
      return "CID";
    } else if (domain === "investigator.com") {
      return "Investigator";
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser())
      .then((response) => {
        localStorage.setItem("userRole", "");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userRole", "");
        navigate("/welcome");
      });
  };

  const resetLoginForm = () => {
    setUser(initialState);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  return (
    <div className="login-container">
    <div className="bg-image">
    <Row className="justify-content-md-center">
      <Col xs={5}>
        {showToast && error && (
          <MyToast
            show={showToast}
            message={toastMessage}
            type="danger"
            onClose={() => setShowToast(false)}
          />
        )}
        {showToast && !error && (
          <MyToast
            show={showToast}
            message={toastMessage}
            type="danger"
            onClose={() => setShowToast(false)}
          />
        )}

        {show && props.message && (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            {props.message}
          </Alert>
        )}
        {show && error && (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            {error}
          </Alert>
        )}
        <Card className={"border border-dark bg-dark text-white login-card"}>
          <Card.Header>
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Card.Header>
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={credentialChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Email Address"
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    autoComplete="off"
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={user.password}
                    onChange={credentialChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Password"
                  />
                  <InputGroup.Append>
                    <InputGroup.Text
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon
                        icon={passwordVisible ? faEyeSlash : faEye}
                      />
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Form.Row>
          </Card.Body>
          <Card.Footer style={{ textAlign: "right" }}>
            {isLoggedIn ? (
              <Button
                size="sm"
                type="button"
                variant="danger"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faSignInAlt} /> Logout
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  type="button"
                  variant="success"
                  onClick={validateUser}
                  disabled={
                    user.email.length === 0 || user.password.length === 0
                  }
                >
                  <FontAwesomeIcon icon={faSignInAlt} /> Login
                </Button>{" "}
                <Button
                  size="sm"
                  type="button"
                  variant="info"
                  onClick={resetLoginForm}
                  disabled={
                    user.email.length === 0 && user.password.length === 0
                  }
                >
                  <FontAwesomeIcon icon={faUndo} /> Reset
                </Button>
              </>
            )}
          </Card.Footer>
        </Card>
      </Col>
    </Row>
    </div>
    </div>
  );
}

export default Login;

