import React from "react";
import { Toast } from "react-bootstrap";

const MyToast = (props) => {
  const toastCss = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    minWidth: "200px",
    maxWidth: "300px",
  };

  return (
    <div style={props.show ? toastCss : null}>
      <Toast
        className={`border text-white ${
          props.type === "success"
            ? "border-success bg-success"
            : "border-danger bg-danger"
        }`}
        show={props.show}
        autohide={true}
        delay={3000}
        onClose={props.onClose}
      >
        <Toast.Header
          className={`text-white ${
            props.type === "success" ? "bg-success" : "bg-danger"
          }`}
          closeButton={false}
        >
          <strong className="mr-auto"></strong>
        </Toast.Header>
        <Toast.Body>{props.message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default MyToast;
