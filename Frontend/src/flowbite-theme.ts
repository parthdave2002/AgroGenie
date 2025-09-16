import type { CustomFlowbiteTheme } from "flowbite-react";

const flowbiteTheme: CustomFlowbiteTheme = {
  navbar: {
    base: "fixed z-30 w-full bg-orange-200  border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700",
  },
  sidebar: {
    base: "flex fixed left-0 z-20 flex-col flex-shrink-0  bg-Gainsboro h-full duration-75 border-r border-gray-200 lg:flex transition-width dark:bg-gray-800 dark:border-gray-700",
  },
  textarea: {
    base: "block w-full text-sm p-4 rounded-lg border disabled:cursor-not-allowed disabled:opacity-50",
  },
};

export default flowbiteTheme;
