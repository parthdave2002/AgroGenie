import React, { FC, useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import ProductDetailData from '../../components/productdetails/salesproductDetails';
import SalesMobileInput from '../../components/input/salesMobileInput';
import Salesproductlist from '../../components/productdetails/salesproductlist';
interface PropsData{
    setDatactive :any;
}
const SalesProduct : FC <PropsData> = function ({ setDatactive})  {

    const [ProductDetails, setProductDetails] = useState<null | string>(null);
    const [searchData, setSearchData] = useState("");
    const handleChange = (data:any) => setSearchData(data)

  const ProductDetailsCall = (data:string) =>  setProductDetails(data);
  const ProductCLoseCall = () => {
    setProductDetails(null);
  }
  const DashboardCall = (data:string) => setDatactive(data)
  const handleClickCall = () => console.log("callll");
  const call = () =>  console.log("Add to cart call");

  return (
    <>
      {ProductDetails != null ?
        <>
          <ProductDetailData ProductDetails={ProductDetails} ProductCLoseCall={ProductCLoseCall}  />
        </>
      :
        <>
          <div className='flex justify-between'>
            <div className='flex flex-col self-center'>
              <div className="text-[0.9rem] text-blue-500 flex gap-x-3 cursor-pointer w-fit " onClick={() => DashboardCall("Dashboard")}  >  <FaArrowLeft style={{ alignSelf: "center" }} /> Back to Dashboard  </div>
              <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> Products   </div>
            </div>
            <SalesMobileInput datatype='text' className="py-2 px-6 border-0  rounded-full text-[2rem] text-gray-500 font-bold relative shadow-xl dark:shadow-xl  shadow-inner shadow-indigo-200  dark:shadow-gray-500/50 dark:bg-gray-700 dark:text-gray-100"  value={searchData} handleChange={(data) =>handleChange(data)} handleClickCall={handleClickCall} placeholder="Search Product"  />
          </div>
          
          <div>
              <Salesproductlist searchData={searchData} ProductDetailsCall={ProductDetailsCall} isLoggedin={false} AddtoCartCall={call} />
          </div>
        </>
      }
    </>
  );
}

export default SalesProduct