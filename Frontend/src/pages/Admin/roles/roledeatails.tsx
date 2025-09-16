
import type { FC } from "react";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import ExampleBreadcrumb from "../../../components/common/breadcrumb/breadcrumb";

const RoleDetailsPage: FC = function () {

  let Name = "Role Details";
  let ParentName = "Role List";
  let ParentLink = "/roles/list";

  return (
    <>
      <NavbarSidebarLayout   isSidebar={true} isNavbar={true} >
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
        <div className="dark:text-gray-200"> Role Details Page </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default RoleDetailsPage;