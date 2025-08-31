import { Badge, Dropdown, Table, useTheme } from "flowbite-react";
import { useEffect, useState, type FC } from "react";
import { FaUser, FaRupeeSign, FaAsterisk, FaCloud  } from "react-icons/fa";
import { FaHandHoldingDollar, FaNoteSticky } from "react-icons/fa6";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
const IMG_URL = import.meta.env["VITE_API_URL"];
import moment from "moment";
import {getDashboarddatalist } from "../Store/actions";
import Cookies from "js-cookie";
import LoaderPage from "../components/loader";

const DashboardPage: FC = function () {

  const navigate = useNavigate()
 const dispatch = useDispatch()

 interface totalCustomer {
  daily:number;
  monthly:number;
  weekly: number;
 }

  //------------ Access Data Code start------------
  interface AccessData {
    add: boolean;
    view: boolean;
    edit: boolean;
    delete: boolean;
  }
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
    const user = Cookies.get("role");
    const fullAccess: AccessData = {
      add: true,
      view: true,
      edit: true,
      delete: true
    };
    if (user === "67b388a7d593423df0e24295") {
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

  return (
    <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true}  isRightSidebar={true} >
      {   loader ? <LoaderPage /> : 
          
      <div>
        <div>
          <div className="md:flex flex-wrap gap-3">
            <div className="w-[calc(33%-6px)] md:w-[32%] w-full mt-[1.5rem] md:mt-0">
              <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-800 dark:text-gray-50">
                <div className="flex w-full justify-between items-start">
                  <div className="p-3 rounded-full bg-purple-500 self-center">
                    <FaHandHoldingDollar className="text-white w-6 h-6" />
                  </div>
                  <div className="self-center">
                    <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily" onChange={(e) => OrderDropDownCall(e)}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
               
                  <div className="text-center self-center items-start ">
                    <p className="text-md font-bold">Total Order</p>
                    <p className="text-lg font-bold text-center mt-2">{ selectedOrderframe == "weekly" ? total_orderData?.weekly   : selectedOrderframe == "monthly" ?  total_orderData?.monthly :    total_orderData?.daily}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[calc(33%-6px)] md:w-[32%] w-full mt-[1.5rem] md:mt-0">
              <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-800 dark:text-gray-50">
                <div className="flex w-full justify-between items-start">
                  <div className="p-3 rounded-full bg-purple-500 self-center">
                    <FaRupeeSign className="text-white w-6 h-6" />
                  </div>
                  <div className="self-center">
                    <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily"  onChange={(e) => revenueDropDownCall(e)}>
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
                              :  0
                          }
                        </p>

                  </div>
                </div>
              </div>
            </div>

            <div className="w-[calc(33%-6px)] md:w-[32%] w-full mt-[1.5rem] md:mt-0">
              <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-800 dark:text-gray-50">
                <div className="flex w-full justify-between items-start">
                  <div className="p-3 rounded-full bg-purple-500 self-center">
                    <FaUser className="text-white w-6 h-6" />
                  </div>
                  <div className="self-center">
                    <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily"    onChange={(e) => UserDropDownCall(e)}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="text-center self-center items-start">
                    <p className="text-md font-bold">Total Farmer</p>
                    <p className="text-lg font-bold text-center mt-2">{ selectedUserframe == "weekly" ? total_userData?.weekly   : selectedUserframe == "monthly" ?  total_userData?.monthly :    total_userData?.daily}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-3">
          <div className="md:flex flex-wrap gap-3">
            <div className="w-[calc(33%-6px)] md:w-[32%] w-full mt-[1.5rem] md:mt-0">
              <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-800 dark:text-gray-50">
                <div className="flex w-full justify-between items-start">
                  <div className="p-3 rounded-full bg-purple-500 self-center">
                    <FaAsterisk  className="text-white w-6 h-6" />
                  </div>
                  <div className="self-center">
                    <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily" onChange={(e) => returncountDropDownCall(e)}>
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
              <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-800 dark:text-gray-50">
                <div className="flex w-full justify-between items-start">
                  <div className="p-3 rounded-full bg-purple-500 self-center">
                    <FaCloud  className="text-white w-6 h-6" />
                  </div>
                  <div className="self-center">
                    <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily"  onChange={(e) => returnrevenueDropDownCall(e)}>
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
              <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-800 dark:text-gray-50">
                <div className="flex w-full justify-between items-start">
                  <div className="p-3 rounded-full bg-purple-500 self-center">
                    <FaNoteSticky  className="text-white w-6 h-6" />
                  </div>
                  <div className="self-center">
                    <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily"    onChange={(e) => complainDropDownCall(e)}>
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

        {/* <div className="my-6 lg:grid  grid-flow-row gap-4 flex flex-col"> <SalesThisWeek /> </div> */}
        <div className="my-6 ">
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="mb-2 text-md lg:text-xl font-bold text-gray-900 dark:text-white"> Latest Orders </div>
                <span className="text-base font-normal text-gray-600 dark:text-gray-400 hidden md:block"> This is a list of latest transactions </span>
              </div>
              {OrderAccessList?.view ?  <div className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 cursor-pointer" onClick={() => ViewAllCall("order")}>  View all </div> : null }
            </div>
            <div className="mt-8 flex flex-col">
              <div className="overflow-x-auto rounded-lg">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden shadow sm:rounded-lg">
                    <Table   striped  className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"  >
                      <Table.Head className="bg-gray-50 dark:bg-gray-700">
                        <Table.HeadCell>Order id</Table.HeadCell>
                        <Table.HeadCell>Date &amp; Time</Table.HeadCell>
                        <Table.HeadCell>Customer Name</Table.HeadCell>
                        <Table.HeadCell>Advisor Name </Table.HeadCell>
                        <Table.HeadCell>Amount</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="bg-white dark:bg-gray-800">
                          {OrderData && OrderData.map((item:any, k:any) =>(
                            <Table.Row>
                            <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-gray-200">   <span className="font-semibold">{ item.order_id}</span> </Table.Cell>
                            <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-200">  {moment(item.added_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-200 truncate max-w-[15rem]"> {item?.customer?.firstname} {item?.customer?.middlename} {item?.customer?.lastname}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-200"> {item?.advisor_name?.name} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-200"> ₹ { Math.round(item?.total_amount) }</Table.Cell>
                            <Table.Cell className="flex whitespace-nowrap   text-center"> <Badge className="w-24 text-center justify-center truncate" color="success">{item?.status  ? item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase() : "-"}</Badge> </Table.Cell>
                          </Table.Row>
                          ))}
                      </Table.Body>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="my-6 lg:grid grid-cols-2 grid-flow-row gap-4">
            <div className="mb-4 h-full rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white"> Latest Farmers </h3>
                  {CustomerAccessList?.view ? <div className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 cursor-pointer" onClick={() => ViewAllCall("customer")}>  View all </div> : null }
                </div>
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {CustomerData && CustomerData.map((item:any, k:number) =>(
                      <li className="py-3 sm:py-4" key={k}>
                      <div className="flex justify-between items-center space-x-4">
                        <div className="min-w-0 ">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white max-w-[10rem]"> {item?.firstname} {item?.middlename} {item?.lastname} </p>
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400"> {item?.taluka?.name}  </p>
                        </div>
                        {/* <div className="inline-flex items-center text-sm font-normal text-gray-900 dark:text-gray-300 text-center">{item.village}</div> */}
                        <div className="min-w-0 flex flex-col items-end">
                         <div className="inline-flex items-center text-md font-normal text-gray-900 dark:text-gray-200">{item?.mobile_number}</div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-gray-400">{item?.is_deleted == false ?  <Badge color="success">Active</Badge>  :  <Badge color="danger">Deactive</Badge>}</div>
                        </div>
                      </div>
                      </li>
                    ))}
                  </ul>
                </div>
            </div>

          {/* User Data */}
            <div className="mb-4 h-full rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white"> Latest Advisor </h3>
                {AccessList?.view ? <div className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 cursor-pointer" onClick={() => ViewAllCall("users")}>  View all </div> : null }
              </div>
              <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {UserData && UserData.map((item:any, k:number) =>(
                    <li className="py-3 sm:py-4" key={k}>
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img className="h-8 w-8 rounded-full"    src={`${IMG_URL}/public/user/${item.user_pic}`}  alt="" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white"> {item.name} </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400"> {item.email}  </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-gray-400">{item.is_active == true ?  <Badge color="success">Active</Badge>  :  <Badge color="danger">Deactive</Badge>}</div>
                    </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
        </div>

        <div className=" my-6 rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="mb-2 text-md lg:text-xl font-bold text-gray-900 dark:text-white"> Latest Products </div>
              <span className="text-base font-normal text-gray-600 dark:text-gray-400 hidden md:block"> This is a list of latest products </span>
            </div>

            {ProductAccessList?.view ?
              <div className="shrink-0"> <div className="rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 cursor-pointer" onClick={() =>ViewAllCall("product")}> View all  </div>  </div>
            : null}
          </div>
          <div className="mt-8 flex flex-col">
            <div className="overflow-x-auto rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow sm:rounded-lg">
                  <Table striped className="min-w-full divide-y divide-gray-200 dark:divide-gray-600" >
                    <Table.Head className="bg-gray-50 dark:bg-gray-700">
                      <Table.HeadCell>Name</Table.HeadCell>
                      <Table.HeadCell>Category</Table.HeadCell>
                      <Table.HeadCell>Qty</Table.HeadCell>
                      <Table.HeadCell>Price</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="bg-white dark:bg-gray-800">
                        {ProductData && ProductData.map((item:any ,k:number) =>(
                          <Table.Row key={k}>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white"><span className="font-semibold">{item?.name?.englishname}</span>  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-300"> { item?.categories?.name_eng ? item?.categories?.name_eng : "N/A"}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-300"> {item?.avl_qty}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-300"> {Math.round(item?.price)}  </Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" my-6 rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="mb-2 text-md lg:text-xl font-bold text-gray-900 dark:text-white"> Latest Complain </div>
              <span className="text-base font-normal text-gray-600 dark:text-gray-400 hidden md:block"> This is a list of latest complain </span>
            </div>

            {/* {ProductAccessList?.view ?
              <div className="shrink-0"> <div className="rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 cursor-pointer" onClick={() =>ViewAllCall("product")}> View all  </div>  </div>
            : null} */}
          </div>
          <div className="mt-8 flex flex-col">
            <div className="overflow-x-auto rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow sm:rounded-lg">
                  <Table striped className="min-w-full divide-y divide-gray-200 dark:divide-gray-600" >
                    <Table.Head className="bg-gray-50 dark:bg-gray-700">
                      <Table.HeadCell>Complain Id</Table.HeadCell>
                      <Table.HeadCell>Product</Table.HeadCell>
                      <Table.HeadCell>priority</Table.HeadCell>
                      <Table.HeadCell>resolution</Table.HeadCell>
                      <Table.HeadCell> Created Date</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="bg-white dark:bg-gray-800">
                        {total_complain_list && total_complain_list.map((item:any ,k:number) =>(
                          <Table.Row key={k}>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white"><span className="font-semibold">{item?.complain_id}</span>  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-300"> { item?.product_id[0]?.name ? item?.product_id[0]?.name?.englishname : "N/A"}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-300"> {item?.priority ? item?.priority : "-"}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-300"> {item?.resolution ? item?.resolution : "-"}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-300"> {moment(item?.created_at).format("DD-MM-YYYY hh:mm:ss")}   </Table.Cell>
                          {/* <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-300"> {item?.price.toFixed(2)}  </Table.Cell> */}
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    }
    </NavbarSidebarLayout>
  );
};

export default DashboardPage;