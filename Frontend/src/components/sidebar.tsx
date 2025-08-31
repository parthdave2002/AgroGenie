import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiShoppingBag, HiCube, HiPuzzle, HiUsers, HiChartPie, HiLibrary } from "react-icons/hi";
import { FaWarehouse } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md"; 
import { TbReportSearch } from "react-icons/tb";
import { GiWheat } from "react-icons/gi";
import { FaUser, FaTags  } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { BsCloudArrowUpFill, BsBuildingsFill } from "react-icons/bs";
import { BiCategoryAlt, BiSolidCoupon } from "react-icons/bi";
import type { FC, PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

interface NavbarSidebarLayoutProps {
  isSidebar?: boolean;
  isNavbar?: boolean;
}

const LeftSidebar: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = function () {
  const [currentPage, setCurrentPage] = useState("");
  useEffect(() => {
    const newPage = window.location.pathname;
    setCurrentPage(newPage);
  }, []);

  const [AccessList, setAccessList] = useState<string[]>([]);
  const  permissionsdata = useSelector((state: any) =>  state.Login.permissionsdata );

  const user = Cookies.get("role");
  useEffect(() => {
    if (user !== "67b388a7d593423df0e24295" && permissionsdata) {
      const userPermissions = permissionsdata.filter((item: any) => item.permissions.view === true).map((item: any) => item.module_name);
      setAccessList(userPermissions);
    } else {
      setAccessList([]); 
    }
  }, [permissionsdata, user]);

  // Updated to use actual icon components
  const SidebarData = [
    {
      name: "Dashboard",
      icon: HiChartPie, // Reference the actual icon component
      to: "/dashboard",
    },
     {
      name: "Warehouse",
      icon: FaWarehouse, // Reference the actual icon component
      to: "/warehouse",
    },
    {
      name: "User",
      icon: HiUsers,
      to: "/users/list",
    },
    {
      name: "Roles",
      icon: HiPuzzle,
      to: "/roles/list",
    },
    {
      name: "Customer",
      icon: FaUser,
      to: "/customer/list",
    },
    {
      name: "Product",
      icon: HiLibrary,
      to: "/product/list",
    },
    {
      name: "Order",
      icon: FaSackDollar,
      to: "/order/list",
    },
    {
      name: "Lead",
      icon: TbReportSearch,
      to: "/lead/list",
    },
    {
      name: "Report",
      icon: MdLeaderboard,
      to: "/report",
    },
  ];

  const SubMasterMenu = [
    {
      name: "Packing Type",
      icon:   HiCube,
      to: "/packing-type/list",
    },
    // {
    //   name: "Packing",
    //   icon:  LuPackageOpen,
    //   to: "/packing/list",
    // },
    {
      name: "Company",
      icon:  BsBuildingsFill,
      to: "/company/list",
    },
    {
      name: "Category",
      icon:  BiCategoryAlt,
      to: "/category/list",
    },
    {
      name: "Banner",
      icon:  BsCloudArrowUpFill ,
      to: "/banner/list",
    },
    {
      name: "Taglog",
      icon:  FaTags,
      to: "/taglog/list",
    },
    {
      name: "Crop",
      icon:  GiWheat,
      to: "/crop/list",
    },
    {
      name: "Coupon",
      icon:  BiSolidCoupon,
      to: "/coupon/list",
    },
  ]

  const filteredSidebarData = user === "67b388a7d593423df0e24295" ? SidebarData : SidebarData.filter((item:any) => AccessList.includes(item.name));
  const filteredSubMasterMenu = user === "67b388a7d593423df0e24295" ? SubMasterMenu : SubMasterMenu.filter((item:any) => AccessList.includes(item.name));

  return (
    <div className="hidden lg:block">
      <Sidebar>
        <Sidebar.Items className="pb-[6rem]">
          <Sidebar.ItemGroup>
            {filteredSidebarData.map((item, k) => (
              <NavLink to={item.to} key={k}>
                <Sidebar.Item icon={item.icon}  className={item.to === currentPage ? "dark:bg-gray-700" : ""} >  {item.name} </Sidebar.Item>
              </NavLink>
            ))}
          </Sidebar.ItemGroup>

          {filteredSubMasterMenu.length > 0 &&
            <Sidebar.ItemGroup>
              <h4 className="dark:text-gray-400"> Master:</h4>
              <Sidebar.Collapse icon={HiShoppingBag} label="Master">
                {filteredSubMasterMenu.map((item, k) => (
                  <NavLink to={item.to} key={k}>
                    <Sidebar.Item icon={item.icon} className={item.to === currentPage ? "dark:bg-gray-700" : ""} >  {item.name} </Sidebar.Item>
                  </NavLink>
                ))}
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
          }
         
          
          {/* <Sidebar.ItemGroup>
            <h4 className={"dark:text-white"}>Design View only:</h4>
            <NavLink to="/e-commerce/products">
              <Sidebar.Item
                icon={HiShoppingBag}
                className={
                  "/e-commerce/products" === currentPage ? "dark:bg-gray-700" : ""
                }
              >
                Products
              </Sidebar.Item>
            </NavLink>
          </Sidebar.ItemGroup> */}
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default LeftSidebar;
