/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Checkbox, Table} from "flowbite-react";
import type { FC } from "react";
import {  HiTrash} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { ChangeStatusSubTagloglist, DeleteSubTagloglist,  getSubTagloglist } from "../../Store/actions";
import { lazy, Suspense, useEffect, useState } from "react";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useNavigate, useParams } from "react-router";
import moment from "moment";
import { FaExchangeAlt } from "react-icons/fa";
import Cookies from "js-cookie";
const DeleteModalPage = lazy(() => import("../../components/modal/deleteModal"));
const ToastMessage = lazy(() => import("../../components/ToastMessage"));

const SubTaglogListPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams()
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [TaglogList, setTaglogList] = useState([]);
  
  //------------ Access Data Code start------------
  interface AccessData{
    add: boolean;
    view: boolean;
    edit: boolean;
    delete: boolean;
  }
  const [AccessList, setAccessList] = useState<AccessData>();

  //--------- Access Data Code end------------------
  
    const { SubTagloglist,  SubTagloglistSize, SubTotalTaglogData, SubCurrentPage, permissionsdata } = useSelector((state: any) => ({
        SubTagloglist: state.Taglog.SubTagloglist,
        SubTagloglistSize: state.Taglog.SubTagloglistSize,
        SubTotalTaglogData: state.Taglog.SubTotalTaglogData,
        SubCurrentPage: state.Taglog.SubCurrentPage,
      permissionsdata: state.Login.permissionsdata
    }));
    
    useEffect(() =>{
      const user = Cookies.get("role");
      if (user === "67b388a7d593423df0e24295") {
        setAccessList({
          add: true,
          view: true,
          edit: true,
          delete: true,
        })
      }
      else {
        const userPermissions = permissionsdata && permissionsdata?.find((item: any) => item.module_name === "Taglog")?.permissions;
        setAccessList(userPermissions || []);
      }
    },[permissionsdata]);
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

  // --------- Checkbox Code start ------------
    const CheckData = (data:any) =>{
      console.log(data)
    }
  // --------- Checkbox Code end ------------

  const OpenAddModel = () =>{
    navigate("/taglog/add")
  }


  const ChangestatusFuncall = (data: string) => {
    let rqeuserdata = { taglog_id : id,   id: data };
    dispatch(ChangeStatusSubTagloglist(rqeuserdata))
  }

  let Name = "Sub-Taglog List";
  let Searchplaceholder = "Search For SubTaglog (Name)";
  let AddAccess = AccessList?.add;
  let ParentName = "Taglog List";
  let ParentLink = "/taglog/list";


  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} />
    
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
              <Table.Head className="bg-gray-100 dark:bg-gray-700">
                <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Created At</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {TaglogList && TaglogList.map((item: any, k) => (
                        <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                          <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }}>  <Checkbox  value={item?._id} onClick={() => {CheckData(item?._id)}}/>  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.name} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                            {item.is_active == true ? <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active  </div>
                            : <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div> Deactive  </div>}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item?.added_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                          <Table.Cell className="space-x-2 whitespace-nowrap py-0">
                            <div className="flex items-center gap-x-3">
                              {AccessList?.edit ? <Button  gradientDuoTone="greenToBlue" onClick={() => ChangestatusFuncall(item?._id)}><div className="flex items-center gap-x-2 deletebutton min-w-[5rem] text-center font-semibold"> <FaExchangeAlt className="text-lg font-semibold" />  Change status </div> </Button> : null}
                              {AccessList?.delete ?  <Button  gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(item?._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Delete Sub Taglog </div> </Button> : null } 
                            </div>
                          </Table.Cell>
                        </Table.Row>
                  ))}
              </Table.Body>
          </Table>
          
          <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}   RowsPerPageValue={RoePerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
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