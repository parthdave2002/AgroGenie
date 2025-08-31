import React, { FC, useEffect, useState } from 'react'
import { Button, Table } from "flowbite-react";
import { FaGhost, FaPhoneVolume, FaUserAlt, FaWindowClose } from 'react-icons/fa'
import { HiTrash } from 'react-icons/hi';
import { FaCartShopping } from 'react-icons/fa6';
import SuccessErrorModalPage from '../../components/modal/successErrorModal';
import ConfirmationModalPage from '../../components/modal/confirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'reactstrap';
import { AddOrderlist, getUpdateOrderlist, ResetOrderlist, getCouponlist, ResetCouponlist } from '../../Store/actions';
import { toast } from 'react-toastify';
import { BsCartXFill } from 'react-icons/bs';
import Cookies from 'js-cookie';
import moment from 'moment';

interface Cartprops{
  setCartOpen : (value : boolean) => void;
  handleRemoveCall  : (value : boolean) => void;
  CartData ?: any;
  setCartItem: (value : any) => void;
  cartOrderid ?: any;
  setCartOrderid: (value : any) => void;
  future_date ?:any;
}

interface ProfileInfo{
  crops: [];
  is_deleted:  boolean;
  _id: string;
  customer_name : string; 
  firstname: string;
  middlename: string;
  lastname: string;
  mobile_number:  number;
  land_area: number;
  land_type: string;
  irrigation_source: string;
  irrigation_type:  string;
  heard_about_agribharat:  string;
  address: string;
  district:  string;
  district_name:  string;
  taluka:  string;
  taluka_name:  string;
  village:  string;
  village_name:  string;
  pincode:  number;
  created_by:  string;
  __v: number;
  alternate_number: number;
  added_at:  string;
  smart_phone: boolean;
}

