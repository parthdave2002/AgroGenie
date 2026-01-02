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
import FlotingMenu from "../components/flotingmenu";

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
            <Card className="flex h-full min-w-0 left-0 z-9 flex-col flex-shrink-0 pt-16 xl:max-h-[27rem] duration-75 bg-Gainsboro dark:bg-black sticky" >

              <List>

                <Link to="/dialer"> <ListItem title="User" className="dark:hover:bg-white-600 dark:text-gray-200  dark:hover:text-indigo-600"> <UserCircleIcon className="h-5 w-5" /> </ListItem> </Link>

                <Link to="/planner">
                  <ListItem title="Shopping Bag" className="dark:hover:bg-white-600 dark:text-gray-200  dark:hover:text-indigo-600" >
                      <ShoppingBagIcon className="h-5 w-5" />
                  </ListItem>
                </Link>

                <ListItem className="dark:hover:bg-white-600 dark:text-gray-200  dark:hover:text-indigo-600">
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                </ListItem>

                <hr className="my-2 border-blue-gray-50" />

                <ListItem className="dark:hover:bg-white-600 dark:text-gray-200  dark:hover:text-indigo-600">
                  <ListItemPrefix>
                    <InboxIcon className="h-5 w-5" />
                  </ListItemPrefix>
                </ListItem>

                <ListItem className="dark:hover:bg-white-600 dark:text-gray-200  dark:hover:text-indigo-600">
                  <ListItemPrefix>
                    <Cog6ToothIcon className="h-5 w-5" />
                  </ListItemPrefix>
                </ListItem>

                <ListItem className="dark:hover:bg-white-600 dark:text-gray-200  dark:hover:text-indigo-600">
                  <ListItemPrefix>
                    <PowerIcon className="h-5 w-5" />
                  </ListItemPrefix>
                </ListItem>
              </List>
            </Card>

            <FlotingMenu />
           
          </div>
        ) : (
          null
        )}
      </>
    );
  };

export default ExampleRightSidebar;
