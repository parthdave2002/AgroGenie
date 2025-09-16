import { lazy, Suspense,FC, useEffect, useState, useMemo } from "react";
import { Button } from "flowbite-react";
import { HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import moment from "moment";
import { FaExchangeAlt } from "react-icons/fa";
import { BiSolidAddToQueue } from "react-icons/bi";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import LoaderPage from "../../../components/common/loader/loader";
import { ChangeStatusTagloglist, DeleteTagloglist,  getTagloglist } from "../../../Store/actions";
import UseAccessList from "../../../hooks/useAccessList";
import CommonTable from "../../../components/common/table/commonTable";
const DeleteModalPage = lazy(() => import("../../../components/common/modal/deleteModal"));
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const TaglogListPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [TaglogList, setTaglogList] = useState([]);
  
  //------------ Access Data Code start------------
    const [loader, setLoader] = useState(false);

    const { Tagloglist,  TagloglistSize, TotalTaglogData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
      Tagloglist: state.Taglog.Tagloglist,
      TagloglistSize: state.Taglog.TagloglistSize,
      TotalTaglogData: state.Taglog.TotalTaglogData,
      CurrentPage: state.Taglog.CurrentPage,
      permissionsdata: state.Login.permissionsdata
    }));
    
    const accessList = UseAccessList(permissionsdata, "Taglog");
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
      dispatch(getTagloglist(requserdata));
      setLoader(true)
    }, [dispatch, PageNo, RoePerPage, searchData]);

    useEffect(() => {        
      setTaglogList(Tagloglist? Tagloglist : []);
      setTotalListData(TotalTaglogData ? TotalTaglogData : 0);
      setCurrentPageNo(CurrentPage ? CurrentPage : 1);
      setLoader(false)
    }, [Tagloglist,  TagloglistSize, TotalTaglogData, CurrentPage]);
  //  ------------- Get Data From Reducer Code end --------------

  // ------------  Delete Code Start ------------
    const [Delete_id, set_Delete_id] = useState(0);
    const DeleteFuncall = (id: any) => {
      set_Delete_id(id);
      setisOpenDelteModel(true);
    };

    const DeletepackingType = () => {
      let rqeuserdata = { id: Delete_id };
      dispatch(DeleteTagloglist(rqeuserdata));
      setisOpenDelteModel(false);
    };
  // -------  Delete Code End ---------------

  const OpenAddModel = () =>{
    navigate("/taglog/add")
  }

  const DetailsPageCall = (id:any) =>{
    navigate(`/taglog/details/${id}`)
  }

  const ChangestatusFuncall = (id: any) => {
    let rqeuserdata = { id: id };
    dispatch(ChangeStatusTagloglist(rqeuserdata))
  }

  const getEditTaglogData = (id:any) =>{
    navigate(`/subtaglog/list/${id}`)
  }

  const AddSubTaglogData = (id:any) =>{
    navigate(`/subtaglog/add/${id}`)
  }

  let Name = "Taglog List";
  let Searchplaceholder = "Search For Taglog (Name)";
  let AddAccess = accessList?.add;

  const taglogColumns = useMemo( () => [
    {
      key: "taglog_name",
      label: "Name",
    },
    {
      key: "is_active",
      label: "Status",
      render: (row: any) => row.is_active ?  <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div> :  <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Deactive </div>
    },
    {
      key: "added_at",
      label: "Created At",
      render: (row: any) => row.added_at ?  moment(row?.added_at).format("DD-MM-YYYY hh:mm:ss") :  "-"
    },
    {
      key: "actions",
      label: "Actions",
       render: (row: any) => (
         <div className="flex items-center gap-x-3">
           {accessList?.edit ? <Button gradientDuoTone="greenToBlue" onClick={() => ChangestatusFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton min-w-[5rem] text-center font-semibold"> <FaExchangeAlt className="text-lg font-semibold" />  Change status </div> </Button> : null}
           {accessList?.delete ? <Button gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Delete Taglog </div> </Button> : null}
           {accessList?.add ? <Button gradientDuoTone="greenToBlue" onClick={() => AddSubTaglogData(row?._id)} > <div className="flex items-center gap-x-2">  <BiSolidAddToQueue className="text-lg" />  Add Sub-Taglog  </div></Button> : null}
           {accessList?.add ? <Button gradientDuoTone="greenToBlue" onClick={() => getEditTaglogData(row?._id)} > <div className="flex items-center gap-x-2">  <BiSolidAddToQueue className="text-lg" />  Sub-Taglog  </div></Button> : null}
         </div>
    ),
    },
  ],[accessList, DeleteFuncall]);

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
        {loader ? <LoaderPage /> :
        <>
          <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} isOpenAddModel= {OpenAddModel} AddAccess={AddAccess}/>
            <CommonTable columns={taglogColumns} data={TaglogList || []} />
          <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}   RowsPerPageValue={RoePerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
          </>
          }
          </NavbarSidebarLayout>
    
        {isOpenDelteModel && (
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"> <div className="text-white">Loading...</div> </div> }>
            <DeleteModalPage  isOpenDelteModel={isOpenDelteModel}  name={"taglog"} setisOpenDelteModel={setisOpenDelteModel}  DelCall={DeletepackingType} />
          </Suspense>
        )}

      <ToastMessage />      
    </>
  );
};

export default TaglogListPage;