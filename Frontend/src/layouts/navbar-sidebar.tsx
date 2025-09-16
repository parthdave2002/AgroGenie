import type { FC, PropsWithChildren } from "react";
import Navbar from "../components/common/header/navbar";
import Sidebar from "../components/common/sidebar/sidebar";
interface NavbarSidebarLayoutProps {
  isSidebar?: boolean;
  isNavbar?: boolean;
}

const NavbarSidebarLayout: FC<PropsWithChildren<NavbarSidebarLayoutProps>> =
  function ({ children, isSidebar = true, isNavbar = true,}) {
    return (
      <>
          {isNavbar == true ? <Navbar isNavbar={isNavbar} /> :  null}
          <div className="flex">
              {isSidebar == true ?  <Sidebar  /> : null}
              <main  className="relative h-full w-full overflow-y-auto lg:ml-64 bg-Cultured dark:bg-gray-900 px-4 pt-6 "  > {children}</main>
          </div>
      </>
    );
  };

export default NavbarSidebarLayout;
