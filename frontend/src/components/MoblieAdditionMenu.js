import React from 'react';

const MobileAdditionMenu = ({ email, handleSignout }) => {
  return (
    <>
      <div className="header__menu">
        <p className="header__email-mobile">{email}</p>
        <p className="header__text-mobile" onClick={handleSignout}>
          Log out
        </p>
      </div>
      <div className="header__boarder-line"></div>
    </>
  );
};
export default MobileAdditionMenu;
