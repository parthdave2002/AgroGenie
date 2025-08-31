import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { FC } from "react";


const ManagerDashboardPage: FC = function () {
    return(
        <>
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <div className="dark:text-gray-400"> Hello Manager </div>
            </NavbarSidebarLayout>
        </>
    )
};

export default ManagerDashboardPage;