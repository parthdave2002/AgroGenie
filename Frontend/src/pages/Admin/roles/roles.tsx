import type { FC } from "react";
import {  Button } from "flowbite-react";
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { HiKey } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getRoleslist, DeleteRoleslist,} from "../../../Store/actions";
import { useNavigate } from "react-router-dom";
import UseAccessList from "../../../hooks/useAccessList";
import LoaderPage from "../../../components/common/loader/loader";
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));
const DeleteModalPage = lazy(() => import("../../../components/common/modal/deleteModal"));
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));
const CommonTable = lazy(() => import("../../../components/common/table/commonTable"));

const RolesPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [loader, setLoader] = useState(false);
  const [TotalListData, setTotalListData] = useState(0);
  const [CurrentPageNo, setCurrentPageNo] = useState(0);
  const [RolesList, setRoleList] = useState([]);

  const { Roleslist, RoleListSize, TotalRoleListData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
    Roleslist: state.Role.Roleslist,
    RoleListSize: state.Role.RoleListSize,
    TotalRoleListData: state.Role.TotalRoleListData,
    CurrentPage: state.Role.CurrentPage,
    permissionsdata: state.Login.permissionsdata
  }));

  // ----------------- Access Data Code start  -----------------
  const accessList = UseAccessList(permissionsdata, "Role");
  // ----------------- Access Data Code end  -----------------

  // Delete Role Data Code Start
  const [id, set_Delete_id] = useState(0);
  const DeleteFuncall = (id: any) => {
    set_Delete_id(id);
    setisOpenDelteModel(true);
  };

  const DelRole = () => {
    let rqeuserdata = { id: id };
    dispatch(DeleteRoleslist(rqeuserdata));
    setisOpenDelteModel(false);
    setLoader(true)
  };

  const roleColumns = useMemo(() => [
    {
      key: "role_title",
      label: "Title",
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "role",
      label: "Status",
      render: (row: any) => row?.is_active == true ? <div className="flex items-center"><div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div> : <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div> Deactive </div>
    },
    {
      key: "mobile_no",
      label: "Role Access",
      render: (row: any) => (
        <div className="flex items-center gap-x-3">
          {accessList?.add && (
            <Button className="PurpleButton whitespace-nowrap text-base font-normal text-DarkBackground dark:text-dark" onClick={() => ModuleListFuncall(row?._id)}> <div className="flex items-center gap-x-2"> <HiKey className="text-lg" /> Role Access List </div>  </Button>
          )}
        </div>
      ),
    },
    // {
    //   key: "actions",
    //   label: "Actions",
    // },
  ], [accessList, DeleteFuncall]);

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

  useEffect(() => {
    let requserdata: { page: number; size: number; search?: string } = {
      page: PageNo,
      size: RoePerPage
    };
    if (searchData)  requserdata.search = searchData;
    dispatch(getRoleslist(requserdata));
    setLoader(true)
  }, [dispatch, PageNo, RoePerPage,searchData]);

  useEffect(() => {
    setRoleList(Roleslist ? Roleslist : null);
    setTotalListData(TotalRoleListData ? TotalRoleListData : 0);
    setCurrentPageNo(CurrentPage ? CurrentPage : 1);
    setLoader(false)
  }, [Roleslist, TotalRoleListData, CurrentPage]);

  const ModuleListFuncall = (id: any) => {
    navigate(`/role-access/${id}`);
  };

  const OpenAddModel = () =>{
    navigate("/roles/add");
  }

  let Name = "Role";
  let Searchplaceholder = "Search For Role (Name)";
  let AddAccess = accessList?.add;

  return (
    <>
      <NavbarSidebarLayout  isSidebar={true} isNavbar={true}  >
        {loader ? <LoaderPage /> :
          <>
            <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} isOpenAddModel= {OpenAddModel} AddAccess={AddAccess}/>
              <CommonTable columns={roleColumns} data={RolesList || []} />
            <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}   RowsPerPageValue={RoePerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
          </>
        }
      </NavbarSidebarLayout>

      {isOpenDelteModel && (
        <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-Cosmos bg-opacity-75 z-50"> <div className="text-White">Loading...</div> </div>}>
          <DeleteModalPage isOpenDelteModel={isOpenDelteModel} name={"role"} setisOpenDelteModel={setisOpenDelteModel} DelCall={DelRole} />
        </Suspense>
      )}
      <ToastMessage />
    </>
  );
};

export default RolesPage;