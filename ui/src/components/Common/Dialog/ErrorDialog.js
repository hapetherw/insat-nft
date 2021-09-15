import React from "react";
import { Modal, Button } from "react-bootstrap";

const ErrorDialog = ({ show, text, handleClose }) => (
  <Modal className="error-dialog" show={show} onHide={handleClose}>
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body className="text-center bold pb-5">
        <img src={'/static/img/ops.png'} />
        <p className="mt-3">{text}</p>
        <Button className="pink-button" onClick={handleClose}>Return back</Button>
    </Modal.Body>
  </Modal>
);

export default ErrorDialog;
