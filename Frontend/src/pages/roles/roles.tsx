import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import {  Button, Checkbox, Table} from "flowbite-react";
import { lazy, Suspense, useEffect, useState } from "react";
import {  HiOutlinePencilAlt,  HiTrash, HiKey,} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getRoleslist, DeleteRoleslist,} from "../../Store/actions";
import ExamplePagination from "../../components/pagination";
import { useNavigate } from "react-router-dom";
import ExampleBreadcrumb from "../../components/breadcrumb";
import Cookies from "js-cookie";
const ToastMessage = lazy(() => import("../../components/ToastMessage"));
const DeleteModalPage = lazy(() => import("../../components/modal/deleteModal"));

const RolesPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);

  // ----------------- Search Code Start  -----------------
  const [searchData, setSearchData] = useState(null);
  const Changename = (data:any) =>{
    setSearchData(data)
  }
  // ----------------- Search Code end -----------------

  // ----------------- Access Data Code start  -----------------
  interface AccessData{
    add: boolean;
    view: boolean;
    edit: boolean;
    delete: boolean;
  }
  const [AccessList, setAccessList] = useState<AccessData>();
  // ----------------- Access Data Code end  -----------------
 
 //  ----------------- next Button  Code Start  -----------------
 const [PageNo, setPageNo] = useState(1);
 const [RoePerPage, setRoePerPage] = useState(5);

 const RowPerPage = (event: any) => {
  const value = Number(event)
   setRoePerPage(value);
   setPageNo(1)
 };

 const PageDataList = (data:any) =>{ setPageNo(data)}
 // ----------------- Nect button Code End  -----------------

  const [TotalListData, setTotalListData] = useState(0);
  const [CurrentPageNo, setCurrentPageNo] = useState(0);
  const [RolesList, setRoleList] = useState([]);

  const { Roleslist,  RoleListSize, TotalRoleListData, CurrentPage,permissionsdata} = useSelector((state: any) => ({
    Roleslist: state.Role.Roleslist,
    RoleListSize: state.Role.RoleListSize,
    TotalRoleListData: state.Role.TotalRoleListData,
    CurrentPage: state.Role.CurrentPage,
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
      const userPermissions = permissionsdata && permissionsdata?.find( (item:any) => item.module_name === "Role")?.permissions;
      setAccessList(userPermissions || [])
    }
  },[permissionsdata]);

  useEffect(() => {
    let requserdata: { page: number; size: number; search?: string } = {
      page: PageNo,
      size: RoePerPage
    };
    if (searchData)  requserdata.search = searchData;
    dispatch(getRoleslist(requserdata));
  }, [dispatch, PageNo, RoePerPage,searchData]);

  useEffect(() => {
    setRoleList(Roleslist ? Roleslist : null);
    setTotalListData(TotalRoleListData ? TotalRoleListData : 0);
    setCurrentPageNo(CurrentPage ? CurrentPage : 1);
  }, [Roleslist, TotalRoleListData, CurrentPage]);

  // Get User Data Code Start
  const getUnderGuidedata = (id:any) => {
    console.log("Edit page call", id);
  };
  // Get User Data Code End

  // Delete Role Data Code Start
  const [id, set_Delete_id] = useState(0);
  const DeleteFuncall = (id:any) => {
    set_Delete_id(id);
    setisOpenDelteModel(true);
  };

  const DelRole = () => {
    let rqeuserdata = { id: id };
    dispatch(DeleteRoleslist(rqeuserdata));
    setisOpenDelteModel(false);
  };

  const ModuleListFuncall = (id: any) => {
    navigate(`/role-access/${id}`);
  };

  const OpenAddModel = () =>{
    navigate("/roles/add");
  }


  let Name = "Role List";
  let Searchplaceholder = "Search For Role (Name)";
  let AddAccess = AccessList?.add;

  return (
    <>
      <NavbarSidebarLayout isFooter={false} isSidebar={true} isNavbar={true} isRightSidebar={true} >
        <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} isOpenAddModel= {OpenAddModel} AddAccess={AddAccess}/>
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <Table.Head className="bg-gray-100 dark:bg-gray-700">
                      <Table.HeadCell> <Checkbox id="select-all" name="select-all" /></Table.HeadCell>
                      <Table.HeadCell>Title</Table.HeadCell>
                      <Table.HeadCell>Description</Table.HeadCell>
                      <Table.HeadCell>Status</Table.HeadCell>
                      {/* {AccessList?.edit || AccessList?.delete ?  <Table.HeadCell className="text-center">  Actions </Table.HeadCell> : null } */}
                      {AccessList?.add ?   <Table.HeadCell>Role Access</Table.HeadCell> : null }
            </Table.Head>

            <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {RolesList && RolesList.map((item: any, k:any) => (
                  <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                    <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }} > <Checkbox /> </Table.Cell>
                    <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.role_title}  </Table.Cell>
                    <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.description}  </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                      {item.is_active == true ? 
                          <div className="flex items-center"><div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div>
                        : <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div> Deactive </div>
                      }
                    </Table.Cell>
                    {/* {AccessList?.edit || AccessList?.delete ?
                      <Table.Cell className="space-x-2 whitespace-nowrap py-0">
                        <div className="flex items-center gap-x-3 justify-evenly">
                          {AccessList?.edit ? <Button gradientDuoTone="greenToBlue" onClick={() => getUnderGuidedata(item._id)}><div className="flex items-center gap-x-2"> <HiOutlinePencilAlt className="text-lg" /> Edit Role </div> </Button> : null}
                          {AccessList?.delete ? <Button gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(item._id)} > <div className="flex items-center gap-x-2"> <HiTrash className="text-lg" />  Delete Role </div> </Button> : null}
                        </div>
                      </Table.Cell>
                    : null} */}

                    {AccessList?.add ?
                      <Table.Cell>
                        <Button color="primary" className="whitespace-nowrap text-base font-normal text-gray-900 dark:text-dark" onClick={() => ModuleListFuncall(item._id)}> <div className="flex items-center gap-x-2"> <HiKey className="text-lg" /> Role Access List </div>  </Button>
                      </Table.Cell>
                    : null}    
                   
                  </Table.Row>
              ))}
            </Table.Body>
          </Table>
        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}   RowsPerPageValue={RoePerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
      </NavbarSidebarLayout>

      {isOpenDelteModel && (
        <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"> <div className="text-white">Loading...</div> </div>}>
          <DeleteModalPage isOpenDelteModel={isOpenDelteModel} name={"role"} setisOpenDelteModel={setisOpenDelteModel} DelCall={DelRole} />
        </Suspense>
      )}
      <ToastMessage />
    </>
  );
};

export default RolesPage;