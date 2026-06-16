import React, { FC, lazy, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { SalesProPropsData } from '../../types/types';
const Salesproductlist = lazy(() => import("../../components/productdetails/salesproductlist"));
const SalesMobileInput = lazy(() => import("../../components/common/inputComponent/salesMobileInput"));
const ProductDetailData = lazy(() => import("../../components/productdetails/salesproductDetails"));

const SalesProduct : FC <SalesProPropsData> = function ({ setDatactive})  {

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
              <div className="text-[2rem] font-semibold text-DarkBackground dark:text-TitaniumWhite"> Products   </div>
            </div>
            <SalesMobileInput datatype='text' className="py-2 px-6 border-0  rounded-full text-[2rem] text-SharkGray font-bold relative shadow-xl dark:shadow-xl  shadow-inner shadow-indigo-200  dark:shadow-SharkGray/50 dark:bg-TranquilBlack dark:text-TitaniumWhite"  value={searchData} handleChange={(data) =>handleChange(data)} handleClickCall={handleClickCall} placeholder="Search Product"  />
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