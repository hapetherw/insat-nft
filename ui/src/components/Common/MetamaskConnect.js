import React from "react";
import { Modal, Spinner } from "react-bootstrap";

const MetamaskConnect = ({ show, text }) => (
  <Modal className="progress-dialog" show={show}>
    <Modal.Body className="text-center bold pt-5 pb-5">
      <h3>You need to connect Metamask to make an offer</h3>
      <Button
        className="place-bid pink-button mt-4 mb-3"
        onClick={onPlaceBid}
      >
        Connect Metamask
      </Button>
    </Modal.Body>
  </Modal>
);

export default MetamaskConnect;
