import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetProductViewlist } from '../../Store/actions';
import { IoArrowRedoSharp } from "react-icons/io5";
const IMG_URL = import.meta.env["VITE_API_URL"];
import { SiBattledotnet } from "react-icons/si";
import { FaWindowClose } from 'react-icons/fa';

interface PropsData{  
    ProductDetails : string 
    ProductCLoseCall : () => void;
}

interface ProductName {
    gujaratiname:string;
    englishname: string;
}
interface TechName{
    gujarati_tech_name: string;
    english_tech_name : string;
  }
  
  interface Category{
    name_eng: string;
  }

  interface Description{
    englishHeader: string;
    englishValue: string;
  }

  interface CompanyData{  name_eng : string; }
 interface PackingType {  type_eng: string }
interface ProductData{
        name: ProductName;
        tech_name: TechName;
        price: number;
        discount: number;
        product_pics: [];
        c_gst: number;
        s_gst: number;
        avl_qty: number;
        rating: any;
        batch_no: string;
        hsn_code: string;
        is_active: boolean;
        is_deleted: boolean;
        _id: string;
        packagingtype: PackingType;
        packaging: number;
        company: CompanyData;
        categories : Category;
        description : Description[];
}


const SalesProductDetailData : FC<PropsData> = ({ProductDetails, ProductCLoseCall}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ Product_data, setProductData  ] = useState<ProductData>()
    const dispatch = useDispatch()

    useEffect(() => {
       let requserdata ={ id : ProductDetails}
        dispatch(GetProductViewlist(requserdata));
   }, [dispatch, ProductDetails]);

   const  Productlist  = useSelector((state: any) => state.Product.singleProductlist );
   useEffect(() => {
       setProductData(Productlist?.data);
   }, [Productlist]);
    
    const autoPlay = true;
    const intervalTime = 3000;

    // useEffect(() => {
    //     if (!autoPlay) return;
    //     const interval = setInterval(() => {
    //         setCurrentIndex((prev) => (prev ===  Product_data?.product_pics.length - 1 ? 0 : prev + 1));
    //     }, intervalTime);
    //     return () => clearInterval(interval);
    // }, [currentIndex, autoPlay]);

  return (
    <>
        {/* <div>SalesProductDetailData ,{ ProductDetails }</div> */}
        <div className='flex justify-between px-4'>
            <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> Product Details   </div>
            <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100 flex self-center cursor-pointer " onClick={ProductCLoseCall}> <FaWindowClose /> </div>
        </div>
        
        <div className='flex px-3 mt-[2rem]'>
            <div className='flex-1'>
                  <div className="relative w-full">
                      <div className="relative h-56 overflow-hidden rounded-lg md:h-96 bg-white">
                          {Product_data?.product_pics && Product_data?.product_pics.map((src:any, index:number) => (
                              <img
                                  key={index}
                                  src= {  `${IMG_URL}/public/product/${src}`}
                                  alt={`Slide ${index + 1}`}
                                  className={`absolute top-1/2 left-1/2 
              -translate-x-1/2 -translate-y-1/2 
              w-full h-full object-contain 
              transition-opacity duration-700 ease-in-out
              ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
                              />
                          ))}
                      </div>
                  </div>
            </div>

              <div className='flex-1 px-[3rem]'>

                  <div className='dark:text-gray-100 text-[1.5rem] font-bold'> {Product_data?.name?.englishname} </div>
                  <div className='dark:text-gray-400 text-[1rem] mt-3'> {Product_data?.tech_name?.english_tech_name} </div>
                  <div className='dark:text-gray-400 text-[1rem] mt-3 flex gap-x-3'> <div className='w-[8rem]'>Packing </div> : {Product_data?.packaging}  {Product_data?.packagingtype?.type_eng}  </div>
                  <div className='dark:text-gray-400 text-[1rem] mt-3 flex gap-x-3'> <div className='w-[8rem]'> Available Qty </div> : {Product_data?.avl_qty} </div>
                  <div className='dark:text-gray-400 text-[1rem] mt-3 flex gap-x-3'> <div className='w-[8rem]'>Company </div> : {Product_data?.company?.name_eng} </div>

                  <div className='dark:text-gray-400 text-[1rem] mt-3 flex gap-x-3'> <div className='w-[8rem]'>Price (₹) </div> :  {Product_data?.price}</div>
                  <div className='dark:text-gray-400 text-[1rem] mt-3 flex gap-x-3'> <div className='w-[8rem]'>Discount </div> : {Product_data?.discount}</div>
                  <div className='dark:text-gray-400 text-[1rem] mt-3 flex gap-x-3'> <div className='w-[8rem]'>Batch No </div>  : {Product_data?.batch_no.replace(/"/g, '')}</div>
                  <div className='dark:text-gray-400 text-[1rem] mt-3 flex gap-x-3'> <div className='w-[8rem]'> HSN Code </div> : {Product_data?.hsn_code.replace(/"/g, '')}</div>
                  <div className='dark:text-gray-400 text-[1rem] mt-3 flex gap-x-3'> <div className='w-[8rem]'> SGST </div> : {Product_data?.s_gst}</div>
                  <div className='dark:text-gray-400 text-[1rem] mt-3 flex gap-x-3'> <div className='w-[8rem]'> CGST </div> : {Product_data?.c_gst}</div>

              </div> 
        </div>

          <div className="mt-12 px-3">
          <h3 className="text-[1.5rem] font-semibold text-gray-700 mb-2 dark:text-gray-100">Description</h3>
              {Product_data?.description && Product_data?.description.map((data:any, index:number) => (
                  <div key={index} className="mb-4 p-4 rounded-lg shadow-sm">
                    
                      <div className="flex flex-col gap-2 ">
                          <div className="font-bold text-gray-600 dark:text-gray-100 text-[1.2rem] flex gap-x-3"> <IoArrowRedoSharp className='self-center' /> {data.englishHeader} </div>
                          <div className="font-medium text-gray-600 dark:text-gray-100  flex gap-x-3"> <div className='h-4 w-4 flex self-top pt-1'> <SiBattledotnet /> </div> <div className='text-[0.9rem]'> {data.englishValue} </div> </div>
                      </div>
                  </div>
              ))}
          </div>
    </> 
  )
}

export default SalesProductDetailData