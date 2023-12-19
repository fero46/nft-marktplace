import React, { Dispatch, SetStateAction, useState } from "react";
import clsx from "clsx";

interface ModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  image?: boolean;
}

const Modal: React.FC<ModalProps> = ({ show, setShow, image, children }) => {
  return (
    <div className={clsx("modal", show && "is-active")}>
      <div className="modal-background" onClick={() => setShow(false)}></div>
      <div className={clsx(image ? "image-overlay" : "modal-content")}>
        {image ? children : <div className="box">{children}</div>}
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => setShow(false)}
      ></button>
    </div>
  );
};

export default Modal;
