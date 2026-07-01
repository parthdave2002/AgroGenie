
import { lazy,FC, useEffect, useState, useMemo, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWarehouselist } from "../../Store/actions";
import { useParams } from "react-router";
import moment from "moment";
const CommonTable = lazy(() => import("../../components/common/table/commonTable"));
const ExampleBreadcrumb = lazy(() => import("../../components/common/breadcrumb/breadcrumb"));
const ExamplePagination = lazy(() => import("../../components/common/pagination/pagination"));
const NavbarSidebarLayout = lazy(() => import("../../layouts/navbar-sidebar"));

const WarehouseDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [WarehouselistData, setWarehouselistData] = useState<any | null>(null);
  const [ProductList, setProductList] = useState([]);

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

  useEffect(() =>{
    if(id){
      dispatch(getWarehouselist({ id : id}))   
    }
  },[id]);
  
  const Warehouselist = useSelector((state: any) => state.Warehouse.Warehouselist);
  useEffect(() => {  
    setWarehouselistData(Warehouselist ? Warehouselist : null);
  }, [Warehouselist]);

  let Name = "Warehouse Details";
  let ParentName = "Warehouse List";
  let ParentLink = "/warehouse/list";

   const productColumns = useMemo(() => [
     { key: "name", label: "Name", render: (row: any) => ( <span className="whitespace-nowrap max-w-[35rem] truncate text-ellipsis text-base font-medium text-DarkBackground dark:text-White py-0 cursor-pointer"> {row?.name?.englishname || "-"} </span> ) },
     { key: "categories", label: "Category", render: (row: any) => row?.categories?.name_eng || "-"},
     { key: "warehouse", label: "warehouse", render: (row: any) => row?.warehouse?.name || "-" },
     { key: "avl_qty", label: "Avl Qty" },
     { key: "price", label: "Price" },
     { key: "is_active", label: "Status", render: (row: any) => row.is_active ? <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div> : <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Deactive </div> },
   ],[]);  

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
        <div  className="mt-[2rem] bg-White dark:bg-Cosmos p-4"> 
          <div>
              {WarehouselistData && (
                <div className="dark:text-gray-100 grid grid-cols-3">
                  <p><strong>Name:</strong> {WarehouselistData.name}</p>
                  <p><strong>Location:</strong> {WarehouselistData.location}</p>
                  <p><strong>Address:</strong> {WarehouselistData.address}</p>
                  <p><strong>Status:</strong> {WarehouselistData.is_active ? "Active" : "Inactive"}</p>
                  <p><strong>Created At:</strong> {moment(WarehouselistData.created_at).format("YYYY-MM-DD HH:mm:ss")}</p>
                  <p><strong>Updated At:</strong> {moment(WarehouselistData.updated_at).format("YYYY-MM-DD HH:mm:ss")}</p>
                </div>
              )}
          </div> 
        </div>

        <div  className="mt-[2rem] bg-White dark:bg-Cosmos p-4"> 
          <div>
            <CommonTable columns={productColumns} data={ProductList || []} />
            <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
          </div> 
        </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default WarehouseDetailsPage;