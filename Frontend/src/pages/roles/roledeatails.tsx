import { Button,  Checkbox, Table} from "flowbite-react";
import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserlist  } from "../../Store/actions";
import { lazy, useEffect, useState, Suspense  } from "react";
import ExampleBreadcrumb from "../../components/breadcrumb";

const RoleDetailsPage: FC = function () {

  let Name = "Role Details";
  let ParentName = "Role List";
  let ParentLink = "/roles/list";

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
        <div className="dark:text-gray-200"> Role Details Page </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default RoleDetailsPage;