import React from "react";

function InfoPopup({ name, isOpen, onClose, children }) {
  return (
    <div
      className={`popup popup__container-${name} ${isOpen ? "popup_open" : ""}`}
    >
      <div className="popup__container">
        <span type="button" className="popup__close" onClick={onClose}></span>
        {children}
      </div>
    </div>
  );
}
export default InfoPopup;
