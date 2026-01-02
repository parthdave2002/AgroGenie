import type { FC, PropsWithChildren } from "react";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
// import { getMenuItemlist } from "../Store/actions";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";

interface NavbarSidebarLayoutProps {
  isAppbar?: boolean;
  isNavbar?: boolean;
}

const ExampleAppbar: FC<PropsWithChildren<NavbarSidebarLayoutProps>> =
  function ({ isAppbar, isNavbar }) {
    const dispatch = useDispatch();

    const solutions = [
      // {
      //   name: "Hopper",
      //   target: "/hopper",
      //   icon: ChartPieIcon,
      // },
      // {
      //   name: "Black List",
      //   target: "/blacklist",
      //   icon: CursorArrowRaysIcon,
      // },
      // {
      //   name: "Dailylog",
      //   target: "/dailylog",
      //   icon: FingerPrintIcon,
      // },
      
      {
        name: " Performance Report",
        target: "/agentPerformanceReport",
        icon: ArrowPathIcon,
      },
      {
        name: "Break Report",
        target: "/breakReport",
        icon: SquaresPlusIcon,
      },
      {
        name: "Agent Report",
        target: "/agentReport",
        icon: FingerPrintIcon,
      },

    ];

    return (
      <div>
        {isAppbar == true ? (
          <Popover className="relative">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              <button
                type="button"
                data-dropdown-toggle="apps-dropdown"
                className="p-2 text-gray-500 rounded-lg hover: hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">View notifications</span>

                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
              </button>
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute  z-10 mt-5 flex w-screen max-w-max -translate-x-3/4 px-4">
                <div className=" flex-auto overflow-hidden rounded-3xl bg-white  dark:bg-black text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                  <div className=" grid grid-cols-3">
                    {solutions && solutions.map((item:any) => (
                      <div
                        key={item.name}
                        className="group relative  rounded-lg p-2 hover:text-indigo-600"
                      >
                        <Link to={item.target}>
                          <div className="mt-1 flex h-11 flex-none items-center justify-center rounded-lg bg-gray-50  dark:bg-black  ">
                            <item.icon
                              className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="text-center lg:max-w-[6rem]  dark:text-gray-200  dark:hover:text-white">
                            {item.name}
                            <span className="absolute inset-0" />
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        ) : null}
      </div>
    );
  };

export default ExampleAppbar;
