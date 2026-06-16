import { lazy, useEffect, useMemo, useState, type FC } from "react";
import { Badge } from "flowbite-react";
import { FaUser, FaRupeeSign, FaAsterisk, FaCloud  } from "react-icons/fa";
import { FaHandHoldingDollar, FaNoteSticky } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Cookies from "js-cookie";
import LoaderPage from "../../components/common/loader/loader";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import {getDashboarddatalist } from "../../Store/actions";
import { AccessData, totalCustomer } from "types/types";
const CommonTable = lazy(() => import("../../components/common/table/commonTable"));
const ExamplePagination = lazy(() => import("../../components/common/pagination/pagination"));

const TeamLeaderDashboard = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //------------ Access Data Code start------------
  const [AccessList, setAccessList] = useState<AccessData>();
  const [ProductAccessList, setProductAccessList] = useState<AccessData>();
  const [OrderAccessList, setOrderAccessList] = useState<AccessData>();
  const [CustomerAccessList, setCustomerAccessList] = useState<AccessData>();
  //--------- Access Data Code end------------------

  const { DashboardDataList, permissionsdata } = useSelector((state: any) => ({
    DashboardDataList: state.AdminDashboard.Dashboardlist,
    permissionsdata: state.Login.permissionsdata
  }))

  useEffect(() => {
    const user = Cookies.get("userType");
    const fullAccess: AccessData = {
      add: true,
      view: true,
      edit: true,
      delete: true
    };
    if (user === "admin") {
      setAccessList(fullAccess);
      setProductAccessList(fullAccess);
      setOrderAccessList(fullAccess);
      setCustomerAccessList(fullAccess);
    }
    else {
      const productPermissions = permissionsdata && permissionsdata?.find((item: any) => item.module_name === "Product")?.permissions;
      const userPermissions = permissionsdata && permissionsdata?.find((item: any) => item.module_name === "User")?.permissions;
      const orderPermissions = permissionsdata && permissionsdata?.find((item: any) => item.module_name === "Order")?.permissions;
      const customerPermissions = permissionsdata && permissionsdata?.find((item: any) => item.module_name === "Customer")?.permissions;

      setAccessList(userPermissions || [])
      setProductAccessList(productPermissions || [])
      setOrderAccessList(orderPermissions || [])
      setCustomerAccessList(customerPermissions || [])
    }
  }, [permissionsdata]);

  // ------------------ Pagination code start -----------------------
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
  // ----------------- Pagination code end -----------------------

  const [total_revenueData , set_total_revenueData] = useState<totalCustomer>();
  const [total_userData , set_total_userData] = useState<totalCustomer>();
  const [total_orderData , set_total_orderData] = useState<totalCustomer>();
  const [total_return_order_Data , set_total_return_order_Data] = useState<totalCustomer>();
  const [total_return_Amt_Data , set_total_return_Amt_Data] = useState<totalCustomer>();
  const [total_complainData , set_total_complainData] = useState<totalCustomer>();
  const [total_complain_list , set_total_complain_List] = useState<any>([]);
  const [selectedUserframe, setSelectedUserframe] = useState("");
  const [selectedOrderframe, setSelectedOrderframe] = useState("");
  const [selectedrevenueframe, setSelectedrevenueframe] = useState("");
  const [selectedReturnOrder, setSelectedReturnOrder] = useState("");
  const [selectedReturnamt, setSelectedReturnamt] = useState("");
  const [selectedTotalComplain, setSelectedTotalComplain] = useState("");
  const [CustomerData , setCustomerData] = useState([]);
  const [OrderData , setOrderData] = useState([]);
  const [UserData , setUserData] = useState([]);
  const [ProductData, setProductData] =useState([]);
  const [loader, setLoader] =useState(false);
  
  useEffect(() =>{
    setCustomerData(DashboardDataList?.data?.customers);
    setOrderData(DashboardDataList?.data?.orders);
    setUserData(DashboardDataList?.data?.users);
    setProductData(DashboardDataList?.data?.products);
    set_total_revenueData(DashboardDataList?.data?.totalRevenue);
    set_total_orderData(DashboardDataList?.data?.totalOrders );
    set_total_userData(DashboardDataList?.data?.totalCustomers);
    set_total_return_order_Data(DashboardDataList?.data?.totalReturnOrder);
    set_total_return_Amt_Data(DashboardDataList?.data?.totalReturnOrderRevenue );
    set_total_complainData(DashboardDataList?.data?.totalComplain);
    set_total_complain_List(DashboardDataList?.data?.complainDetails);
    setTotalListData(DashboardDataList?.data?.TotalUserListData ? DashboardDataList?.data?.TotalUserListData : 0);
    setCurrentPageNo(DashboardDataList?.data?.CurrentPage ? DashboardDataList?.data?.CurrentPage : 1);
    setLoader(false)
  },[DashboardDataList])

  useEffect(() =>{
    dispatch(getDashboarddatalist())
    setLoader(true)
  },[])
  
  // -------- Customer Data code start -----------------
    const ViewAllCall = (data:string) =>{
      navigate(`/${data}/list`)
    }

    const UserDropDownCall = (e:any) =>{
      setSelectedUserframe(e.target.value)
    }

    const OrderDropDownCall =  (e:any) =>{
      setSelectedOrderframe(e.target.value)
    }

    const revenueDropDownCall =  (e:any) =>{
      setSelectedrevenueframe(e.target.value)
    }

    const returnrevenueDropDownCall =  (e:any) =>{
       setSelectedReturnamt(e.target.value)
    }

    const returncountDropDownCall =  (e:any) =>{
      setSelectedReturnOrder(e.target.value)
    }

    const complainDropDownCall =  (e:any) =>{
      setSelectedTotalComplain(e.target.value)
    }

  const orderColumns  = useMemo(() => [
    {
      key: "order_id",
      label: "Order ID",
    },
    {
      key: "added_at",
      label: "Date & Time",
      render: (row: any) => moment(row.added_at).format("DD-MM-YYYY hh:mm:ss"),
    },
    {
      key: "customer",
      label: "Customer Name",
      render: (row: any) =>
        `${row?.customer?.firstname || ""} ${row?.customer?.middlename || ""} ${row?.customer?.lastname || ""}`,
    },
    {
      key: "advisor_name",
      label: "Advisor Name",
      render: (row: any) => row?.advisor_name?.name || "-",
    },
    {
      key: "total_amount",
      label: "Amount",
      render: (row: any) => `₹ ${Math.round(row?.total_amount)}`,
    },
    {
      key: "status",
      label: "Status",
      render: (row: any) => (
        <Badge color="success" className="w-24 justify-center">
          {row?.status
            ? row.status.charAt(0).toUpperCase() + row.status.slice(1).toLowerCase()
            : "-"}
        </Badge>
      ),
    },
  ],[]);

  const complainColumns  = useMemo(() => [
    {
      key: "complain_id",
      label: "Complain Id",
    },
    {
      key: "product_id",
      label: "Product",
      render: (row: any) => row?.product_id[0]?.name?.englishname || "-"
    },
    {
      key: "priority",
      label: "Priority",
    },
    {
      key: "resolution",
      label: "Resolution",
    },
    {
      key: "Created Date",
      label: "Created Date",
      render: (row: any) => moment(row?.created_at).format("DD-MM-YYYY hh:mm:ss"),
    }
  ],[]);

  const productColumns = useMemo(() => [
    { key: "name", label: "Name", render: (row: any) => row?.name?.englishname },
    { key: "categories", label: "Category", render: (row: any) => row?.categories?.name_eng || "N/A" },
    { key: "avl_qty", label: "Qty" },
    { key: "price", label: "Price", render: (row: any) => Math.round(row?.price) },
  ],[]);

   const advisorColumns = useMemo(() => [
    { key: "user_pic", label: "Image", render: (row: any) => <img className="h-8 w-8 rounded-full" src={row?.user_pic ? row?.user_pic : ""}  alt="" /> },
    { key: "name", label: "Name"},   
    { key: "user_category", label: "User Category" , render: (row: any) => row?.user_category?.category_name || "N/A" },
    { key: "goal_amt", label: "Goal Amount", render: (row: any) => row?.user_category?.goal_amt || "N/A" },
    { key: "achieved_amt", label: "Achieved Amount" },
  ],[]);

  return (
    <div>
        <NavbarSidebarLayout   isSidebar={true} isNavbar={true} >
      { loader ? <LoaderPage /> : 
          
      <div>
        <div className="md:flex flex-wrap gap-3">
            <div className="w-[calc(33%-6px)] md:w-[32%] w-full mt-[1.5rem] md:mt-0">
              <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-Cosmos dark:text-White">
                <div className="flex w-full justify-between items-start">
                  <div className="p-3 rounded-full bg-purple-500 self-center">
                    <FaHandHoldingDollar className="text-White w-6 h-6" />
                  </div>
                  <div className="self-center">
                    <select className="border border-SoothingBlueGrey rounded-full px-2 py-1 text-sm dark:bg-Cosmos dark:text-White" defaultValue="daily" onChange={(e) => OrderDropDownCall(e)}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div className="text-center self-center items-start ">
                    <p className="text-md font-bold">Total Order</p>
                    <p className="text-lg font-bold text-center mt-2">{selectedOrderframe == "weekly" ? total_orderData?.weekly : selectedOrderframe == "monthly" ? total_orderData?.monthly : total_orderData?.daily}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[calc(33%-6px)] md:w-[32%] w-full mt-[1.5rem] md:mt-0">
              <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-Cosmos dark:text-White">
                <div className="flex w-full justify-between items-start">
                  <div className="p-3 rounded-full bg-purple-500 self-center">
                    <FaRupeeSign className="text-White w-6 h-6" />
                  </div>
                  <div className="self-center">
                    <select className="border border-SoothingBlueGrey rounded-full px-2 py-1 text-sm dark:bg-Cosmos dark:text-White" defaultValue="daily" onChange={(e) => revenueDropDownCall(e)}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="text-center self-center items-start">
                    <p className="text-md font-bold">Total Revenue</p>
                    {/* <p className="text-lg font-bold text-center mt-2">{ selectedrevenueframe == "weekly" ? total_revenueData?.weekly   : selectedrevenueframe == "monthly" ?  total_revenueData?.monthly :    total_revenueData?.daily}</p> */}

                    <p className="text-lg font-bold text-center mt-2">
                      {
                        (selectedrevenueframe === "weekly"
                          ? total_revenueData?.weekly
                          : selectedrevenueframe === "monthly"
                            ? total_revenueData?.monthly
                            : total_revenueData?.daily) !== undefined
                          ? Math.round(Number(
                            selectedrevenueframe === "weekly"
                              ? total_revenueData?.weekly
                              : selectedrevenueframe === "monthly"
                                ? total_revenueData?.monthly
                                : total_revenueData?.daily
                          ))
                          : 0
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[calc(33%-6px)] md:w-[32%] w-full mt-[1.5rem] md:mt-0">
              <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-Cosmos dark:text-White">
                <div className="flex w-full justify-between items-start">
                  <div className="p-3 rounded-full bg-purple-500 self-center">
                    <FaUser className="text-White w-6 h-6" />
                  </div>
                  <div className="self-center">
                    <select className="border border-SoothingBlueGrey rounded-full px-2 py-1 text-sm dark:bg-Cosmos dark:text-White" defaultValue="daily" onChange={(e) => UserDropDownCall(e)}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="text-center self-center items-start">
                    <p className="text-md font-bold">Total Farmer</p>
                    <p className="text-lg font-bold text-center mt-2">{selectedUserframe == "weekly" ? total_userData?.weekly : selectedUserframe == "monthly" ? total_userData?.monthly : total_userData?.daily}</p>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div className="my-3">
          <div className="md:flex flex-wrap gap-3">
            <div className="w-[calc(33%-6px)] md:w-[32%] w-full mt-[1.5rem] md:mt-0">
              <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-Cosmos dark:text-White">
                <div className="flex w-full justify-between items-start">
                  <div className="p-3 rounded-full bg-purple-500 self-center">
                    <FaAsterisk  className="text-White w-6 h-6" />
                  </div>
                  <div className="self-center">
                    <select className="border border-SoothingBlueGrey rounded-full px-2 py-1 text-sm dark:bg-Cosmos dark:text-White" defaultValue="daily" onChange={(e) => returncountDropDownCall(e)}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
               
                  <div className="text-center self-center items-start ">
                    <p className="text-md font-bold"> Return Order</p>
                    <p className="text-lg font-bold text-center mt-2">{ selectedReturnOrder == "weekly" ? total_return_order_Data?.weekly   : selectedReturnOrder == "monthly" ?  total_return_order_Data?.monthly :    total_return_order_Data?.daily}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[calc(33%-6px)] md:w-[32%] w-full mt-[1.5rem] md:mt-0">
              <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-Cosmos dark:text-White">
                <div className="flex w-full justify-between items-start">
                  <div className="p-3 rounded-full bg-purple-500 self-center">
                    <FaCloud  className="text-White w-6 h-6" />
                  </div>
                  <div className="self-center">
                    <select className="border border-SoothingBlueGrey rounded-full px-2 py-1 text-sm dark:bg-Cosmos dark:text-White" defaultValue="daily"  onChange={(e) => returnrevenueDropDownCall(e)}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="text-center self-center items-start">
                    <p className="text-md font-bold"> Return Revenue</p>
                    <p className="text-lg font-bold text-center mt-2">{ selectedReturnamt == "weekly" ? total_return_Amt_Data?.weekly   : selectedReturnamt == "monthly" ?  total_return_Amt_Data?.monthly :    total_return_Amt_Data?.daily}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[calc(33%-6px)] md:w-[32%] w-full mt-[1.5rem] md:mt-0">
              <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-Cosmos dark:text-White">
                <div className="flex w-full justify-between items-start">
                  <div className="p-3 rounded-full bg-purple-500 self-center">
                    <FaNoteSticky  className="text-White w-6 h-6" />
                  </div>
                  <div className="self-center">
                    <select className="border border-SoothingBlueGrey rounded-full px-2 py-1 text-sm dark:bg-Cosmos dark:text-White" defaultValue="daily"    onChange={(e) => complainDropDownCall(e)}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="text-center self-center items-start">
                    <p className="text-md font-bold">Total Complain</p>
                    <p className="text-lg font-bold text-center mt-2">{ selectedTotalComplain == "weekly" ? total_complainData?.weekly   : selectedTotalComplain == "monthly" ?  total_complainData?.monthly :    total_complainData?.daily}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-6">
          <div className="rounded-lg bg-White p-4 shadow dark:bg-Cosmos sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="mb-2 text-md lg:text-xl font-bold text-DarkBackground dark:text-White"> Latest Orders </div>
                <span className="text-base font-normal text-Hydrocarbon dark:text-SilverSteel hidden md:block"> This is a list of latest transactions </span>
              </div>
              {OrderAccessList?.view ?  <div className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-BrilliantBlue hover:bg-TitaniumWhite dark:text-Alexandra dark:hover:bg-TranquilBlack cursor-pointer" onClick={() => ViewAllCall("order")}>  View all </div> : null }
            </div>
            <div>
                <CommonTable columns={orderColumns} data={OrderData || []} />
            </div>
          </div>
        </div>
        
        <div className="my-6 rounded-lg bg-White p-4 shadow dark:bg-Cosmos sm:p-6 xl:p-8">
            {/* <div className="mb-4 h-full rounded-lg bg-White p-4 shadow dark:bg-Cosmos sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold leading-none text-DarkBackground dark:text-White"> Latest Advisor </h3>
              </div>
              <div className="flow-root">
                <ul className="divide-y divide-WhiteMarble dark:divide-TranquilBlack">
                  {UserData && UserData.map((item:any, k:number) =>(
                    <li className="py-3 sm:py-4" key={k}>
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img className="h-8 w-8 rounded-full" src={item?.user_pic ? item?.user_pic : ""}  alt="" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-DarkBackground dark:text-White"> {item.name} </p>
                        <p className="truncate text-sm text-SharkGray dark:text-SilverSteel"> {item.email}  </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-DarkBackground dark:text-SilverSteel">{item.is_active == true ?  <Badge color="success">Active</Badge>  :  <Badge color="danger">Deactive</Badge>}</div>
                    </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <div className="mb-2 text-md lg:text-xl font-bold text-DarkBackground dark:text-White"> Your Team Advisors List </div>
                    <span className="text-base font-normal text-Hydrocarbon dark:text-SilverSteel hidden md:block"> This is a list of advisors in your team </span>
                </div>
            </div>
            <div>
              <CommonTable columns={advisorColumns} data={UserData || []} />
              <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
            </div>
        </div>

        <div className=" my-6 rounded-lg bg-White p-4 shadow dark:bg-Cosmos sm:p-6 xl:p-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="mb-2 text-md lg:text-xl font-bold text-DarkBackground dark:text-White"> Latest Products </div>
              <span className="text-base font-normal text-Hydrocarbon dark:text-SilverSteel hidden md:block"> This is a list of latest products </span>
            </div>
            {ProductAccessList?.view ? <div className="shrink-0"> <div className="rounded-lg p-2 text-sm font-medium text-BrilliantBlue hover:bg-TitaniumWhite dark:text-Alexandra dark:hover:bg-TranquilBlack cursor-pointer" onClick={() =>ViewAllCall("product")}> View all  </div>  </div>  : null}
          </div>
           <div>
              <CommonTable columns={productColumns} data={ProductData || []} />
            </div>
        </div>

        <div className=" my-6 rounded-lg bg-White p-4 shadow dark:bg-Cosmos sm:p-6 xl:p-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="mb-2 text-md lg:text-xl font-bold text-DarkBackground dark:text-White"> Latest Complain </div>
              <span className="text-base font-normal text-Hydrocarbon dark:text-SilverSteel hidden md:block"> This is a list of latest complain </span>
            </div>
          </div>

            <div>
              <CommonTable columns={complainColumns} data={total_complain_list || []} />
            </div>
        </div>
      </div>
    }
    </NavbarSidebarLayout>

    </div>
  )
}

export default TeamLeaderDashboard
