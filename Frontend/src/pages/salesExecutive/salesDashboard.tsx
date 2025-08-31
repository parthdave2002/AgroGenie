import { FC, useEffect, useMemo, useRef, useState } from "react";
import { MdKeyboardArrowRight, MdReport } from "react-icons/md";
import  userimage from "../../img/group.jpg"
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaAngleDown, FaRegClock, FaRupeeSign, FaUser } from "react-icons/fa";
import SalesFarmerDashboard from "./salesFarmerDashboard";
import { DarkThemeToggle,  Button, Table, Modal } from "flowbite-react";
import userphoto from "../../img/profile-picture-3.jpg";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ExamplePagination from '../../components/pagination';
import { getleadlist, getsalesDashboard, getSalesExecutiveOrderlist, MarkasReadLeadlist, resetinsertlogin } from "../../Store/actions";
import moment from "moment";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BsCartCheckFill } from "react-icons/bs";
const IMG_URL = import.meta.env["VITE_API_URL"];

  interface PropsData {
    setDatactive: any;
    openProfile: boolean;
    setOpenProfile: (value: boolean) => void;
  }
  interface UserImage{
    user_pic: string;
    _id: string;
  }

  interface DashboardCount {
    daily:number;
    monthly:number;
    weekly: number;
   }

const SalesDashboardPage : FC <PropsData> = function ({ setDatactive,  openProfile,setOpenProfile})  {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //---------    Get Dashboard data  start--------- 
  const [ComplainData, setComplainData] = useState([])
  const [FarmerData, setFarmerData] = useState([])
  const [MyFarmerCount, setMyFarmerCount] = useState(0)
  const [TotalRevenue, setTotalRevenue] = useState<DashboardCount>()
  const [TotalOrder, setTotalOrder] = useState<DashboardCount>()
  const [TotalFutureOrder, setTotalFutureOrder] = useState<DashboardCount>()
  const [TotalReturnOrder, setTotalReturnOrder] = useState<DashboardCount>()
  const [LoginUserimg, setLoginUserimg] = useState<UserImage>();
  const login = useSelector((state:any) => state.Login.Logincode);
  const DashboardDataList = useSelector((state: any) => state.SalesDashboard.DashboardDataList?.data);
  const OrderDataList = useSelector((state: any) => state.Order.SalesExeOrderlist);
  const LeadDataList = useSelector((state: any) => state.Lead.Leaddatalist);
  
  const [SalesOrderData, setSalesOrderData] = useState([])
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
    const PageDataList = (data: any) => { setPageNo(data) }
  // ------------- Next button Code End -------------

  // ----------- next Button Farmer Code Start -------------
      const [TotalFarmerListData, setTotalFarmerListData] = useState(0);
      const [CurrentFarmerPageNo, setCurrentFarmerPageNo] = useState(0);
      const [PageFarmerNo, setPageFarmerNo] = useState(1);
      const [RoePerFarmerPage, setRoePerFarmerPage] = useState(5);

      const RowPerFarmerPageLoad = (event: any) => {
        const value = Number(event)
        setRoePerFarmerPage(value);
        setPageFarmerNo(1)
      };
      const PageFarmerDataList = (data: any) => { setPageFarmerNo(data) }
  // ------------- Next button  Farmer  Code End -------------

  const userImages = [
    "/images/farmer/11.webp",
    "/images/farmer/12.webp",
    "/images/farmer/13.webp",
    "/images/farmer/14.webp",
    "/images/farmer/15.webp",
    "/images/farmer/16.webp",
    "/images/farmer/17.webp",
    "/images/farmer/18.webp",
    "/images/farmer/19.webp",
    "/images/farmer/20.webp",
    "/images/farmer/21.webp",
    "/images/farmer/22.webp",
    "/images/farmer/23.webp",
  ];

   const imagesForFarmers = useMemo(() => {
    const shuffled: any[] = [];
    let imgCopy = [...userImages];

    FarmerData.forEach((_, idx) => {
      // If copy is empty, start new shuffled copy
      if (imgCopy.length === 0) {
        imgCopy = [...userImages];
      }

      // Pick random index
      const randIdx = Math.floor(Math.random() * imgCopy.length);
      shuffled.push(imgCopy[randIdx]);

      // Remove selected image to avoid repeat until next cycle
      imgCopy.splice(randIdx, 1);
    });

    return shuffled;
  }, [FarmerData]);

  const [data, setData] = useState<string | null>(null);
  const role = Cookies.get("role");
  useEffect(() => {
    const usernameDataString = Cookies.get("username");
    const decodedUsername = usernameDataString ? decodeURIComponent(usernameDataString) : null;
    setData(decodedUsername);
      const requser = {
        page: PageFarmerNo,
        size: RoePerFarmerPage
      };
    dispatch(getsalesDashboard(requser))
  }, [dispatch, RoePerFarmerPage,PageFarmerNo])

  useEffect(() =>{
    const requser = {
      page: PageNo,
      size: RoePerPage
    };
    dispatch(getSalesExecutiveOrderlist(requser))
  },[dispatch,PageNo, RoePerPage ])

  useEffect(() =>{
    setTotalListData(OrderDataList?.totalData)
    setSalesOrderData(OrderDataList?.data)
    setCurrentPageNo(OrderDataList?.page)
  },[OrderDataList])

    const [leadData, setLeadData] = useState<any>(null)
    const [TotalLeadListData, setTotalLeadListData] = useState(0);
    const [leadCurrentPageNo, setleadCurrentPageNo] = useState(0);
    const [LeadPageNo, setLeadPageNo] = useState(1);
    const [RowLeadPerPage, setRowLeadPerPage] = useState(5);

    const LeadRowPerPage = (event: any) => {
      const value = Number(event)
      setRowLeadPerPage(value);
    };

    const LeadPageDataList = (data: any) => { setLeadPageNo(data) }
    useEffect(() =>{
    setTotalLeadListData(LeadDataList?.totalData)
    setLeadData(LeadDataList?.data)
    setleadCurrentPageNo( LeadDataList?.page)
  },[LeadDataList])

  useEffect(() => {
    if (DashboardDataList?.data) {
      setComplainData(DashboardDataList?.data?.complain)
      setFarmerData(DashboardDataList?.data?.customers?.data);
      setTotalFarmerListData(DashboardDataList?.data?.customers?.total);
      setCurrentFarmerPageNo(DashboardDataList?.data?.customers?.page);
      setPageFarmerNo(DashboardDataList?.data?.customers?.page);
      setMyFarmerCount(DashboardDataList?.data?.totalMyFarmer);
      setTotalRevenue(DashboardDataList?.data?.totalRevenue)
      setTotalOrder(DashboardDataList?.data?.totalOrder)
      setTotalFutureOrder(DashboardDataList?.data?.totalFutureOrder)
      setTotalReturnOrder(DashboardDataList?.data?.totalReturnOrder)
    }
  }, [DashboardDataList])
  //---------    Get Dashboard data end--------- 
  const ViweAllCall = (data: string) => setDatactive(data)

  const CloseProfileCall = () => {
    setOpenProfile(false);
    setDatactive("Farmer")
  }
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    const darkModeButton = document.querySelector('[data-testid="dark-theme-toggle"]') as HTMLButtonElement;
    if (darkModeButton) {
      darkModeButton.click();
    }
  };

  const Logoutfun = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("access");
    Cookies.remove("role");
    navigate("/login");
    dispatch(resetinsertlogin());
  };

    const [selectedOrderframe, setSelectedOrderframe] = useState("");
    const OrderDropDownCall = (e: any) => {
      setSelectedOrderframe(e.target.value)
    }

    const [selectedfutureOrderframe, setSelectedfutureOrderframe] = useState("");
    const FutureOrderDropDownCall = (e: any) => {
      setSelectedfutureOrderframe(e.target.value)
    }

    const [selectedRevenueframe, setSelectedRevenueframe] = useState("");
    const RevenueDropDownCall = (e: any) => {
      setSelectedRevenueframe(e.target.value)
    }

    const [selectedReturnframe, setSelectedReturnframe] = useState("");
    const RetrunDropDownCall = (e: any) => {
      setSelectedReturnframe(e.target.value)
    }

    useEffect(() => {
      setLoginUserimg(login?.data?.user_img?.user_pic );
    }, [login]);

    const [confirmationModal, setConfirmationModal] = useState(false);
    const [LeadeId, setLeadeId] = useState("");

    const OPenConfirmModal =(data:string) =>{
      setConfirmationModal(true)
      setLeadeId(data)
    }

    const DelCall = () =>{
      let requser={
        status :"completed",
        _id : LeadeId
      }
      dispatch(MarkasReadLeadlist(requser))
      setConfirmationModal(false);
      setselectedTabbar("order")
    }

    // ----------- Tabnavbar code start --------------------
        const [selectedTabbar, setselectedTabbar] = useState("order");
    
        const TabData = [
          { title: "order", icon: <BsCartCheckFill  size={20} /> },
          { title: "help", icon: <MdReport  size={20} /> },
          { title: "contactus", icon: <FaRegClock  size={20} /> },
        ]
    
        const TabSelection = (data: string) => {
          setselectedTabbar(data);
          setRowLeadPerPage(5);
          setLeadPageNo(1);
          setleadCurrentPageNo(0)
          setLeadData([])
          setTotalLeadListData(0)
        }

      useEffect(() =>{
        if(role == "68331b9e271c0b706832de91"){
          dispatch(getleadlist({ type: selectedTabbar, page: LeadPageNo, size: RowLeadPerPage }))
        }
      },[dispatch,selectedTabbar, LeadPageNo, RowLeadPerPage])
      // ----------- Tabnavbar code end --------------------
    
    const [ProductModal, setProductModal] = useState(false);
    const [ProductItemModal, setProductItemModal] = useState({});

    const OpenModal = (item: any) =>{
      setProductModal(true)
      setProductItemModal(item)
    }
    console.log("ProductItemModal", ProductItemModal);

    return (
        <> 
        
        {openProfile == true ?
          <SalesFarmerDashboard setOpenProfile={CloseProfileCall} />
          :
          <>

            <div className="flex justify-between">
              <div className="flex flex-col self-center mt-3">
                <div className="text-[0.9rem] text-gray-500 dark:text-gray-100 dark:text-gray-200"> Welcome back, {data ? data : ""}!</div>
                <div className="text-[2.5rem] font-semibold text-gray-900 dark:text-gray-100">  Dashboard </div>
              </div>

              <div className="relative flex ">
                <button onClick={() => setIsOpen(!isOpen)} className="flex items-center text-sm px-3 py-0.5 font-medium text-gray-900 hover:text-blue-600 md:me-0  dark:text-white  dark:hover:text-gray-100" type="button"  >
                  <img className="w-8 h-8 me-2 rounded-full" src={ LoginUserimg ? `${IMG_URL}/public/user/${LoginUserimg}` : userphoto} alt="user photo" />
                  <span> {data ? data : ""}  </span>
                  <FaAngleDown className="w-4 h-4 ms-3" />
                </button>

                {isOpen && (
                  <div ref={dropdownRef} className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 right-0 mt-[4rem]" >
                    <div onClick={handleClick} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex gap-x-2 cursor-pointer  text-sm text-gray-700 dark:text-gray-200"  >
                      <DarkThemeToggle className="hover:bg-gray-100 dark:hover:bg-gray-700 " style={{ padding: "0" }} />
                      <div className="self-center">Dark mode</div>
                    </div>

                    <div className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white flex gap-x-2" onClick={() => Logoutfun()}>
                      <FiLogOut size={20} className="text-gray-600 dark:text-gray-400" />
                      <div className="self-center"> Sign out </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="md:flex  flex-wrap gap-3 my-[2rem]">
              <div className="flex-1  mt-[1.5rem] md:mt-0">
                <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-700 dark:text-gray-50">
                  <div className="flex w-full justify-between items-start">
                    <div className="p-3 rounded-full bg-purple-500 self-center">
                      <FaRupeeSign className="text-white w-6 h-6" />
                    </div>
                    <div className="self-center">
                      <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily" onChange={(e) => RevenueDropDownCall(e)}>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div className="text-center self-center items-start">
                      <p className="text-md font-bold"> Revenue</p>
                      <p className="text-lg font-bold text-center mt-2"> { Math.round(
                          selectedRevenueframe === "weekly"
                              ? TotalRevenue?.weekly ?? 0
                              : selectedRevenueframe === "monthly"
                              ? TotalRevenue?.monthly ?? 0
                              : TotalRevenue?.daily ?? 0
                          )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1  mt-[1.5rem] md:mt-0">
                <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-700 dark:text-gray-50">
                  <div className="flex w-full justify-around items-start">
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
                      <p className="text-lg font-bold text-center mt-2"> {selectedOrderframe == "weekly" ? TotalOrder?.weekly : selectedOrderframe == "monthly" ? TotalOrder?.monthly : TotalOrder?.daily}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1  mt-[1.5rem] md:mt-0">
                <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-700 dark:text-gray-50">
                  <div className="flex w-full justify-between items-start">
                    <div className="p-3 rounded-full bg-purple-500 self-center">
                      <FaRupeeSign className="text-white w-6 h-6" />
                    </div>
                    <div className="self-center">
                      <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily" onChange={(e) => FutureOrderDropDownCall(e)}>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div className="text-center self-center items-start">
                      <p className="text-md font-bold"> Future Order</p>
                      <p className="text-lg font-bold text-center mt-2">  {selectedfutureOrderframe == "weekly" ? TotalFutureOrder?.weekly : selectedfutureOrderframe == "monthly" ? TotalFutureOrder?.monthly : TotalFutureOrder?.daily}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1  mt-[1.5rem] md:mt-0">
                <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-700 dark:text-gray-50">
                  <div className="flex w-full justify-between items-start">
                    <div className="p-3 rounded-full bg-purple-500 self-center">
                      <FaUser className="text-white w-6 h-6" />
                    </div>
                    <div className="self-center">
                      <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily" onChange={(e) => RetrunDropDownCall(e)} >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div className="text-center self-center items-start">
                      <p className="text-md font-bold"> Return order</p>
                      <p className="text-lg font-bold text-center mt-2">{selectedReturnframe == "weekly" ? TotalReturnOrder?.weekly : selectedReturnframe == "monthly" ? TotalReturnOrder?.monthly : TotalReturnOrder?.daily}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex flex-col xl:flex-row gap-[1rem]  justify-between">
              {FarmerData && FarmerData.length ?
                <div className="bg-[#ffff] dark:bg-gray-800 rounded-xl p-4 ">
                  <div className="flex justify-between ">
                    <div className="text-[1.4rem] font-semibold text-gray-900 dark:text-gray-200"> Farmer Profile  ({TotalFarmerListData})</div>
                    {/* <div className="flex  self-center align-center text-blue-500 hover:text-blue-800 cursor-pointer" onClick={() => ViweAllCall("Farmer")}> <div> View all  </div>  <MdKeyboardArrowRight style={{ alignSelf: "center" }} /></div> */}
                  </div>

                  <div className="grid grid-cols-2 my-6  xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-3">
                    {FarmerData && FarmerData.map((item: any, k: number) => (
                      <div className="bg-[#f4f9fd] w-[12rem] dark:bg-gray-700 px-[2rem] py-3 rounded-xl flex flex-col gap-y-2" key={k}>
                        <img src={imagesForFarmers[k] ?? "/images/farmer/11.webp" } alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1" />
                        <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center max-w-[15rem] truncate"> {item?.firstname} {item?.middlename} {item?.lastname} </div>
                        <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center"> {item?.mobile_number}</div>
                        {/* <div className="text-gray-500 dark:text-gray-100 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center" onClick={() => handleClickCall()}> View </div> */}
                      </div>
                    ))}
                  </div>
                    <ExamplePagination PageData={PageFarmerDataList} RowPerPage={RowPerFarmerPageLoad} RowsPerPageValue={RoePerFarmerPage} PageNo={PageFarmerNo} CurrentPageNo={CurrentFarmerPageNo} TotalListData={TotalFarmerListData} />
                </div>
              : null}

              {ComplainData &&  ComplainData.length ?
                <div className="bg-[#ffff] dark:bg-gray-900 rounded-xl py-3 px-5  w-[20rem] ">
                  <div className="flex justify-between">
                    <div className="text-[1.3rem] font-semibold text-gray-900 dark:text-gray-200"> Complain ({ComplainData.length})</div>
                    <div className="flex  self-center align-center text-blue-500 hover:text-blue-800 cursor-pointer" onClick={() => ViweAllCall("Complain")}> <div> View all  </div>  <MdKeyboardArrowRight style={{ alignSelf: "center" }} /></div>
                  </div>

                  {ComplainData && ComplainData.map((item: any, k: number) => (
                    <div className="bg-white dark:bg-gray-700 dark:hover:bg-gray-600 p-5 rounded-xl  relative my-4" key={k}>
                      <div> {item?.priority && <div className={`absolute left-3 top-4 bottom-4 w-1 rounded-md ${item?.priority === "high" ? "bg-red-400" : item?.priority == "medium" ? "bg-yellow-400" : item?.priority === "low" ? "bg-blue-400" : ""}`} />} </div>

                      <div className="pl-3 flex flex-col gap-y-1">
                        {/* <div className="truncate text-gray-500 dark:text-gray-100 dark:text-gray-50 lg:max-w-[15rem]"> {item?.title} </div> */}
                        <div className="text-[0.7rem] xl:text-[0.9rem] text-gray-500 dark:text-gray-100 dark:text-gray-50 lg:max-w-[15rem] truncate"> {item?.customer_id?.firstname} {item?.customer_id?.middlename} {item?.customer_id?.lastname} </div>
                        <div className="flex justify-between">
                          <div className="text-gray-500 dark:text-gray-100 dark:text-gray-50 text-[0.8rem]"> {item?.customer_id?.mobile_number}  </div>
                          <div className="text-gray-500 dark:text-gray-100 dark:text-gray-50 text-[0.8rem]"> {moment(item?.created_at).format("DD-MM-YYYY")}  </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              : null}
            </div>
            
            {SalesOrderData && SalesOrderData.length > 0 ?
              <div className="mt-[4rem]">
              <h3 className="mb-4 text-xl font-bold leading-none text-gray-900 dark:text-white"> Order List </h3>
                {SalesOrderData && SalesOrderData.length > 0 ?
                
                  <>
                    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                      <Table.Head className="bg-gray-100 dark:bg-gray-700">
                        <Table.HeadCell>Order id</Table.HeadCell>
                        <Table.HeadCell>Order Date</Table.HeadCell>
                        <Table.HeadCell> Order Type</Table.HeadCell>
                        <Table.HeadCell>Callback Date</Table.HeadCell>
                        <Table.HeadCell>COD Amt</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                      </Table.Head>

                      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                        {SalesOrderData && SalesOrderData.map((item: any, k: number) => (
                          <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.order_id?.replace(/^#/, '')} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item?.added_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.order_type ? item?.order_type.charAt(0).toUpperCase() + item?.order_type.slice(1).toLowerCase() : "-"} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.order_type == "future" ? moment(item?.future_order_date).format("DD-MM-YYYY") : "-"} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {Math.round(item?.total_amount)} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.status ? item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase() : "-"} </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>

                    <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
                  </>
                : null}
              </div>
            : null }

              {role === "68331b9e271c0b706832de91" ?
              <div className="mt-[4rem]">
              <h3 className="mb-4 text-[2rem] font-bold leading-none text-gray-900 dark:text-white"> Lead List </h3>

               <div className="flex items-center gap-x-6 bg-gray-100 dark:bg-gray-900 p-3 rounded-xl">
                  <ul className="flex items-center gap-x-6">
                    {TabData.map((data: any, k: number) => (
                      <li key={k} className={`relative flex flex-col items-center justify-center gap-1 py-2 px-2 cursor-pointer transition-all duration-300 ease-in-out font-medium text-sm ${selectedTabbar === data.title ? "text-blue-500 font-semibold" : "text-gray-500 dark:text-gray-400"}`} onClick={() => TabSelection(data.title)} >
                        <span className="flex items-center text-[1rem] font-semibold gap-x-4">{data.icon} {data.title.charAt(0).toUpperCase() + data.title.slice(1)}</span>
                          {selectedTabbar === data.title && (<span className="px-2 absolute bottom-[-4px] left-0 w-full h-[2px] bg-blue-500">
                        </span>)}
                      </li>
                    ))}
                  </ul>
                </div>
    
                 <div className='mt-[1.5rem] px-4'>
                          {selectedTabbar == "order" ?
                            <>
                              {leadData && leadData.length > 0 ?
                                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                                  <Table.Head className="bg-gray-100 dark:bg-gray-700">
                                    <Table.HeadCell>Name</Table.HeadCell>
                                    <Table.HeadCell>Phone Number</Table.HeadCell>
                                    <Table.HeadCell>Created Date</Table.HeadCell>
                                    <Table.HeadCell>Status</Table.HeadCell>
                                    <Table.HeadCell> Action</Table.HeadCell>
                                  </Table.Head>
                
                                  <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                    {leadData && leadData.map((item: any, k: number) => (
                                      <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => OpenModal(item?.products)}> { item?.name} </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.mobile_number ? item?.mobile_number : "-"} </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item?.added_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.status ? item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase() : "-"} </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.status == "pending" ? <Button onClick={() => OPenConfirmModal(item._id) }> Mark As Read</Button>: "-"} </Table.Cell>
                                      </Table.Row>
                                    ))}
                                  </Table.Body>
                                </Table>
                                : <div className='text-center py-4 dark:text-gray-50'>No DataFound </div>}
                            </>
                
                            : selectedTabbar == "help" ?
                              <>
                                {leadData && leadData.length > 0 ?
                                  <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                                    <Table.Head className="bg-gray-100 dark:bg-gray-700">
                                      <Table.HeadCell>Name</Table.HeadCell>
                                      <Table.HeadCell>Mobile Number</Table.HeadCell>
                                      <Table.HeadCell> Message </Table.HeadCell>
                                      <Table.HeadCell> Status </Table.HeadCell>
                                      <Table.HeadCell>Created Date</Table.HeadCell>
                                      <Table.HeadCell>Action </Table.HeadCell>
                                    </Table.Head>
                
                                    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                      {leadData && leadData.map((item: any, k: number) => (
                                        <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                                          {/* <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => ComplainCall(item?.complain_id ,item)}>  {item?.complain_id} </Table.Cell> */}
                                         <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> { item?.name} </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.mobile_number ? item?.mobile_number : "-"} </Table.Cell>
                                        <Table.Cell className="truncate max-w-[15rem] text-base font-medium text-gray-900 dark:text-white py-0"> {item?.comment ? item?.comment : "-"} </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.status ? item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase() : "-"} </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item?.added_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.status == "pending" ?  <Button onClick={() => OPenConfirmModal(item._id) }> Mark As Read</Button> : "-"} </Table.Cell>
                                        </Table.Row>
                                      ))}
                                    </Table.Body>
                                  </Table>
                                  : <div className='text-center py-4 dark:text-gray-50'>No DataFound </div>}
                              </>

                            : selectedTabbar == "contactus" ?
                                <>
                                  {leadData && leadData.length > 0 ?
                                    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                                      <Table.Head className="bg-gray-100 dark:bg-gray-700">
                                        <Table.HeadCell> Name </Table.HeadCell>
                                        <Table.HeadCell> Reason </Table.HeadCell>
                                        <Table.HeadCell> Phone number </Table.HeadCell>
                                        <Table.HeadCell> Email </Table.HeadCell>
                                        <Table.HeadCell> Comment </Table.HeadCell>
                                        <Table.HeadCell> status </Table.HeadCell>
                                        <Table.HeadCell>Created Date</Table.HeadCell>
                                        <Table.HeadCell>Action</Table.HeadCell>
                                      </Table.Head>
                
                                      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                        {leadData && leadData.map((item: any, k: number) => (
                                          <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                                             <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> { item?.name} </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.user_type  ? item?.user_type.charAt(0).toUpperCase() + item?.user_type.slice(1).toLowerCase() : "-"} </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.mobile_number ? item?.mobile_number : "-"} </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.email ? item?.email : "-"} </Table.Cell>
                                        <Table.Cell className="truncate max-w-[15rem] text-base font-medium text-gray-900 dark:text-white py-0"> {item?.comment ? item?.comment : "-"} </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.status ? item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase() : "-"} </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item?.added_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.status == "pending" ?  <Button onClick={() => OPenConfirmModal(item._id) }> Mark As Read</Button> : "-"} </Table.Cell>
                                          </Table.Row>
                                        ))}
                                      </Table.Body>
                                    </Table>
                                    : <div className='text-center py-4 dark:text-gray-50'>No DataFound </div>}
                                </>
                              : null
                          }

                          <ExamplePagination PageData={LeadPageDataList} RowPerPage={LeadRowPerPage} RowsPerPageValue={RowLeadPerPage} PageNo={LeadPageNo} CurrentPageNo={leadCurrentPageNo} TotalListData={TotalLeadListData} />
                  </div>
              </div>
             : null } 
            
            {/* <div className="mt-[4rem]">
              <h3 className="mb-4 text-xl font-bold leading-none text-gray-900 dark:text-white"> Complain List </h3>
              {ComplainData && ComplainData.length > 0 ?
                <>
                  <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                    <Table.Head className="bg-gray-100 dark:bg-gray-700">
                      <Table.HeadCell> Title</Table.HeadCell>
                      <Table.HeadCell> Complain Date</Table.HeadCell>
                      <Table.HeadCell> Customer Name</Table.HeadCell>
                      <Table.HeadCell> Customer Mobile No.</Table.HeadCell>
                      <Table.HeadCell> Priority </Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                      {ComplainData && ComplainData.map((item: any, k: number) => (
                        <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.title} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item?.created_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.customer_id?.customer_name ? item?.customer_id?.customer_name : "-"} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.customer_id?.mobile_number ? item?.customer_id?.mobile_number : "-"} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.priority ? item?.priority : "-"} </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>

                  <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
                </>
              : null}
            </div> */}

            {confirmationModal  ?
                      <Modal onClose={() => setConfirmationModal(false)}  show={confirmationModal} size="md">
                          <Modal.Header className="px-6 pt-6 pb-0"> <span className="sr-only"> Change status</span></Modal.Header>
                          <Modal.Body className="px-6 pt-0 pb-6">
                              <div className="flex flex-col items-center gap-y-6 text-center"> <HiOutlineExclamationCircle className="text-7xl text-red-500" /> <p className="text-xl text-gray-500"> Are you sure you want to chnage status ? </p>
                                  <div className="flex items-center gap-x-3">
                                      <Button color="failure"   onClick={() => DelCall()}>  Yes, I'm sure </Button> 
                                      <Button color="gray"  onClick={() => setConfirmationModal(false)}> No, cancel </Button> 
                                  </div>
                              </div>
                          </Modal.Body>
                      </Modal>
            : null}

            {ProductModal == true ?
                       <Modal
      onClose={() => setProductModal(false)}
      show={ProductModal}
      size="2xl"
      className="font-sans"
    >
      {/* Header */}
      <Modal.Header className="px-6 pt-6 pb-2 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Product Details
        </h2>
      </Modal.Header>

      {/* Body */}
      <Modal.Body className="px-6 py-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {Array.isArray(ProductItemModal) && ProductItemModal.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {ProductItemModal.map((item, k) => (
              <div
                key={k}
                className="py-3 grid grid-cols-2 md:grid-cols-4 gap-3 items-center"
              >
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item?._id?.name?.englishname || "-"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item?._id?.categories?.name_eng || "-"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item?._id?.packaging || "-"}  {item?._id?.packagingtype?.type_eng || "-"}
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Qty: {item?.quantity || 0}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            No product details available.
          </p>
        )}
      </Modal.Body>

    </Modal>
            : null}
          </>
        }
        </>
    );
}

export default SalesDashboardPage;