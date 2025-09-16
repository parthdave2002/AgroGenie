import { lazy, Suspense,FC, useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "flowbite-react";
import { FaExclamationCircle } from "react-icons/fa";
import { HiOutlinePencilAlt, HiTrash} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DeleteProductlist,  getProductlist } from "../../../Store/actions";
import UseAccessList from "../../../hooks/useAccessList";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import LoaderPage from "../../../components/common/loader/loader";
import CommonTable from "../../../components/common/table/commonTable";
const DeleteModalPage = lazy(() => import("../../../components/common/modal/deleteModal"));
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const ProductListPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [ProductList, setProductList] = useState([]);
  const [loader, setLoader] = useState(false);

  //------------ Access Data Code start------------
    const { Productlist,  ProductlistSize, TotalProductData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
      Productlist: state.Product.Productlist,
      ProductlistSize: state.Product.ProductlistSize,
      TotalProductData: state.Product.TotalProductData,
      CurrentPage: state.Product.CurrentPage,
      permissionsdata: state.Login.permissionsdata
    }));

    const accessList = UseAccessList(permissionsdata, "Product");
  //--------- Access Data Code end------------------
    
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
  let AddAccess = accessList?.add;

  const productColumns = useMemo(() => [
    {
      key: "name",
      label: "Name",
      render: (row: any) => (
        <span className="whitespace-nowrap max-w-[35rem] truncate text-ellipsis text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => DetailsPageCall(row?._id)}> {row?.name?.englishname || "-"} </span>
      )
    },
    // {
    //   key: "description",
    //   label: "Description",
    // },
    {
      key: "categories",
      label: "Category",
      render: (row: any) => row?.categories?.name_eng || "-",
    },
    {
      key: "avl_qty",
      label: "Avl Qty",
    },

    {
      key: "price",
      label: "Price",
    },
    {
      key: "is_active",
      label: "Status",
      render: (row: any) => row.is_active ? <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div> : <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Deactive </div>
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex items-center gap-x-3">
          {accessList?.edit ? <Button gradientDuoTone="greenToBlue" onClick={() => EditPageCall(row?._id)}  > <div className="flex items-center gap-x-2">  <HiOutlinePencilAlt className="text-lg" />  Edit Product  </div></Button> : null}
          {accessList?.delete ? <Button gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" /> Change Status </div> </Button> : null}
          <Button gradientDuoTone="purpleToBlue" onClick={() => DetailsPageCall(row?._id)}><div className="flex items-center gap-x-2 deletebutton"> <FaExclamationCircle className="text-lg" /> Detail Product </div> </Button>
        </div>
      ),
    },
  ], [accessList, DeleteFuncall]);  

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true} >
        {loader ? <LoaderPage /> :
          <>
            <ExampleBreadcrumb Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename={Changename} isOpenAddModel={OpenAddModel} AddAccess={AddAccess} />
            <CommonTable columns={productColumns} data={ProductList || []} />
            <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
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