import React, { useEffect } from 'react';
import successIcon from '../images/success-icon.svg';
import falureIcon from '../images/faliure-icon.svg';
import InfoPopup from './InfoPopup';

const InfoTooltip = ({ isOpen, onClose, bool }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <InfoPopup isOpen={isOpen} name="tooltip" onClose={onClose}>
      <img
        src={bool ? successIcon : falureIcon}
        className="tooltip__image"
        alt={`${bool ? 'sign in success icon' : 'sign in faliure icon'}`}
      />
      <h2 className="tooltip__text">
        {bool
          ? 'Success! You have now been registered.'
          : 'Oops, something went wrong! Please try again.'}
      </h2>
    </InfoPopup>
  );
};
export default InfoTooltip;
