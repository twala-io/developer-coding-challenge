import React from "react";
import "../assets/Modal.css";

function Modal({
  setOpenModal,
  modalMessage,
  actionButton,
  hasYesNoButton,
  buttonValue,
}) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="body">{modalMessage}</div>
        <div className="footer">
          {hasYesNoButton ? (
            <>
              <button
                id="cancelBtn"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                No
              </button>
              <button
                onClick={() => {
                  actionButton();
                }}
              >
                Yes
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                actionButton();
              }}
            >
              {buttonValue ? buttonValue : "OK"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
