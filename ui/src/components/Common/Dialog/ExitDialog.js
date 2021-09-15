import React from "react";
import { Modal, Button } from "react-bootstrap";

const ExitDialog = ({ show, handleClose,logOut }) => (
  <Modal className="exit-dialog" show={show} onHide={handleClose}>
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body className="text-center bold pb-5">
        <img src={'/static/img/exit-door.png'} />
        <p className="mt-4 mb-5">Are you sure want to logout?</p>
        <Button className="pink-button" onClick={logOut}>Logout</Button>
        <p className="text-center mt-3 cancel" onClick={handleClose}>Cancel</p>
    </Modal.Body>
  </Modal>
);

export default ExitDialog;
