import { Button, Table} from "flowbite-react";
import type { FC } from "react";
import { HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import LoaderPage from "../../../components/common/loader/loader";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import { DeleteTagloglist, getTagloglist } from "../../../Store/actions";
import UseAccessList from "../../../hooks/useAccessList";
import CommonTable from "../../../components/common/table/commonTable";
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const DeleteModalPage = lazy(() => import("../../../components/common/modal/deleteModal"));
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));

const TestimonialListPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [TaglogList, setTaglogList] = useState([]);
  const [loader, setLoader] = useState(false);
  
    const { Tagloglist,  TagloglistSize, TotalTaglogData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
      Tagloglist: state.Taglog.Tagloglist,
      TagloglistSize: state.Taglog.TagloglistSize,
      TotalTaglogData: state.Taglog.TotalTaglogData,
      CurrentPage: state.Taglog.CurrentPage,
      permissionsdata: state.Login.permissionsdata
    }));
    
  const accessList = UseAccessList(permissionsdata, "Testimonial");

  console.log("accessList", accessList);
  
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

  const OpenAddModel  = useCallback((path: string) => {
    navigate("/testimonial/add")
  },[navigate]);

  let Name = "Testimonial List";
  let Searchplaceholder = "Search For Testimonial (Name)";
  let AddAccess = accessList?.add;

  const testimonialColumns = useMemo(() => [
    {
      key: "name",
      label: "Image",
    },
    {
      key: "taglog_name",
      label: "Name",
    },
    {
      key: "desctiption",
      label: "Desctiption",
    },
    {
      key: "created_at",
      label: "Created At",

    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex items-center gap-x-3">
          {accessList?.delete && (
            <Button gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(row._id)}> <div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" /> Delete Testimonial </div> </Button>
          )}
        </div>
      ),
    },
  ], [accessList, DeleteFuncall]);

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
        {loader ? <LoaderPage /> :
          <>
            <ExampleBreadcrumb Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename={Changename} isOpenAddModel={OpenAddModel} AddAccess={AddAccess} />
            <CommonTable columns={testimonialColumns} data={TaglogList || []} />
            <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
          </>
        }
      </NavbarSidebarLayout>

      {isOpenDelteModel && (
        <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"> <div className="text-white">Loading...</div> </div>}>
          <DeleteModalPage isOpenDelteModel={isOpenDelteModel} name={"testimonial"} setisOpenDelteModel={setisOpenDelteModel} DelCall={DeletepackingType} />
        </Suspense>
      )}

      <ToastMessage />      
    </>
  );
};

export default TestimonialListPage;