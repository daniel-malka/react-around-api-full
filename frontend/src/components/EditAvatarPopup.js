import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Change Profile Picture"
      name="avatar"
      buttonText="Save"
    >
      <div className="form__control form__control-avatar">
        <input
          type="url"
          className="fieldset__input fieldset__input_type_avatar"
          name="url"
          placeholder="link"
          required
          ref={inputRef}
        />
        <span id="avatar-link-error" className="popup__error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
