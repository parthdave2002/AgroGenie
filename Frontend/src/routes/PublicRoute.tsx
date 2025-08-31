import React from 'react';
import { Route, Navigate, } from 'react-router-dom';

interface PublicRouteProps{
  isAuthenticated: boolean; 
  restricted: boolean; 
  redirectPath: string; 
  element: React.ReactElement; 
  path: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  isAuthenticated,
  restricted,
  redirectPath,
  element,
  path,
  ...rest
}) => {
  if (isAuthenticated && restricted) {
    return <Navigate to={redirectPath} />;
  }

  return <Route {...rest} element={element} />;
};

export default PublicRoute;
