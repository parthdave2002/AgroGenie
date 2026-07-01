import { lazy, FC, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import { getHRDashbaordlist } from '../../Store/actions';
import { render } from '@headlessui/react/dist/utils/render';
const NavbarSidebarLayout = lazy(() => import("../../layouts/navbar-sidebar"));
const CommonTable = lazy(() => import("../../components/common/table/commonTable"));

const HRDashboardPage : FC = function ()  {
    const dispatch = useDispatch();
    const [SalesLeaveTypeData, setSalesLeaveTypeData] = useState([]);
    const [SalesAnnivarsaryData, setSalesAnnivarsaryData] = useState([]);
    const [SalesBirthdayData, setSalesBirthdayData] = useState([]);

    // ----------- next Button  Code Start -------------
    const [TotalListData, setTotalListData] = useState(0);
    const [CurrentPageNo, setCurrentPageNo] = useState(0);
    const [PageNo, setPageNo] = useState(1);
    const [RoePerPage, setRoePerPage] = useState(5);

    const RowPerPage = (event: any) => {
      const value = Number(event)
      setRoePerPage(value);
      setPageNo(1);
    };
    const PageDataList = (data:any) => { setPageNo(data) }
  // ------------- Next button Code End -------------
    const Leavedatalist = useSelector((state: any) => state.HR.HrDatalist)

    console.log(Leavedatalist)
    useEffect(() => {
        setSalesLeaveTypeData(Leavedatalist?.onLeave);
        setSalesAnnivarsaryData(Leavedatalist?.anniversaries);
        setSalesBirthdayData(Leavedatalist?.birthdays);
    }, [Leavedatalist]);

    useEffect(() => {
        dispatch(getHRDashbaordlist())
    }, [dispatch]);


    const AdvisorAniColumns  = useMemo(() => [
        { key: "name",  label: "Name"},
    ],[]);

    const AdvisorLeaveColumns  = useMemo(() => [
        { key: "request_for", label: "Name", render : (row :any) => row?.request_for?.name},
        { key: "leave_type", label: "Leave Type", render: (row: any) => row?.leave_type?.name},
        { key: "days" , label : "Days"}
    ],[]);

    const AdvisorBirthDayColumns = useMemo(() => [
        { key: "name",  label: "Name"},
    ],[]);

  return (
    <>
        <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
            <div className='text-2xl font-semibold flex justify-end dark:text-gray-50 font-sans'> Hello, HR Manager </div>

            <div className='flex gap-x-3 mt-[4rem]'>
                {SalesBirthdayData && SalesBirthdayData.length > 0 &&
                    <div className="flex-1">
                        <h3 className="self-center text-xl font-semibold leading-none text-DarkBackground dark:text-White"> Advisor Birthday </h3>
                        <CommonTable columns={AdvisorBirthDayColumns} data={SalesBirthdayData || []} />
                    </div>
                }

                {SalesAnnivarsaryData && SalesAnnivarsaryData.length > 0 &&
                    <div className="flex-1">
                        <h3 className="self-center text-xl font-semibold leading-none text-DarkBackground dark:text-White"> Advisor Anniversary </h3>
                        <CommonTable columns={AdvisorAniColumns} data={SalesAnnivarsaryData || []} />
                    </div>
                }

                {SalesLeaveTypeData && SalesLeaveTypeData.length > 0 &&
                    <div className="flex-1">
                        <h3 className="self-center text-xl font-semibold leading-none text-DarkBackground dark:text-White"> Advisor on leave </h3>
                        <CommonTable columns={AdvisorLeaveColumns} data={SalesLeaveTypeData || []} />
                    </div>
                }
            </div>
        </NavbarSidebarLayout>
    </>
  );
}

export default HRDashboardPage