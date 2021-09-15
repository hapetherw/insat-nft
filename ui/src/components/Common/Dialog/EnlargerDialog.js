import React from "react";
import { Modal, Button } from "react-bootstrap";

const EnlargerDialog = ({ show, type, src, ratio, handleClose }) => (
  <Modal className="enlarger-dialog" show={show} onHide={handleClose} onClick={()=>handleClose()}>
    <Modal.Body className="text-center">
      <div className={ratio>1? 'height-oriented': 'width-oriented'}>
        {type == "video" ? (
          <video autoPlay muted controls>
            <source src={src ? src : ""} type="video/mp4" />
          </video>
        ) : (
          <img src={src ? src : ""} />
        )}
      </div>
    </Modal.Body>
  </Modal>
);

export default EnlargerDialog;
