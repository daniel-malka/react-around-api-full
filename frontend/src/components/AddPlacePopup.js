import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onSubmit, onClose, owner }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name,
      link,
      owner,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="New place"
      name="add-place"
      buttonText="Create"
    >
      <div className="fieldset__container">
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleNameChange}
          placeholder="Title"
          className="fieldset__input fieldset__input_type-title"
          minLength={1}
          value={name || ""}
          maxLength={30}
          required
        />
        <span className="fieldset__error-message fieldset__error-type-title" />
      </div>
      <div className="fieldset__container">
        <input
          type="link"
          id="link"
          name="link"
          onChange={handleLinkChange}
          placeholder="Link"
          value={link || ""}
          className="fieldset__input fieldset__input_type_link"
          required
        />
        <span className="fieldset__error-message fieldset__error-type-link" />
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
