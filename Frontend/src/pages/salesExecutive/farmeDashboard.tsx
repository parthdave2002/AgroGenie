import React, { FC, useEffect, useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowRight, MdKeyboardArrowUp } from 'react-icons/md'
import Cookies from 'js-cookie';
import { ProfileInfo } from 'types/types';

interface DashboardProps{
  classData ?: string;
  viewButton : boolean;
}

const FarmeDashboard : FC <DashboardProps> = ({classData, viewButton}) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const [data, setData] = useState<ProfileInfo | null>()  
  //  -------------Farmer Data get  code start ----------------------
    const customerDataString = Cookies.get("customer_data");
    useEffect(() => {
      if (customerDataString && customerDataString !== "undefined") {
        try {
          const customerData = JSON.parse(customerDataString);
          setData(customerData || null);
        } catch (error) {
          console.error("Failed to parse customer_data:", error);
          setData(null);
        }
      } else {
        setData(null);
      }
    }, [customerDataString]);
  //  -------------Farmer Data get  code end  ----------------------

  return (
    <>
      { data && data  ? 
        <div className={classData}> 
        <div>
          <div className=' dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '> <div className="w-[10rem]" > Name</div> <div> :  {data?.firstname ? data?.firstname : "-"}  {data?.middlename ? data?.middlename : "-"}   {data?.lastname ? data?.lastname : "-"} </div>   </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Mobile No</div>  <div> :  {data?.mobile_number ? data?.mobile_number : "-"} </div>  </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]"> Alternate No  </div>  <div> :  {data?.alternate_number ? data?.alternate_number : "-"} </div>  </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Address </div> <div> :    {data?.address ? data?.address  : "-"}</div>   </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > District </div> <div> :   {data?.district_name ? data?.district_name : "-"}</div>   </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Taluka </div> <div> :     {data?.taluka_name ? data?.taluka_name : "-"}</div>   </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Village </div> <div> :    {data?.village_name ? data?.village_name : "-"}</div>   </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Pincode </div> <div> :    {data?.pincode ? data?.pincode : "-"}</div>   </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Post Office </div> <div> :    {data?.post_office ? data?.post_office : "-"}</div>   </div>

          {expanded && (
            <>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Land area </div> <div>: {data?.land_area}  {data?.land_type}</div>   </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Irrigation Source </div>   <div>: {data?.irrigation_source ? data?.irrigation_source.charAt(0).toUpperCase() + data?.irrigation_source.slice(1).toLowerCase() : "-"}</div>   </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Irrigation type </div>  <div> : {data?.irrigation_type ? data?.irrigation_type.charAt(0).toUpperCase() + data?.irrigation_type.slice(1).toLowerCase() : "-"}</div>    </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Smart phone user</div>  <div> : {data?.smart_phone == true ? "Yes" : "No"}</div>   </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]"  >Crops </div>  <div>: {data?.crops ? data?.crops?.map((crop:any) => crop?.name_eng).join(', ') : "-"}</div>   </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Heard about us </div> <div>: {data?.heard_about_agribharat ? data?.heard_about_agribharat.charAt(0).toUpperCase() + data?.heard_about_agribharat.slice(1).toLowerCase() : "-"} </div>   </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Ref. No </div> <div>: {data?.ref_name ? data?.ref_name :  "-"} </div>   </div>
            </>
          )}
        </div>
        
        {viewButton ?
          <div className='flex justify-end'>
            <div className="group  border border-indigo-500 text-indigo-500 dark:text-white hover:text-gray-100 font-semibold px-6 py-2 rounded-full  gap-2 hover:bg-indigo-800 transition flex  justify-end text-center w-[12rem] cursor-pointer  transition-all duration-500 ease-in-out" onClick={toggleExpand}>   {expanded ? "VIEW LESS" : "VIEW MORE"}
              {expanded ?
                <MdKeyboardArrowUp className="h-6 w-6 self-center " />
                :
                <> <MdKeyboardArrowRight className="h-6 w-6 self-center group-hover:hidden" />   <MdKeyboardArrowDown className="h-6 w-6 self-center hidden group-hover:block" />   </>
              }
            </div>
          </div>
        : null}
      
        </div>
      : null  }
    </>
  )
}

export default FarmeDashboard