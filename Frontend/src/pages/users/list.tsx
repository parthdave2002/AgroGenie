/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button,  Checkbox, Table} from "flowbite-react";
import type { FC } from "react";
import { HiOutlinePencilAlt, HiTrash} from "react-icons/hi";
import { FaExclamationCircle } from "react-icons/fa";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserlist, DeleteUserlist,   } from "../../Store/actions";
import { lazy, useEffect, useState, Suspense  } from "react";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import LoaderPage from "../../components/loader";
const DeleteModalPage = lazy(() => import("../../components/modal/deleteModal"));
const ToastMessage = lazy(() => import("../../components/ToastMessage"));

const UserListPage: FC = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [UserDataList, setUserDataList] = useState([]);
  const [loader, setLoader] = useState(false);

  // Access Data Code start
  interface AccessData{
    add: boolean;
    view: boolean;
    edit: boolean;
    delete: boolean;
  }
  const [AccessList, setAccessList] = useState<AccessData>();

  // Access Data Code end
  const { UserList,   TotalUserListData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
      UserList: state.User.UserList?.data,
      TotalUserListData: state.User.TotalUserListData,
      CurrentPage: state.User.CurrentPage,
      permissionsdata: state.Login.permissionsdata
  }));
  
  useEffect(() =>{
    const user = Cookies.get("role");
    if (user === "67b388a7d593423df0e24295") {
      setAccessList({
        add: true,
        view: true,
        edit: true,
        delete: true,
      })
    }
    else{
      const userPermissions = permissionsdata && permissionsdata?.find( (item:any) => item.module_name === "User")?.permissions;
      setAccessList(userPermissions || [])
    }
  },[permissionsdata]);

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
  const [searchData, setSearchData] = useState(null);
  const Changename = (data:any) =>{
    setSearchData(data)
  }
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
  const DeleteFuncall = (id: any) => {
    set_Delete_id(id);
    setisOpenDelteModel(true);
  };

  const DelRole = () => {
    let rqeuserdata = { id: Delete_id };
    dispatch(DeleteUserlist(rqeuserdata));
    setisOpenDelteModel(false);
  };
  // -------  Delete Module Data Code End ---------------

  // --------- Checkbox Code start ------------
    const CheckData = (data:any) =>{
      console.log(data)
    }
  // --------- Checkbox Code end ------------

  const OpenAddModel = () =>{
    navigate("/users/add")
  }

  const DetailsUserCall= (id:string) =>{
    navigate(`/users/details/${id}`)
  }

  let Name = "Advisor List";
  let Searchplaceholder = "Search For Advisor (Name)";
  let AddAccess = AccessList?.add;

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
        {loader ? <LoaderPage /> :
                  <>
        <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} isOpenAddModel= {OpenAddModel} AddAccess={AddAccess}/>
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
              <Table.Head className="bg-gray-100 dark:bg-gray-700">
                <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                <Table.HeadCell>Advisor Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell> Role </Table.HeadCell>
                <Table.HeadCell>gender</Table.HeadCell>
                <Table.HeadCell>Mobile No</Table.HeadCell>
                <Table.HeadCell>date of joining</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {UserDataList && UserDataList.map((item: any, k) => (
                        <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                          <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }}>  <Checkbox  value={item._id} onClick={() => {CheckData(item._id)}}/>  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => DetailsUserCall(item?._id)}>  {item?.name} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.email} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.role?.role_title} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.gender.charAt(0).toUpperCase() + item?.gender.slice(1).toLowerCase()} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.mobile_no} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.date_of_joining} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                            {item.is_active == true ? <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active  </div>
                            : <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div> Deactive  </div>}
                          </Table.Cell>
                          <Table.Cell className="space-x-2 whitespace-nowrap py-0">
                            <div className="flex items-center gap-x-3">
                                {AccessList?.edit ? (
                                  <Button gradientDuoTone="greenToBlue" onClick={() => getUserData(item._id)} > <div className="flex items-center gap-x-2">  <HiOutlinePencilAlt className="text-lg" />  Edit Advisor  </div></Button>
                                ) : null}   
       
                                {AccessList?.delete ? (
                                  <Button  gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(item._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Delete Advisor  </div> </Button>
                                ) : null}
                              <Button  gradientDuoTone="purpleToBlue" onClick={() => DetailsUserCall(item._id)}><div className="flex items-center gap-x-2 deletebutton"> <FaExclamationCircle className="text-lg" /> Detail Advisor  </div> </Button>
                            </div>
                          </Table.Cell>

                        </Table.Row>
                  ))}
              </Table.Body>
          </Table>
        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}   RowsPerPageValue={RoePerPage}    PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
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