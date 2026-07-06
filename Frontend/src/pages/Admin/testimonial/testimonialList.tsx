import { Button } from "flowbite-react";
import type { FC } from "react";
import { HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import moment from "moment";
import { DeleteTagloglist, getTestimoniallist } from "../../../Store/actions";
import UseAccessList from "../../../hooks/useAccessList";
import LoaderPage from "../../../components/common/loader/loader";
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const DeleteModalPage = lazy(() => import("../../../components/common/modal/deleteModal"));
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));
const CommonTable = lazy(() => import("../../../components/common/table/commonTable"));
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));

const TestimonialListPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [TaglogList, setTestimonialList] = useState([]);
  const [loader, setLoader] = useState(false);
  
    const { Testimonialdatalist,  TestimoniallistSize, TotalTestimonialData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
      Testimonialdatalist: state.Testimonial.Testimonialdatalist,
      TestimoniallistSize: state.Testimonial.TestimoniallistSize,
      TotalTestimonialData: state.Testimonial.TotalTestimonialData,
      CurrentPage: state.Testimonial.CurrentPage,
      permissionsdata: state.Login.permissionsdata
    }));
    
  const accessList = UseAccessList(permissionsdata, "Testimonial");

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
      dispatch(getTestimoniallist(requserdata));
      setLoader(true)
    }, [dispatch, PageNo, RoePerPage, searchData]);

    useEffect(() => {        
      setTestimonialList(Testimonialdatalist? Testimonialdatalist : []);
      setTotalListData(TotalTestimonialData ? TotalTestimonialData : 0);
      setCurrentPageNo(CurrentPage ? CurrentPage : 1);
      setLoader(false)
    }, [Testimonialdatalist,  TestimoniallistSize, TotalTestimonialData, CurrentPage]);
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

  let Name = "Testimonial";
  let Searchplaceholder = "Search For Testimonial (Name)";
  let AddAccess = accessList?.add;

  const testimonialColumns = useMemo(() => [
    {
      key: "testimonial_pic",
      label: "Famer Image",
      render : ( row : any) => (
        <img  src={row?.testimonial_pic}   alt="farmer" className="h-16 w-16 object-cover rounded-full"  /> 
      )
    },
    {
      key: "name_eng",
      label: "Name (Eng)",
    },
    {
      key: "name_guj",
      label: "Name (Guj)",
    },
    {
      key: "body_eng",
      label: "Desctiption",
      render : (row:any) => <div className="max-w-[10rem] truncate"> {row?.body_eng} </div>
    },
    {
      key: "body_guj",
      label: "Desctiption (Guj)",
      render : (row:any) => <div className="max-w-[10rem] truncate"> {row?.body_guj} </div>
    },
    {
      key: "village_eng",
      label: "Village (Eng)",
    },
    {
      key: "village_guj",
      label: "Village (Guj)",
    },
    {
      key: "rating",
      label: "Rating",
    }, 
    {
      key: "createdAt",
      label: "Created At",
      render : (row:any) => <div > {moment(row?.createdAt).format("DD-MM-YYYY hh:mm:ss")} </div>
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex items-center gap-x-3">
          {accessList?.delete && ( <Button className="PinkButton" onClick={() => DeleteFuncall(row._id)}> <div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" /> Delete Testimonial </div> </Button> )}
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
        <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-Cosmos bg-opacity-75 z-50"> <div className="text-White">Loading...</div> </div>}>
          <DeleteModalPage isOpenDelteModel={isOpenDelteModel} name={"testimonial"} setisOpenDelteModel={setisOpenDelteModel} DelCall={DeletepackingType} />
        </Suspense>
      )}

      <ToastMessage />      
    </>
  );
};

export default TestimonialListPage;