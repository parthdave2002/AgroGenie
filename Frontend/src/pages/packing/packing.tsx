/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Checkbox, Table} from "flowbite-react";
import type { FC } from "react";
import { HiTrash} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { DeletePackinglist, DeletePackingTypelist, getPackinglist } from "../../Store/actions";
import { lazy, Suspense, useEffect, useState } from "react";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useNavigate } from "react-router";
import moment from "moment";
const DeleteModalPage = lazy(() => import("../../components/modal/deleteModal"));

const PackingListPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [PackingTypeList, setPackingTypeList] = useState([]);
  
  //------------ Access Data Code start------------
  
  interface AccessData{
    add: boolean;
    view: boolean;
    edit: boolean;
    delete: boolean;
  }
  const [AccessList, setAccessList] = useState<AccessData>();

  //--------- Access Data Code end------------------
  
    const { Packinglist,  PackinglistSize, TotalPackingData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
      Packinglist: state.Packing.Packinglist,
      PackinglistSize: state.Packing.PackinglistSize,
      TotalPackingData: state.Packing.TotalPackingData,
      CurrentPage: state.Packing.CurrentPage,
      permissionsdata: state.Login.permissionsdata
    }));

    useEffect(() =>{
      const userPermissions = permissionsdata && permissionsdata?.find( (item:any) => item.module_name === "Taglog")?.permissions;
      setAccessList(userPermissions || [])
    },[permissionsdata]);
    
  // ----------- next Button  Code Start -------------
    const [TotalListData, setTotalListData] = useState(0);
    const [CurrentUserListSize, setCurrentUserListSize] = useState();
    const [CurrentPageNo, setCurrentPageNo] = useState(0);
    const [PageNo, setPageNo] = useState(1);
    const [RoePerPage, setRoePerPage] = useState(5);

    const RowPerPage = (value: any) => { setRoePerPage(value)};
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
      let requserdata = {
        page: PageNo,
        size: RoePerPage,
        search: searchData
      };
      dispatch(getPackinglist());
    }, [dispatch, PageNo, RoePerPage, searchData]);

    useEffect(() => {  
      setPackingTypeList(Packinglist ? Packinglist : null);
      setTotalListData(TotalPackingData ? TotalPackingData : 0);
      setCurrentUserListSize(PackinglistSize ? PackinglistSize : 0);
      setCurrentPageNo(CurrentPage ? CurrentPage : 1);
    }, [Packinglist,  PackinglistSize, TotalPackingData, CurrentPage]);
  //  ------------- Get Data From Reducer Code end --------------

  // ------------  Delete Code Start ------------
    const [Delete_id, set_Delete_id] = useState(0);
    const DeleteFuncall = (id: any) => {
      set_Delete_id(id);
      setisOpenDelteModel(true);
    };

    const DeletepackingType = () => {
      let rqeuserdata = { id: Delete_id };
      dispatch(DeletePackinglist(rqeuserdata));
      setisOpenDelteModel(false);
    };
  // -------  Delete Code End ---------------

  // --------- Checkbox Code start ------------
    const CheckData = (data:any) =>{
      console.log(data)
    }
  // --------- Checkbox Code end ------------

  const OpenAddModel = () =>{
    navigate("/packing/add")
  }

  const DetailsPageCall = (id:any) =>{
    navigate(`/packing/details/${id}`)
  }

  let Name = "Packing List";
  let Searchplaceholder = "Search For Packing (Name)";
  let AddAccess = AccessList?.add;

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
        <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} isOpenAddModel= {OpenAddModel} AddAccess={AddAccess}/>
    
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
              <Table.Head className="bg-gray-100 dark:bg-gray-700">
                <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                <Table.HeadCell>Packing Weight</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Created At</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
               
              </Table.Head>

              <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {PackingTypeList && PackingTypeList.map((item: any, k) => (
                        <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                          <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }}>  <Checkbox  value={item._id} onClick={() => {CheckData(item._id)}}/>  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.number} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                            {item.is_active == true ? <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active  </div>
                            : <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div> Deactive  </div>}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                          <Table.Cell className="space-x-2 whitespace-nowrap py-0">
                            <div className="flex items-center gap-x-3">
                              {AccessList?.delete ? <Button gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(item._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Delete </div> </Button> : null}
                              <Button gradientDuoTone="pinkToOrange" onClick={() => DetailsPageCall(item._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Details </div> </Button>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                  ))}
              </Table.Body>
          </Table>
          
        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
      </NavbarSidebarLayout>
    
        {isOpenDelteModel && (
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"> <div className="text-white">Loading...</div> </div> }>
            <DeleteModalPage  isOpenDelteModel={isOpenDelteModel}  name={"packing"} setisOpenDelteModel={setisOpenDelteModel}  DelCall={DeletepackingType} />
          </Suspense>
        )}
                  
    </>
  );
};

export default PackingListPage;