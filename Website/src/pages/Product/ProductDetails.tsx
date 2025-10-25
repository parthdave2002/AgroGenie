import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { FaCartShopping } from 'react-icons/fa6';
import { toast } from "react-toastify";
import { GetProductViewlist } from '../../Store/Product/action';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowRedoSharp } from 'react-icons/io5';
import { SiBattledotnet } from "react-icons/si";
import { FaWindowClose } from 'react-icons/fa';
import { CartItemProps, Product, ProductDetails } from '../../types/types';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import GlobalLoader from '../../component/Loader/Loader';
// const IMG_URL = import.meta.env["VITE_API_URL"];
const IMG_URL = import.meta.env.VITE_API_URL; 

const ProductDetailsSection = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [is_loader, set_is_loader] = useState(false)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [])

  useEffect(() => {
    if (id) {
      dispatch(GetProductViewlist({ id: id }))
      set_is_loader(true)
    }
  }, [id])

  //------------- Get data from redux code start -------------
  const productdetail: any = useSelector((state: any) => state?.Product.singleProductlist);

  const [productsData, setproductsData] = useState<ProductDetails>()
  const [relatedproductsData, setRelatedproductsData] = useState<Product[]>([])

  useEffect(() => {
    set_is_loader(false);
    if (productdetail?.success === true) {
      setproductsData(productdetail?.data);
      setRelatedproductsData(productdetail?.data?.similarProduct);
    }
    else if (productdetail?.data?.success === false) {
      toast.error(productdetail?.msg);
    }
  }, [productdetail]);
  //------------- Get data from redux code end -------------

  const CloseCall = () => {
    navigate(-1)
  }

