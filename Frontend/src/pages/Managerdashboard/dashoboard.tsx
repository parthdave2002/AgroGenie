import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { FC } from "react";


const ManagerDashboardPage: FC = function () {
    return(
        <>
            <NavbarSidebarLayout isSidebar={true} isNavbar={true} >
                <div className="dark:text-gray-400"> Hello Manager </div>
            </NavbarSidebarLayout>
        </>
    )
};

export default ManagerDashboardPage;