const CartList : FC<Cartprops> = ({setCartOpen,CartData, handleRemoveCall, setCartItem, cartOrderid, setCartOrderid, future_date}) => {
  const dispatch = useDispatch();
  const [CouponName, setCouponName] = useState< string>();
  const [CouponAmt, setCouponAmt] = useState(0);
  const [Couponid, setCouponId] = useState("");
  const [cartItems, setCartItems] = useState(CartData || [])
  
  // ----------- Customer data getcode start ----------------
        const [data, setData] = useState<ProfileInfo | null>()
        const [data_id, setData_id] = useState(null)
        const customerDataString = Cookies.get("customer_data");
        useEffect(() => {
          if (customerDataString && customerDataString !== "undefined") {
            try {
              const customerData = JSON.parse(customerDataString);
              setData(customerData ? customerData  : null);
              setData_id(customerData?._id ?customerData?._id : null);
            } catch (error) {
              console.error("Failed to parse customer_data:", error);
              setData(null);
            }
          }
          else{
            setData(null);
          }
        },[]);
  // ----------- Customer data getcode end ----------------

  // ----------- Product Qty Change data getcode start ----------------
    const [productQty, setProductQty] = useState<{ [key: string]: string }>({});
    const ProductQtychange  = (id: string, value: string) => {
      if (!/^\d*$/.test(value)) return;

      const updatedCart = cartItems.map((item: any) =>
        item._id === id ? { ...item, quantity: value } : item
      );
      setCartItems(updatedCart)
    
      setProductQty((prev:any) => ({
        ...prev,
        [id]: value,
      }));
    };

    const handleQtyBlur = (id: string) => {
      const rawValue = productQty[id];
      const fixedValue = !rawValue || rawValue === "0"  ? "1" : rawValue;

    setProductQty((prev: any) => ({
      ...prev,
      [id]: fixedValue,
    }));
    
    setCartItems((prev: any[]) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: Number(fixedValue) } : item
      ));
    };
  // ----------- Product Qty Change data getcode start ----------------

  // ---------------- Place Order code start ----------------
    const [isOpenSuccessOrderModel, setisOpenSuccessOrderModel ] = useState(false);
    const [isOpenSuccessOrderMessage, setisOpenSuccessOrderMessage ] = useState("");
    const [isOpenConfirmModel, setisOpenConfirmModel ] = useState(false);
    const [isOrderStatusModel, setisOrderStatusModel ] = useState("confirm");
    const [isOrderTypeModel, setisOrderTypeModel ] = useState("confirm");
    const [SelectedFutureDate, setSelectedFutureDate ] = useState("");

    const OkayCall =() =>{
      setisOpenSuccessOrderModel(false);
      setisOpenSuccessOrderMessage("");
      setCartOpen(false);
      setCartItem([])
      setCartOrderid(null)
      setCouponAmt(0);
      setCouponId("");
      dispatch(ResetCouponlist())
    }

    const OrderplaceCall = (data:string, item:string) =>{
      setisOpenConfirmModel(true);
      setisOrderStatusModel(data)
      setisOrderTypeModel(item)
    }

    const PlaceCall = () =>{

      if(isOrderTypeModel == "future" && CouponName){
          toast.error("Coupon could not apply on future order");
          return false
      }

      const productsArray = Object.entries(productQty).map(([id, quantity]) => ({ id, quantity}));
      let requser :any = {
        products : productsArray,
        customer : data_id,
        order_type :  isOrderTypeModel,
        status : isOrderStatusModel == "extend" ?  null :  isOrderStatusModel,
        total_amount : Math.round(grandTotal),
       ...(CouponName && { coupon: CouponName.toUpperCase() })
      }
      if (isOrderTypeModel === "future" && isOrderStatusModel == "extend" )  requser.future_order_date = SelectedFutureDate;

      if(cartOrderid){
        requser.order_id =  cartOrderid
        dispatch(getUpdateOrderlist(requser))
      } else{
        dispatch(AddOrderlist(requser))
      }   
      setisOpenConfirmModel(false);
    }
  // ---------------- Place Order code end ----------------

  // ---------------- Calculation Logic ----------------
    const calculateOrderSummary = () => {
      let totalSubtotal = 0;
      let totalGST = 0;
      let totalDiscount = 0;
      let totalGrandTotal = 0

      CartData?.forEach((item: any) => {

        const rawQty = productQty[item._id];
        const quantity = rawQty === "" || rawQty === undefined ? 1 : Number(rawQty);

        const price = item?.price || 0;
        const discount = item?.discount || 0;
        const gstRate = item?.s_gst || 0;
        // const quantity = productQty[item._id] || 1;

        const discountedPrice = (price - discount) * quantity;
        const gstAmount = (discountedPrice * gstRate * 2) / 100;

        totalSubtotal += discountedPrice;
        totalDiscount += discount * quantity;
        totalGST += gstAmount;
        const totalBeforeCoupon =   totalSubtotal + totalGST;
        totalGrandTotal = Math.max(0, totalBeforeCoupon - (CouponAmt ?? 0));
      });

      return { totalSubtotal, totalDiscount, totalGST, grandTotal: totalGrandTotal };
    };

    const { totalSubtotal, totalDiscount, totalGST, grandTotal } = calculateOrderSummary();
  // ---------------- Calculation Logic End ----------------

    useEffect(() => {
      setCartItems(CartData || []);
      const updatedQty: { [key: string]: string } = {};
      CartData?.forEach((item: any) => {
        const quantity = typeof item?.quantity === "number" && item.quantity > 0 ? item.quantity : 1;
        updatedQty[item._id] = quantity.toString();
      });
      setProductQty(updatedQty);
      setSelectedFutureDate(moment(future_date).format("YYYY-MM-DD"))
    }, [CartData]);

  // --------------- Add Order Suucess/ error code start ----------------
    const AddOrderdatalist = useSelector((state: any) => state.Order.AddOrderdatalist);
    const UpdateOrderdatalist = useSelector((state: any) => state.Order.UpdateOrderlist);
      console.log("UpdateOrderdatalist", UpdateOrderdatalist);

    useEffect(() => {
      
      if (AddOrderdatalist?.success || UpdateOrderdatalist?.success ) {
        setisOpenSuccessOrderModel(true);
        setisOpenSuccessOrderMessage(UpdateOrderdatalist?.msg ? UpdateOrderdatalist?.msg : AddOrderdatalist?.msg);
        dispatch(ResetOrderlist());
        setCartItems([]);
        setCartItem([]);
      } else {
        toast.error(UpdateOrderdatalist?.msg ? UpdateOrderdatalist?.msg : AddOrderdatalist?.msg)
      }
    }, [AddOrderdatalist, UpdateOrderdatalist])
  // --------------- Add Order Suucess/ error code start ----------------

    const CloseCall = () =>{
      setCartOpen(false);
      setCartItem([])
      setCartOrderid(null);
      setCouponAmt(0);
      setCouponId("");
      dispatch(ResetCouponlist())
    }
    // ------------- Get  Data From Reducer Code Start --------------
      const ApplyCoupon = (data:any) =>{
        setCouponName(data)
      }
      const AppliedCoupon = () =>{
        dispatch(getCouponlist({name :CouponName?.toUpperCase() }))
      }

      const  AddCoupondatalist  = useSelector((state: any) =>  state.Coupon.Coupondatalist);

          useEffect(() => {  
            if(AddCoupondatalist?.amount){
              setCouponAmt(AddCoupondatalist?.amount);
              setCouponId(AddCoupondatalist?._id);
            }else{
              setCouponAmt(0);
              setCouponId("")
            }
        
              // if(AddCoupondatalist?.success == true){
              //     // c)
              //     toast.success(AddCoupondatalist?.msg);
              //     navigate("/coupon/list")
              //     validation.resetForm();
              //     setSelectedactiveid(null);
              //     setSelectedactiveOption(null);
              //     setValidateactive(1)
              // }
          }, [AddCoupondatalist]);
    //  ------------- Get Data From Reducer Code end --------------

  return (
    <>
      <div className='flex justify-between'>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> Cart : {cartOrderid}</div>
        {cartOrderid ?  <div className="flex border border-indigo-500 text-indigo-500 dark:text-white hover:text-gray-100 font-semibold px-6 py-2 rounded-full gap-3 hover:bg-indigo-800 transition flex text-center cursor-pointer transition-all duration-500 ease-in-out text-center self-center"  onClick={() => setCartOpen(false)} > <FaCartShopping className="self-center h-5 w-5" /> Countine Shopping </div>  :  null}
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100 flex self-center cursor-pointer " onClick={() => CloseCall()}> <FaWindowClose /> </div>
      </div>

      <div className="flex flex-col xl:flex-row h-screen  mt-4  gap-x-3">
          {cartItems.length ?
          <>
            <div className=" h-full flex flex-col shadow shadow-indigo-500/50 rounded-xl p-3 xl:w-[65rem] ">
              <div className="w-full  overflow-y-auto">
                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <Table.Head className="bg-gray-100 dark:bg-gray-700">
                    <Table.HeadCell className='text-center'>Item</Table.HeadCell>
                    <Table.HeadCell className='text-center'>Rate</Table.HeadCell>
                    <Table.HeadCell className='text-center'>Discount</Table.HeadCell>
                    <Table.HeadCell className='text-center'>Qty</Table.HeadCell>
                    <Table.HeadCell className='text-center'>Sub Total</Table.HeadCell>
                    <Table.HeadCell className='text-center'>GST</Table.HeadCell>
                    <Table.HeadCell className='text-center'>Total Amount</Table.HeadCell>
                    <Table.HeadCell className='text-center'>Remove</Table.HeadCell>
                  </Table.Head>

                  <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {cartItems && cartItems.map((item: any, k: any) => (
                      <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700 py-2">
                        <Table.Cell style={{ padding: "10px" }} className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white w-[18rem] max-w-[18rem] truncate">
                          <div> {item?.name?.englishname}  </div>
                          <div className='text-[0.8rem] mt-1'>( {item?.packaging} {item?.packagingtype?.type_eng} ) </div>
                        </Table.Cell>
                        <Table.Cell style={{ padding: "10px" }} className="whitespace-nowrap font-normal text-gray-900 dark:text-white text-center"> {item?.price} </Table.Cell>
                        <Table.Cell style={{ padding: "10px" }} className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center"> {item?.discount} </Table.Cell>
                        <Table.Cell style={{ padding: "10px" }} className="whitespace-nowrap font-normal text-gray-900 dark:text-white text-center"> 
                          <Input className='w-[3rem] px-2 py-2 rounded-xl dark:bg-gray-800' value={productQty[item._id] ?? "1"} defaultValue={1} onChange={(e) => ProductQtychange(item._id, e.target.value)}  onBlur={() => handleQtyBlur(item._id)}  inputMode="numeric" />   
                          </Table.Cell>
                        <Table.Cell style={{ padding: "10px" }} className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center"> {Math.round((item.price - item.discount) * (Number(productQty[item._id] || 1)))}  </Table.Cell>
                        <Table.Cell style={{ padding: "10px" }} className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center"> {Math.round(((item.price - item.discount) * (Number(productQty[item._id] || 1))) * (item?.s_gst * 2 / 100))}  </Table.Cell>
                        <Table.Cell style={{ padding: "10px" }} className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center"> {Math.round((((item.price - item.discount) * (Number(productQty[item._id] || 1))) + (((item.price - item.discount) * (Number(productQty[item._id] || 1))) * (item?.s_gst * 2 / 100))))} </Table.Cell>
                        <Table.Cell style={{ padding: "10px" }} className="space-x-2 whitespace-nowrap"> <div className="flex items-center gap-x-2 bg-red-500 hover:bg-red-600 text-gray-200 px-1 py-1 rounded-lg cursor-pointer" onClick={() => handleRemoveCall(item?._id)}>  <HiTrash className="text-lg" /> Remove </div>  </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>

              <div className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 my-4 p-4 rounded-xl w-full mt-auto">
                
                <div className='flex'>
                  <div className='flext-1'>
                    <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8">Order Summary</div>
                    <div className='flex gap-x-3'>
                      <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8">  <Input className=' px-2 py-2 rounded-xl dark:bg-gray-800' placeholder='Enter coupon code' onChange={(e) =>ApplyCoupon(e.target.value)} />  </div>
                      <button onClick={AppliedCoupon} className="mb-8 inline-flex items-center justify-center px-5 py-2 rounded-xl bg-green-500 text-white font-medium shadow-md hover:bg-green-600 hover:scale-105 active:scale-100 transition-all duration-200" > Apply </button>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col items-end space-y-1">
                    <div className="text-[1rem] font-semibold text-gray-500 dark:text-gray-300 flex justify-between w-full max-w-xs">  <span>Total Discount</span> <span>: {Math.round(totalDiscount)} Rs.</span> </div>
                    <div className="text-[1rem] font-semibold text-gray-500 dark:text-gray-300 flex justify-between w-full max-w-xs"> <span>Total Subtotal</span> <span>: {Math.round(totalSubtotal)} Rs.</span> </div>
                    <div className="text-[1rem] font-semibold text-gray-500 dark:text-gray-300 flex justify-between w-full max-w-xs"> <span>Total GST</span> <span>: {Math.round(totalGST)} Rs.</span>  </div>
                    {CouponAmt ?  <div className="text-[1rem] font-semibold text-gray-500 dark:text-gray-300 flex justify-between w-full max-w-xs"> <span> Coupon Amount</span> <span>: - {Math.round(CouponAmt)} Rs.</span>  </div> : null }
                  </div>
                </div>

                <div className="flex justify-end items-center text-xl font-semibold text-gray-500 dark:text-gray-300 mt-4 gap-x-4">
                  <span className="text-[1.5rem]">Grand Total</span>
                  <span className="min-w-[11rem] text-end">: {Math.round(grandTotal)} Rs.</span>
                </div>
              </div>

              <div className="flex gap-x-3 justify-end mt-6 mb-4">
                {cartOrderid ?<div className="flex border border-indigo-500 text-indigo-500 dark:text-white hover:text-gray-100 font-semibold px-6 py-2 rounded-full gap-3 hover:bg-indigo-800 transition flex text-center cursor-pointer transition-all duration-500 ease-in-out" onClick={() => OrderplaceCall("cancel", "future" )}> <BsCartXFill   className="self-center h-5 w-5" /> Cancel Order </div> : null}
                <div className="flex border border-indigo-500 text-indigo-500 dark:text-white hover:text-gray-100 font-semibold px-6 py-2 rounded-full gap-3 hover:bg-indigo-800 transition flex text-center cursor-pointer transition-all duration-500 ease-in-out" onClick={() => OrderplaceCall("extend",  "future" )}> <FaGhost className="self-center h-5 w-5" /> Future Order </div>
                <div className="flex border border-indigo-500 text-indigo-500 dark:text-white hover:text-gray-100 font-semibold px-6 py-2 rounded-full gap-3 hover:bg-indigo-800 transition flex text-center cursor-pointer transition-all duration-500 ease-in-out" onClick={() => OrderplaceCall("confirm", "confirm" )}> <FaCartShopping className="self-center h-5 w-5" /> Place Order </div>
              </div>
            </div>

            <div className="flex-1 md:w-[20rem] w-full flex flex-col gap-4 mt-4 lg:mt-0">
            <div className="border dark:border-gray-600 dark:bg-gray-800 p-3 rounded-xl w-full flex flex-col gap-y-3">
              <div className='dark:text-gray-300 text-[1.2rem] font-semibold'>Customer</div>
              <div className='dark:text-gray-300 flex gap-x-3'><FaUserAlt className='self-center h-7-w-7' />  <span> {data?.firstname} {data?.middlename} {data?.lastname} </span> </div>
            </div>

            <div className="border dark:border-gray-600 dark:bg-gray-800 p-3 rounded-xl w-full flex flex-col gap-y-3">
              <div className='dark:text-gray-300 text-[1.2rem] font-semibold'>Contact Information</div>
              <div className='dark:text-gray-300 flex gap-x-3'><FaPhoneVolume className='self-center h-7-w-7' />  <span> {data?.mobile_number}, {data?.alternate_number} </span> </div>
            </div>

            <div className="border dark:border-gray-600 dark:bg-gray-800 p-3 rounded-xl w-full flex flex-col gap-y-3">
              <div className='dark:text-gray-300 text-[1.2rem] font-semibold'>Shipping Address</div>
              <div className='dark:text-gray-300 '>  {data?.address} </div>
              <div className='dark:text-gray-300'> District :   {data?.district_name} </div>
              <div className='dark:text-gray-300'> Taluka :  {data?.taluka_name} </div>
              <div className='dark:text-gray-300'> Village :  {data?.village_name} </div>
              <div className='dark:text-gray-300'> Pincode : {data?.pincode} </div>
            </div>
            </div> 
          </>
          :
            <div className=" h-full flex flex-col text-center bg-no-repeat bg-center bg-contain w-[65rem]" style={{ backgroundImage: "url('/images/products/cart-bg.webp')" }} > </div>
          }
      </div> 

      <SuccessErrorModalPage isOpenSuccessOrderModel={isOpenSuccessOrderModel} setisOpenSuccessOrderModel={setisOpenSuccessOrderModel} message={isOpenSuccessOrderMessage} OkayCall={OkayCall} />
      <ConfirmationModalPage isOpenConfirmModel={isOpenConfirmModel} setisOpenConfirmModel={setisOpenConfirmModel} isOrderTypeModel={isOrderTypeModel} isOrderStatusModel={isOrderStatusModel} PlaceCall={PlaceCall} setSelectedFutureDate={setSelectedFutureDate} future_date={SelectedFutureDate}  />
    </>
  )
}

export default CartList