// ------------ Add to cart start ----------
    const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
    const [productQuantities, setProductQuantities] = useState<{ [key: string]: number }>({});

    const AddCall = (item: ProductDetails) => {
       set_is_loader(true);
       window.scrollTo({ top: 0, behavior: "smooth"});
      const quantity = productQuantities[item._id] || 1;

      setCartItems((prevItems: any) => {
         const existingIndex = prevItems.findIndex((i: any) => i._id === item._id);
           if (existingIndex > -1) {
            // toast.info("Product is already in the cart.");
            return prevItems;
          }

            const updatedCart = [...prevItems, { ...item, quantity }];

            localStorage.setItem("product", JSON.stringify(updatedCart));
            window.dispatchEvent(new Event("cartChanged"));
            return updatedCart;
      });
       set_is_loader(false);
    };

      useEffect(() => {
        set_is_loader(true);
      const loadCart = () => {
        const storedCart = localStorage.getItem("product");
        if (storedCart) {
          const cartItems = JSON.parse(storedCart);
          setCartItems(cartItems);
        }
      };

      loadCart();
      window.addEventListener("cartChanged", loadCart);
      
      return () => {
        window.removeEventListener("cartChanged", loadCart);
      };
  }, []);

  const removeFromCart = (productId: string) => {
    set_is_loader(true);
    const updatedCart = cartItems.filter((item: any) => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("product", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartChanged"));
    toast.success("Product removed from cart.");
    set_is_loader(false);
  };

    const incrementQty = (productId: string) => {
      setProductQuantities((prev) => ({
        ...prev,
        [productId]: (prev[productId] || 1) + 1,
      }));
    };

    const decrementQty = (productId: string) => {
      setProductQuantities((prev) => {
        const currentQty = prev[productId] || 1;
        return {
          ...prev,
          [productId]: currentQty > 1 ? currentQty - 1 : 1,
        };
      });
      // setCartItems((prev) =>
      //   prev.map((item: any) =>
      //     item._id === productId && item.quantity > 1
      //       ? { ...item, quantity: item.quantity - 1 }
      //       : item
      //   )
      // );
    };
  // ------------ Add to cart end ----------


  return (
    <>
        {is_loader ?  <GlobalLoader />
                : 
            <div>
              <div>
                <div className='flex justify-between px-4'>
                  <div className="text-[2rem] font-semibold text-gray-900 font-heading"> {t("Product Details")}   </div>
                  <div className="text-[2rem] font-semibold text-gray-900 flex self-center cursor-pointer" onClick={() => CloseCall()} > <FaWindowClose /> </div>
                </div>

                <div className='flex flex-col md:flex-row px-3 mt-[2rem]'>
                  <div className='flex-1'>
                
                  <figure className="bg-[#F9F9F9] rounded-[12px] text-center mb-4 w-full max-w-[400px] mx-auto">
                    <Swiper
                      modules={[Navigation, Autoplay]}
                      spaceBetween={16}
                      slidesPerView={1}
                      loop={(productsData?.product_pics ?? []).length > 1}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                    >
                      {productsData?.product_pics?.map((img, index) => (
                        <SwiperSlide key={index}>
                          <LazyLoadImage
                            effect="blur"
                            src={`${IMG_URL}/public/product/${encodeURIComponent(img)}`}
                            alt={`Product image ${index + 1}`}
                            className="w-full  h-auto max-h-[30rem] object-contain mx-auto"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </figure>
                  </div>

                  {/* RIGHT - Details */}
                  <div className='flex-1 px-[1rem] md:px-[3rem]'>
                    <div className='text-gray-900 text-[1.5rem] font-bold'>  {lang === 'gj' ? productsData?.name?.gujaratiname : productsData?.name?.englishname} </div>

                    <div className='text-gray-900 text-[1rem] mt-3'>
                      {lang === 'gj' ? productsData?.tech_name?.gujarati_tech_name : productsData?.tech_name?.english_tech_name}
                    </div>

                    <div className='text-gray-900 text-[1rem] mt-3 flex gap-x-3'>
                      <div className='w-[8rem] font-heading text-[1rem]'>Packing</div> :   {productsData?.packaging} {lang === 'gj' ? productsData?.packagingtype?.type_guj : productsData?.packagingtype?.type_eng}
                    </div>

                    <div className='text-gray-900 text-[1rem] mt-3 flex gap-x-3'>
                      <div className='w-[8rem] font-heading text-[1rem]'>Available Qty</div> :  {productsData?.avl_qty}
                    </div>

                    <div className='text-gray-900 text-[1rem] mt-3 flex gap-x-3'>
                      <div className='w-[8rem] font-heading text-[1rem]'>Company</div> :  {lang === 'gj' ? productsData?.company?.name_guj : productsData?.company?.name_eng}
                    </div>

                    <div className='text-gray-900 text-[1rem] mt-3 flex gap-x-3'>
                      <div className='w-[8rem] font-heading text-[1rem]'>Price (₹)</div> : {productsData?.price}
                    </div>

                    <div className='text-gray-900 text-[1rem] mt-3 flex gap-x-3'>
                      <div className='w-[8rem] font-heading text-[1rem]'>Discount</div> :  {productsData?.discount}
                    </div>

                    <div className='text-gray-900 text-[1rem] mt-3 flex gap-x-3'>
                      <div className='w-[8rem] font-heading text-[1rem]'>Batch No</div> :  {productsData?.batch_no}
                    </div>

                    <div className='text-gray-900 text-[1rem] mt-3 flex gap-x-3'>
                      <div className='w-[8rem] font-heading text-[1rem]'>HSN Code</div> :  {productsData?.hsn_code}
                    </div>

                    <div className='text-gray-900 text-[1rem] mt-3 flex gap-x-3'>
                      <div className='w-[8rem] font-heading text-[1rem]'>SGST</div> :  {productsData?.s_gst}
                    </div>

                    <div className='text-gray-900 text-[1rem] mt-3 flex gap-x-3'>
                      <div className='w-[8rem] font-heading text-[1rem]'>CGST</div> :   {productsData?.c_gst}
                    </div>

                    {/* Quantity + Add to Cart */}
                    <div className="md:flex  items-center gap-x-[4rem] mt-[2rem]">
                      <div className="flex items-center border border-green-600 rounded-lg w-[100px] overflow-hidden">
                        <button className="w-[60px] h-[35px] text-center bg-gray-200 hover:bg-green-600 border-r border-green-600 text-[#222222]"  onClick={() => decrementQty(productsData!._id)}>−</button>
                        <input id="quantity" value={productQuantities[productsData?._id || ''] || 1}  type="text" defaultValue="1" className="w-[40px] text-center border-none m-0 p-0 focus:outline-none" />
                        <button className="w-[60px] h-[35px] text-center bg-gray-200 hover:bg-green-600 border-l border-green-600 text-[#222222]" onClick={() => incrementQty( productsData!._id)}>+</button>
                      </div>

                        {!cartItems ? 
                              <button className="text-red-600 px-4 py-2 text-md flex items-end ml-[7rem] rounded-full justify-end border border-[#d8d8d8] hover:bg-red-100 transition-all duration-300 mt-4" onClick={() => productsData &&  removeFromCart(productsData?._id)} > {t("remove_from_cart")} </button>
                            :  
                            <button className="text-gray-50 px-4 py-2 text-md flex items-center gap-1 rounded-full bg-green-600 border border-[#d8d8d8] hover:bg-green-500 hover:text-white transition-all duration-300 mt-3 md:mt-0"  onClick={() => productsData && AddCall(productsData)}>    {t("add_to_cart")} <FaCartShopping /> </button>
                        }
                    </div>
                  </div>
                </div>

                <div className="mt-12 px-3">
                  <h3 className="text-[1.5rem] font-semibold text-gray-700 mb-2 ">Description</h3>
                  {productsData?.description && productsData?.description.map((data: any, index: number) => (
                    <div key={index} className="mb-4 p-4 rounded-lg shadow-sm">

                      <div className="flex flex-col gap-2 ">
                        <div className="font-bold text-gray-600 text-[1.2rem] flex gap-x-3"> <IoArrowRedoSharp className='self-center' />  {lang === 'gj' ? data?.gujaratiHeader : data?.englishHeader} </div>
                        <div className="font-medium text-gray-600  flex gap-x-3"> <div className='h-4 w-4 flex self-top pt-1'> <SiBattledotnet /> </div> <div className='text-[0.9rem]'>  {lang === 'gj' ? data?.gujaratiValue : data.englishValue} </div> </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='my-[3rem]'>
                <div className="text-[2rem] font-semibold text-gray-900 font-heading"> {t("Relevant Category Products")}  </div>

                <div className="md:grid  md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-1600">
                  {relatedproductsData && relatedproductsData.map((product:any, k:number) => {
                  const cartItem = cartItems.find((item: any) => item._id === product._id);
                  return(
                        <div key={product._id || k} className="relative p-4 bg-white border border-[#FBFBFB] shadow-[0px_5px_22px_rgba(0,0,0,0.04)] rounded-2xl mb-7 hover:shadow-[0px_21px_44px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                          <div className='flex-1'>
                        
                          <figure className="bg-[#F9F9F9] rounded-[12px] text-center mb-4 w-full max-w-[400px] mx-auto">
                            <Swiper
                              modules={[Navigation, Autoplay]}
                              spaceBetween={16}
                              slidesPerView={1}
                              loop={(productsData?.product_pics ?? []).length > 1}
                              autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                              }}
                            >
                              {productsData?.product_pics?.map((img, index) => (
                                <SwiperSlide key={index}>
                                  <LazyLoadImage
                                    effect="blur"
                                    src={`${IMG_URL}/public/product/${encodeURIComponent(img)}`}
                                    alt={`Product image ${index + 1}`}
                                    className="w-full  h-auto max-h-[15rem] object-contain mx-auto"
                                  />
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </figure>
                          </div>

                          <div className="flex justify-between items-center text-sm ">
                            <h3 className="block w-full font-heading font-semibold text-[16px] leading-[25px] capitalize text-[#333333] mb-1 cursor-pointer truncate max-w-[11rem]"> {lang === 'gj' ? product?.name?.gujaratiname :   product?.name?.englishname} </h3>
                            <span className="font-normal font-heading text-[1rem] leading-[18px] flex gap-x-1">
                              <div> {product?.packaging}  </div>
                              <div>{lang === 'gj' ? product?.packagingtype?.type_guj :   product?.packagingtype?.type_eng}    </div>
                            </span>
                          </div>

                      <div className="block w-full  font-heading font-semibold text-[16px] leading-[25px] capitalize text-[#222222] mb-1 cursor-pointer" >Rs. {product?.price} </div>

                      <div className="flex items-center justify-between">
                          {!cartItem &&(
                            <div className="flex items-center border border-[#E2E2E2] rounded w-[85px] overflow-hidden">
                              <button onClick={() => decrementQty(product._id)} className="w-[26px] h-[26px] text-center bg-white border-r border-[#E2E2E2] text-[#222222]"> − </button>
                              <input id="quantity"  value={productQuantities[product._id] || 1}  type="text" defaultValue="1" className="w-[28px] text-center border-none m-0 p-0 focus:outline-none" />
                              <button   onClick={() => incrementQty(product._id)} className="w-[26px] h-[26px] text-center bg-white border-l border-[#E2E2E2] text-[#222222]"> + </button>
                            </div>
                          )}

                            {cartItem ? 
                                <button className="text-red-600 px-4 py-2 text-md flex items-end ml-[7rem] rounded-full justify-end border border-[#d8d8d8] hover:bg-red-100 transition-all duration-300 mt-4" onClick={() => removeFromCart(product?._id)} > {t("remove_from_cart")} </button>
                            :  <button className="text-gray-50 px-4 py-2 text-md flex items-center gap-1 rounded-full flex items-center justify-center bg-green-600 border border-[#d8d8d8] hover:bg-green-500 hover:text-white transition-all duration-300" onClick={() => AddCall(product)}>{t("add_to_cart")} <FaCartShopping />  </button>
                            }
                      </div>
                    </div>
                    )
                  })}
                </div>
              </div>
            </div>
          }
    </>
  )
}

export default ProductDetailsSection