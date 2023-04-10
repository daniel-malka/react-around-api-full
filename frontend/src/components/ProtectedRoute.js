import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  isLoggedIn,
  children,
  isCheckingToken,
  ...props
}) => {
  return isLoggedIn ? (
    <Route {...props}>{children}</Route>
  ) : (
    <Redirect to="/signin" />
  );
};

export default ProtectedRoute;
