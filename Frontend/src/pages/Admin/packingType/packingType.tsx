import { lazy, FC, Suspense, useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "flowbite-react";
import moment from "moment";
import { HiTrash} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FaExchangeAlt } from "react-icons/fa";
import { getPackingTypelist, DeletePackingTypelist, ChangeStatusPackingTypelist } from "../../../Store/actions";
import UseAccessList from "../../../hooks/useAccessList";
import LoaderPage from "../../../components/common/loader/loader";
const CommonTable = lazy(() => import("../../../components/common/table/commonTable"));
const ChangeStausModal = lazy(() => import("../../../components/common/modal/changeStatusModal"));
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));
const DeleteModalPage = lazy(() => import("../../../components/common/modal/deleteModal"));
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const PackinTypeListPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [PackingTypeList, setPackingTypeList] = useState([]);
  
  //------------ Access Data Code start------------
  const [loader, setLoader] = useState(false);

  const { Packingtypelist, PackingtypelistSize, TotalPackingtypeData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
    Packingtypelist: state.PackingType.Packingtypelist,
    PackingtypelistSize: state.PackingType.PackingtypelistSize,
    TotalPackingtypeData: state.PackingType.TotalPackingtypeData,
    CurrentPage: state.PackingType.CurrentPage,
    permissionsdata: state.Login.permissionsdata
  }));
  const accessList = UseAccessList(permissionsdata, "Packing Type");
  //--------- Access Data Code end------------------

  // ----------- next Button  Code Start -------------
    const [TotalListData, setTotalListData] = useState(0);
    const [CurrentPageNo, setCurrentPageNo] = useState(0);
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
    useEffect(() => {
      let requserdata: { page: number; size: number; search?: string } = {
        page: PageNo,
        size: RoePerPage
      };
      if (searchData)  requserdata.search = searchData;
      dispatch(getPackingTypelist(requserdata));
      setLoader(true)
    }, [dispatch, PageNo, RoePerPage, searchData]);

    useEffect(() => {  
      setPackingTypeList(Packingtypelist ? Packingtypelist : null);
      setTotalListData(TotalPackingtypeData ? TotalPackingtypeData : 0);
      setCurrentPageNo(CurrentPage ? CurrentPage : 1);
      setLoader(false)
    }, [Packingtypelist,  PackingtypelistSize, TotalPackingtypeData, CurrentPage]);
  //  ------------- Get Data From Reducer Code end --------------

  // ------------  Delete Code Start ------------
    const [Delete_id, set_Delete_id] = useState(0);
    const DeleteFuncall = (id: any) => {
      set_Delete_id(id);
      setisOpenDelteModel(true);
    };

    const DeletepackingType = () => {
      let rqeuserdata = { id: Delete_id };
      dispatch(DeletePackingTypelist(rqeuserdata));
      setisOpenDelteModel(false);
    };
  // -------  Delete Code End ---------------

  const OpenAddModel = () =>{
    navigate("/packing-type/add")
  }

  const DetailsPageCall = (id:any) =>{
    navigate(`/packing-type/details/${id}`)
  }

  const [ confirmationModal, setConfirmationModal ] = useState(false);
  const [ changeStausid, setChangeStatusid ] = useState("")
  const ChangestatusFuncall = (id: any) =>{
    setConfirmationModal(true);
    setChangeStatusid(id)
  }
    
  const ChangestatusCall = () =>{
    let requserdata = { id: changeStausid};
    dispatch(ChangeStatusPackingTypelist(requserdata)); 
    setConfirmationModal(false);
    setChangeStatusid("")
  }

  let Name = "Packing Type";
  let Searchplaceholder = "Search For Packing Types (Name)";
  let AddAccess = accessList?.add;

  const packingtypeColumns = useMemo(() => [
    {
      key: "type_eng",
      label: "Type (Eng)",
    },
    {
      key: "type_guj",
      label: "Type (Guj)",
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
          {accessList?.edit ? <Button className="PurpleButton" onClick={() => ChangestatusFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton min-w-[5rem] text-center font-semibold"> <FaExchangeAlt className="text-lg font-semibold" />  Change status </div> </Button> : null}
          {accessList?.delete ? <Button className="PinkButton" onClick={() => DeleteFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Delete Packing </div> </Button> : null}
        </div>
      ),
    },
  ], [accessList, DeleteFuncall]);

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true} >

        {loader ? <LoaderPage /> :
          <>
            <ExampleBreadcrumb Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename={Changename} isOpenAddModel={OpenAddModel} AddAccess={AddAccess} />
            <CommonTable columns={packingtypeColumns} data={PackingTypeList || []} />
            <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
          </>
        }
      </NavbarSidebarLayout>
    
        {isOpenDelteModel && (
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-Cosmos bg-opacity-75 z-50"> <div className="text-White">Loading...</div> </div> }>
            <DeleteModalPage  isOpenDelteModel={isOpenDelteModel}  name={"packing type"} setisOpenDelteModel={setisOpenDelteModel}  DelCall={DeletepackingType} />
          </Suspense>
        )}
      
       {confirmationModal && (
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-Cosmos bg-opacity-75 z-50"> <div className="text-White">Loading...</div> </div>}>
            <ChangeStausModal confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal} ConfirmCall={ChangestatusCall} />
          </Suspense>
        )}

      <ToastMessage />       
    </>
  );
};

export default PackinTypeListPage;