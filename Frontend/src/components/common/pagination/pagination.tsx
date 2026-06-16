import type { FC ,PropsWithChildren } from "react";
import { Button } from "flowbite-react";
import {  HiChevronLeft, HiChevronRight} from "react-icons/hi";


interface NavbarSidebarLayoutProps {
  PageData?: any;
  PageNo?: any;
  CurrentPageNo?: any;
  TotalListData ?: any;
  RowPerPage?: any;
  RowsPerPageValue?: number;  
}

const ExamplePagination: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = function ({ PageData,RowPerPage, RowsPerPageValue , PageNo, CurrentPageNo, TotalListData}) {
  const totalPages = TotalListData && RowsPerPageValue ? Math.ceil(TotalListData / RowsPerPageValue) : 1;
  
  const NextButtoncalll = () => {
    PageData(PageNo + 1);
  };

  const PreviouesButtonCall = () => {
    PageData(PageNo - 1);
  };

  const rowData = (event:any) =>{
    var selectElement = event.target;
    var value = selectElement.value;
    RowPerPage(value);
  }

  return (
    <>
        <div className="sticky right-0 bottom-0 w-full items-center border-t border-WhiteMarble p-4 dark:border-TranquilBlack dark:bg-Cosmos md:flex md:justify-between ">
          <div className="mb-[2rem] md:flex items-center md:mb-0">
            <span className="text-sm font-normal text-SharkGray dark:text-SilverSteel">
              Pages&nbsp;
              <span className="font-semibold text-DarkBackground dark:text-White">
                {CurrentPageNo} / {totalPages}
              </span>
              &nbsp; Total Data : &nbsp;
              <span className="font-semibold text-DarkBackground dark:text-White">
                {TotalListData ? TotalListData : 0}
              </span>
            </span>
          </div>

          <div className="mb-[2rem] md:mb-0">
            <span className="dark:text-White"> Rows Per Pages </span>
            <select className="rounded-xl dark:bg-Cosmos dark:text-White" onChange={(e) => { rowData(e); }} value={RowsPerPageValue}>
            <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50"> 50</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            {PageNo == 1 ? 
              <Button className="p-0" disabled={true}> <HiChevronLeft className="mr-1 text-base" /> Previous </Button>
            : <Button  className="p-0" onClick={() => {  PreviouesButtonCall() }}> <HiChevronLeft className="mr-1 text-base" /> Previous  </Button>}

          {CurrentPageNo >= totalPages ?
            <Button className="p-0"  disabled={true} > Next <HiChevronRight className="ml-1 text-base" />  </Button>
          :<Button className="p-0" onClick={() => { NextButtoncalll() }} > Next <HiChevronRight className="ml-1 text-base" />  </Button>}
          </div>
        </div>
    </>
  );
};

export default ExamplePagination;
