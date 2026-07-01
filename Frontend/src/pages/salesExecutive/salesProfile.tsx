import { lazy, FC, useEffect, useMemo, useState } from 'react';
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getleavelist, getleavemanagemenetlist } from '../../Store/actions';
import { SalesProfilePropsData } from '../../types/types';
const ChangeProfilePassword = lazy(() => import("../../components/common/profile/changeprofilePassword"));
const LeaveAdd = lazy(() => import("../../components/salesComponent/leaveAdd"));
const ExamplePagination = lazy(() => import("../../components/common/pagination/pagination"));
const CommonTable = lazy(() => import("../../components/common/table/commonTable"));

const SalesProfile : FC <SalesProfilePropsData> = function ()  {
    const dispatch = useDispatch();
    const [SalesLeaveTypeData, setSalesLeaveTypeData] = useState([])
    const [SalesLeaveData, setSalesLeaveData] = useState([])
    const [confirmationModal, setConfirmationModal] = useState(false);

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
    const Leavedatalist = useSelector((state: any) => state.Leave.Leavedatalist)
    const LeaveManagementdatalist = useSelector((state: any) => state.Leave.LeaveManagementdatalist)

    useEffect(() => {
        setSalesLeaveData(Leavedatalist?.data?.data);
        setSalesLeaveTypeData(LeaveManagementdatalist?.data);
        // setRoePerPage(Leavedatalist?.size ? Leavedatalist?.size : null)
        setTotalListData(Leavedatalist?.totalData ? Leavedatalist?.totalData : 0);
        setCurrentPageNo(Leavedatalist?.CurrentPage ? Leavedatalist?.CurrentPage : 1);
    }, [Leavedatalist, LeaveManagementdatalist]);

    useEffect(() => {
        let requserdata: { page: number; size: number; } = {
        page: PageNo,
        size: RoePerPage
      };
        dispatch(getleavelist(requserdata));
        dispatch(getleavemanagemenetlist())
    }, [dispatch, PageNo, RoePerPage]);

    const RequestLeave = () => {
        setConfirmationModal(true);
    }

    const LeaveColumns  = useMemo(() => [
        { key: "start_date",  label: "Leave Date", render: (row: any) => `${moment(row.start_date).format("DD-MM-YYYY")} To ${moment(row.end_date).format("DD-MM-YYYY")}`, },
        { key: "days",  label: "Leave Days",},
        { key: "leave_type",  label: "Leave Type",  render: (row: any) => row?.leave_type ? row?.leave_type.charAt(0).toUpperCase() + row?.leave_type.slice(1).toLowerCase() : "-"},
        // {  key: "status",  label: "Status", render: (row: any) =>row?.status ? row?.status.charAt(0).toUpperCase() + row?.status.slice(1).toLowerCase() : "-"},
        {  key: "reason", label: "Reason"},
        {
          key: "status",
          label: "Requested By",
          render: (row: any) => row?.requested_by?.name ? row?.requested_by?.name : "N/A",
        },
        {
          key: "requested_at",
          label: "Requested Date",
          render: (row: any) => row?.requested_at ? moment(row?.requested_at).format("DD-MM-YYYY") : "N/A",
        },
        {
          key: "approved_by",
          label: "Approved By",
          render: (row: any) => row?.approved_by?.name ? row?.approved_by?.name : "N/A",
        },
        {
          key: "approved_date",
          label: "Approved date",
          render: (row: any) => row?.approved_date ? moment(row?.approved_date).format("DD-MM-YYYY") : "N/A"
        },
    ],[]);

    const LeaveBalanceColumns  = useMemo(() => [
        { key: "leave_type",  label: "Leave Type"},
        { key: "total_leave",  label: "Leave Total"},
        { key: "used_leave",  label: "Leave Used"},
        { key: "remaining_leave",  label: "Remaining Leave"},
    ],[]);

  return (
    <>
        <div className='flex gap-x-3'>
          <div className="flex-1 mt-[4rem]">
            <div className='flex justify-between mb-6 self-center'>
              <h3 className="self-center text-2xl font-bold leading-none text-DarkBackground dark:text-White"> Leave Balance </h3>
            </div>

            {SalesLeaveTypeData && SalesLeaveTypeData.length > 0 ?
              <CommonTable columns={LeaveBalanceColumns} data={SalesLeaveTypeData || []} />
            : null}
          </div>

          <div className='flex-1'> <ChangeProfilePassword />  </div>
        </div>
    
        <div className="mt-[4rem]">
          <div className='flex justify-between mb-6 self-center'>
            <h3 className="self-center text-2xl font-bold leading-none text-DarkBackground dark:text-White"> Leave History </h3>
            <Button gradientDuoTone="purpleToPink" onClick={ () =>  RequestLeave()}> Request Leave </Button>
          </div>

          {SalesLeaveData && SalesLeaveData.length > 0 ?
            <>
              <CommonTable columns={LeaveColumns} data={SalesLeaveData || []} />
              <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
            </>
          : null}
        </div>

        {confirmationModal ?
            <LeaveAdd CloseProfile={() => setConfirmationModal(false)}  confirmationModal={confirmationModal} type="S"/>
        : null}
    </>
  );
}

export default SalesProfile