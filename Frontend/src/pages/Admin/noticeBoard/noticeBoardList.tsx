import { lazy,FC, Suspense, useEffect, useState, useMemo } from "react";
import { Button } from "flowbite-react";
import { HiTrash} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import { DeleteNoticeBoardlist,  getNoticeBoardlist } from "../../../Store/actions";
import UseAccessList from "../../../hooks/useAccessList";
import CommonTable from "../../../components/common/table/commonTable";
import moment from "moment";
import { FaExclamationCircle } from "react-icons/fa";
const DeleteModalPage = lazy(() => import("../../../components/common/modal/deleteModal"));
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const NoticeBoardListPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [BoardDataList, setBoardDataList] = useState([]);
  
  //------------ Access Data Code start------------
    const { Baorddatalist, BoardlistSize, TotalBoardData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
      Baorddatalist: state.NoticeBoard.Baorddatalist,
      BoardlistSize: state.NoticeBoard.BoardlistSize,
      TotalBoardData: state.NoticeBoard.TotalBoardData,
      CurrentPage: state.NoticeBoard.CurrentPage,
      permissionsdata: state.Login.permissionsdata
    }));

    const accessList = UseAccessList(permissionsdata, "Banner");
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
      dispatch(getNoticeBoardlist(requserdata));
    }, [dispatch, PageNo, RoePerPage, searchData]);

    useEffect(() => {        
      setBoardDataList(Baorddatalist? Baorddatalist : []);
      setTotalListData(TotalBoardData ? TotalBoardData : 0);
      setCurrentPageNo(CurrentPage ? CurrentPage : 1);
    }, [Baorddatalist,  BoardlistSize, TotalBoardData, CurrentPage]);
  //  ------------- Get Data From Reducer Code end --------------

  // ------------  Delete Code Start ------------
    const [Delete_id, set_Delete_id] = useState(0);
    const DeleteFuncall = (id: any) => {
      set_Delete_id(id);
      setisOpenDelteModel(true);
    };

    const DeleteboardType = () => {
      let rqeuserdata = { id: Delete_id };
      dispatch(DeleteNoticeBoardlist(rqeuserdata));
      setisOpenDelteModel(false);
    };
  // -------  Delete Code End ---------------

  const OpenAddModel = () =>{
    navigate("/notice-board/add")
  }

  const DetailsFuncall = (id: string) => {
    navigate(`/notice-board/details/${id}`)
  }

  let Name = "Notice Board List";
  // let Searchplaceholder = "Search For Banner (Name)";
  let AddAccess = accessList?.add;

  const bannerColumns = useMemo(() => [
    {  key: "name", label: "Name" },
    {  key : 'type_document', label : "Document Type",  render : ( row : any) => row.type_document.charAt(0).toUpperCase() + row.type_document.slice(1).toLowerCase() },
    {  key : 'duration', label : "Duration", render : ( row : any) =>  row.duration.charAt(0).toUpperCase() + row.duration.slice(1).toLowerCase() },
    {  key : 'send_to', label : "Whom to send", render : ( row : any) =>  row.send_to.charAt(0).toUpperCase() + row.send_to.slice(1).toLowerCase() },
    {  key: "is_active",  label: "Status",  render: (row: any) => row.is_active ? <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div> : <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Deactive </div> },
    {  key: "createdAt", label: "Created At",  render : (row :any) => ( <div> {moment(row?.createdAt).format("DD-MM-YYYY hh:mm:ss")} </div>) },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex items-center gap-x-3">
          {accessList?.delete && <Button gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Delete  Notice </div> </Button>}
          <Button gradientDuoTone="purpleToBlue" onClick={() => DetailsFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton"> <FaExclamationCircle className="text-lg" />  Details Notice </div> </Button>
        </div>
      ),
    },
  ], [accessList, DeleteFuncall]);
  
  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
        <ExampleBreadcrumb  Name={Name} searchData={searchData} Changename= {Changename} isOpenAddModel= {OpenAddModel} AddAccess={AddAccess}/>
          <CommonTable columns={bannerColumns} data={BoardDataList || []} />  
        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}   RowsPerPageValue={RoePerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
      </NavbarSidebarLayout>
    
        {isOpenDelteModel && (
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"> <div className="text-white">Loading...</div> </div> }>
            <DeleteModalPage  isOpenDelteModel={isOpenDelteModel}  name={"Notice"} setisOpenDelteModel={setisOpenDelteModel}  DelCall={DeleteboardType} />
          </Suspense>
        )}
        <ToastMessage />
                  
    </>
  );
};

export default NoticeBoardListPage;