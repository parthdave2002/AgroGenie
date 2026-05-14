import { FC, lazy, useEffect, useState } from "react";
import LoaderPage from "../../../components/common/loader/loader";
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));
const KanbanBoard = lazy(() => import("../../../components/kanban/kanbanList"));

const CustomerListPage : FC = function () {
   
    const [loader, setLoader] = useState(false);
    let Name = "Kanban Board";

    return (
        <>  
          <NavbarSidebarLayout isSidebar={true} isNavbar={true} >
            {loader ? <LoaderPage /> :
              <div className="space-y-6">
                <ExampleBreadcrumb Name={Name}  />
                <KanbanBoard />
              </div>
            }
          </NavbarSidebarLayout>
          <ToastMessage />
        </>
    );
}

export default CustomerListPage;