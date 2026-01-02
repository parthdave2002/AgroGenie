import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
const Header = lazy(() => import("../component/Header/Header"));
const Footer = lazy(() => import("../component/Footer/footer"));
const HelpDesk = lazy(() => import("../component/HelpDesk/HelpDesk"));

const Layout: React.FC = () => {
  return (
    <>

      <Header />
      <HelpDesk />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;