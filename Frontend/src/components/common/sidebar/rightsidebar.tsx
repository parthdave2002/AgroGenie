import type { FC, PropsWithChildren } from "react";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";

import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
// import FlotingMenu from "../components/flotingmenu";

interface NavbarSidebarLayoutProps {
  isRightSidebar?: boolean;
  isNavbar?: boolean;
}

const ExampleRightSidebar: FC<PropsWithChildren<NavbarSidebarLayoutProps>> =
  function ({ isRightSidebar }) {
    
    return (
      <>
        {isRightSidebar == true ? (
          <div className="hidden" >
            <div> Right sidebar  </div>

            {/* <FlotingMenu /> */}
           
          </div>
        ) : (
          null
        )}
      </>
    );
  };

export default ExampleRightSidebar;
