import { lazy,FC, Suspense, useEffect, useState, useMemo } from "react";
import { Button } from "flowbite-react";
import { HiTrash} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import { DeleteBannerlist,  getBannerlist } from "../../../Store/actions";
import UseAccessList from "../../../hooks/useAccessList";
import CommonTable from "../../../components/common/table/commonTable";
import moment from "moment";
const DeleteModalPage = lazy(() => import("../../../components/common/modal/deleteModal"));
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const NoticeBoardListPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [BannerDataList, setBannerDataList] = useState([]);
  
  //------------ Access Data Code start------------
    const { Bannerlist, BannerlistSize, TotalBannerData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
      Bannerlist: state.Banner.Bannerlist,
      BannerlistSize: state.Banner.BannerlistSize,
      TotalBannerData: state.Banner.TotalBannerData,
      CurrentPage: state.Banner.CurrentPage,
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
      dispatch(getBannerlist(requserdata));
    }, [dispatch, PageNo, RoePerPage, searchData]);

    useEffect(() => {        
      setBannerDataList(Bannerlist? Bannerlist : []);
      setTotalListData(TotalBannerData ? TotalBannerData : 0);
      setCurrentPageNo(CurrentPage ? CurrentPage : 1);
    }, [Bannerlist,  BannerlistSize, TotalBannerData, CurrentPage]);
  //  ------------- Get Data From Reducer Code end --------------

  // ------------  Delete Code Start ------------
    const [Delete_id, set_Delete_id] = useState(0);
    const DeleteFuncall = (id: any) => {
      set_Delete_id(id);
      setisOpenDelteModel(true);
    };

    const DeletepackingType = () => {
      let rqeuserdata = { id: Delete_id };
      dispatch(DeleteBannerlist(rqeuserdata));
      setisOpenDelteModel(false);
    };
  // -------  Delete Code End ---------------

  const OpenAddModel = () =>{
    navigate("/notice-board/add")
  }

  let Name = "Notice Board List";
  let Searchplaceholder = "Search For Banner (Name)";
  let AddAccess = accessList?.add;

  const bannerColumns = useMemo(() => [
    {  key: "name", label: "Name" },
    {  key : 'banner_type', label : "Banner Type",  render : ( row : any) => row.banner_type.charAt(0).toUpperCase() + row.banner_type.slice(1).toLowerCase() },
    {  key : 'is_promotion', label : "Promotion Banner", render : ( row : any) => row.is_promotion ? <div className="flex items-center">  Yes </div> : <div className="flex items-center">  No </div>  },
    {  key: "is_active",  label: "Status",  render: (row: any) => row.is_active ? <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div> : <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Deactive </div> },
    {  key: "createdAt", label: "Created At",  render : (row :any) => ( <div> {moment(row?.createdAt).format("DD-MM-YYYY hh:mm:ss")} </div>) },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex items-center gap-x-3">
          {accessList?.delete && <Button gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Delete  Banner </div> </Button>}
        </div>
      ),
    },
  ], [accessList, DeleteFuncall]);
  
  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
        <ExampleBreadcrumb  Name={Name} searchData={searchData} Changename= {Changename} isOpenAddModel= {OpenAddModel} AddAccess={AddAccess}/>
          <CommonTable columns={bannerColumns} data={BannerDataList || []} />  
        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}   RowsPerPageValue={RoePerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
      </NavbarSidebarLayout>
    
        {isOpenDelteModel && (
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"> <div className="text-white">Loading...</div> </div> }>
            <DeleteModalPage  isOpenDelteModel={isOpenDelteModel}  name={"Banner"} setisOpenDelteModel={setisOpenDelteModel}  DelCall={DeletepackingType} />
          </Suspense>
        )}
        <ToastMessage />
                  
    </>
  );
};

export default NoticeBoardListPage;