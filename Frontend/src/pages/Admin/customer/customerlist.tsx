import { FC, lazy, useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import moment from "moment";
import { FaUserLock, FaUnlock, FaExclamationCircle  } from "react-icons/fa";
import { getCustomerDatalist, BlockCustomer } from "../../../Store/actions";
import UseAccessList from "../../../hooks/useAccessList";
import LoaderPage from "../../../components/common/loader/loader";
import CommonTable from "../../../components/common/table/commonTable";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const CustomerListPage : FC = function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    // ----------- next Button  Code Start -------------
      const [UserDataList, setUserDataList] = useState([]);
      const [PageNo, setPageNo] = useState(1);
      const [RoePerPage, setRoePerPage] = useState(5);
    
      const RowPerPage = (event: any) => {
        const value = Number(event)
         setRoePerPage(value);
         setPageNo(1)
       };
      const PageDataList = (data:any) =>{ setPageNo(data)}
    // ------------- Next button Code End -------------
    
  // ---------------- Search User code start ----------------
  const [searchData, setSearchData] = useState<string | null>(null);
  const Changename = useCallback((value: string) => {
    const timeout = setTimeout(() => {
      setSearchData(value.trim());
      setPageNo(1);
    }, 500); // 500ms debounce
    return () => clearTimeout(timeout);
  }, []);
  // ---------------- Search User code end ----------------

  // ------------- Get  Data From Reducer Code Start --------------
  const { Customerlist, UserListSize, TotalUserListData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
    Customerlist: state.Customer.Customerlist,
    UserListSize: state.Customer.CustomerlistSize,
    TotalUserListData: state.Customer.TotalCustomerData,
    CurrentPage: state.Customer.CurrentPage,
    permissionsdata: state.Login.permissionsdata
  }));

  const [TotalListData, setTotalListData] = useState(0);
  const [CurrentPageNo, setCurrentPageNo] = useState(0);

  useEffect(() => {
    setUserDataList(Customerlist ? Customerlist : null);
    setTotalListData(TotalUserListData ? TotalUserListData : 0);
    setCurrentPageNo(CurrentPage ? CurrentPage : 1);
    setLoader(false)
  }, [Customerlist, TotalUserListData, UserListSize, CurrentPage]);
  //  ------------- Get  Data From Reducer Code end --------------

    useEffect(() =>{
      let requserdata: { page: number; size: number; search?: string } = {
        page: PageNo,
        size: RoePerPage
      };
      if (searchData)  requserdata.search = searchData;
      dispatch(getCustomerDatalist(requserdata))
      setLoader(true)
    },[dispatch, searchData,PageNo, RoePerPage ])

    const accessList = UseAccessList(permissionsdata, "Customer");

    const BlockUserCall = (id : string) =>{
      dispatch(BlockCustomer({id:id}))
    }

  const DetailsCustomerCall = (id: string) => {
    navigate(`/customer/details/${id}`)
  }

    let Name = "Customer List";
    let Searchplaceholder = "Search For Customers (Name)";

      const customerColumns = useMemo(() => [
        {
          key: "name_eng",
          label: "Name",
          render: (row: any) => (
            <div onClick={() => DetailsCustomerCall(row?._id)}> {row?.firstname} {row?.middlename} {row?.lastname}</div>
          )
        },
        {
          key: "mobile_number",
          label: "Phone",
        },
         {
          key: "district_name",
          label: "District",
        },
        {
          key: "taluka_name",
          label: "Taluka",
        },
        {
          key: "village_name",
          label: "Village",
        },
        {
          key: "is_active",
          label: "Status",
          render: (row: any) => row.is_active ? <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div> : <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Deactive </div>
        },
        {
          key: "added_at",
          label: "Created Date",
          render: (row: any) => (
            <div>{moment(row?.added_at).format("DD-MM-YYYY hh:mm:ss")}</div>
          )
        },
        {
          key: "actions",
          label: "Actions",
          render: (row: any) => (
            <div className="flex items-center gap-x-3">
              {accessList?.delete ? <Button gradientDuoTone="purpleToPink" onClick={() => BlockUserCall(row?._id)}><div className="flex items-center gap-x-2 deletebutton min-w-[5rem] text-center font-semibold">  {row?.is_deleted == true ? <FaUnlock className="text-lg" /> : <FaUserLock className="text-xl" />}  {row?.is_deleted == true ? "Unblock" : "Block"}  </div> </Button> : null} <Button gradientDuoTone="purpleToBlue" onClick={() => DetailsCustomerCall(row?._id)}><div className="flex items-center gap-x-2 deletebutton"> <FaExclamationCircle className="text-lg" /> Detail Customer  </div> </Button>
            </div>
          ),
        },
      ], [accessList]);
    

    return (
        <>  
        <NavbarSidebarLayout isSidebar={true} isNavbar={true} >
          {loader ? <LoaderPage /> :
            <>
              <ExampleBreadcrumb Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename={Changename} />
              <CommonTable columns={customerColumns} data={UserDataList || []} />
              <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
            </>
          }
        </NavbarSidebarLayout>

            <ToastMessage />
        </>
    );
}

export default CustomerListPage;