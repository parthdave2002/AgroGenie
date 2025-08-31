import React, { FC, useEffect, useState } from 'react';
import { Button, Table } from "flowbite-react";
import { BsCartCheckFill } from 'react-icons/bs';
import { FaRegClock } from 'react-icons/fa';
import { MdReport } from 'react-icons/md';
import moment from 'moment';
import ComplainDetails from '../../components/salesComponent/complainDetails';
import ExamplePagination from '../../components/pagination';
import { getCustomerTagloglist, getFarmerComplainlist, getFarmerOrderlist } from '../../Store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

interface FarmerHistoryProps{
  setOpenDetailId : ( value : any) => void;
  setOpenDetailsmodal : ( value : boolean) => void;
  setOpenDetailIData : ( value : any) => void;
  AddtoCartCall : ( value : any) => void;
  FuturOrderDate : ( value : any) => void;
  setCartOrderid : ( value : any) => void;
  openComplain ?: string;
  setOpenComplain  ?: ( value : string) => void;
  orderId ?: string;
  set_OrderId  ?: (value: string) => void;
}

const FarmerHistory : FC <FarmerHistoryProps> = ({setOpenDetailId, setOpenDetailsmodal, setOpenDetailIData, AddtoCartCall, FuturOrderDate, setCartOrderid, openComplain, setOpenComplain, orderId, set_OrderId}) => {
  const dispatch = useDispatch()

  // ----------- Tabnavbar code start --------------------
    const [selectedTabbar, setselectedTabbar] = useState("Order");
    const [UserOrderDataList, setUserOrderDataList] = useState([]);
    const [UserComplainDataList, setUserComplainDataList] = useState([]);
    const [UserTaglogDataList, setUserTaglogDataList] = useState([]);
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

    // useEffect(() =>{
    //   const fetchAndOpenComplain = async () => {
    //     if (orderId) {
    //           console.log(" +++++++++++++++++= >>>>>>>>", orderId);
    //       try {
    //         setselectedTabbar("Order");
    //         console.log("UserOrderDataList >>>>>>>>", UserOrderDataList.length);
            
    //         // if(UserOrderDataList.length == 0){
    //              const customerDataString = Cookies.get("customer_data");
    //               let customerData = null;
    //               if (customerDataString && customerDataString !== "undefined") {
    //                 customerData = JSON.parse(customerDataString);
    //               }
    //               const customerId = customerData?._id;
    //               if (!customerId) return;
    //               const requser = { customer_id: customerId, page: 1, size: 10 };
    //               await dispatch(getFarmerOrderlist(requser) as any);
    //         // }

    //         await new Promise(resolve => setTimeout(resolve, 500));
    //         const orderItem :any = UserOrderDataList.find((item: any) => item?.order_id === orderId);
    //         console.log("orderItem ***********", orderItem);

    //         if (orderItem) {
    //            setOpenDetailIData(orderItem);
    //             console.log("&&&&&&&&&&&&&&& orderItem ***********");
    //             await new Promise(resolve => setTimeout(resolve, 200));
    //             setOpenDetailsmodal(true)
    //             setOpenDetailIData(orderItem?.order_id);
    //         } else {
    //           console.error("Order item not found!");
    //           // toast.error("Complain not found!");
    //         }
    //       } catch (err) {
    //         console.error("Error fetching complain list:", err);
    //         // toast.error("Something went wrong!");
    //       }
    //     }
    //   };

    //   fetchAndOpenComplain();
    // },[orderId])

    const TabData = [
      { title: "Order", icon: <BsCartCheckFill  size={20} /> },
      { title: "Complain", icon: <MdReport  size={20} /> },
      { title: "Taglog", icon: <FaRegClock  size={20} /> },
    ]

    const TabSelection = (data: string) => {
      setselectedTabbar(data)
    }
  // ----------- Tabnavbar code end --------------------

  // ------------complain details page ------------------

    const ComplainCall = ( id:string,data: any) =>{
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
    }
  },[dispatch, selectedTabbar, PageNo, RoePerPage ])

  // ------------- Get  Data From Reducer Code Start --------------
  
    const Orderlist = useSelector((state: any) => state.Order.SingleFarmerOrderlist );
    const Complainlist = useSelector((state: any) => state.Complain.SinglefarmerComplainlist );
    const Tagloglist = useSelector((state: any) => state.Taglog.CustomerTagloglist );


    
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
    }, [Orderlist, Complainlist, Tagloglist]);

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

  return (
    <>

      <div className='mt-3 border dark:border-gray-600 rounded-xl w-full py-2 px-5'>
        <div className="flex items-center gap-x-6 bg-gray-100 dark:bg-gray-900 p-3 rounded-xl">
          <ul className="flex items-center gap-x-6">
            {TabData.map((data: any, k: number) => (
              <li key={k} className={`relative flex flex-col items-center justify-center gap-1 py-2 px-2 cursor-pointer transition-all duration-300 ease-in-out font-medium text-sm ${selectedTabbar === data.title ? "text-blue-500 font-semibold" : "text-gray-500 dark:text-gray-400"}`} onClick={() => TabSelection(data.title)} >
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
                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                  <Table.Head className="bg-gray-100 dark:bg-gray-700">
                    <Table.HeadCell>Order id</Table.HeadCell>
                    <Table.HeadCell>Order Date</Table.HeadCell>
                    <Table.HeadCell> Order Type</Table.HeadCell>
                    <Table.HeadCell>Callback Date</Table.HeadCell>
                    <Table.HeadCell>COD Amt</Table.HeadCell>
                    <Table.HeadCell>Created By</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell> Action</Table.HeadCell>
                  </Table.Head>

                  <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {UserOrderDataList && UserOrderDataList.map((item: any, k: number) => (
                      <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                            {item?.order_type == "future" && item?.status == null ? 
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => FuturaOrderCall(item?.order_id, item)}>  {item?.order_id} </Table.Cell>
                            : 
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => OderDetailsCall(item?.order_id, item)}>  {item?.order_id} </Table.Cell>
                          }
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item?.added_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.order_type ? item?.order_type.charAt(0).toUpperCase() + item?.order_type.slice(1).toLowerCase() : "-"} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.order_type == "future" && item?.future_order_date != null ? moment(item?.future_order_date).format("DD-MM-YYYY") : "-"} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {Math.round(item?.total_amount)} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.advisor_name?.name} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.status ? item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase() : "-"} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.order_type == "future" && item?.status == null ?
                          <Button className='bg-gradient-to-br from-purple-700 to-blue-400 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 border-0 ' onClick={() => FuturaOrderCall(item?.order_id, item)}> Confirm Order</Button>
                          : "-"}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                : <div className='text-center py-4 dark:text-gray-50'>No DataFound </div>}
            </>

            : selectedTabbar == "Complain" ?
              <>
                {UserComplainDataList && UserComplainDataList.length > 0 ?
                  <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                    <Table.Head className="bg-gray-100 dark:bg-gray-700">
                      <Table.HeadCell>Complain id</Table.HeadCell>
                      <Table.HeadCell>Complain Date</Table.HeadCell>
                      <Table.HeadCell> Product </Table.HeadCell>
                      <Table.HeadCell> Status </Table.HeadCell>
                      <Table.HeadCell> Type </Table.HeadCell>
                      <Table.HeadCell>Created By</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                      {UserComplainDataList && UserComplainDataList.map((item: any, k: number) => (
                        <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => ComplainCall(item?.complain_id ,item)}>  {item?.complain_id} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item?.created_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.product_id?.map((product: any, index: number) => (<div key={index}>{product?.name?.englishname}</div>))}</Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.resolution.charAt(0).toUpperCase() + item?.resolution.slice(1).toLowerCase()} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.priority.charAt(0).toUpperCase() + item?.priority.slice(1).toLowerCase()} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.created_by?.name} </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                  : <div className='text-center py-4 dark:text-gray-50'>No DataFound </div>}
              </>

              : selectedTabbar == "Taglog" ?
                <>
                  {UserTaglogDataList && UserTaglogDataList.length > 0 ?
                    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                      <Table.Head className="bg-gray-100 dark:bg-gray-700">
                        <Table.HeadCell> Taglog </Table.HeadCell>
                        <Table.HeadCell> SubTaglog </Table.HeadCell>
                        <Table.HeadCell> Comment </Table.HeadCell>
                        <Table.HeadCell>Advisor Name</Table.HeadCell>
                        <Table.HeadCell>Created Date</Table.HeadCell>
                      </Table.Head>

                      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                        {UserTaglogDataList && UserTaglogDataList.map((item: any, k: number) => (
                          <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.taglog?.taglog_name} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.subtaglog?.name} </Table.Cell>
                            <Table.Cell className="max-w-[20rem] truncate text-base font-medium text-gray-900 dark:text-white py-0 "> {item?.comment} </Table.Cell>
                              <Table.Cell className="max-w-[15rem] truncate text-base font-medium text-gray-900 dark:text-white py-0 "> {item?.added_by?.name ? item?.added_by?.name : "-"} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item.created_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                    : <div className='text-center py-4 dark:text-gray-50'>No DataFound </div>}
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