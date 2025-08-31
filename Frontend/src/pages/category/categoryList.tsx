/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Checkbox, Table} from "flowbite-react";
import type { FC } from "react";
import { HiTrash} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { ChangeStatusCategorylist, DeleteCategorylist,  getCategorylist } from "../../Store/actions";
import { lazy, Suspense, useEffect, useState } from "react";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useNavigate } from "react-router";
import moment from "moment";
import { FaExchangeAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import LoaderPage from "../../components/loader";
const IMG_URL = import.meta.env["VITE_API_URL"];
const DeleteModalPage = lazy(() => import("../../components/modal/deleteModal"));
const ToastMessage = lazy(() => import("../../components/ToastMessage"));

const CategoryListPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [Categorylistdata, setCategorylistdata] = useState([]);
  
  //------------ Access Data Code start------------
  interface AccessData{
    add: boolean;
    view: boolean;
    edit: boolean;
    delete: boolean;
  }
  const [AccessList, setAccessList] = useState<AccessData>();
  const [loader, setLoader] = useState(false);

  //--------- Access Data Code end------------------
  
    const { Categorylist,  CategorylistSize, TotalCategoryData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
      Categorylist: state.Category.Categorylist,
      CategorylistSize: state.Category.CategorylistSize,
      TotalCategoryData: state.Category.TotalCategoryData,
      CurrentPage: state.Category.CurrentPage,
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
        const userPermissions = permissionsdata && permissionsdata?.find((item: any) => item.module_name === "Category")?.permissions;
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
      let requserdata: { page: number; size: number; search?: string } = {
        page: PageNo,
        size: RoePerPage
      };
      if (searchData)  requserdata.search = searchData;
      dispatch(getCategorylist(requserdata));
      setLoader(true)
    }, [dispatch, PageNo, RoePerPage, searchData]);

    useEffect(() => {     
      setCategorylistdata(Categorylist? Categorylist : []);
      setTotalListData(TotalCategoryData ? TotalCategoryData : 0);
      setCurrentPageNo(CurrentPage ? CurrentPage : 1);
      setLoader(false)
    }, [Categorylist,  CategorylistSize, TotalCategoryData, CurrentPage]);
  //  ------------- Get Data From Reducer Code end --------------

  // ------------  Delete Code Start ------------
    const [Delete_id, set_Delete_id] = useState(0);
    const DeleteFuncall = (id: any) => {
      set_Delete_id(id);
      setisOpenDelteModel(true);
    };

    const DeleteCategoryData = () => {
      let rqeuserdata = { id: Delete_id };
      dispatch(DeleteCategorylist(rqeuserdata));
      setisOpenDelteModel(false);
    };
  // -------  Delete Code End ---------------

  // --------- Checkbox Code start ------------
    const CheckData = (data:any) =>{
      console.log(data)
    }
  // --------- Checkbox Code end ------------

  const OpenAddModel = () =>{
    navigate("/category/add")
  }

  const DetailsPageCall = (id:any) =>{
    navigate(`/category/details/${id}`)
  }

  const ChangestatusFuncall = (id: any) =>{
    let requserdata = { id: id};
    dispatch(ChangeStatusCategorylist(requserdata)); 
  }

  let Name = "Category List";
  let Searchplaceholder = "Search For Category (Name)";
  let AddAccess = AccessList?.add;

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>

        {loader ? <LoaderPage /> :
        <>
          <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} isOpenAddModel= {OpenAddModel} AddAccess={AddAccess}/>
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
              <Table.Head className="bg-gray-100 dark:bg-gray-700">
                <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Name (Eng )</Table.HeadCell>
                <Table.HeadCell>Name ( Guj )</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Created At</Table.HeadCell>
                {AccessList?.edit || AccessList?.delete ?  <Table.HeadCell>Actions</Table.HeadCell> : null }
              </Table.Head>

              <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {Categorylistdata && Categorylistdata.map((item: any, k) => (
                        <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                          <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }}>  <Checkbox  value={item?._id} onClick={() => {CheckData(item?._id)}}/>  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0" style={{padding: "10px"}}>  <img  src={`${IMG_URL}/public/category/${item.category_pic}`}   alt="Category" className="h-16 w-16 object-cover rounded-full"  />   </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.name_eng} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.name_guj} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                            {item.is_active == true ? <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active  </div>
                            : <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div> Deactive  </div>}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item?.added_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                          {AccessList?.edit || AccessList?.delete ?
                          <Table.Cell className="space-x-2 whitespace-nowrap py-0">
                            <div className="flex items-center gap-x-3">
                             {AccessList?.edit ? <Button  gradientDuoTone="greenToBlue" onClick={() => ChangestatusFuncall(item?._id)}><div className="flex items-center gap-x-2 deletebutton min-w-[5rem] text-center font-semibold"> <FaExchangeAlt className="text-lg font-semibold" />  Change status </div> </Button> : null} 
                              {AccessList?.delete ?  <Button  gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(item?._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Delete Category </div> </Button> : null }  
                            </div>
                          </Table.Cell>
                          : null }
                        </Table.Row>
                  ))}
              </Table.Body>
          </Table>
          <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}   RowsPerPageValue={RoePerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
        </>
        }
      </NavbarSidebarLayout>
    
        {isOpenDelteModel && (
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"> <div className="text-white">Loading...</div> </div> }>
            <DeleteModalPage  isOpenDelteModel={isOpenDelteModel}  name={"Category"} setisOpenDelteModel={setisOpenDelteModel}  DelCall={DeleteCategoryData} />
          </Suspense>
        )}

        <ToastMessage />     
    </>
  );
};

export default CategoryListPage;