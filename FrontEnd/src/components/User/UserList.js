import React, { useEffect , useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../../services/index";
import { Card, Table, Alert, ButtonGroup, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faTrash } from "@fortawesome/free-solid-svg-icons";

const UserList = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const { users, error } = userData;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      dispatch(deleteUser(selectedUser.id));
      setShowConfirmation(false);
    }
  };

  return (
    <div>
      {error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faUsers} /> User List
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Mobile No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length === 0 ? (
                  <tr align="center">
                    <td colSpan="5">No Users Available</td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.name}</td>
                      <td>{user.mobile}</td>
                      <td>
                        <ButtonGroup>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleDeleteUser(user)}
                          >
                            Delete
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the user with the following details?
          <br />
          ID: {selectedUser && selectedUser.id}
          <br />
          Name: {selectedUser && selectedUser.name}
          <br />
          Mobile: {selectedUser && selectedUser.mobile}
          <br />
          Email: {selectedUser && selectedUser.email}
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
