
import { FC, lazy, useEffect, useMemo, useState, } from "react";
import moment from "moment";
import { useParams } from "react-router";
import { ProductDetails } from "../../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { GetAllrelevantProductlist } from "../../../Store/actions";
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const CommonTable = lazy(() => import("../../../components/common/table/commonTable"));

const CompanyDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [ProductList, setProductList] = useState<ProductDetails[]>([]);
  const [loader, setLoader] = useState(false);
  
  // ----------- next Button  Code Start -------------
    const [TotalListData, setTotalListData] = useState(0);
    const [CurrentUserListSize, setCurrentUserListSize] = useState();
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

  useEffect(() =>{
    if(id){
      setLoader(true)
      dispatch(GetAllrelevantProductlist({ company_id : id}))   
    }
  },[id]);

  const RelevantProductlist = useSelector((state: any) => state.Product.RelevantProductlist);
  useEffect(() => {  
    setProductList(RelevantProductlist ? RelevantProductlist : null);
  }, [RelevantProductlist]);

  const companyColumns =useMemo( () => [
    { key: "name", label: "Name (Eng)", render: (row: any) => row.name?.englishname},
    { key: "avl_qty", label: "Available Quantity"},
    { key: "packaging",  label: "Packaging", render: (row: any) => row.packaging ? `${row.packaging} ${row?.packagingtype?.type_eng}` : "N/A" },
    { key: "is_active", label: "Status", render: (row: any) => row.is_active ?  <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div> :  <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Deactive </div> },
    { key: "added_at", label: "Created Date",  render: (row: any) => ( <div> {moment(row?.added_at).format("DD-MM-YYYY hh:mm:ss")} </div>)},
  ],[]);

  let Name = "Company Details";
  let ParentName = "Company List";
  let ParentLink = "/company/list";

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true} >
        <ExampleBreadcrumb Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
        <div  className="mt-[2rem] bg-white dark:bg-gray-800 p-4"> 
          <CommonTable columns={companyColumns} data={ProductList || []} />
          <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
        </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default CompanyDetailsPage;