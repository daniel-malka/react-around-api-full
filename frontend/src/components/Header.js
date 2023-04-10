import { useEffect, useState } from 'react';
import logo from '../images/top__logo.svg';
import hamburger_icon from '../images/hamburger_icon.svg';
import closeX from '../images/close-X.svg';
import MobileAdditionMenu from './MoblieAdditionMenu';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ isLoggedIn, email, handleSignout }) => {
  const [isMobileHeaderOpen, setIsMobileHeaderOpen] = useState(false);
  const location = useLocation();

  const handleMenuButton = () => {
    setIsMobileHeaderOpen(!isMobileHeaderOpen);
  };
  const handleSignOutButton = () => {
    handleSignout();
    setIsMobileHeaderOpen(false);
  };
  return (
    <>
      {isLoggedIn && isMobileHeaderOpen ? (
        <MobileAdditionMenu email={email} handleSignout={handleSignout} />
      ) : (
        ''
      )}

      <header className="header">
        <img src={logo} alt="AROUND the us logo" className="header__logo" />

        {isLoggedIn ? (
          <img
            className="header__mobile-menu-button"
            onClick={handleMenuButton}
            src={isMobileHeaderOpen ? closeX : hamburger_icon}
            alt={
              isMobileHeaderOpen
                ? 'mobile menu close button'
                : 'open menu button'
            }
          />
        ) : (
          ''
        )}

        {isLoggedIn ? (
          <div className="header__container header__container-mobile">
            <p className="header__email">{email}</p>
            <p className="header__text" onClick={handleSignOutButton}>
              Log out
            </p>
          </div>
        ) : (
          <div className="header__container ">
            <Link
              className="header__redirect-text"
              to={location.pathname === '/signin' ? 'signup' : 'signin'}
            >
              {location.pathname === '/signin' ? 'signup' : 'signin'}
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
