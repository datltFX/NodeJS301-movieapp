import React from "react";
import YouTube from "react-youtube";
import { CloseButton, Modal, ModalBody, ModalHeader } from "reactstrap";

const Modals = ({ isOpen, hide, isKey }) => {
  const closeBtn = <CloseButton onClick={hide} variant="white" />;

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  //render
  return (
    <div>
      <Modal isOpen={isOpen} toggle={hide} size="lg">
        <ModalHeader
          style={{ border: "none", backgroundColor: "black" }}
          toggle={hide}
          close={closeBtn}
        />
        <ModalBody style={{ backgroundColor: "black" }}>
          <YouTube videoId={isKey} opts={opts} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Modals;
