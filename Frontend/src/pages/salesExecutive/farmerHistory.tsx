import { FC, lazy, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import moment from 'moment';
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerTagloglist, getFarmerComplainlist, getFarmerOrderlist, getWalletHistorylist } from '../../Store/actions';
import { FarmerHistoryProps } from '../../types/types';
import { FarmerDashboardTabData, WalletRuletypeoption } from '../../types/dropdown';
const CommonTable = lazy(() => import("../../components/common/table/commonTable"));
const ComplainDetails = lazy(() => import("../../components/salesComponent/complainDetails"));
const ExamplePagination = lazy(() => import("../../components/common/pagination/pagination"));

const FarmerHistory : FC <FarmerHistoryProps> = ({setOpenDetailId, setOpenDetailsmodal, setOpenDetailIData, AddtoCartCall, FuturOrderDate, setCartOrderid, openComplain, setOpenComplain}) => {
  const dispatch = useDispatch()

  // ----------- Tabnavbar code start --------------------
    const [selectedTabbar, setselectedTabbar] = useState("Order");
    const [UserOrderDataList, setUserOrderDataList] = useState([]);
    const [UserComplainDataList, setUserComplainDataList] = useState([]);
    const [UserTaglogDataList, setUserTaglogDataList] = useState([]);
    const [UserWalletDataList, setUserWalletDataList] = useState([]);
    const [isOpenComplainModel , setisOpenComplainModel ]  = useState(false);
    const [isComplainData , setisComplainData ]  = useState([]);

    useEffect(() => {
      const fetchAndOpenComplain = async () => {
        if (openComplain) {
          try {
            setselectedTabbar("Complain");
            const customerDataString = Cookies.get("customer_data");
            let customerData = null;
            if (customerDataString && customerDataString !== "undefined") {
              customerData = JSON.parse(customerDataString);
            }
            const customerId = customerData?._id;
            if (!customerId) return;
             
            if(isComplainData.length == 0){
              const requser = { customer_id: customerId, page: 1, size: 10 };
              await dispatch(getFarmerComplainlist(requser) as any);
            }
            
            await new Promise(resolve => setTimeout(resolve, 500));
            const complainItem = UserComplainDataList.find((item: any) => item?.complain_id === openComplain);

            if (complainItem) {
              setisComplainData(complainItem);
              await new Promise(resolve => setTimeout(resolve, 200));
              setisOpenComplainModel(true);
            } else {
              console.error("Complain item not found!");
              // toast.error("Complain not found!");
            }
          } catch (err) {
            console.error("Error fetching complain list:", err);
            // toast.error("Something went wrong!");
          }
        }
      };

      fetchAndOpenComplain();
    }, [openComplain, dispatch]);

    const TabSelection = (data: string) => {
      setselectedTabbar(data)
    }
  // ----------- Tabnavbar code end --------------------

  // ------------complain details page ------------------

    const ComplainCall = ( _id:string,data: any) =>{
      setisOpenComplainModel(true);
      setisComplainData(data);
    }

    const CloseModal = () =>{
      setisOpenComplainModel(false);
      setisComplainData([]);
      setOpenComplain?.("");
    }
  // ------------complain details page ------------------

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

  useEffect(() =>{
    const customerDataString = Cookies.get("customer_data");
    let customerData = null;
  
    try {
      if (customerDataString && customerDataString !== "undefined") {
        customerData = JSON.parse(customerDataString);
      }
    } catch (error) {
      console.error("Failed to parse customer_data:", error);
    }
  
    const customerId = customerData?._id || null;
    if (customerId) {
      const requser = {
        customer_id: customerId,
        page: PageNo,
        size: RoePerPage
      };

      if(selectedTabbar == "Order"){
        dispatch(getFarmerOrderlist(requser));
      }
      else if(selectedTabbar == "Complain"){
        dispatch(getFarmerComplainlist(requser));
      }else if(selectedTabbar == "Taglog"){
        dispatch(getCustomerTagloglist(requser));
      }
      else if(selectedTabbar == "Wallet"){
        dispatch(getWalletHistorylist(requser))
      }
    }
  },[dispatch, selectedTabbar, PageNo, RoePerPage ])

  // ------------- Get  Data From Reducer Code Start --------------
  
    const Orderlist = useSelector((state: any) => state.Order.SingleFarmerOrderlist );
    const Complainlist = useSelector((state: any) => state.Complain.SinglefarmerComplainlist );
    const Tagloglist = useSelector((state: any) => state.Taglog.CustomerTagloglist );
    const { WalletHistorylist, TotalWalletHistoryData, CurrentPage } = useSelector((state: any) => ({
        WalletHistorylist: state.Wallet.WalletHistorylist,
        TotalWalletHistoryData: state.Wallet.TotalWalletHistoryData,
        CurrentPage : state.Wallet.CurrentPage
    }));

    useEffect(() => {
      if(selectedTabbar == "Order"){
        setUserOrderDataList(Orderlist? Orderlist?.data : []);
        setTotalListData(Orderlist? Orderlist?.totalData : []);
        setCurrentPageNo(Orderlist? Orderlist?.page : []);  
      }
      else if(selectedTabbar == "Complain"){
        setUserComplainDataList(  Complainlist  ? Complainlist?.data  : [])
        setTotalListData(Complainlist? Complainlist?.totalData : []);
        setCurrentPageNo(Complainlist? Complainlist?.page : []);
      }
      else if(selectedTabbar == "Taglog"){
        setUserTaglogDataList(  Tagloglist  ? Tagloglist?.data : [])
        setTotalListData(Tagloglist? Tagloglist?.totalData : []);
        setCurrentPageNo(Tagloglist? Tagloglist?.page : []);
      }
      else if(selectedTabbar == "Wallet"){
        setUserWalletDataList(WalletHistorylist ? WalletHistorylist : [])
        setTotalListData(TotalWalletHistoryData? TotalWalletHistoryData : []);
        setCurrentPageNo(CurrentPage? CurrentPage : []);
      }
    }, [Orderlist, Complainlist, Tagloglist, WalletHistorylist,TotalWalletHistoryData ]);

  //  ------------- Get  Data From Reducer Code end --------------

  // -------------  Order  Details Call start -------------------
    const OderDetailsCall = ( id:string , data:any) => {
      setOpenDetailId(id);
      setOpenDetailIData(data);
      setOpenDetailsmodal(true)
    }
  // -------------  Order  Details Call end -------------------

  // -------------  Future Order  to Cart Call start -------------------
    const FuturaOrderCall = ( id:string , data:any) => {
      const productIds = data?.products?.map((item: any) => ({
        id: item?.id,
        quantity: item?.quantity,
      }));
      AddtoCartCall(productIds);
      FuturOrderDate(data?.future_order_date)
      setCartOrderid(id);
    }
  // -------------  Future Order  to Cart Call end -------------------

    const orderColumns = useMemo(() => [
      { key: "order_id", label: "Order ID",
        render: (row: any) => (
          <>
            {row?.order_type == "future" && row?.status == null ? 
              <span className="whitespace-nowrap text-base font-medium text-DarkBackground dark:text-White py-0 cursor-pointer" onClick={() => FuturaOrderCall(row?.order_id, row)}>  {row?.order_id} </span>
            : 
              <span className="whitespace-nowrap text-base font-medium text-DarkBackground dark:text-White py-0 cursor-pointer" onClick={() => OderDetailsCall(row?.order_id, row)}>  {row?.order_id} </span>
            }
          </>
        )                
      },
      { key: "added_at", label: "Order Date",
        render: (row: any) => moment(row?.added_at).format("DD-MM-YYYY hh:mm:ss")
      },
      { key: "order_type", label: "Order Type",
        render: (row: any) => row?.order_type ? row?.order_type.charAt(0).toUpperCase() + row?.order_type.slice(1).toLowerCase() : "-"
      },
      { key: "future_order_date", label: "Callback Date",
        render: (row: any) => row?.order_type == "future" && row?.future_order_date != null ? moment(row?.future_order_date).format("DD-MM-YYYY") : "-"
      },
      { key: "total_amount",  label: "COD Amount",
        render: (row: any) => Math.round(row?.total_amount)
      },
      { key: "advisor_name", label: "Created By",
        render: (row: any) => row?.advisor_name?.name
      },
      { key: "status", label: "Status",
        render: (row: any) => row?.status ? row?.status.charAt(0).toUpperCase() + row?.status.slice(1).toLowerCase() : "-"
      },
      { key: "action", label: "Action",
        render: (row: any) => (
          <>
            {row?.order_type == "future" && row?.status == null ?
              <Button className='GreenButton border-0 ' onClick={() => FuturaOrderCall(row?.order_id, row)}> Confirm Order</Button>
            : "-"}
          </>
        )
      }
    ],[FuturaOrderCall, OderDetailsCall]);

    const complainColumns = useMemo(() => [
      { key: "complain_id", label: "Complain id",
        render: (row: any) => (
          <span className="whitespace-nowrap text-base font-medium text-DarkBackground dark:text-White py-0 cursor-pointer" onClick={() => ComplainCall(row?.complain_id, row)}>  {row?.complain_id} </span>
        )
      },
      { key: "created_at", label: "Complain Date",
        render: (row: any) => moment(row?.created_at).format("DD-MM-YYYY hh:mm:ss")
      },
      { key: "product_id", label: "Product",
        render: (row: any) => (
          <>
            {row?.product_id?.map((product: any, index: number) => (
              <div key={index}>{product?.name?.englishname}</div>
            ))}
          </>
        )
      },
      { key: "resolution", label: "Status",
        render: (row: any) => row?.resolution.charAt(0).toUpperCase() + row?.resolution.slice(1).toLowerCase()
      },
      { key: "priority", label: "Type",
        render: (row: any) => row?.priority.charAt(0).toUpperCase() + row?.priority.slice(1).toLowerCase()
      },
      { key: "created_by", label: "Created By",
        render: (row: any) => row?.created_by?.name
      }
    ],[ComplainCall]);

    const taglogColumns = useMemo(() => [
      { key: "taglog", label: "Taglog",
        render: (row: any) => row?.taglog?.taglog_name
      },
      { key: "subtaglog", label: "SubTaglog",
        render: (row: any) => row?.subtaglog?.name
      },
      { key: "comment", label: "Comment",
        render: (row: any) => (
          <span className="max-w-[20rem] truncate text-base font-medium text-DarkBackground dark:text-White py-0 "> {row?.comment} </span>
        )
      },
      { key: "added_by", label: "Advisor Name",
        render: (row: any) => (
          <span className="max-w-[15rem] truncate text-base font-medium text-DarkBackground dark:text-White py-0 "> {row?.added_by?.name ? row?.added_by?.name : "-"} </span>
        )
      },
      { key: "created_at", label: "Created Date",
        render: (row: any) => moment(row?.created_at).format("DD-MM-YYYY hh:mm:ss")
      }
    ],[]);

    const walletColumns = useMemo(() => [
      { key: "event_type", label: "Wallet Rules", render: (row) => WalletRuletypeoption.find(item => item.value === row.event_type)?.label || row.event_type },
      { key: "points", label: "Points" },
      { key: "transaction_type", label: "Type"},
      { key: "added_by", label: "Advisor Name", render: (row: any) => ( <span className="max-w-[15rem] truncate text-base font-medium text-DarkBackground dark:text-White py-0 "> {row?.added_by?.name ? row?.added_by?.name : "-"} </span>)},
      { key: "added_at", label: "Created Date", render: (row: any) => moment(row?.added_at).format("DD-MM-YYYY hh:mm:ss")}
    ],[]);
    
  return (
    <>
      <div className='mt-3 border dark:border-Hydrocarbon rounded-xl w-full py-2 px-5'>
        <div className="flex items-center gap-x-6 bg-TitaniumWhite dark:bg-DarkBackground p-3 rounded-xl">
          <ul className="flex items-center gap-x-6">
            {FarmerDashboardTabData.map((data: any, k: number) => (
              <li key={k} className={`relative flex flex-col items-center justify-center gap-1 py-2 px-2 cursor-pointer transition-all duration-300 ease-in-out font-medium text-sm ${selectedTabbar === data.title ? "text-blue-500 font-semibold" : "text-SharkGray dark:text-SilverSteel"}`} onClick={() => TabSelection(data.title)} >
                <span className="flex items-center text-[1rem] font-semibold gap-x-4">{data.icon} {data.title}</span>
                {selectedTabbar === data.title && (<span className="px-2 absolute bottom-[-4px] left-0 w-full h-[2px] bg-blue-500"></span>)}
              </li>
            ))}
          </ul>
        </div>

        <div className='mt-[1.5rem] px-4'>
          {selectedTabbar == "Order" ?
              <>
                {UserOrderDataList && UserOrderDataList.length > 0 ?
                  <CommonTable columns={orderColumns} data={UserOrderDataList} />
                  : <div className='text-center py-4 dark:text-White'>No DataFound </div>}
              </>

            : selectedTabbar == "Complain" ?
              <>
                {UserComplainDataList && UserComplainDataList.length > 0 ?
                  <CommonTable columns={complainColumns} data={UserComplainDataList} />
                  : <div className='text-center py-4 dark:text-White'>No DataFound </div>}
              </>

            : selectedTabbar == "Taglog" ?
              <>
                  {UserTaglogDataList && UserTaglogDataList.length > 0 ?
                    <CommonTable columns={taglogColumns} data={UserTaglogDataList} />
                    : <div className='text-center py-4 dark:text-White'>No DataFound </div>}
              </>
            : selectedTabbar == "Wallet" ?
              <>
                  {UserWalletDataList && UserWalletDataList.length > 0 ?
                    <CommonTable columns={walletColumns} data={UserWalletDataList || []} />
                    : <div className='text-center py-4 dark:text-White'>No DataFound </div>}
              </>
            : null
          }
        </div>
        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
      </div>

      <ComplainDetails setisOpenComplainModel={CloseModal} isOpenComplainModel={isOpenComplainModel} isComplainData={isComplainData} />
    </>
  )
}

export default FarmerHistory