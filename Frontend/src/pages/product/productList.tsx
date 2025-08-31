/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Checkbox, Table} from "flowbite-react";
import type { FC } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { HiOutlinePencilAlt, HiTrash} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProductlist,  getProductlist } from "../../Store/actions";
import { lazy, Suspense, useEffect, useState } from "react";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import LoaderPage from "../../components/loader";
const ToastMessage = lazy(() => import("../../components/ToastMessage"));
const DeleteModalPage = lazy(() => import("../../components/modal/deleteModal"));

const ProductListPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [ProductList, setProductList] = useState([]);
  const [loader, setLoader] = useState(false);

  //------------ Access Data Code start------------
  interface AccessData{
    add: boolean;
    view: boolean;
    edit: boolean;
    delete: boolean;
  }
  const [AccessList, setAccessList] = useState<AccessData>();

  //--------- Access Data Code end------------------
  
    const { Productlist,  ProductlistSize, TotalProductData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
      Productlist: state.Product.Productlist,
      ProductlistSize: state.Product.ProductlistSize,
      TotalProductData: state.Product.TotalProductData,
      CurrentPage: state.Product.CurrentPage,
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
      const userPermissions = permissionsdata && permissionsdata?.find( (item:any) => item.module_name === "Product")?.permissions;
      setAccessList(userPermissions || [])
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
       setPageNo(1);
       setCurrentPageNo(0)
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
      dispatch(getProductlist(requserdata));
      setLoader(true);
    }, [dispatch, PageNo, RoePerPage, searchData]);

    useEffect(() => {        
      setProductList(Productlist ? Productlist?.data  :[]);
      setTotalListData(TotalProductData ? TotalProductData : 0);
      setCurrentPageNo(CurrentPage ? CurrentPage : 1);
      setLoader(false)
    }, [Productlist,  ProductlistSize, TotalProductData, CurrentPage]);
  //  ------------- Get Data From Reducer Code end --------------

  // ------------  Delete Code Start ------------
    const [Delete_id, set_Delete_id] = useState(0);
    const DeleteFuncall = (id: any) => {
      set_Delete_id(id);
      setisOpenDelteModel(true);
    };

    const Deleteproduct = () => {
      let rqeuserdata = { id: Delete_id };
      dispatch(DeleteProductlist(rqeuserdata));
      setisOpenDelteModel(false);
    };
  // -------  Delete Code End ---------------

  // --------- Checkbox Code start ------------
    const CheckData = (data:any) =>{
      console.log(data)
    }
  // --------- Checkbox Code end ------------

  const OpenAddModel = () =>{
    navigate("/product/add")
  }

  const DetailsPageCall = (id:any) =>{
    navigate(`/product/details/${id}`)
  }

  const EditPageCall = (id: any) => {
    navigate(`/product/edit/${id}`);
   };

  let Name = "Product List";
  let Searchplaceholder = "Search For Product (Name)";
  let AddAccess = AccessList?.add;;

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
        {loader ? <LoaderPage /> :
          <>
        <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} isOpenAddModel= {OpenAddModel} AddAccess={AddAccess}/>
    
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
              <Table.Head className="bg-gray-100 dark:bg-gray-700">
                <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                {/* <Table.HeadCell>Description</Table.HeadCell> */}
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Avl Qty</Table.HeadCell>
                <Table.HeadCell>price</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                {AccessList?.edit || AccessList?.delete ?  <Table.HeadCell>Actions</Table.HeadCell> : null}
              </Table.Head>

              <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {ProductList && ProductList.map((item: any, k) => (
                        <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                          <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }}>  <Checkbox  value={item?._id} onClick={() => {CheckData(item?._id)}}/>  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap max-w-[35rem] truncate text-ellipsis text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => DetailsPageCall(item?._id)}>  {item?.name?.englishname} </Table.Cell>

                          {/* <Table.Cell className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[400px] text-base font-medium text-gray-900 dark:text-white py-0">  {item.description}</Table.Cell> */}
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.categories?.name_eng} </Table.Cell> 
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.avl_qty} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.price} Rs.</Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                            {item.is_active == true ? <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active  </div>
                            : <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div> Deactive  </div>}
                          </Table.Cell>
                          {AccessList?.edit || AccessList?.delete ?
                          <Table.Cell className="space-x-2 whitespace-nowrap py-0">
                            <div className="flex items-center gap-x-3">
                              {AccessList?.edit ? <Button gradientDuoTone="greenToBlue" onClick={() => EditPageCall(item?._id)}  > <div className="flex items-center gap-x-2">  <HiOutlinePencilAlt className="text-lg" />  Edit Product  </div></Button> : null}
                              {AccessList?.delete ?  <Button  gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(item?._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" /> Change Status </div> </Button> : null}
                              <Button  gradientDuoTone="purpleToBlue" onClick={() => DetailsPageCall(item._id)}><div className="flex items-center gap-x-2 deletebutton"> <FaExclamationCircle className="text-lg" /> Detail Product </div> </Button>
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
            <DeleteModalPage  isOpenDelteModel={isOpenDelteModel}  name={"Product"} setisOpenDelteModel={setisOpenDelteModel}  DelCall={Deleteproduct} />
          </Suspense>
        )}
        <ToastMessage />
    </>
  );
};

export default ProductListPage;