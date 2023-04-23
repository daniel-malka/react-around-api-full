import React, { useState, useEffect } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Edit profile"
      name="edit-profile"
      buttonText="Save"
    >
      <fieldset className="fieldset">
        <div className="fieldset__container">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={name || ""}
            className="fieldset__input fieldset__input_type_name"
            minLength={2}
            maxLength={40}
            required
            onChange={handleNameChange}
          />
          <span className="fieldset__error-message fieldset__error-type-name" />
        </div>
        <div className="fieldset__container">
          <input
            type="text"
            id="about"
            name="about"
            placeholder="about"
            value={about || ""}
            className="fieldset__input fieldset__input_type_about"
            minLength={2}
            maxLength={200}
            required
            onChange={handleAboutChange}
          />
          <span className="fieldset__error-message fieldset__error-type-about" />
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
