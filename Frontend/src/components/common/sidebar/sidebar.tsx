import React, { useEffect, useState } from "react";
import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiShoppingBag, HiCube, HiPuzzle, HiUsers, HiChartPie, HiLibrary } from "react-icons/hi";
import { FaAddressBook, FaClipboardList, FaWarehouse, FaUserTag, FaTasks  } from "react-icons/fa";
import {  MdComputer, MdLeaderboard, MdRateReview } from "react-icons/md"; 
import { TbReportSearch } from "react-icons/tb";
import { GiTwoCoins, GiWheat } from "react-icons/gi";
import { FaUser, FaTags  } from "react-icons/fa";
import { FaMoneyBillWave, FaBoxOpen } from "react-icons/fa";
import { BsCloudArrowUpFill, BsBuilding } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import type { FC, PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { IoIosSettings } from "react-icons/io";

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

  const user = Cookies.get("userType");
  useEffect(() => {
    if (user == "subadmin" && permissionsdata) {
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
      to: "/warehouse/list",
    },
    {
      name: "Advisor",
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
      icon: FaMoneyBillWave,
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
    {
      name: "Packing",
      icon:  FaMoneyBillWave,
      to: "/packing/list",
    },
    {
      name: "Company",
      icon:  BsBuilding,
      to: "/company/list",
    },
    {
      name: "Category",
      icon:  BiCategoryAlt,
      to: "/category/list",
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
      icon:  FaMoneyBillWave,
      to: "/coupon/list",
    },
  ]

  const WebsiteMenu = [
    {
      name: "Banner",
      icon:  BsCloudArrowUpFill ,
      to: "/banner/list",
    },

     {
      name: "Testimonial",
      icon:  MdRateReview,
      to: "/testimonial/list",
    },
  ]

  const SubSettingMenu = [
    {
      name: "Advisor Leave",
      icon: FaAddressBook,
      to: "/leave/list",
    },
    {
      name: "Notice Board",
      icon: FaClipboardList,
      to: "/notice-board/list",
    },
    {
      name: "Advisor Category",
      icon:  FaUserTag,
      to: "/users/category/list",
    },
    {
      name: "Wallet Rules",
      icon: GiTwoCoins,
      to: "/wallet-rules/list",
    },
    {
      name: "Task Management",
      icon:  FaTasks,
      to: "/kanban",
    },
    {
      name: "Leave Management",
      icon: FaAddressBook,
      to: "/leave/management/list",
    },
    {
      name: "Advisor Report",
      icon:  FaTasks,
      to: "/kanban",
    },
  ]

  const filteredSidebarData = user === "superadmin" ? SidebarData : SidebarData.filter((item:any) => AccessList.includes(item.name));
  const filteredSubMasterMenu = user === "superadmin" ? SubMasterMenu : SubMasterMenu.filter((item:any) => AccessList.includes(item.name));
  const filteredSubSettingMenu = user === "superadmin" ? SubSettingMenu : SubSettingMenu.filter((item:any) => AccessList.includes(item.name));
  const filteredWebsiteMenu = user === "superadmin" ? WebsiteMenu : WebsiteMenu.filter((item:any) => AccessList.includes(item.name));

  return (
    <div className="hidden lg:block">
        <div className="bg-TitaniumWhite dark:bg-Cosmos p-3 rounded-r-xl text-Cosmos"> 
          <Sidebar className="bg-Hydrocarbon dark:bg-Cosmos text-Cosmos w-[15rem] ">
            <SidebarItems className="pb-[6rem]">
              <SidebarItemGroup className="p-0 border-0">
                {filteredSidebarData.map((item, k) => (
                  <NavLink to={item.to} key={k}>
                    <SidebarItem icon={item.icon}  className={item.to === currentPage ? "dark:bg-TranquilBlack" : ""} >  {item.name} </SidebarItem>
                  </NavLink>
                ))}
              </SidebarItemGroup> 

              {filteredSubMasterMenu.length > 0 &&
                <SidebarItemGroup>
                  <h4 className="dark:text-SilverSteel"> Master:</h4>
                  <SidebarCollapse icon={HiShoppingBag} label="Master">
                    {filteredSubMasterMenu.map((item, k) => (
                      <NavLink to={item.to} key={k}>
                        <SidebarItem icon={item.icon} className={item.to === currentPage ? "dark:bg-TranquilBlack" : ""} >  {item.name} </SidebarItem>
                      </NavLink>
                    ))}
                  </SidebarCollapse>
                  <SidebarCollapse icon={MdComputer} label="Manage Website">
                    {filteredWebsiteMenu.map((item, k) => (
                      <NavLink to={item.to} key={k}>
                        <SidebarItem icon={item.icon} className={item.to === currentPage ? "dark:bg-TranquilBlack" : ""} >  {item.name} </SidebarItem>
                      </NavLink>
                    ))}
                  </SidebarCollapse>
                   <SidebarCollapse icon={IoIosSettings} label="Setting">
                    {filteredSubSettingMenu.map((item, k) => (
                      <NavLink to={item.to} key={k}>
                        <SidebarItem icon={item.icon} className={item.to === currentPage ? "dark:bg-TranquilBlack" : ""} >  {item.name} </SidebarItem>
                      </NavLink>
                    ))}
                  </SidebarCollapse>
                </SidebarItemGroup>
              }
          
            </SidebarItems>
          </Sidebar>
          </div>
    </div>
  );
};

export default LeftSidebar;