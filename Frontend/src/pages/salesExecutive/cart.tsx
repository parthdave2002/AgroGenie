import React, { FC, lazy, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { FaGhost, FaWindowClose } from 'react-icons/fa'
import moment from 'moment';
import Cookies from 'js-cookie';
import { Input } from 'reactstrap';
import { toast } from 'react-toastify';
import { HiTrash } from 'react-icons/hi';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { BsCartXFill } from 'react-icons/bs';
import { Cartprops, ProfileInfo } from '../../types/types';
import { AddOrderlist, getCustomerDatalist, getUpdateOrderlist, ResetOrderlist, getCouponlist, ResetCouponlist } from '../../Store/actions';
const ConfirmationModalPage = lazy(() => import("../../components/common/modal/confirmationModal"));
const SuccessErrorModalPage = lazy(() => import("../../components/common/modal/successErrorModal"));

const CartList : FC<Cartprops> = ({setCartOpen,CartData, handleRemoveCall, setCartItem, cartOrderid, setCartOrderid, future_date}) => {
  const dispatch = useDispatch();
  const [CouponName, setCouponName] = useState< string>();
  const [CouponAmt, setCouponAmt] = useState(0);
  const [TotalWalletAmt, setTotalWalletAmt] = useState<number>(0);
  const [WalletAmt, setWalletAmt] = useState<number>(0);
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
              setTotalWalletAmt(customerData?.wallet_points ? customerData?.wallet_points  : 0)
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
        ...(WalletAmt && { wallet_points: WalletAmt }),
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
      let totalGrandTotal = 0;

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
        totalGrandTotal = Math.max(0, totalBeforeCoupon - (CouponAmt ?? 0) - (WalletAmt ?? 0));
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
  
    useEffect(() => {
      const orderResponse = AddOrderdatalist?.success? AddOrderdatalist: UpdateOrderdatalist?.success ? UpdateOrderdatalist: null;

      if (orderResponse?.success) {
        if (data_id) {
          dispatch(getCustomerDatalist({ id: data_id, type:"order" }));
        }
        setisOpenSuccessOrderModel(true);
        setisOpenSuccessOrderMessage(orderResponse?.msg || "Order placed successfully");
        dispatch(ResetOrderlist());
        setCartItems([]);
        setCartItem([]);
      } else if (orderResponse?.msg) {
        toast.error(orderResponse.msg);
      }
    }, [AddOrderdatalist, UpdateOrderdatalist]);
  // --------------- Add Order Suucess/ error code start ----------------

    const CloseCall = () =>{
      setCartOpen(false);
      setCartItem([])
      setCartOrderid(null);
      setCouponAmt(0);
      dispatch(ResetCouponlist())
    }
    // ------------- Get  Data From Reducer Code Start --------------
      const ApplyCoupon = (data:any) =>{
        setCouponName(data)
      }
      const AppliedCoupon = () =>{
        dispatch(getCouponlist({name :CouponName?.toUpperCase() }))
      }

      const AppliedwalletPoint = () =>{
        const walletToUse = Math.min(TotalWalletAmt || 0, Math.max(0, Math.round(grandTotal)));
        setWalletAmt(walletToUse);
        setTotalWalletAmt(Math.max(0, (TotalWalletAmt || 0) - walletToUse));
      }

      const RemovewalletPoint = () =>{
        if (customerDataString && customerDataString !== "undefined") {
          const customerData = JSON.parse(customerDataString);
          setWalletAmt(0);
          setTotalWalletAmt(customerData?.wallet_points ? customerData?.wallet_points  : 0);
        }
      }

      const AddCoupondatalist = useSelector((state: any) =>  state.Coupon.Coupondatalist);

      useEffect(() => {  
        if(AddCoupondatalist?.amount){
          setCouponAmt(AddCoupondatalist?.amount);
        }else{
          setCouponAmt(0);
        }
      }, [AddCoupondatalist]);
    //  ------------- Get Data From Reducer Code end --------------

  return (
    <>
      <div className='flex justify-between'>
        <div className="text-[2rem] font-semibold text-DarkBackground dark:text-TitaniumWhite"> Cart : {cartOrderid}</div>
        {cartOrderid ?  <div className="flex border border-indigo-500 text-indigo-500 dark:text-White hover:text-TitaniumWhite font-semibold px-6 py-2 rounded-full gap-3 hover:bg-indigo-800 transition flex text-center cursor-pointer transition-all duration-500 ease-in-out text-center self-center"  onClick={() => setCartOpen(false)} > <FaShoppingCart className="self-center h-5 w-5" /> Countine Shopping </div>  :  null}
        <div className="text-[2rem] font-semibold text-DarkBackground dark:text-TitaniumWhite flex self-center cursor-pointer " onClick={() => CloseCall()}> <FaWindowClose /> </div>
      </div>

      <div className="flex flex-col xl:flex-row h-screen  mt-4 gap-x-3">
          {cartItems.length ?
          <>
            <div className=" h-full w-full flex gap-x-4 shadow shadow-indigo-500/50 rounded-xl p-3 ">
              <div className="w-full  overflow-y-auto">
                <Table className="min-w-full divide-y divide-WhiteMarble dark:divide-Hydrocarbon">
                  <TableHead className="bg-TitaniumWhite dark:bg-TranquilBlack">
                    <TableHeadCell className='text-center'>Item</TableHeadCell>
                    <TableHeadCell className='text-center'>Rate</TableHeadCell>
                    <TableHeadCell className='text-center'>Discount</TableHeadCell>
                    <TableHeadCell className='text-center'>Qty</TableHeadCell>
                    <TableHeadCell className='text-center'>Sub Total</TableHeadCell>
                    <TableHeadCell className='text-center'>GST</TableHeadCell>
                    <TableHeadCell className='text-center'>Total Amount</TableHeadCell>
                    <TableHeadCell className='text-center'>Remove</TableHeadCell>
                  </TableHead>

                  <TableBody className="divide-y divide-WhiteMarble bg-White dark:divide-TranquilBlack dark:bg-Cosmos">
                    {cartItems && cartItems.map((item: any, k: any) => (
                      <TableRow key={k} className="hover:bg-TitaniumWhite dark:hover:bg-TranquilBlack py-2">
                        <TableCell style={{ padding: "10px" }} className="whitespace-nowrap text-base font-medium text-DarkBackground dark:text-White w-[18rem] max-w-[18rem] truncate">
                          <div> {item?.name?.englishname}  </div>
                          <div className='text-[0.8rem] mt-1'>( {item?.packaging} {item?.packagingtype?.type_eng} ) </div>
                        </TableCell>
                        <TableCell style={{ padding: "10px" }} className="whitespace-nowrap font-normal text-DarkBackground dark:text-White text-center"> {item?.price} </TableCell>
                        <TableCell style={{ padding: "10px" }} className="whitespace-nowrap font-medium text-DarkBackground dark:text-White text-center"> {item?.discount} </TableCell>
                        <TableCell style={{ padding: "10px" }} className="whitespace-nowrap font-normal text-DarkBackground dark:text-White text-center"> 
                          <Input className='w-[3rem] px-2 py-2 rounded-xl dark:bg-Cosmos' value={productQty[item._id] ?? "1"} defaultValue={1} onChange={(e) => ProductQtychange(item._id, e.target.value)}  onBlur={() => handleQtyBlur(item._id)}  inputMode="numeric" />   
                          </TableCell>
                        <TableCell style={{ padding: "10px" }} className="whitespace-nowrap font-medium text-DarkBackground dark:text-White text-center"> {Math.round((item.price - item.discount) * (Number(productQty[item._id] || 1)))}  </TableCell>
                        <TableCell style={{ padding: "10px" }} className="whitespace-nowrap font-medium text-DarkBackground dark:text-White text-center"> {Math.round(((item.price - item.discount) * (Number(productQty[item._id] || 1))) * (item?.s_gst * 2 / 100))}  </TableCell>
                        <TableCell style={{ padding: "10px" }} className="whitespace-nowrap font-medium text-DarkBackground dark:text-White text-center"> {Math.round((((item.price - item.discount) * (Number(productQty[item._id] || 1))) + (((item.price - item.discount) * (Number(productQty[item._id] || 1))) * (item?.s_gst * 2 / 100))))} </TableCell>
                        <TableCell style={{ padding: "10px" }} className="space-x-2 whitespace-nowrap"> <div className="flex items-center gap-x-2 bg-red-500 hover:bg-red-600 text-WhiteMarble px-1 py-1 rounded-lg cursor-pointer" onClick={() => handleRemoveCall(item?._id)}>  <HiTrash className="text-lg" /> Remove </div>  </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className='flex flex-col'>
                <div className="flex flex-col gap-y-4">
                  <div className='flex flex-col border border-SoothingBlueGrey dark:border-Hydrocarbon dark:bg-Cosmos p-4 rounded-xl w-full'>
                      <div className='flex justify-between'>
                        <div className="text-xl font-semibold text-DarkBackground dark:text-TitaniumWhite mb-5"> Wallet Points </div>
                        <div className="text-sm text-DarkBackground dark:text-TitaniumWhite mb-5"> {TotalWalletAmt} Points </div>
                      </div>
                      {WalletAmt ? 
                        <button onClick={RemovewalletPoint} className="inline-flex items-center justify-center px-5 py-1 rounded-xl bg-red-500 text-White font-medium shadow-md hover:bg-red-600" > Remove Wallet Points </button>
                        :
                        <button onClick={AppliedwalletPoint} className="inline-flex items-center justify-center px-5 py-1 rounded-xl bg-green-500 text-White font-medium shadow-md hover:bg-green-600 hover:scale-105 active:scale-100 transition-all duration-200" > Utilize Wallet Points </button>
                      }
                  </div>

                  <div className='flex flex-col border border-SoothingBlueGrey dark:border-Hydrocarbon dark:bg-Cosmos p-4 rounded-xl w-full'>
                      <div className="text-xl font-semibold text-DarkBackground dark:text-TitaniumWhite mb-5"> Apply a Promo Code </div>
                      <div className='flex gap-x-3'>
                        <div className="text-2xl font-semibold text-DarkBackground dark:text-TitaniumWhite ">  <Input className=' px-2 py-2 rounded-xl dark:bg-Cosmos' placeholder='Enter coupon code' onChange={(e) =>ApplyCoupon(e.target.value)} />  </div>
                        <button onClick={AppliedCoupon} className="inline-flex items-center justify-center px-5 py-2 rounded-xl bg-green-500 text-White font-medium shadow-md hover:bg-green-600 hover:scale-105 active:scale-100 transition-all duration-200" > Apply </button>
                      </div>
                  </div>

                  <div className="border border-SoothingBlueGrey dark:border-Hydrocarbon dark:bg-Cosmos p-4 rounded-xl w-full">
                    <div className="text-xl font-semibold text-DarkBackground dark:text-TitaniumWhite mb-5">Order Summary</div>

                    <div className="flex flex-col items-end space-y-1">
                      <div className="text-[1rem] font-semibold text-SharkGray dark:text-SoothingBlueGrey flex justify-between w-full ">  <span>Total Discount</span> <span>: {Math.round(totalDiscount)} Rs.</span> </div>
                      <div className="text-[1rem] font-semibold text-SharkGray dark:text-SoothingBlueGrey flex justify-between w-full "> <span>Total Subtotal</span> <span>: {Math.round(totalSubtotal)} Rs.</span> </div>
                      <div className="text-[1rem] font-semibold text-SharkGray dark:text-SoothingBlueGrey flex justify-between w-full "> <span>Total GST</span> <span>: {Math.round(totalGST)} Rs.</span>  </div>
                      {WalletAmt ? <div className="text-[1rem] font-semibold text-SharkGray dark:text-SoothingBlueGrey flex justify-between w-full "> <span> Wallet Amount</span> <span>: - {Math.round(WalletAmt)} Rs.</span>  </div> : null }
                      {CouponAmt ? <div className="text-[1rem] font-semibold text-SharkGray dark:text-SoothingBlueGrey flex justify-between w-full "> <span> Coupon Amount</span> <span>: - {Math.round(CouponAmt)} Rs.</span>  </div> : null }
                      <div className="w-full border-t-2 border-dotted border-gray-700 dark:border-gray-200 my-2"></div>
                      <div className="text-[1rem] font-semibold text-SharkGray dark:text-SoothingBlueGrey flex justify-between w-full "> <span>Grand Total</span> <span className="min-w-[11rem] text-end">: {Math.round(grandTotal)} Rs.</span></div> 
                    </div>
                  </div>

                  <div className="border border-SoothingBlueGrey dark:border-Hydrocarbon dark:bg-Cosmos p-4 rounded-xl flex flex-col gap-y-4">
                    {cartOrderid ?<div className="border border-indigo-500 text-indigo-500 dark:text-White hover:text-TitaniumWhite font-semibold px-6 py-2 rounded-full gap-3 hover:bg-indigo-800 transition flex text-center cursor-pointer transition-all duration-500 ease-in-out" onClick={() => OrderplaceCall("cancel", "future" )}> <BsCartXFill   className="self-center h-5 w-5" /> Cancel Order </div> : null}
                    <div className="border border-indigo-500 text-indigo-500 dark:text-White hover:text-TitaniumWhite font-semibold px-6 py-2 rounded-full gap-3 hover:bg-indigo-800 transition flex  cursor-pointer transition-all duration-500 ease-in-out" onClick={() => OrderplaceCall("extend",  "future" )}> <FaGhost className="self-center h-5 w-5" /> Future Order </div>
                    <div className="border border-indigo-500 text-indigo-500 dark:text-White hover:text-TitaniumWhite font-semibold px-6 py-2 rounded-full gap-3 hover:bg-indigo-800 transition flex  cursor-pointer transition-all duration-500 ease-in-out" onClick={() => OrderplaceCall("confirm", "confirm" )}> <FaShoppingCart className="self-center h-5 w-5" /> Place Order </div>
                  </div>
                </div>
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