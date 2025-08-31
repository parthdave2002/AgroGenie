import { Badge, Button, Modal } from 'flowbite-react';
import React, { FC, useEffect, useState } from 'react'
import { FaExclamationTriangle, FaPhoneVolume, FaSeedling, FaTruck, FaUserAlt, FaWindowClose } from 'react-icons/fa';
import ComplainCreate from './complainCreate';
import ReturnOrderModalPage from '../../components/modal/returnOrderModal';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderlist, getUpdateOrderlist, ResetOrderlist } from '../../Store/actions';
import logo from "../../img/logo.webp";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import SuccessErrorModalPage from '../../components/modal/successErrorModal';
import moment from 'moment';
import { BsCartXFill } from 'react-icons/bs';
const IMG_URL = import.meta.env["VITE_API_URL"];

interface OrderDetailsProps{
  orderId : string | null;
  openDetailIData : any;
  closeOrderDetail : ( value: boolean ) => void;
} 


  interface CustomerData {
    address: string;
    customer_name : string;
    firstname: string;
    middlename: string;
    lastname: string;
    district_name: string;
    mobile_number : number;
    alternate_number : number;
    pincode : string;
    taluka_name:string;
    village_name : string;
    state :any;
  }

  interface ProductData {
    name: string ; 
    hsn_code : number;
    discount :number;
    batch_no : number;
    price : number;
    c_gst : number;
    s_gst : number;
    quantity : number;
  }

  interface OrderDetailsType {
    added_at : string;
    order_id: string
    customer: CustomerData;
    products :  ProductData[];
    status: string;
    total_amount : number;
    coupon : any;
  }

