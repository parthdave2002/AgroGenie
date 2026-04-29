import { lazy,FC, useEffect, useMemo, useRef, useState } from "react";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaAngleDown, FaRupeeSign, FaUser, FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { DarkThemeToggle } from "flowbite-react";
import userphoto from "/images/users/roberta-casas.png";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import moment from "moment";
import { getNoticeBoardlist, getsalesDashboard, getSalesExecutiveOrderlist, resetinsertlogin } from "../../Store/actions";
import { DashboardCardProps, DashboardCount, DashboardPropsData } from "../../types/types";
const ExamplePagination = lazy(() => import("../../components/common/pagination/pagination"));
const CommonTable = lazy(() => import("../../components/common/table/commonTable"));
const BoardSection = lazy(() => import("../../components/salesComponent/boardData"));
const SalesProfile = lazy(() => import("./salesProfile"));
const SalesFarmerDashboard = lazy(() => import("./salesFarmerDashboard"));

const SalesDashboardPage : FC <DashboardPropsData> = function ({ setDatactive,  openProfile,setOpenProfile})  {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ isProfileData, setIsProfileData] = useState(false);
  const [ComplainData, setComplainData] = useState([])
  const [FarmerData, setFarmerData] = useState([])
  const [TotalRevenue, setTotalRevenue] = useState<DashboardCount>()
  const [TotalOrder, setTotalOrder] = useState<DashboardCount>()
  const [TotalFutureOrder, setTotalFutureOrder] = useState<DashboardCount>()
  const [TotalReturnOrder, setTotalReturnOrder] = useState<DashboardCount>()
  const [LoginUserimg, setLoginUserimg] = useState("");

  const login = useSelector((state:any) => state.Login.Logincode);
  const DashboardDataList = useSelector((state: any) => state.SalesDashboard.DashboardDataList?.data);
  const OrderDataList = useSelector((state: any) => state.Order.SalesExeOrderlist);
  const Baorddatalist = useSelector((state: any) => state.NoticeBoard.Baorddatalist);
  
  const [SalesOrderData, setSalesOrderData] = useState([])
  // ----------- next Button Order Code Start -------------
    const [TotalListData, setTotalListData] = useState(0);
    const [CurrentPageNo, setCurrentPageNo] = useState(0);
    const [PageNo, setPageNo] = useState(1);
    const [RoePerPage, setRoePerPage] = useState(5);
    const [BoardDataList, setBoardDataList] = useState([]);

    const RowPerPage = (event: any) => {
      const value = Number(event)
      setRoePerPage(value);
      setPageNo(1)
    };
    const PageOrderDataList = (data: any) => { setPageNo(data) }
  // ------------- Next button Order Code End -------------

  const [PageComplainNo, setPageComplainNo] = useState(1);
  const [RoePerComplainPage, setRoePerComplainPage] = useState(5);

  const RowPerComplainPageLoad = (event: any) => {
    const value = Number(event)
    setRoePerComplainPage(value);
    setPageComplainNo(1)
  };
  const PageComplainDataList = (data: any) => { setPageComplainNo(data) }

  const complainVisibleData = useMemo(() => {
    const startIndex = (PageComplainNo - 1) * RoePerComplainPage;
    return ComplainData.slice(startIndex, startIndex + RoePerComplainPage);
  }, [ComplainData, PageComplainNo, RoePerComplainPage]);

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

    FarmerData.forEach((_, _idx) => {
      if (imgCopy.length === 0) {
        imgCopy = [...userImages];
      }

      const randIdx = Math.floor(Math.random() * imgCopy.length);
      shuffled.push(imgCopy[randIdx]);
      imgCopy.splice(randIdx, 1);
    });

    return shuffled;
  }, [FarmerData]);

  const [data, setData] = useState<string | null>(null);

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

  // --------- notice boart Api call---------
    useEffect(() =>{
      dispatch(getNoticeBoardlist())
    },[dispatch])

    useEffect(() =>{
      setBoardDataList(Baorddatalist? Baorddatalist : []);
    },[Baorddatalist])
  // --------- notice board Api call---------

  useEffect(() =>{
    setTotalListData(OrderDataList?.totalData)
    setSalesOrderData(OrderDataList?.data)
    setCurrentPageNo(OrderDataList?.page)
  },[OrderDataList])

  useEffect(() => {
    if (DashboardDataList?.data) {
      setComplainData(DashboardDataList?.data?.complain)
      setFarmerData(DashboardDataList?.data?.customers?.data);
      setTotalFarmerListData(DashboardDataList?.data?.customers?.total);
      setCurrentFarmerPageNo(DashboardDataList?.data?.customers?.page);
      setPageFarmerNo(DashboardDataList?.data?.customers?.page);
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

    // ---------------- complain code start -----------
      const complainColumns = useMemo(() => [
        {
          key: "category_pic",
          label: "Complain id",
          render: (row: any) => row?.complain_id?.replace(/^#/, ''),
        },
        {
          key: "title",
          label: "Title",
        },
        {
          key: "customer_id",
          label: "Farmer Name",
          render: (row: any) => <div> {row?.customer_id?.firstname} {row?.customer_id?.middlename} {row?.customer_id?.lastname} </div>
        },
        {
          key: "mobile_number",
          label: "Mobile Number",
        },
        {
          key: "is_active",
          label: "Priority",
          render: (row: any) => (row?.priority ? (row.priority.charAt(0).toUpperCase() + row.priority.slice(1).toLowerCase()) : "-"),
        },
        {
          key: "created_at",
          label: "Created Date",
          render: (row: any) => (
            <div>{moment(row?.created_at).format("DD-MM-YYYY hh:mm:ss")}</div>
          )
        }
      ], [ComplainData]);
    // --------- compalin code end -------------

    // ---------------- Order code start -----------
      const orderColumns = useMemo(() => [
        {
          key: "order_pic",
          label: "Order id",
          render: (row: any) => row?.order_id?.replace(/^#/, ''),
        },
        {
          key: "added_at",
          label: "Order Date",
          render: (row: any) =>  <div>{moment(row?.added_at).format("DD-MM-YYYY hh:mm:ss")}</div>
        },
        {
          key: "order_type",
          label: "Order Type",
          render:(row: any) => (row?.order_type ? row?.order_type.charAt(0).toUpperCase() + row?.order_type.slice(1).toLowerCase() : "-" )
        },
        {
          key: "future_order_date",
          label: "Callback Date",
          render : (row: any) => (row?.order_type == "future" ? moment(row?.future_order_date).format("DD-MM-YYYY") : "-" )
        },
        {
          key: "total_amount",
          label: "COD Amt",
          render: (row: any) => (Math.round(row?.total_amount))
        },
        {
          key: "status",
          label: "Status",
          render: (row: any) =>  <div>{row?.status ? row?.status.charAt(0).toUpperCase() + row?.status.slice(1).toLowerCase() : "-"} </div>
        }
      ], [SalesOrderData]);
    // --------- Order code end -------------

    const Profilefun = () => { 
      setIsProfileData(true);
    }

    const CloseProfile =() => {
       setIsProfileData(false);
    }

    const DashboardCard = ({ icon: Icon,title, selectedFrame, onChange, data, }: DashboardCardProps) => {
      const displayValue = selectedFrame === "weekly" ? data?.weekly ?? 0 : selectedFrame === "monthly"? data?.monthly ?? 0 : data?.daily ?? 0;

      return (
        <div className="flex-1 mt-[1.5rem] md:mt-0">
          <div className="h-24 p-3 rounded-xl w-full flex justify-between bg-red-200 dark:bg-gray-700 dark:text-gray-50">
            <div className="flex w-full justify-between items-center">
              <div className="p-3 rounded-full bg-purple-500">
                <Icon className="text-white w-6 h-6" />
              </div>

              <select
                className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50"
                defaultValue="daily"
                onChange={onChange}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>

              <div className="text-center">
                <p className="text-md font-bold">{title}</p>
                <p className="text-lg font-bold mt-2">
                  {Math.round(displayValue)}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const cards = [
      {
        icon: FaRupeeSign,
        title: "Revenue",
        selectedFrame: selectedRevenueframe,
        onChange: RevenueDropDownCall,
        data: TotalRevenue,
      },
      {
        icon: FaHandHoldingDollar,
        title: "Total Order",
        selectedFrame: selectedOrderframe,
        onChange: OrderDropDownCall,
        data: TotalOrder,
      },
      {
        icon: FaRupeeSign,
        title: "Future Order",
        selectedFrame: selectedfutureOrderframe,
        onChange: FutureOrderDropDownCall,
        data: TotalFutureOrder,
      },
      {
        icon: FaUser,
        title: "Return Order",
        selectedFrame: selectedReturnframe,
        onChange: RetrunDropDownCall,
        data: TotalReturnOrder,
      },
    ];

    return (
        <> 
        
        {openProfile == true ?
          <SalesFarmerDashboard setOpenProfile={CloseProfileCall} />
          :
          <>

            <div className="flex justify-between">
              <div className="flex flex-col self-center mt-3">
                <div className="text-[0.9rem] text-gray-500 dark:text-gray-100 dark:text-gray-200"> Welcome back, {data ? data : ""}!</div>
                <div className="text-[2.5rem] font-semibold text-gray-900 dark:text-gray-100"> {isProfileData == false ? "Dashboard" : "Profile" }  </div>
              </div>

              <div className="relative flex ">
                <button onClick={() => setIsOpen(!isOpen)} className="flex items-center text-sm px-3 py-0.5 font-medium text-gray-900 hover:text-blue-600 md:me-0  dark:text-white  dark:hover:text-gray-100" type="button"  >
                  <img className="w-8 h-8 me-2 rounded-full" src={LoginUserimg ? LoginUserimg : userphoto} alt="user photo" />
                  <span> {data ? data : ""}  </span>
                  <FaAngleDown className="w-4 h-4 ms-3" />
                </button>

                {isOpen && (
                  <div ref={dropdownRef} className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 right-0 mt-[4rem]" >
                    <div onClick={handleClick} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex gap-x-2 cursor-pointer  text-sm text-gray-700 dark:text-gray-200"  >
                      <DarkThemeToggle className="hover:bg-gray-100 dark:hover:bg-gray-700 " style={{ padding: "0" }} />
                      <div className="self-center">Dark mode</div>
                    </div>

                    <div  onClick={() => Profilefun()} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex gap-x-2 cursor-pointer  text-sm text-gray-700 dark:text-gray-200"  >
                      <FaUserCircle size={20} className="text-gray-600 dark:text-gray-400" />
                      <div className="self-center">Prodile </div>
                    </div>

                    <div className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white flex gap-x-2" onClick={() => Logoutfun()}>
                      <FiLogOut size={20} className="text-gray-600 dark:text-gray-400" />
                      <div className="self-center"> Sign out </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {isProfileData == false ?
              <>
                <div className="md:flex flex-wrap gap-3 my-[2rem]">
                  {cards.map((card, index) => (
                    <DashboardCard key={index} {...card} />
                  ))}
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
                            <img src={imagesForFarmers[k] ?? "/images/farmer/11.webp"} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1" />
                            <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center max-w-[15rem] truncate"> {item?.firstname} {item?.middlename} {item?.lastname} </div>
                            <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center"> {item?.mobile_number}</div>
                            {/* <div className="text-gray-500 dark:text-gray-100 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center" onClick={() => handleClickCall()}> View </div> */}
                          </div>
                        ))}
                      </div>
                      <ExamplePagination PageData={PageFarmerDataList} RowPerPage={RowPerFarmerPageLoad} RowsPerPageValue={RoePerFarmerPage} PageNo={PageFarmerNo} CurrentPageNo={CurrentFarmerPageNo} TotalListData={TotalFarmerListData} />
                    </div>
                    : null}

                  {BoardDataList && BoardDataList.length ?
                    <BoardSection BoardDataList={BoardDataList} ViweAllCall={ViweAllCall} />
                    : null}
                </div>

                {SalesOrderData && SalesOrderData.length > 0 ?
                  <div className="mt-[4rem]">
                    <h3 className="mb-4 text-xl font-bold leading-none text-gray-900 dark:text-white"> Order List </h3>
                    {SalesOrderData && SalesOrderData.length > 0 ?
                      <>
                        <CommonTable columns={orderColumns} data={SalesOrderData || []} />
                        <ExamplePagination PageData={PageOrderDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
                      </>
                      : null}
                  </div>
                  : null}

                {ComplainData && ComplainData.length > 0 ?
                  <div className="mt-[4rem]">
                    <h3 className="mb-4 text-xl font-bold leading-none text-gray-900 dark:text-white"> Complain List  ({ComplainData.length})</h3>
                    {ComplainData && ComplainData.length > 0 ?
                      <>
                        <CommonTable columns={complainColumns} data={complainVisibleData || []} />
                        <ExamplePagination PageData={PageComplainDataList} RowPerPage={RowPerComplainPageLoad} RowsPerPageValue={RoePerComplainPage} PageNo={PageComplainNo} CurrentPageNo={PageComplainNo} TotalListData={ComplainData.length} />
                      </> 
                    : null}
                  </div>
                  : null}
              </>
            : <SalesProfile  CloseProfile={CloseProfile} />}
          </>
        }
        </>
    );
}

export default SalesDashboardPage;