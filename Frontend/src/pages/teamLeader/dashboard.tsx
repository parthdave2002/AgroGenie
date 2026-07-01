import React, { lazy, useEffect, useMemo, useState, type FC } from "react";
import { Badge } from "flowbite-react";
import { FaUser, FaRupeeSign, FaAsterisk, FaCloud  } from "react-icons/fa";
import { FaHandHoldingDollar, FaNoteSticky } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Cookies from "js-cookie";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import LoaderPage from "../../components/common/loader/loader";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import {getDashboarddatalist } from "../../Store/actions";
import { AccessData, totalCustomer } from "types/types";
const CommonTable = lazy(() => import("../../components/common/table/commonTable"));
const ExamplePagination = lazy(() => import("../../components/common/pagination/pagination"));

const TeamLeaderDashboard = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { DashboardDataList, permissionsdata } = useSelector((state: any) => ({
    DashboardDataList: state.AdminDashboard.Dashboardlist,
    permissionsdata: state.Login.permissionsdata
  }))

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

   const advisorColumns = useMemo(() => [
    { key: "user_pic", label: "Image", render: (row: any) => <img className="h-8 w-8 rounded-full" src={row?.user_pic ? row?.user_pic : ""}  alt="" /> },
    { key: "name", label: "Name"},   
    { key: "user_category", label: "User Category" , render: (row: any) => row?.user_category?.category_name || "N/A" },
    { key: "goal_amt", label: "Goal Amount", render: (row: any) => row?.user_category?.goal_amt || "N/A" },
    { key: "achieved_amt", label: "Achieved Amount" },
  ],[]);

  const series = [44, 33, 54, 45];
  const options: ApexOptions  = {
  chart: { width: 380, type: "pie" },
  colors: ["#298ade", "#d4801a", "#139bd5", "#acd213"],
  fill: { opacity: 0.85 },
  stroke: { width: 0 },
  responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 200 },
        legend: { position: "bottom" },
      },
  },],
};

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


        <div>
          <div id="chart">
            <ReactApexChart
              options={options}
              series={series}
              type="pie"
              width={380}
            />
          </div>
          <div id="html-dist"></div>
        </div>

        <div className="my-6">
          <div className="rounded-lg bg-White p-4 shadow dark:bg-Cosmos sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="mb-2 text-md lg:text-xl font-bold text-DarkBackground dark:text-White"> Latest Orders </div>
                <span className="text-base font-normal text-Hydrocarbon dark:text-SilverSteel hidden md:block"> This is a list of latest transactions </span>
              </div>              
            </div>
            <div>
                <CommonTable columns={orderColumns} data={OrderData || []} />
            </div>
          </div>
        </div>
        
        <div className="my-6 rounded-lg bg-White p-4 shadow dark:bg-Cosmos sm:p-6 xl:p-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="mb-2 text-md lg:text-xl font-bold text-DarkBackground dark:text-White"> Your Team Advisors List </div>
              <span className="text-base font-normal text-Hydrocarbon dark:text-SilverSteel hidden md:block"> This is a list of advisors in your team </span>
            </div>
            <div>
              <CommonTable columns={advisorColumns} data={UserData || []} />
              <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
            </div>
        </div>
      </div>
    }
    </NavbarSidebarLayout>

    </div>
  )
}

export default TeamLeaderDashboard