const OrderDetails : FC <OrderDetailsProps> = ({orderId, closeOrderDetail, openDetailIData}) => {  
  const dispatch = useDispatch();
    const [isOpenSuccessOrderModel, setisOpenSuccessOrderModel ] = useState(false);
    const [isOpenSuccessOrderMessage, setisOpenSuccessOrderMessage ] = useState("");
    const UpdateOrderdatalist = useSelector((state: any) => state.Order.UpdateOrderlist);
    const Todaydate = moment(new Date()).format("DD-MM-YYYY")
    
    useEffect(() => {
          if ( UpdateOrderdatalist?.success ) {
            setisOpenSuccessOrderModel(true)
            setisOpenSuccessOrderMessage(UpdateOrderdatalist?.msg);
          } else {
            toast.error(UpdateOrderdatalist?.msg)
          }
    }, [ UpdateOrderdatalist])

  const OkayCall = () =>{
    dispatch(ResetOrderlist());
    closeOrderDetail(false);
    setisOpenSuccessOrderModel(false);
    setisOpenSuccessOrderMessage("");
  }

  const Closecall = () =>{
    closeOrderDetail(false)
  }

    // ---------------- Calculation Logic ----------------
    const calculateOrderSummary = () => {
      let totalSubtotal = 0;
      let totalGST = 0;
      let totalDiscount = 0;
      let totalGrandTotal = 0

      openDetailIData?.products?.forEach((item: any) => {
        const price = item?.id?.price || 0;
        const discount = item?.id?.discount || 0;
        const gstRate = item?.id?.s_gst || 0;
        const quantity = item?.quantity|| 1;

        const discountedPrice = (price - discount) * quantity;
        const gstAmount = (discountedPrice * gstRate * 2) / 100;

        totalSubtotal += discountedPrice;
        totalDiscount += discount * quantity;
        totalGST += gstAmount;
        const totalBeforeCoupon =   totalSubtotal + totalGST;
        totalGrandTotal = Math.max(0, totalBeforeCoupon - (openDetailIData?.coupon?.amount ?? 0));
      });

      return { totalSubtotal, totalDiscount, totalGST, grandTotal: totalSubtotal + totalGST, totalGrandTotal };
    };

    const { totalSubtotal, totalDiscount, totalGST, grandTotal, totalGrandTotal } = calculateOrderSummary();
  // ---------------- Calculation Logic End ----------------

      const [data, setData] = useState <null | any>(null);
      const customerDataString = Cookies.get("customer_data");
        useEffect(() => {
          if (customerDataString && customerDataString !== "undefined") {
            try {
              const customerData = JSON.parse(customerDataString);
              setData(customerData ? customerData : null);
            } catch (error) {
              console.error("Failed to parse customer_data:", error);
              setData(null);
            }
          }else{
            setData(null);
          }
        },[]);

  const packingtypeoption = openDetailIData?.products && openDetailIData?.products.map((item: any) => ({ label: item?.id?.name?.englishname, value: item?.id?._id }));

  // -------------- complain modal open/close code start ----------
  const [isOpenComplainCreateModel, setisOpenComplainCreateModel] = useState(false);
  const [ complainProductId, setComplainProductId] = useState("");

  const CreateComplainCall = () => {
    setComplainProductId("");
    setisOpenComplainCreateModel(true);
  }

  const CompainCall = (data:any) =>{
    setComplainProductId(data);
    setisOpenComplainCreateModel(true);
  }
  // -------------- complain modal open/close code end ----------
  
  // --------------  Return Order modal open/close code start ----------
  const [isOpenReturnOrderModel, setisOpenReturnOrderModel] = useState(false);
  const [isReturn, setisReturn] = useState("");
  const ReturnComplainCall = (data:string) => {
    setisOpenReturnOrderModel(true);
    setisReturn(data)
  }

  const ReturnCall = () =>{
    let requser ={
      customer: openDetailIData?.customer?.id, 
      order_id : orderId,
      order_type : "confirm",
      status : isReturn 
    }
      dispatch(getUpdateOrderlist(requser))
      setisOpenReturnOrderModel(false)
  }
  // --------------  Return Order  modal open/close code end ----------

  // ------------order invoice open code start ------------
  const [isOpeninvoiceModel, setisOpeninvoiceModel] = useState(false);
  const OpenInviceModal =() =>{
    setisOpeninvoiceModel(true)
      if(orderId){
        let requserdata = { id: openDetailIData?._id };
        dispatch(getOrderlist(requserdata))
      }
  }

    const [UserDataList, setUserDataList] = useState<OrderDetailsType | null>( null);
    const  Orderlist  = useSelector((state: any) =>  state.Order.Orderlist);
  
    useEffect(() => {
      setUserDataList(Orderlist ? Orderlist[0] : null);
    }, [Orderlist]);

  const finalsubtotal = (UserDataList?.products ?? []).reduce( (sum:any, item:any) => sum + item?.quantity *( item?.id?.price - item?.id?.discount ),  0 );
  const finaldiscount = (UserDataList?.products ?? []).reduce( (sum:any, item:any) => sum + (item?.id?.discount *  item?.quantity ),  0 );
  const finalgst = (UserDataList?.products ?? []).reduce( (sum:any, item:any) => sum + (item?.quantity * (item?.id?.price - item?.id?.discount)) * ((item?.id?.c_gst * 2) / 100), 0 );
  const grandtotal = finalsubtotal + finalgst;
  const totalBeforeCoupon = finalsubtotal + finalgst;
  const total = Math.max(0, totalBeforeCoupon - (UserDataList?.coupon?.amount ?? 0));

  const A4_HEIGHT_PX = 1123;
  const STATIC_HEIGHT_PX = 400; // estimated
  const ROW_HEIGHT_PX = 40;

  const chunkProducts = (products: any[], maxRows: number) => {
    const chunks = [];
    for (let i = 0; i < products.length; i += maxRows) {
      chunks.push(products.slice(i, i + maxRows));
    }
    return chunks;
  };

  const products = UserDataList?.products || [];
  const maxRowsPerPage = Math.floor((A4_HEIGHT_PX - STATIC_HEIGHT_PX) / ROW_HEIGHT_PX);
  const productChunks = chunkProducts(products, maxRowsPerPage);

  // ------------order invoice open code end ------------


  return (
    <>
      <div className='flex justify-between'>
        <div className="flex gap-x-5"> 
          <span className='text-[2rem] font-semibold text-gray-900 dark:text-gray-100'> Order ID :  {orderId}  </span> 
          {openDetailIData?.status ?   <Badge  color="warning" size="md" className=' self-center '>  { openDetailIData?.status ? openDetailIData?.status.charAt(0).toUpperCase() + openDetailIData?.status.slice(1).toLowerCase() :  "-"}  </Badge> : null }
        </div>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100 flex self-center cursor-pointer " onClick={() => Closecall()}> <FaWindowClose /> </div>
      </div>

      <div className="flex flex-col md:flex-row min-w-full justify-between gap-4">
        {/* Left Section (Order Details) */}
        <div className="md:flex-1">
          <div className="border dark:border-gray-600 dark:bg-gray-800 my-4 p-3 rounded-xl w-full">
            <div className="text-[1.2rem] font-semibold text-gray-900 dark:text-gray-100"> Order Item  </div>

            <div className='my-3 flex flex-col gap-y-8'>
              {openDetailIData?.products  && openDetailIData?.products.map((data:any , k:number) =>(
                <div key={k} className='flex justify-between gap-x-4 my-4'>
                  <div className='flex gap-x-3'>
                    <div> <img className='w-[3rem] h-[3rem]' src={`${IMG_URL}/public/product/${data?.id?.product_pics[0]}` } alt='product image' /> </div>
                    <div>
                      <div className='truncate max-w-[25rem] text-gray-600 dark:text-gray-300'> {data?.id?.name?.englishname} </div>
                      <div className='truncate max-w-[25rem] text-gray-600 text-[0.8rem] dark:text-gray-300'> {data?.id?.tech_name?.english_tech_name} </div>
                    </div>
                  </div>

                  <div className='flex gap-x-3'> 
                    <div className='py-1 px-4 border rounded-xl self-center dark:text-gray-300'> {data?.quantity}  X  {data?.id?.price} </div>
                    <div className='text-center self-center dark:text-gray-300'> - {data?.id?.discount} </div>
                    <div className='text-center self-center dark:text-gray-300'> = {Math.round(data?.quantity * data?.id?.price - data?.id?.discount)}</div>
                  </div>
                  
                  { openDetailIData?.status == "confirm" ?  <div className='text-center self-center  bg-indigo-600 hover:bg-indigo-700 text-gray-100 rounded-lg cursor-pointer flex gap-x-2 px-3 py-1.5' onClick={() => CompainCall(data?.id?._id)}> <FaExclamationTriangle className='self-center text-xl'  /> Complain </div> : null }
                </div>
              ))}
            </div>
          </div>

          <div className="border dark:border-gray-600 dark:bg-gray-800 my-4 p-4 rounded-xl w-full">
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8"> Order Summary </div>

            {/* <div className="flex flex-col items-end space-y-3">
              <div className="text-lg font-semibold text-gray-500 dark:text-gray-300 flex justify-between w-full max-w-xs"> <span>Total Discount </span> <span >: {totalDiscount.toFixed(2)} Rs.</span> </div>
              <div className="text-lg font-semibold text-gray-500 dark:text-gray-300 flex justify-between w-full max-w-xs"> <span>Total Subtotal </span> <span > : {totalSubtotal.toFixed(2)} Rs.</span></div>
              <div className="text-lg font-semibold text-gray-500 dark:text-gray-300 flex justify-between w-full max-w-xs"> <span>Total GST </span> <span > : {totalGST.toFixed(2)} Rs.</span> </div>
              {openDetailIData?.coupon?.amount ? 
                <div className="text-lg font-semibold text-gray-500 dark:text-gray-300 flex justify-between w-full max-w-xs"> <span> Coupon </span> <span > : - {openDetailIData?.coupon?.amount.toFixed(2)} Rs.</span> </div>
              : null}
            </div> */}

            <div className="flex flex-col justify-self-end w-full max-w-md  dark:bg-gray-800  space-y-4">
                <div className="flex justify-between w-full text-base md:text-lg font-medium text-gray-600 dark:text-gray-300">
                  <span>Total Discount</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{Math.round(totalDiscount)} Rs.</span>
                </div>
                
                <div className="flex justify-between w-full text-base md:text-lg font-medium text-gray-600 dark:text-gray-300">
                  <span>Total Subtotal</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{Math.round(totalSubtotal)} Rs.</span>
                </div>
                
                <div className="flex justify-between w-full text-base md:text-lg font-medium text-gray-600 dark:text-gray-300">
                  <span>Total GST</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{Math.round(totalGST)} Rs.</span>
                </div>
                
                {openDetailIData?.coupon?.amount && (
                  <div className="flex justify-between w-full text-base md:text-lg font-medium text-green-600 dark:text-green-400">
                    <span>Coupon</span>
                    <span className="font-semibold">- {Math.round(openDetailIData?.coupon?.amount) ?? 0} Rs.</span>
                  </div>
                )}
              </div>

            <div className="flex justify-end items-center text-xl font-semibold text-gray-500 dark:text-gray-300 mt-4 gap-x-4 "> <span className='text-[1.5rem]'>Grand Total</span> <span className='min-w-[11rem] text-end'> : {Math.round(totalGrandTotal)} Rs.</span> </div>
          </div>

          { openDetailIData?.status == "confirm" ?
          <div className='flex justify-end gap-x-4'>
            {moment(openDetailIData?.added_at).format("DD-MM-YYYY") === Todaydate ?
              // <div className='text-center self-center  bg-red-600 border border-red-600 hover:bg-red-600 hover:border-red-500 rounded-lg cursor-pointer flex gap-x-2 px-4 py-2 text-gray-100'  onClick={() => ReturnComplainCall()}  > <FaTruck className='self-center h-6 w-6' /> Cancel </div>
              <div className="flex border border-indigo-500 text-indigo-500 dark:text-white hover:text-gray-100 font-semibold px-6 py-2 rounded-full gap-3 hover:bg-indigo-800 transition flex text-center cursor-pointer transition-all duration-500 ease-in-out" onClick={() => ReturnComplainCall("cancel")}> <BsCartXFill  className="self-center h-5 w-5" /> Cancel Order </div>
              :
              <div className='text-center self-center  bg-red-600 border border-red-600 hover:bg-red-600 hover:border-red-500 rounded-lg cursor-pointer flex gap-x-2 px-4 py-2 text-gray-100'  onClick={() => ReturnComplainCall("return")}  > <FaTruck className='self-center h-6 w-6' /> Return </div>
            }
            <div className='text-center self-center  bg-indigo-600 hover:bg-indigo-700 text-gray-100 rounded-lg cursor-pointer  flex gap-x-2 px-4 py-2' onClick={() => CreateComplainCall()}> <FaExclamationTriangle className='self-center '  /> Complain </div>
          </div>
          : null }
        </div>
        
        <div className="md:w-[20rem] w-full flex flex-col gap-4 mt-5">
           {openDetailIData?.status === "confirm" ?
          <div className="border dark:border-gray-600 dark:bg-gray-800 p-3 rounded-xl w-full flex flex-col gap-y-3 cursor-pointer" onClick={ () =>OpenInviceModal()}>
            <div className='dark:text-gray-300 text-[1.2rem] font-semibold'>Invoice</div>  
          </div>
          : null }

          <div className="border dark:border-gray-600 dark:bg-gray-800 p-3 rounded-xl w-full flex flex-col gap-y-3">
            <div className='dark:text-gray-300 text-[1.2rem] font-semibold'>Customer</div>
            <div className='dark:text-gray-300 flex gap-x-3 truncate max-w-[18rem]'><FaUserAlt className='self-center h-7-w-7'  />  <span> {data?.firstname} {data?.middlename} {data?.lastname} </span> </div>
          </div>

          <div className="border dark:border-gray-600 dark:bg-gray-800 p-3 rounded-xl w-full flex flex-col gap-y-3">
            <div className='dark:text-gray-300 text-[1.2rem] font-semibold'>Contact Information</div>
            <div className='dark:text-gray-300 flex gap-x-3'><FaPhoneVolume className='self-center h-7-w-7' />  <span> {data?.mobile_number} , {data?.alternate_number} </span> </div>
          </div>

          <div className="border dark:border-gray-600 dark:bg-gray-800 p-3 rounded-xl w-full flex flex-col gap-y-3">
            <div className='dark:text-gray-300 text-[1.2rem] font-semibold'>Shipping Address</div>
            <div className='dark:text-gray-300 '>  {data?.customerAddress } </div>
            <div className='dark:text-gray-300'> District :   {data?.district_name } </div>
            <div className='dark:text-gray-300'> Taluka :  {data?.taluka_name } </div>
            <div className='dark:text-gray-300'> Village :  {data?.village_name } </div>
            <div className='dark:text-gray-300'> Pincode : {data?.pincode } </div>
          </div>
        </div>
      </div>

      <ComplainCreate isOpenComplainCreateModel={isOpenComplainCreateModel}  setisOpenComplainCreateModel={setisOpenComplainCreateModel}  orderId={orderId} product_id={complainProductId} orderItem={packingtypeoption} />
      <ReturnOrderModalPage  isOpenReturnOrderModel={isOpenReturnOrderModel}  setisOpenReturnOrderModel={setisOpenReturnOrderModel} ReturnCall={ReturnCall} modal={isReturn} /> 
      <SuccessErrorModalPage isOpenSuccessOrderModel={isOpenSuccessOrderModel} setisOpenSuccessOrderModel={setisOpenSuccessOrderModel} message={isOpenSuccessOrderMessage} OkayCall={OkayCall} />

      <Modal  className="fixed inset-0 z-50 flex lef-[-9rem] items-center justify-center bg-black bg-opacity-50"  onClick={() => setisOpeninvoiceModel(false)}  onClose={() => setisOpeninvoiceModel(false)}   show={isOpeninvoiceModel}>
          <div
              className="bg-white shadow-xl rounded-lg overflow-auto"
              style={{
                width: '850px',
                height: 'auto',
                maxHeight: '95vh',
                maxWidth: '95vw',
              }}
              onClick={(e) => e.stopPropagation()} // prevent close on inner click
            >
           <Modal.Body className="p-6 overflow-auto">
                <div >
                          {productChunks.map((productChunk, pageIndex) => {
                            return(
                            <div key={pageIndex}
                              style={{ width: "794px", height: "1123px" }}
                              className="mx-auto bg-white shadow-lg p-6 rounded-lg flex flex-col justify-between font-sans page-break "
                            >
                              {/* --- Static Top Content --- */}
                              <div className="flex flex-col">
                                <div className="text-center mb-2">
                                  <h6 className="text-[0.9rem]  text-gray-500 ">  એગ્રો જીની કંપનીમાંથી 100% ખાતરીબંધ બ્રાન્ડેડ કૃષિ પ્રોડક્ટ ઘરે બેઠા ઓર્ડર કરવા અને ખેતીને લગતી વધુ માહિતી માટે  </h6>
                                  <h6 className="text-[0.9rem]  text-gray-500 ">  હેલ્પલાઇન નંબર +91 90635 63590  પર સંપર્ક કરો!!!  જય કિસાન  </h6>
                                </div>
            
                                <div className="flex justify-between items-center mb-4">
                                  <img src={logo} alt="Company Logo" className="w-24" />
                                  <h1 className="text-3xl font-bold text-gray-800 text-right">INVOICE</h1>
                                </div>
            
                                <div className="flex justify-between items-center mb-4 border-b pb-4">
                                  <div>
                                    <p className="text-gray-500 text-[0.9rem]"> AgroGenie Ventures LLP, </p>
                                    <p className="text-gray-500 text-[0.9rem]">At:  Anand - 388001, Ta.: Anand,</p>
                                    <p className="text-gray-500 text-[0.9rem]">  Dist.: GPO Road, Anand, Gujarat </p>
                                    <p className="text-gray-500 text-[0.9rem]">  GST : 24ABVFA5722H1ZA </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-gray-500 text-sm"><strong> Pesticide Lic No: </strong>GJ/AND/PT1200123/2025-26 </p>
                                    <p className="text-gray-500 text-sm"><strong> Seeds Lic No: </strong>  GJ/AND/FR1900789/2025-26 </p>
                                    <p className="text-gray-500 text-sm"> <strong> Ferlitizer Lic No: </strong> GJ/AND/SD2100456/2025-26</p>
                                    <p className="text-gray-500 text-sm"> E-mail:  touch@agrogenieseeds.com</p>
                                    <p className="text-gray-500 text-sm"> Contact : +91 90635 63590  </p>
                                  </div>
                                </div>
            
                                <div className="grid grid-cols-2 mb-4">
                                  <div>
                                    <p className="font-semibold">Bill To:</p>
                                    <p>{UserDataList?.customer?.firstname} {UserDataList?.customer?.middlename} {UserDataList?.customer?.lastname}</p>
                                    <p className="text-gray-600 text-[0.9rem]">  {UserDataList?.customer?.address}   </p>
                                    <p className="text-gray-600 text-[0.9rem]">  {UserDataList?.customer?.village_name}, {UserDataList?.customer?.taluka_name},  {UserDataList?.customer?.district_name},  </p>
                                    <p className="text-gray-600 text-[0.9rem]">  {UserDataList?.customer?.state?.name} -  {UserDataList?.customer?.pincode}  </p>
                                    <p className="text-gray-600 text-[0.9rem]">  Contact : {UserDataList?.customer?.mobile_number}, {UserDataList?.customer?.alternate_number} </p>
                                  </div>
                                  <div className="text-right">
                                    <p><strong>Invoice:</strong> {UserDataList?.order_id}</p>
                                    <p><strong>Date:</strong> {moment(UserDataList?.added_at).format("DD-MM-YYYY")}</p>
                                  </div>
                                </div>
                              </div>
            
                              <div className="flex-1 overflow-hidden">
                                <table className="w-full border border-gray-300">
                                  <thead className="bg-gray-700 text-white">
                                    <tr>
                                      {["Item Description", "HSN", "Batch", "Rate", "Dis", "Qty", "Amount", "GST", "Total"].map((h, i) => (
                                        <th key={i} className="border p-2 text-[0.8rem]">{h}</th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {productChunk.map((item, k) => {
                                      const amount = item?.quantity * (item?.price -  item?.discount) ;
                                      const gst = ((amount) * (item?.c_gst * 2 / 100));
                                      const total = amount + gst;
                                      return (
                                        <tr key={k} className="bg-gray-50 text-center text-[0.8rem]">
                                          <td className="border p-2 text-left break-words">{item?.id?.name?.englishname} ({item?.id?.packaging} {item?.id?.packagingtype?.type_eng})</td>
                                          <td className="border p-2">{item?.hsn_code}</td>
                                          <td className="border p-2">{item?.batch_no}</td>
                                          <td className="border p-2">{item?.price}</td>
                                          <td className="border p-2">{item?.discount}</td>
                                          <td className="border p-2">{item?.quantity}</td>
                                          <td className="border p-2">{amount}</td>
                                          <td className="border p-2">{Math.round(gst) ?? 0}</td>
                                          <td className="border p-2">{Math.round(total) ?? 0}</td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
            
                              {/* --- Footer (only on last page) --- */}
                              {pageIndex === productChunks.length - 1 && (
                                <>
                                  <div className="mt-4 flex">
                                    <div className="flex-1 text-[0.8rem]">
                                      <p>A/c Holder: AgroGenie Ventures LLP</p>
                                      <p>A/c No: 10074 944041</p>
                                      <p>Bank: IDFC First Bank, Gandhinagar</p>
                                      <p>IFSC: IDFB0042343</p>
                                    </div>
            
                                    <div className="flex-1 text-[1rem]">
                                      <div className="space-y-1">
                                        {/* Row */}
                                        <div className="py-2">
                                          <div className="flex justify-between">
                                            <div className="flex">
                                              <p className="w-[6rem]"><strong> Discount</strong></p>
                                              <span className="mx-1">:</span>
                                            </div>
                                            <p>₹{Math.round(finaldiscount) ?? 0}</p>
                                          </div>
            
                                          <div className="flex justify-between">
                                            <div className="flex">
                                              <p className="w-[6rem]"><strong>Sub Total</strong></p>
                                              <span className="mx-1">:</span>
                                            </div>
                                            <p>₹{Math.round(finalsubtotal) ?? 0}</p>
                                          </div>
            
                                          <div className="flex justify-between">
                                            <div className="flex">
                                              <p className="w-[6rem]"><strong>Tax</strong></p>
                                              <span className="mx-1">:</span>
                                            </div>
                                            <p>+ ₹{Math.round(finalgst) ?? 0}</p>
                                          </div>
                                        </div>
            
                                        {/* Coupon Section */}
                                        {UserDataList?.coupon && (
                                          <div className="border-t border-dashed border-gray-400 py-2 space-y-1">
                                            <div className="flex justify-between">
                                              <div className="flex">
                                                <p className="w-[6rem]"><strong>Grand Total</strong></p>
                                                <span className="mx-1">:</span>
                                              </div>
                                              <p>₹{Math.round(grandtotal) ?? 0}</p>
                                            </div>
            
                                            <div className="flex justify-between">
                                              <div className="flex">
                                                <p className="w-[6rem]"><strong>Coupon</strong></p>
                                                <span className="mx-1">:</span>
                                              </div>
                                              <p>- ₹{Math.round(UserDataList?.coupon?.amount) ?? 0}</p>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
            
                                  </div>

                                  <div className="text-2xl font-bold bg-gray-700 text-white px-3 py-2  text-right  leading-tight antialiased">Total : ₹{Math.round(total) ?? 0}</div>

                                  <div className="mt-4 text-[0.8rem] text-gray-700">
                                      <div className="flex justify-between"> 
                                          <div className="text-[1.2rem]" ><strong>Terms & Conditions:</strong>  </div>
                                          {/* <img src="/images/authentication/signature.webp" className="mb-3 border-b border-dashed border-gray-400 pb-1 w-[8rem] h-[3rem]" />  */}
                                      </div>
                                    <p className="text-[0.8rem]">  (1) પાર્સલની ડિલિવરી વખતે બધો સામાન તપાસી લેશો, વસ્તુ ગૂમની ફરિયાદ માન્ય નહીં રાખવામાં આવે. વેચાયેલ માલમાં ખામી હશે તો બદલી આપશું પણ પાછો લેવામાં નહિ આવે. </p>
                                    <p className="text-[0.8rem]">  (2) પમ્પની બેટરી અને ટોર્ચ લાઈટ માં માત્ર 6 મહિનાની બેટરીની વૉરંટી આવે છે. ચાર્જિંગ કરતી વખતે આ વસ્તુઓ વાપરવી નહિ, વધુ પડતું ચાર્જિંગ ટાળો અને પાવર ઓછો હોય ત્યારે વસ્તુને ચાર્જિંગમાં ના રાખો. </p>
                                    <p className="text-[0.8rem]">  (3)અમારા તમામ ઉત્પાદનો માત્ર કૃષિ ઉપયોગ માટે જ છે. ખેતીમાં ઉત્પાદન હવામાન, પાણી, આબોહવા, જમીન, માવજત અને સમય જેવા વિવિધ પરિબળો પર આધારિત હોય છે, પાકની નિષ્ફળતા, ઉપજમાં ઘટાડો અથવા ગુણવત્તાના નુકસાન માટે કંપની ક્યારેય જવાબદાર રહેશે નહીં અને કોપને કોઈપણ નુકસાન માટે વળતર આપશે નહીં. </p>
                                  </div>
            
                                  <div className="mt-4 text-center text-gray-600">
                                    <h6 className="text-[1rem] leading-none">
                                        <span role="img" aria-label="pray" className="mr-1">🙏</span>
                                        એગ્રોજીની માંથી ખરીદી કરી આપની સેવાની તક આપવા બદલ આપશ્રીનો આભાર.
                                        <span role="img" aria-label="pray" className="ml-1">🙏</span>
                                      </h6>
                                    <div className="flex justify-center items-center gap-x-3 mt-3 text-[0.9rem]"> 
                                      <img src="/images/products/facebook.png" className="w-5 h-5  align-middle" alt="Facebook" /> 
                                      <img src="/images/products/instagram.png"  className="w-6 h-6  align-middle" alt="Insta" /> 
                                      <img src="/images/products/whatsapp.png"  className="w-6 h-6  align-middle" alt="WhatsApp" /> 
                                      <img src="/images/products/youtube.png"  className="w-6 h-6  align-middle" alt="Youtube" /> 
                                      <img src="/images/products/website.png"   className="w-5 h-5  align-middle" alt="Website" />  
                                      </div>
                                  </div>
                                </>
                              )}
                            </div>
                            )
                          })}
                      </div>
           </Modal.Body>
           </div>
      </Modal>
    </>
  )
}

export default OrderDetails