import { FC, lazy, useEffect, useMemo, useState } from "react";
import moment from "moment";
import { Button } from "flowbite-react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FaExchangeAlt } from "react-icons/fa";
import UseAccessList from "../../../hooks/useAccessList";
import { changeleavestatusmanagementlist,  getleavemanagemenetlist } from "../../../Store/actions";
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));
const LoaderPage = lazy(() => import("../../../components/common/loader/loader"));
const CommonTable = lazy(() => import("../../../components/common/table/commonTable"));

const LeaveManagmentListPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [LeaveTypeList, setLeaveTypeList] = useState([]);
  //------------ Access Data Code start------------
    const { LeaveManagementdatalist, permissionsdata } = useSelector((state: any) => ({
      LeaveManagementdatalist: state.Leave.LeaveManagementdatalist,
      permissionsdata: state.Login.permissionsdata
    }));

   const accessList = UseAccessList(permissionsdata, "Company");
  //--------- Access Data Code end------------------
    
  // ----------- next Button  Code Start -------------
    const [TotalListData, setTotalListData] = useState(0);
    const [CurrentUserListSize, setCurrentUserListSize] = useState();
    const [CurrentPageNo, setCurrentPageNo] = useState(0);
    const [PageNo, setPageNo] = useState(1);
    const [RoePerPage, setRoePerPage] = useState(5);
      const [loader, setLoader] = useState(false);

    const RowPerPage = (event: any) => {
      const value = Number(event)
       setRoePerPage(value);
       setPageNo(1)
     };
    const PageDataList = (data:any) =>{ setPageNo(data)}
  // ------------- Next button Code End -------------

  // ------------- Get  Data From Reducer Code Start --------------
    useEffect(() => {
      let requserdata = {
        page: PageNo,
        size: RoePerPage
      };
      dispatch(getleavemanagemenetlist(requserdata));
      setLoader(true)
    }, [dispatch, PageNo, RoePerPage]);

    useEffect(() => {        
      setLeaveTypeList(LeaveManagementdatalist?.data? LeaveManagementdatalist?.data : []);
      setTotalListData(LeaveManagementdatalist?.totalData ? LeaveManagementdatalist?.totalData : 0);
      setCurrentUserListSize(LeaveManagementdatalist?.size ? LeaveManagementdatalist?.size : 0);
      setCurrentPageNo(LeaveManagementdatalist?.page ? LeaveManagementdatalist?.page : 1);
      setLoader(false)
    }, [LeaveManagementdatalist]);
  //  ------------- Get Data From Reducer Code end --------------

  const EditPageCall = (id:any) =>{
    navigate(`/leave/management/${id}`)
  }

  const OpenAddModel = () =>{
    navigate("/leave/management/add")
  }

  const ChangestatusFuncall = (id:any) =>{
    let requserdata = { id: id};
    dispatch(changeleavestatusmanagementlist(requserdata)); 
  }

  let Name = "Leave Management";
  let AddAccess = accessList?.add;

    const LeaveTypeColumns =useMemo( () => [
      { key: "leave_type", label: "Name" },
      { key: "total_leave",  label: "Leave Count"},
      { key: "is_active", label: "Status", render: (row: any) => row.is_active ?  <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div> :  <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Deactive </div> },
      { key: "added_at", label: "Created Date",  render: (row: any) => ( <div> {moment(row?.added_at).format("DD-MM-YYYY hh:mm:ss")} </div>)},
      {
        key: "actions",
        label: "Actions",
        render: (row: any) => (
          <div className="flex items-center gap-x-3">
            {accessList?.edit ? <Button gradientDuoTone="greenToBlue" onClick={() => EditPageCall(row?._id)}  > <div className="flex items-center gap-x-2">  <HiOutlinePencilAlt className="text-lg" />  Edit Leave Management  </div></Button> : null}
            {accessList?.edit ? <Button gradientDuoTone="greenToBlue" onClick={() => ChangestatusFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton min-w-[5rem] text-center font-semibold"> <FaExchangeAlt className="text-lg font-semibold" />  Change status </div> </Button> : null}
          </div>
        ),
      },
    ],[accessList]);

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true} >
        {loader ? <LoaderPage /> :
          <>
            <ExampleBreadcrumb Name={Name} isOpenAddModel={OpenAddModel} AddAccess={AddAccess} />
            <CommonTable columns={LeaveTypeColumns} data={LeaveTypeList || []} />
            <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
          </>
        }
      </NavbarSidebarLayout>
      <ToastMessage />
    </>
  );
};

export default LeaveManagmentListPage;