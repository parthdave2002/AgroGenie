import type { FC ,PropsWithChildren } from "react";
import {  HiChevronLeft, HiChevronRight} from "react-icons/hi";

interface NavbarSidebarLayoutProps {
  PageData?: any;
  PageNo?: any;
  CurrentPageNo?: any;
  TotalListData ?: any;
}

const SmallPagination: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = function ({ PageData, PageNo, CurrentPageNo, TotalListData}) {
  const totalPages = TotalListData  ? Math.ceil(TotalListData / 5) : 1;
  
  const NextButtoncalll = () => {
    PageData(PageNo + 1);
  };

  const PreviouesButtonCall = () => {
    PageData(PageNo - 1);
  };

  return (
    <>
        <div className="sticky right-0 bottom-0 w-full items-center border-t border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800 md:flex md:justify-between ">
          <div className="mb-[2rem] items-center md:mb-0">
            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Total Data : &nbsp;
              <span className="font-semibold text-gray-900 dark:text-white">
                {TotalListData ? TotalListData : 0}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {PageNo == 1 ? 
              <div className="p-2 bg-gray-200 dark:bg-gray-400 border rounded-full"> <HiChevronLeft className="text-base" /> </div>
            : <div  className="p-2 bg-gray-200 border rounded-full" onClick={() => {  PreviouesButtonCall() }}> <HiChevronLeft className="text-base" /> </div>}

            {CurrentPageNo >= totalPages ?
                <div className="p-2 bg-gray-200 dark:bg-gray-400 border rounded-full" > <HiChevronRight className="text-base" />  </div>
                :<div className="p-2 bg-gray-200 border rounded-full" onClick={() => { NextButtoncalll() }} > N <HiChevronRight className="text-base" />  </div>}
          </div>
        </div>
    </>
  );
};

export default SmallPagination;
