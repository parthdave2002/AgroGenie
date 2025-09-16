/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "flowbite-react";
import { HiTrash} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import moment from "moment";
import { FaExchangeAlt } from "react-icons/fa";
import { ChangeStatusCompanylist, DeleteCompanylist,  getCompanylist } from "../../../Store/actions";
import UseAccessList from "../../../hooks/useAccessList";
import LoaderPage from "../../../components/common/loader/loader";
import CommonTable from "../../../components/common/table/commonTable";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
const DeleteModalPage = lazy(() => import("../../../components/common/modal/deleteModal"));
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const CompanyListPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [PackingTypeList, setPackingTypeList] = useState([]);
  
  //------------ Access Data Code start------------
    const { Companylist,  CompanylistSize, TotalCompanyData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
      Companylist: state.Company.Companylist,
      CompanylistSize: state.Company.CompanylistSize,
      TotalCompanyData: state.Company.TotalCompanyData,
      CurrentPage: state.Company.CurrentPage,
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
    useEffect(() => {
      let requserdata = {
        page: PageNo,
        size: RoePerPage,
        search: searchData
      };
      dispatch(getCompanylist(requserdata));
      setLoader(true)
    }, [dispatch, PageNo, RoePerPage, searchData]);

    useEffect(() => {        
      setPackingTypeList(Companylist? Companylist : []);
      setTotalListData(TotalCompanyData ? TotalCompanyData : 0);
      setCurrentUserListSize(CompanylistSize ? CompanylistSize : 0);
      setCurrentPageNo(CurrentPage ? CurrentPage : 1);
      setLoader(false)
    }, [Companylist,  CompanylistSize, TotalCompanyData, CurrentPage]);
  //  ------------- Get Data From Reducer Code end --------------

  // ------------  Delete Code Start ------------
    const [Delete_id, set_Delete_id] = useState(0);
    const DeleteFuncall = (id: any) => {
      set_Delete_id(id);
      setisOpenDelteModel(true);
    };

    const DeletepackingType = () => {
      let rqeuserdata = { id: Delete_id };
      dispatch(DeleteCompanylist(rqeuserdata));
      setisOpenDelteModel(false);
    };
  // -------  Delete Code End ---------------

  const OpenAddModel = () =>{
    navigate("/company/add")
  }


  const ChangestatusFuncall = (id:any) =>{
    let requserdata = { id: id};
    dispatch(ChangeStatusCompanylist(requserdata)); 
  }

  let Name = "Company List";
  let Searchplaceholder = "Search For Company (Name)";
  let AddAccess = accessList?.add;

    const companyColumns =useMemo( () => [
      {
        key: "name_eng",
        label: "Name (Eng)",
      },
      {
        key: "name_guj",
        label: "Name (Guj)",
      },
      {
        key: "description",
        label: "Description",
      },
      {
        key: "is_active",
        label: "Status",
        render: (row: any) => row.is_active ?  <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div> :  <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Deactive </div>
      },
      {
        key: "is_active",
        label: "Created Date",
        render: (row: any) => (
          <div> {moment(row?.added_at).format("DD-MM-YYYY hh:mm:ss")} </div>
        )
      },
      {
        key: "actions",
        label: "Actions",
        render: (row: any) => (
          <div className="flex items-center gap-x-3">
            {accessList?.edit ? <Button gradientDuoTone="greenToBlue" onClick={() => ChangestatusFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton min-w-[5rem] text-center font-semibold"> <FaExchangeAlt className="text-lg font-semibold" />  Change status </div> </Button> : null}
            {accessList?.delete ? <Button gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Delete Company</div> </Button> : null}
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
            <CommonTable columns={companyColumns} data={PackingTypeList || []} />
            <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
          </>
        }
      </NavbarSidebarLayout>

        {isOpenDelteModel && (
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"> <div className="text-white">Loading...</div> </div> }>
            <DeleteModalPage  isOpenDelteModel={isOpenDelteModel}  name={"Company"} setisOpenDelteModel={setisOpenDelteModel}  DelCall={DeletepackingType} />
          </Suspense>
        )}
        
        <ToastMessage />
    </>
  );
};

export default CompanyListPage;