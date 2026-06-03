import React, { lazy, FC, useEffect, useState } from 'react'
import { FaPencilAlt, FaPowerOff } from 'react-icons/fa'
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { FarmerDashboardPropsData } from '../../types/types';
const NeaByFarmer = lazy(() => import("./nearByfarmer"));
const CartList = lazy(() => import("./cart"));
const FarmerHistory = lazy(() => import("./farmerHistory"));
const FarmeDashboard = lazy(() => import("./farmeDashboard"));
const SalesAddFarmer = lazy(() => import("./salesAddFarmer"));
const LogoutModal = lazy(() => import("../../components/common/modal/logoutModal"));
const OrderDetails = lazy(() => import("../../components/salesComponent/orderDetails"));
const LoaderPage = lazy(() => import("../../components/common/loader/loader"));
const SalesMobileInput = lazy(() => import("../../components/common/inputComponent/salesMobileInput"));
const ProductDetailData = lazy(() => import("../../components/productdetails/salesproductDetails"));
const Salesproductlist = lazy(() => import("../../components/productdetails/salesproductlist"));

const SalesFarmerDashboard : FC<FarmerDashboardPropsData> = ( {setOpenProfile, Mobile_number, openComplain, setOpenComplain, orderId, set_OrderId }) => {
  const [farmedAdded, setFarmerAdded] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [ isEditFarmer, setIsEditFarmer] = useState(false);

  const CheckCustomerExistlist = useSelector((state: any) => state.Customer.CheckCustomerExistlist);
  useEffect(() => {
    if (CheckCustomerExistlist?.success == true) {
      setFarmerAdded(false)
      setisLoading(false)
    }
    else if (CheckCustomerExistlist?.success == false) {
      setFarmerAdded(true)
      setisLoading(false)
    }
  }, [CheckCustomerExistlist])

  const EditFarmerCall = () => {
    setFarmerAdded(true) 
    setIsEditFarmer(true)
  }

  //-------------- Logout modal Code start --------------
    const [ logoutModal, setLogoutModal] = useState(false);
    const LogOutCall = () =>  setLogoutModal(true)
    const handleClose = () =>  setLogoutModal(false)
    const handleAccept = () =>{
      Cookies.remove("customer_data");
      setLogoutModal(false)
      setOpenProfile(false)
    }
  //-------------- Logout modal Code end --------------

    const [ProductDetails, setProductDetails] = useState<null | string>(null);
    const ProductDetailsCall = (data: string) => setProductDetails(data);
    const ProductCLoseCall = () =>  setProductDetails(null);

    const [searchData, setSearchData] = useState("");
    const handleChange = (data: any) => setSearchData(data)
    const handleClickCall = () => console.log("callll");

  // -------- Cart open/close code start ----------
    const [ cartOpen, setCartOpen] = useState(false); 
    const [ cartItem, setCartItem] = useState<any[]>([]); 
    const [ cartOrderid, setCartOrderid] = useState(null); 
    const [ future_date, setfuture_date] = useState(null); 

    const OpenCartCall = () => setCartOpen(true);    

    const AddtoCartCall = (data: any | any[]) => {
      setCartItem((prevItems) => {
        const newItems = Array.isArray(data) ? data : [data];
        const normalizedNewItems = newItems.map((item) => {

          if (item.id) {
            return {
              name: item.id.name,
              tech_name: item.id.tech_name,
              price: item.id.price,
              discount: item.id.discount,
              product_pics: item.id.product_pics,
              s_gst: item.id.s_gst,
              c_gst: item.id.c_gst,
              avl_qty: item.id.avl_qty,
              rating: item.id.rating,
              is_active: item.id.is_active,
              is_deleted: item.id.is_deleted,
              _id: item.id._id,
              packaging: item.id.packaging,
              packagingtype: item.id.packagingtype,
              company: item.id.company,
              categories: item.id.categories,
              batch_no: item.id.batch_no,
              hsn_code: item.id.hsn_code,
              description: item.id.description,
              added_at: item.id.added_at,
              out_of_stock: false,
              quantity: item.quantity || 1, 
            };
          }
          // If it doesn't have the 'id' field, return the item as-is (second format)
          return {
            ...item,
            quantity: item.quantity || 1, // fallback to 1 if no quantity is provided
          };
        });
    
        let isDuplicate = false;
        const uniqueItemsToAdd = normalizedNewItems.filter((item) => {
          const exists = prevItems.some((cartItem) => cartItem._id === item._id);
          if (exists) {
            isDuplicate = true;
          }
          return !exists;
        });
    
        if (isDuplicate) {
          toast.error("Some products were already in the cart");
        }
    
        if (uniqueItemsToAdd.length === 0) return prevItems;
    
        window.scrollTo({ top: 0, behavior: "smooth" });
    
        return [...prevItems, ...uniqueItemsToAdd];
      });
    };

    const handleRemoveCall = (data: any) =>{
      setCartItem((prevItems) => prevItems.filter((item) => item._id !== data));
    }
  // -------- Cart open/close code end ----------

  // -------------- Order Details open/close code start --------------------
    const [openDetailsmodal, setOpenDetailsmodal] = useState(false);
    const [openDetailId, setOpenDetailId] = useState< null | string>(null)
    const [openDetailIData, setOpenDetailIData] = useState(null)

    const closeOrderDetail = () =>{
      setOpenDetailsmodal(false)
    }
  // -------- Order Details open/close code end ----------

  const CloseAddmodal = () => { 
    setisLoading(false);
    setFarmerAdded(false);
  }
  
  return (
    <>

    {isLoading  ?   <LoaderPage /> : null  }

    {farmedAdded && !isLoading && (
      <SalesAddFarmer  isEditFarmer={isEditFarmer} Mobile_number={Mobile_number} setFarmerAdded={setFarmerAdded} handleAccept={handleAccept} CloseAddmodal={CloseAddmodal} /> 
    )}
      
      { farmedAdded == false && !isLoading ?
        <>
          {cartOpen == true ?
            <div>  <CartList setCartOpen={setCartOpen} setCartItem={setCartItem} CartData={cartItem} handleRemoveCall={handleRemoveCall} cartOrderid={cartOrderid} setCartOrderid={setCartOrderid} future_date={future_date} /> </div>
            : openDetailsmodal == true?
              <OrderDetails orderId={openDetailId} closeOrderDetail={closeOrderDetail} openDetailIData={openDetailIData} /> 
            :
            <div className='flex flex-col'>
              <div className='flex justify-end gap-x-[2rem] my-3'>
                <div className="relative cursor-pointer flex gap-x-3 items-center dark:text-gray-100 font-bold text-lg" onClick={() => OpenCartCall()}>
                  <div>
                    <TiShoppingCart className="h-8 w-8 dark:text-white relative text-indigo-500" />
                    <div className="absolute top-0 right-12 transform translate-x-2 -translate-y-2 bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md"> {cartItem?.length} </div>
                  </div>
                  <div> Cart </div>
                </div>

                <div className=" cursor-pointer flex gap-x-3 items-center  text-red-500 dark:text-gray-100 font-bold text-lg" onClick={() => LogOutCall()}>
                  <FaPowerOff className="h-6 w-6 dark:text-white " />
                  <div> Logout </div>
                </div>
              </div>

              <div className="flex flex-col">
                {ProductDetails != null ?
                  <ProductDetailData ProductDetails={ProductDetails} ProductCLoseCall={ProductCLoseCall} />
                  :
                  <>
                    <div className='flex mt-[2rem] mb-2'>
                      <div className='flex-1 flex text-[2rem] dark:text-gray-400 font-bold self-end '> Personal Info</div>
                      <div className='flex-1 flex justify-end  self-end '> <div className='border border-indigo-500 text-indigo-500 dark:text-white hover:text-gray-100 font-semibold px-6 py-2 rounded-full  gap-3 hover:bg-indigo-800 transition flex text-center cursor-pointer  transition-all duration-500 ease-in-out' onClick={() => EditFarmerCall()}> <FaPencilAlt className='self-center h-5 w-5' />Update Farmer  </div> </div>
                    </div>
                    <FarmeDashboard viewButton={true} classData="border dark:border-gray-600 rounded-xl w-full py-2 px-4 transition-all duration-800 ease-in-out" />

                    <div className="flex gap-4 mt-[2rem]">
                      <div className="w-[65%]">
                        Left Content
                      </div>

                      <div className="w-[35%] ">
                        <NeaByFarmer  />
                      </div>
                    </div>

                    <div className='mt-[2rem] text-[2rem] dark:text-gray-400 font-bold'> History </div>
                    <FarmerHistory setOpenDetailId={setOpenDetailId} openComplain={openComplain} setOpenComplain={setOpenComplain}  setOpenDetailIData={setOpenDetailIData}  setOpenDetailsmodal={setOpenDetailsmodal}  AddtoCartCall={AddtoCartCall} setCartOrderid={setCartOrderid} FuturOrderDate={setfuture_date}   orderId={orderId} set_OrderId={set_OrderId} />

                    <div className='flex mt-[1rem]'>
                      <div className='flex-1 self-end text-[2rem] dark:text-gray-400 font-bold'> Products Data</div>
                      <SalesMobileInput datatype='text' mainclassname="flex self-center mt-[3rem] justify-end gap-x-3 border-0" className="py-2 px-6 border-0  rounded-xl text-[1.5rem] text-gray-500 font-normal relative  dark:bg-gray-700 dark:text-gray-100" buttonCss="px-[2rem] py-[0.5rem] bg-gray-800 dark:bg-gray-700 rounded-r-full text-[1.6rem] text-gray-50 absolute  dark:text-gray-400" value={searchData} handleChange={(data) => handleChange(data)} handleClickCall={handleClickCall} placeholder="Search Product" />
                    </div>
                    <Salesproductlist searchData={searchData} ProductDetailsCall={ProductDetailsCall} isLoggedin={true}  AddtoCartCall={AddtoCartCall}/>
                  </>
                }
              </div>
            </div>
          }

          <LogoutModal openModal={logoutModal} handleClose={handleClose} handleAccept={handleAccept} />
        </>
     : null }
      
    </>
  )
}

export default SalesFarmerDashboard