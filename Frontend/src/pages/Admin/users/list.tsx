/* eslint-disable jsx-a11y/anchor-is-valid */
import { lazy, useEffect, FC, useState, Suspense, useCallback, useMemo  } from "react";
import { Button,} from "flowbite-react";
import { HiOutlinePencilAlt, HiTrash} from "react-icons/hi";
import { FaExclamationCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { getUserlist, DeleteUserlist } from "../../../Store/actions";
import UseAccessList from "../../../hooks/useAccessList";
import LoaderPage from "../../../components/common/loader/loader";
import CommonTable from "../../../components/common/table/commonTable";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";

const DeleteModalPage = lazy(() => import("../../../components/common/modal/deleteModal"));
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const UserListPage: FC = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [UserDataList, setUserDataList] = useState([]);
  const [loader, setLoader] = useState(false);
  
  // Access Data Code end
  const { UserList,   TotalUserListData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
      UserList: state.User.UserList?.data,
      TotalUserListData: state.User.TotalUserListData,
      CurrentPage: state.User.CurrentPage,
      permissionsdata: state.Login.permissionsdata
  }));
  const accessList = UseAccessList(permissionsdata, "User");

  // ----------- next Button  Code Start -------------
  const [PageNo, setPageNo] = useState(1);
  const [RoePerPage, setRoePerPage] = useState(5);

  const RowPerPage = (event: any) => { 
    const value = Number(event)
    setRoePerPage(value);
    setPageNo(1)
  };
  const PageDataList = (data:any) =>{ setPageNo(data)}
  // ------------- Nect button Code End -------------

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

  // ------------- Get User Data From Reducer Code Start --------------

  useEffect(() => {
    let requserdata: { page: number; size: number; search?: string } = {
      page: PageNo,
      size: RoePerPage
    };
    if (searchData)  requserdata.search = searchData;
    dispatch(getUserlist(requserdata));
    setLoader(true);
  }, [dispatch, PageNo, RoePerPage, searchData]);

  const [TotalListData, setTotalListData] = useState(0);
  const [CurrentPageNo, setCurrentPageNo] = useState(0);
  
  useEffect(() => { 
    setUserDataList(UserList ? UserList  : null);
    setTotalListData(TotalUserListData ? TotalUserListData : 0);
    setCurrentPageNo(CurrentPage ? CurrentPage : 1);
    setLoader(false);
  }, [UserList,  TotalUserListData, CurrentPage]);
  //  ------------- Get User Data From Reducer Code Start --------------

  // ------------- Get User Data Code Start --------------
  const getUserData = (id: any) => {
   navigate(`/users/edit/${id}`);
  };
  // -----------Get Module Data Code End -------------------

  // ------------  Delete Module Data Code Start ------------
  const [Delete_id, set_Delete_id] = useState(0);
  const DeleteFuncall =useCallback((id: any) => {
    set_Delete_id(id);
    setisOpenDelteModel(true);
  }, []);

  const DelRole = () => {
    let rqeuserdata = { id: Delete_id };
    dispatch(DeleteUserlist(rqeuserdata));
    setisOpenDelteModel(false);
  };
  // -------  Delete Module Data Code End ---------------

  const OpenAddModel = useCallback((path: string) => {
    navigate("/users/add");
  },[navigate]);

  const DetailsUserCall= (id:string) =>{
    navigate(`/users/details/${id}`)
  }

  let Name = "Advisor List";
  let Searchplaceholder = "Search For Advisor (Name)";
  let AddAccess = accessList?.add;

  const userColumns =useMemo( () => [
    {
      key: "name",
      label: "Advisor Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
      render: (row: any) => row?.role?.role_title || "-",
    },
    {
      key: "gender",
      label: "Gender",
    },

    {
      key: "mobile_no",
      label: "Mobile No",
    },

    {
      key: "date_of_joining",
      label: "Date of joining",
    },
    {
      key: "is_active",
      label: "Status",
      render: (row: any) => row.is_active ?  <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div> :  <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Deactive </div>
    },
    {
      key: "actions",
      label: "Actions",
       render: (row: any) => (
      <div className="flex items-center gap-x-3">
        {accessList?.edit && (
          <Button gradientDuoTone="greenToBlue" onClick={() => getUserData(row._id)}> <div className="flex items-center gap-x-2"> <HiOutlinePencilAlt className="text-lg" /> Edit Advisor </div> </Button>
        )}

        {accessList?.delete && (
          <Button gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(row._id)}> <div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" /> Delete Advisor </div> </Button>
        )}

        <Button gradientDuoTone="purpleToBlue" onClick={() => DetailsUserCall(row._id)} > <div className="flex items-center gap-x-2 deletebutton"> <FaExclamationCircle className="text-lg" /> Detail Advisor </div> </Button>
      </div>
    ),
    },
  ],[accessList, DeleteFuncall]);

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true} >
        {loader ? <LoaderPage /> :
          <>
            <ExampleBreadcrumb Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename={Changename} isOpenAddModel={OpenAddModel} AddAccess={AddAccess} />
            <CommonTable columns={userColumns} data={UserDataList || []} />
            <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
          </>
        }
      </NavbarSidebarLayout>

      {isOpenDelteModel && (
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"> <div className="text-white">Loading...</div> </div> }>
            <DeleteModalPage  isOpenDelteModel={isOpenDelteModel}  name={"user"} setisOpenDelteModel={setisOpenDelteModel}  DelCall={DelRole} />
          </Suspense>
      )}
      
      <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"> <div className="text-white">Loading...</div> </div> }>
        <ToastMessage />
      </Suspense>
    </>
  );
};

export default UserListPage;