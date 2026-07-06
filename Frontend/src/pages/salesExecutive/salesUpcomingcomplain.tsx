import { lazy, FC, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { CheckCustomerExist, getSalesComplainlist, ResetComplainlist } from "../../Store/actions";
import moment from "moment";
import { toast } from "react-toastify";
import { SalesComplainPropsData } from "../../types/types";
const SalesMobileInput = lazy(() => import("../../components/common/inputComponent/salesMobileInput"));
const LoaderPage = lazy(() => import("../../components/common/loader/loader"));
const ToastMessage = lazy(() => import("../../components/common/toastmessage/ToastMessage"));
const SalesFarmerDashboard = lazy(() => import("./salesFarmerDashboard"));

const SalesUpcomingComplainPage : FC <SalesComplainPropsData> = function ({ setDatactive, openProfile, setOpenProfile, openComplain, setOpenComplain })  {
    
    const dispatch = useDispatch()
    const [isLoading, setisLoading] = useState(false);
    const [inialTime, setinialTime] = useState(true);

    const DashboardCall = (data:string) => setDatactive(data)
    const CloseProfileCall = () => {
        setOpenProfile(false);
        setDatactive("Farmer")
    }

    const ViewCall = (data: string) => setOpenProfile(true)
    const [searchComplainData, setSearchComplainData] = useState<string>("");
    const handleChange = (data: string) => setSearchComplainData(data);
    const handleClickCall = () => {
        if (!searchComplainData) {
            toast.error("Please enter complain id");
        }
        else{
            let requser={ complain_id : searchComplainData.trim()  }
            setisLoading(true);
            setinialTime(false)
            dispatch(CheckCustomerExist(requser))
        }
    }

    useEffect(() =>{
        setinialTime(true)
        dispatch(ResetComplainlist())
        dispatch(getSalesComplainlist())
    },[])

    const [UserComplainDataList, setUserComplainDataList] = useState([]);
    const Complainlist = useSelector((state: any) => state.Complain.SalesComplainlist);
    useEffect(() => {
        setUserComplainDataList(Complainlist ? Complainlist : [])
    }, [Complainlist]);

    // --------------- check complain data and the login start ---------------
    const CheckCustomerExistlist = useSelector((state: any) => state.Customer.CheckCustomerExistlist);
    useEffect(() => {
        if (CheckCustomerExistlist?.success == true && inialTime == false ) {
            setOpenProfile(true);
           setOpenComplain(searchComplainData)
            setisLoading(false)
        }else if (CheckCustomerExistlist?.success == false){
            dispatch(ResetComplainlist())
            toast.error(CheckCustomerExistlist?.msg)
            setisLoading(false)
        }
    }, [CheckCustomerExistlist])
    // --------------- check complain data and the login start ---------------

    return (
        <>  
            {isLoading ? <LoaderPage /> : null  }
            {openProfile == true ?
                <SalesFarmerDashboard  openComplain={openComplain} setOpenComplain={setOpenComplain}   setOpenProfile={CloseProfileCall} />
                : 
                <>
                    <div className='lg:flex justify-between'>
                        <div className='flex flex-col self-center'>
                            <div className="text-[0.9rem] text-blue-500 flex gap-x-3 cursor-pointer w-fit " onClick={() => DashboardCall("Dashboard")}> <FaArrowLeft style={{ alignSelf: "center" }} /> Back to Dashboard</div>
                            <div className="text-[2rem] font-semibold text-DarkBackground dark:text-TitaniumWhite"> Total Complain ({String(UserComplainDataList?.length).padStart(2, '0')}) </div>
                        </div>
                        <SalesMobileInput placeholder="Search Complain" className="py-2 px-6 border-0  rounded-full text-[2rem] text-SharkGray font-bold relative shadow-xl dark:shadow-xl  shadow-inner shadow-indigo-200  dark:shadow-SharkGray/50 dark:bg-TranquilBlack dark:text-TitaniumWhite" value={searchComplainData} handleChange={(data) =>handleChange(data)} handleClickCall={handleClickCall}  />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-[2rem]">
                        {UserComplainDataList && UserComplainDataList.map((item: any, k:number) => (
                            <div className=" bg-White dark:bg-TranquilBlack dark:hover:bg-Hydrocarbon p-4 rounded-xl relative" key={k}>
                                <div> {item?.priority && <div className={`absolute left-3 top-4 bottom-4 w-1 rounded-md ${item?.priority == "high" ? "bg-red-400" : item?.priority == "medium" ? "bg-yellow-400" : item?.priority == "low" ? "bg-blue-400" : ""}`} />} </div>

                                <div className="pl-3 lg:flex justify-between">
                                    <div className="flex-1 overflow-hidden text-SharkGray dark:text-White max-w-[15rem] truncate whitespace-nowrap"> {item?.title} </div>
                                    <div className="lg:flex justify-end flex-1">
                                        <div className="text-[0.8rem] xl:text-[0.9rem] text-SharkGray dark:text-White"> {item?.customer_id?.firstname} {item?.customer_id?.lastname}  |  {item?.complain_id?.replace('#', '')} </div>
                                    </div>
                                </div>

                                <div className="pl-3 flex justify-between my-2">
                                    <div className="text-SharkGray dark:text-White text-[1rem] truncate max-w-[15rem]  lg:max-w-[35rem]">  {item?.Comment?.[item.Comment.length - 1]?.comment || "No comment available"} </div>
                                </div>

                                <div className="pl-3 flex justify-between">
                                    <div className="text-SharkGray dark:text-White text-[0.8rem]  text-center self-end"> {moment(item?.created_at).format("DD-MM-YYYY")} | {item?.priority} </div>
                                     {/* <div className="text-SharkGray dark:text-White text-[1rem] text-center border border-SharkGray rounded-md size-fit px-[4rem] cursor-pointer self-center" onClick={() => ViewCall(item?.complain_id)}> View </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }

            <ToastMessage />
        </>
    );
}

export default SalesUpcomingComplainPage;