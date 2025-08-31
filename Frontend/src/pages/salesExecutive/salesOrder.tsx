import SalesMobileInput from '../../components/input/salesMobileInput';
import React, { FC, useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import  farmerimage from "/images/users/farmer-2.png"
import SalesFarmerDashboard from './salesFarmerDashboard';
import moment from 'moment';
import { CheckCustomerExist, getCallbackdata } from "../../Store/actions";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoaderPage from '../../components/loader';
import ToastMessage from '../../components/ToastMessage';

interface PropsData{
  setDatactive :any;
  openProfile : boolean;
  setOpenProfile : (value : boolean) => void;
}
const SalesOrder : FC <PropsData> = function ({ setDatactive, openProfile,setOpenProfile })  {
  const dispatch = useDispatch()
  const [isLoading, setisLoading] = useState(false);
  const [inialTime, setinialTime] = useState(true);
  const DashboardCall = (data:string) => setDatactive(data)
  const [ orderId, set_OrderId] = useState<string>("");
  
  const handleClickCall = () => {
    if (!orderId) {
       toast.error("Please enter order id");
    }else{
      let requser = { order_id: orderId }
      setisLoading(true);
      setinialTime(false)
      dispatch(CheckCustomerExist(requser))
    }
  }

  const handleChange = (data: string) => set_OrderId(data);
  const CloseProfileCall = () => {
    setOpenProfile(false);
    setDatactive("Farmer")
  }

  const CallBackCall = (data :string) =>{
    const newData = data.replace(/^#/, ''); 
    set_OrderId(newData);
    handleClickCall()
  } 

  //---------    Get callback data  start--------- 
    const [Farmerdata, setFarmerdata] = useState([])
    const CallBackUserList = useSelector((state: any) => state.SalesDashboard.CallBackUserList);

    useEffect(() => {
      dispatch(getCallbackdata())
    }, [dispatch])

    useEffect(() => {
      if (CallBackUserList) {
        setFarmerdata(CallBackUserList?.data)
      }
    }, [CallBackUserList])
  //---------    Get callback data end--------- 

  // --------------- check complain data and the login start ---------------
    const CheckCustomerExistlist = useSelector((state: any) => state.Customer.CheckCustomerExistlist);
    useEffect(() => {
      if (CheckCustomerExistlist?.success == true && inialTime == false) {
        setOpenProfile(true);
        setisLoading(false)
      }else if(CheckCustomerExistlist?.success == false){
        toast.error(CheckCustomerExistlist?.msg)
         setisLoading(false)
      }
    }, [CheckCustomerExistlist])
  // --------------- check complain data and the login start ---------------

  return (
    <>
      {isLoading ? <LoaderPage /> : null  }
      {openProfile == true ?
            <SalesFarmerDashboard orderId={orderId} set_OrderId={set_OrderId} setOpenProfile={CloseProfileCall} />
        :
        <>
          <div className='flex justify-between'>
            <div className='flex flex-col self-center'>
              <div className="text-[0.9rem] text-blue-500 flex gap-x-3 cursor-pointer w-fit " onClick={() => DashboardCall("Dashboard")}  >  <FaArrowLeft style={{ alignSelf: "center" }} /> Back to Dashboard  </div>
              <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100">Future Orders  </div>
            </div>
            <SalesMobileInput placeholder="Search Order" className="py-2 px-6 border-0  rounded-full text-[2rem] text-gray-500 font-bold relative shadow-xl dark:shadow-xl  shadow-inner shadow-indigo-200  dark:shadow-gray-500/50 dark:bg-gray-700 dark:text-gray-100" value={orderId} handleClickCall={handleClickCall} handleChange={(data) =>handleChange(data)} />
          </div>

          <div className="grid  xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Farmerdata &&   Farmerdata.map((item: any, k: number) => (
                    <div className="bg-white dark:bg-gray-900 p-2 rounded-[3rem] my-2" key={k}>
                        <div className={`${k % 2 === 0 ? "bg-[#fdf6e4]" : "bg-[#f4f9fd]"} dark:bg-gray-800 px-[0.8rem] py-[1rem] rounded-t-[3rem] flex flex-col gap-y-1 relative`}>
                          {k % 2 === 0 && (
                            <>
                              <div className="absolute lg:top-[2rem] lg:left-[6.5rem]   md:top-[2.5rem] md:left-[8rem]   xl:top-[3rem] xl:left-[6.5rem] text-yellow-500 text-[0.7rem] font-bold">Z</div>
                              <div className="absolute lg:top-[1rem] lg:left-[5rem]   md:top-[1.5rem] md:left-[7rem]  xl:top-[2rem] xl:left-[5rem] text-yellow-500 text-[0.9rem] font-bold">Z</div>
                              <div className="absolute lg:top-1 lg:left-[7rem]   md:top-[0.5rem] md:left-[8rem]     xl:top-2 xl:left-[6rem] text-yellow-500 text-[1.2rem] font-bold">Z</div>
                              <div className="absolute lg:top-[1rem] lg:right-[7rem]   md:top-[1.2rem] md:right-[8.5rem]  xl:top-[1rem] xl:right-[7.3rem] text-yellow-500 text-[0.7rem] font-bold">Z</div>
                              <div className="absolute lg:top-1 lg:right-[5.5rem]   md:top-1 md:right-[7rem]  xl:top-1 xl:right-[5.5rem] text-yellow-500 text-xl font-bold">Z</div>
                              <div className="absolute lg:top-[2rem] lg:right-[6rem]   md:top-[2rem] md:right-[7.5rem]  xl:top-[1.8rem] xl:right-[6.5rem] text-yellow-500 text-[0.9rem] font-bold">Z</div>
                            </>
                          )}
                          <img src={farmerimage} alt="" className={` h-16 w-16 rounded-full self-center border-2 ${k % 2 === 0 ? "border-[#ffdd85]" : "border-blue-600"}  p-1`} />
                          
                          <div className="flex justify-between mt-3">
                            <div className="text-gray-700 dark:text-gray-100 text-[1rem] truncate flex-1">   {item?.customer?.firstname}  {item?.customer?.middlename}  {item?.customer?.lastname}  </div>
                            <div className="text-gray-700 dark:text-gray-100  text-[1rem] text-end flex-1 ">   {item?.customer?.mobile_number}   </div>
                          </div>

                          <div className="flex justify-between mt-2">
                            <div className="text-gray-700 dark:text-gray-100  text-[1rem]  flex-1 ">  Created Date    </div>
                            <div className="text-gray-700 dark:text-gray-100 text-[1rem] truncate flex-1 text-end">   {moment(item?.order_date).format("DD-MM-YYYY")}  </div>
                          </div>

                          <div className="flex justify-between mt-2">
                            <div className="text-gray-700 dark:text-gray-100 text-[1rem] truncate flex-1">  Followup Date  </div>
                            <div className="text-gray-700 dark:text-gray-100  text-[1rem] text-end flex-1 ">   {moment(item?.future_order_date).format("DD-MM-YYYY")}   </div>
                          </div>

                          <div className="text-gray-500 mt-3 text-[1.2rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center px-[4rem]" onClick={() => CallBackCall(item?.order_id)}>   Call    </div>
                        </div>

                        <div className="py-[0.5rem] rounded-xl flex justify-around">
                        <div className="text-gray-600 dark:text-gray-100  text-center  flex flex-col">
                                <span className="text-[1rem]"> Complain </span>
                                <span className="text-[1.4rem] text-gray-900 dark:text-gray-100 font-bold"> {item?.totalComplain}   </span>
                            </div>
                            <div className="text-gray-600 dark:text-gray-100  text-center  flex flex-col">
                                <span className="text-[1rem]"> Order </span>
                                <span className="text-[1.4rem] text-gray-900 dark:text-gray-100 font-bold"> {item?.totalConfirmOrders}   </span>
                            </div>
                            <div className="text-gray-600 dark:text-gray-100  text-center  flex flex-col">
                                <span className="text-[1rem]"> Return </span>
                                <span className="text-[1.4rem] text-gray-900 dark:text-gray-100 font-bold"> {item?.totalReturnOrder}   </span>
                            </div>
                        </div>
                    </div>
                    ))}
          </div>
        </>
      }
      <ToastMessage />
    </>
  )
}

export default SalesOrder