import { useState } from "react";
import {
  HiChartPie,
  HiInformationCircle,
  HiSearch,
  HiShoppingBag,
  HiUsers,
  HiPuzzle,
  HiOutlineUserGroup,
  HiOutlineServer,
  HiOutlineGlobe,
  HiLibrary,
  HiOutlineFingerPrint,
  HiMenu,
} from "react-icons/hi";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import { Breadcrumb, Button, Checkbox, Label, Table } from "flowbite-react";

import type { FC, PropsWithChildren } from "react";

interface NavbarSidebarLayoutProps {
  isSidebar?: boolean;
  isNavbar?: boolean;
}

const ExampleSidebar: FC<PropsWithChildren<NavbarSidebarLayoutProps>> =
  function () {
    const [OpenModal, setOpenModal] = useState(false);
    return (
      <>
        <div className="xl:mt-[19rem]">
          {OpenModal == true ? <div className="fixed"> Hello </div> : null}

          <div
            className="fixed xl:ml-[1.3rem] cursor-pointer"
            onClick={() => setOpenModal(!OpenModal)}
          >

            <button
              title="Menu"
              className="fixed z-90 bottom-10 right-8 bg-blue-600 xl:w-14 xl:h-14 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300"
            >
             <Cog6ToothIcon className="xl:h-6 xl:w-6"/>
            </button>
          </div>
        </div>
      </>
    );
  };

export default ExampleSidebar;
