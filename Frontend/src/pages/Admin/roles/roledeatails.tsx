
import { lazy, type FC } from "react";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));

const RoleDetailsPage: FC = function () {

  let Name = "Role Details";
  let ParentName = "Role List";
  let ParentLink = "/roles/list";

  return (
    <>
      <NavbarSidebarLayout   isSidebar={true} isNavbar={true} >
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
        <div className="dark:text-WhiteMarble"> Role Details Page </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default RoleDetailsPage;