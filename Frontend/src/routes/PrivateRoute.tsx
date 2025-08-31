import { Navigate, Outlet } from "react-router-dom";
import {  type FC, type PropsWithChildren } from "react";
import Cookies from "js-cookie";

interface NavbarSidebarLayoutProps {
  isAuthenticated ?: any;
}

const PrivateRoute:  FC<PropsWithChildren<NavbarSidebarLayoutProps>> = ({ isAuthenticated }) => {
   const token = Cookies.get("token");
  
  return isAuthenticated == true  || token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
