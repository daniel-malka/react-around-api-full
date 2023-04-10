import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopupForm({ isOpen, onSubmit, onClose }) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={onSubmit}
      onClose={onClose}
      title="Are you sure?"
      name="delete"
      buttonText="Yes"
    />
  );
}

export default DeletePopupForm;
