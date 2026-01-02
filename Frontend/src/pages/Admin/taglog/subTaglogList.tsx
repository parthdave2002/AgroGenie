/* eslint-disable jsx-a11y/anchor-is-valid */
import { lazy, Suspense,FC, useCallback, useEffect, useState, useMemo } from "react";
import { Button } from "flowbite-react";
import {  HiTrash} from "react-icons/hi";
import moment from "moment";
import { FaExchangeAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ChangeStatusSubTagloglist, DeleteSubTagloglist,  getSubTagloglist } from "../../../Store/actions";
import UseAccessList from "../../../hooks/useAccessList";
import CommonTable from "../../../components/common/table/commonTable";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
const DeleteModalPage = lazy(() => import("../../../components/common/modal/deleteModal"));
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const SubTaglogListPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams()
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [TaglogList, setTaglogList] = useState([]);
  
  //------------ Access Data Code start------------
  const { SubTagloglist, SubTagloglistSize, SubTotalTaglogData, SubCurrentPage, permissionsdata } = useSelector((state: any) => ({
    SubTagloglist: state.Taglog.SubTagloglist,
    SubTagloglistSize: state.Taglog.SubTagloglistSize,
    SubTotalTaglogData: state.Taglog.SubTotalTaglogData,
    SubCurrentPage: state.Taglog.SubCurrentPage,
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
      let requserdata: { id: string | undefined; page: number; size: number; search?: string } = {
        id : id,
        page: PageNo,
        size: RoePerPage
      };
      if (searchData)  requserdata.search = searchData;
      dispatch(getSubTagloglist(requserdata));
    }, [dispatch, PageNo, RoePerPage, searchData]);

    useEffect(() => {        
      setTaglogList(SubTagloglist? SubTagloglist : []);
      setTotalListData(SubTotalTaglogData ? SubTotalTaglogData : 0);
      setCurrentPageNo(SubCurrentPage ? SubCurrentPage : 1);
    }, [SubTagloglist,  SubTagloglistSize, SubTotalTaglogData, SubCurrentPage]);
  //  ------------- Get Data From Reducer Code end --------------

  // ------------  Delete Code Start ------------
    const [Delete_id, set_Delete_id] = useState(0);
    const DeleteFuncall = (id: any) => {
      set_Delete_id(id);
      setisOpenDelteModel(true);
    };

    const DeletepackingType = () => {
      let rqeuserdata = { taglog_id : id , id: Delete_id };
      dispatch(DeleteSubTagloglist(rqeuserdata));
      setisOpenDelteModel(false);
    };
  // -------  Delete Code End ---------------

  const ChangestatusFuncall = (data: string) => {
    let rqeuserdata = { taglog_id : id,   id: data };
    dispatch(ChangeStatusSubTagloglist(rqeuserdata))
  }

  let Name = "Sub-Taglog List";
  let Searchplaceholder = "Search For SubTaglog (Name)";
  let ParentName = "Taglog List";
  let ParentLink = "/taglog/list";

  const subTaglogColumns = useMemo(() => [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "is_active",
      label: "Status",
      render: (row: any) => row.is_active ? <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div> : <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Deactive </div>
    },
    {
      key: "role",
      label: "Created At",
      render: (row: any) => row?.added_at ? moment(row?.added_at).format("DD-MM-YYYY hh:mm:ss") : "-",
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex items-center gap-x-3">
          {accessList?.edit && (
            <Button gradientDuoTone="greenToBlue" onClick={() => ChangestatusFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton min-w-[5rem] text-center font-semibold"> <FaExchangeAlt className="text-lg font-semibold" />  Change status </div> </Button>
          )}

          {accessList?.delete && (
            <Button gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Delete Sub Taglog </div> </Button>
          )}
        </div>
      ),
    },
  ], [accessList, DeleteFuncall]);

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true} >
        <ExampleBreadcrumb Name={Name} ParentName={ParentName} ParentLink={ParentLink} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename={Changename} />
        <CommonTable columns={subTaglogColumns} data={TaglogList || []} />
        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
      </NavbarSidebarLayout>
    
        {isOpenDelteModel && (
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"> <div className="text-white">Loading...</div> </div> }>
            <DeleteModalPage  isOpenDelteModel={isOpenDelteModel}  name={"Subtaglog"} setisOpenDelteModel={setisOpenDelteModel}  DelCall={DeletepackingType} />
          </Suspense>
        )}

      <ToastMessage />      
    </>
  );
};

export default SubTaglogListPage;