import React from "react";
import { Modal, Spinner } from "react-bootstrap";

const Progress = ({ show, text }) => (
  <Modal className="progress-dialog" show={show}  onHide={()=>{}}>
    <Modal.Body className="text-center bold pt-5 pb-5">
        <Spinner animation="border" />
        <p className="mt-3">{text}</p>
    </Modal.Body>
  </Modal>
);

export default Progress;
