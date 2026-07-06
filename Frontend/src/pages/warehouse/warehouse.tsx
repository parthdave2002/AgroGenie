import { lazy,FC, Suspense, useEffect, useState, useMemo } from "react";
import moment from "moment";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DeleteWarehouselist,  getWarehouselist } from "../../Store/actions";
import UseAccessList from "../../hooks/useAccessList";
import { FaExchangeAlt, FaExclamationCircle } from "react-icons/fa";
const DeleteModalPage = lazy(() => import("../../components/common/modal/deleteModal"));
const ChangeStausModal = lazy(() => import("../../components/common/modal/changeStatusModal"));
const ToastMessage = lazy(() => import("../../components/common/toastmessage/ToastMessage"));
const ExamplePagination = lazy(() => import("../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../components/common/breadcrumb/breadcrumb"));
const CommonTable = lazy(() => import("../../components/common/table/commonTable"));
const NavbarSidebarLayout = lazy(() => import("../../layouts/navbar-sidebar"));

const WarehousePage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [WarehouseDataList, setWarehouseDataList] = useState([]);
  
  //------------ Access Data Code start------------
    const { Warehouselist, WarehouselistSize, TotalWarehouseData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
      Warehouselist: state.Warehouse.Warehouselist,
      WarehouselistSize: state.Warehouse.WarehouselistSize,
      TotalWarehouseData: state.Warehouse.TotalWarehouseData,
      CurrentPage: state.Warehouse.CurrentPage,
      permissionsdata: state.Login.permissionsdata
    }));

    const accessList = UseAccessList(permissionsdata, "Warehouse");
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

  // ---------------- Search code start ----------------
    const [searchData, setSearchData] = useState(null);
    const Changename = (data:any) =>{
      setSearchData(data)
    }
  // ---------------- Search code end ----------------

  // ------------- Get  Data From Reducer Code Start --------------
    useEffect(() => {
      let requserdata: { page: number; size: number; search?: string } = {
        page: PageNo,
        size: RoePerPage
      };
      if (searchData)  requserdata.search = searchData;
      dispatch(getWarehouselist(requserdata));
    }, [dispatch, PageNo, RoePerPage, searchData]);

    useEffect(() => {        
      setWarehouseDataList(Warehouselist? Warehouselist : []);
      setTotalListData(TotalWarehouseData ? TotalWarehouseData : 0);
      setCurrentPageNo(CurrentPage ? CurrentPage : 1);
    }, [Warehouselist,  WarehouselistSize, TotalWarehouseData, CurrentPage]);
  //  ------------- Get Data From Reducer Code end --------------

  // ------------  Delete Code Start ------------
    const [Delete_id, set_Delete_id] = useState(0);
    const DeleteFuncall = (id: any) => {
      set_Delete_id(id);
      setisOpenDelteModel(true);
    };

    const Deletewarehouse = () => {
      let rqeuserdata = { id: Delete_id };
      dispatch(DeleteWarehouselist(rqeuserdata));
      setisOpenDelteModel(false);
    };
  // -------  Delete Code End ---------------

    const [ confirmationModal, setConfirmationModal ] = useState(false);
    const [ changeStausid, setChangeStatusid ] = useState("")
    const ChangestatusFuncall = (id: any) =>{
      setConfirmationModal(true);
      setChangeStatusid(id)
    }
    const ChangestatusCall = () =>{
      let requserdata = { id: changeStausid};
      dispatch(DeleteWarehouselist(requserdata)); 
      setConfirmationModal(false);
      setChangeStatusid("")
    }

  const OpenAddModel = () =>{
    navigate("/warehouse/add")
  }

  const DetailsWarehouseCall = (id:any) =>{
    navigate(`/warehouse/details/${id}`)
  }

  let Name = "Warehouse";
  let Searchplaceholder = "Search For Warehouse (Name)";
  let AddAccess = accessList?.add;

  const warehouseColumns = useMemo(() => [
    {  key: "name", label: "Name" },
    {  key: 'location', label : "Location",  render : ( row : any) => row.location },
    {  key: 'address', label : "Address",  render : ( row : any) => row.address },
    {  key: "is_active",  label: "Status",  render: (row: any) => row.is_active ? <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div> : <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Deactive </div> },
    {  key: "createdAt", label: "Created At",  render : (row :any) => ( <div> {moment(row?.createdAt).format("DD-MM-YYYY hh:mm:ss")} </div>) },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex items-center gap-x-3">
          {accessList?.edit ? <Button className="PurpleButton" onClick={() => ChangestatusFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton min-w-[5rem] text-center font-semibold"> <FaExchangeAlt className="text-lg font-semibold" />  Change status </div> </Button> : null}
          {/* {accessList?.delete && <Button className="PinkButton" onClick={() => DeleteFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Delete  Warehouse </div> </Button>} */}
           <Button className="PurpleButton" onClick={() => DetailsWarehouseCall(row._id)} > <div className="flex items-center gap-x-2 deletebutton"> <FaExclamationCircle className="text-lg" /> Detail Warehouse </div> </Button>
        </div>
      ),
    },
  ], [accessList, DeleteFuncall]);
  
  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
        <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} isOpenAddModel= {OpenAddModel} AddAccess={AddAccess}/>
          <CommonTable columns={warehouseColumns} data={WarehouseDataList || []} />  
        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}   RowsPerPageValue={RoePerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
      </NavbarSidebarLayout>
    
        {isOpenDelteModel && (
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-Cosmos bg-opacity-75 z-50"> <div className="text-White">Loading...</div> </div> }>
            <DeleteModalPage  isOpenDelteModel={isOpenDelteModel}  name={"Warehouse"} setisOpenDelteModel={setisOpenDelteModel}  DelCall={Deletewarehouse} />
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

export default WarehousePage;