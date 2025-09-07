import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { FaCartShopping } from 'react-icons/fa6';
import { toast, ToastContainer } from "react-toastify";
import { getProductlist, GetProductViewlist } from '../../Store/Product/action';
import { useLocation, useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CartItemProps, Product, ProductDetails } from '../../types/types';
import { useTranslation } from "react-i18next";
import GlobalLoader from '../../component/Loader/Loader';
// const IMG_URL = import.meta.env["VITE_API_URL"];
const IMG_URL = import.meta.env.VITE_API_URL; 

const ProductSection = () => {
  const [is_loader, set_is_loader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { t } =useTranslation();
  const location = useLocation();

  const currentLang = i18n.language;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth"});
  }, [])

  const isFetchingRef = useRef(false); 
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() =>{
    if (!hasMore || isFetchingRef.current) return;
    isFetchingRef.current = true;
    let requser = { page : page, size : 12  }
    dispatch(getProductlist(requser))
    set_is_loader(true);
  },[page])

  // -------- Category Data code start --------------
  const [CurrentCategory, setCurrentCategory] = useState("");
  const handleDropdownChange = (data: string) =>{
    set_is_loader(true)
    setCurrentCategory(data)
    setSearchData("")
  }

   useEffect(() => {
    set_is_loader(true);
    const data = location.state?.filter;
    if (data) {
       const categoryKeyToLabelMap: Record<string, string> = {
          "category.plant_protection": "Crop Protection",
          "category.plant_nutrition": "Crop Nutrition",
          "category.fertilizer": "Fertilizer",
          "category.seed": "Seeds",
          "category.hardware": "Hardware",
          "category.animal_husbandry": "Animal Husbandry",
        };
           
    const readableCategory = categoryKeyToLabelMap[data];
    setCurrentCategory(readableCategory || "");

    }
  }, []);
  // -------- Category Data code end --------------

  //------------- Get data from redux code start -------------
  const productdetail: any = useSelector((state: any) => state?.Product.Productlist);

  useEffect(() => {
  if (productdetail) {
    if (productdetail.success === true) {
      const newData = productdetail.data || [];
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setProductsList((prev: any) => [...prev, ...newData]);
      }
    } else {
      toast.error(productdetail.msg || "Failed to fetch products.");
    }
    isFetchingRef.current = false;
    set_is_loader(false);
  }
  }, [productdetail]);
  //------------- Get data from redux code end -------------

  // ------------ Details page start --------
    const DetailspageCall = (id:string | number) =>{
        navigate(`/product-detail/${id}`)
    }
  // ------------ Details page end --------

    const [products, setProductsList] = useState<any>([]);
    const [TotalListData, setTotalListData] = useState(0);
    const [CurrentPageNo, setCurrentPageNo] = useState(0);

    const { Productlist,  ProductlistSize, TotalProductData, CurrentPage } = useSelector((state: any) => ({
      Productlist: state.Product.Productlist,
      ProductlistSize: state.Product.ProductlistSize,
      TotalProductData: state.Product.TotalProductData,
      CurrentPage: state.Product.CurrentPage,
    }));

    useEffect(() => {        
      setProductsList(Productlist ? Productlist?.data  :[]);
      setTotalListData(TotalProductData ? TotalProductData : 0);
      setCurrentPageNo(CurrentPage ? CurrentPage : 1);
      set_is_loader(false);
    }, [Productlist,  ProductlistSize, TotalProductData, CurrentPage]);

  // ------------ Add to cart start ----------
    const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
    const [productQuantities, setProductQuantities] = useState<{ [key: string]: number }>({});

    const AddCall = (item: ProductDetails) => {
       window.scrollTo({ top: 0, behavior: "smooth"});
      const quantity = typeof productQuantities[item._id] !== "undefined" ? productQuantities[item._id]  : 1;

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
    const updatedCart = cartItems.filter((item: any) => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("product", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartChanged"));
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

  // ------------ Scroll to load more start ----------
  useEffect(() => {
    set_is_loader(true);
    const handleScroll = () => {
      if (!hasMore || isFetchingRef.current) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 300) {
        isFetchingRef.current = true; // Immediately lock
        setPage((prev) => prev + 1);
      }
    };

    const debounceScroll = () => {
      clearTimeout((handleScroll as any).timer);
      (handleScroll as any).timer = setTimeout(handleScroll, 200);
    };

    window.addEventListener("scroll", debounceScroll);
    return () => window.removeEventListener("scroll", debounceScroll);
  }, [hasMore]);
  // ------------ Scroll to load more end ----------

     const [searchData, setSearchData] = useState("");
  const SearchCall = () =>{
    if (searchData || searchData == "" && !CurrentCategory ) {
      setPage(1);
      setProductsList([]);
      setHasMore(true);
      setCurrentCategory("")
      isFetchingRef.current = true;
      dispatch(getProductlist({ search: searchData, page: 1, size: 12 }));
      set_is_loader(true);
    }
    else if(CurrentCategory){
      setPage(1);
      setProductsList([]);
      setHasMore(true);
      isFetchingRef.current = true;
      dispatch(getProductlist({ search : CurrentCategory ,page: 1, size: 12 }));
      set_is_loader(true);
    }
  }

  useEffect(() => {
set_is_loader(true);
  if (CurrentCategory) {
    SearchCall();
  }
}, [CurrentCategory]);

   return (
    <div >
          {is_loader ?  <GlobalLoader />
              : 
            <div>
              <div className="my-5 w-full flex flex-col items-center">
                <div className="flex w-full max-w-2xl justify-between items-center gap-4">

                  {/* Search Input (left side) */}
                  <div className="flex flex-grow shadow-md rounded-xl overflow-hidden bg-white">
                    <input type="text" placeholder={t("enter_product_name")} className="flex-grow px-4 py-3 text-[18px] font-heading outline-none bg-gray-50" value={searchData} onChange={(e: any) => setSearchData(e.target.value)}  onKeyDown={(e) => {
            if (e.key === "Enter") {
              SearchCall();
            }
          }}/>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 text-[1.1rem] font-heading font-semibold transition" onClick={SearchCall} > {t("search")} </button>
                  </div>

                  <div className="w-48 shadow-md rounded-xl overflow-hidden bg-white border border-gray-200">
                    <select  className="w-full h-full px-4 py-3 text-[18px] font-heading bg-gray-50 outline-none rounded-xl"  value={CurrentCategory} onChange={(e) => handleDropdownChange(e.target.value)}>
                      <option value=""> {t("category.select_category")}</option>
                      <option value="Crop Protection">{t("category.plant_protection")}</option>
                      <option value="Crop Nutrition">{t("category.plant_nutrition")}</option>
                      <option value="Fertilizer">{t("category.fertilizer")}</option>
                        <option value="Seeds">{t("category.seed")}</option>
                      <option value="Hardware">{t("category.hardware")}</option>
                      <option value="Animal Husbandry">{t("category.animal_husbandry")}</option>
                    </select>
                  </div>
                </div>
              </div>

                {Array.isArray(products) && products.length > 0 ? 
                <div className="md:grid  md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-1600">
                  {products && products.map((product:any) => {
                    const cartItem = cartItems.find((item: any) => item._id === product._id);
                    return (
                      <div key={product.id} className="relative p-4 bg-white border border-[#FBFBFB] shadow-[0px_5px_22px_rgba(0,0,0,0.04)] rounded-2xl mb-7 hover:shadow-[0px_21px_44px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                        <figure className="bg-[#F9F9F9] rounded-[12px] text-center mb-4">
                          <Swiper modules={[Navigation, Autoplay]} spaceBetween={16} slidesPerView={1} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false, }} >
                            {product?.product_pics.map((img:any, index:number) => (
                              <SwiperSlide key={index}>
                                <LazyLoadImage effect="blur"  src= {  `${IMG_URL}/public/product/${img}`}  alt={`Product image ${index + 1}`} className="mx-auto max-h-[210px] w-[12rem] h-[12rem] object-contain cursor-pointer"  onClick={() => DetailspageCall(product?._id)} />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </figure>

                        <div className="flex justify-between items-center text-sm ">
                          <h3 className="block w-full font-heading font-semibold text-[16px] leading-[25px] capitalize text-[#333333] mb-1 cursor-pointer truncate max-w-[11rem]" onClick={() => DetailspageCall(product?._id)}> {currentLang === 'gj' ? product?.name?.gujaratiname :   product?.name?.englishname} </h3>
                          <span className="font-normal font-heading text-[1rem] leading-[18px] flex gap-x-1">
                            <div> {product?.packaging}  </div>
                            <div>  {currentLang === 'gj' ? product?.packagingtype?.type_guj :  product?.packagingtype?.type_eng}   </div>
                          </span>
                        </div>
                        <div className="block w-full  font-heading font-semibold text-[16px] leading-[25px] capitalize text-[#222222] mb-1 cursor-pointer" onClick={() => DetailspageCall(product?.id)}>Rs. {product?.price} </div>

                        {/* Quantity Counter & Add to Cart */}
                        <div className="flex items-center justify-between">
                          {!cartItem &&(
                          <div className="flex items-center border border-[#E2E2E2] rounded w-[85px] overflow-hidden">
                            <button  onClick={() => decrementQty(product._id)} className="w-[26px] h-[26px] text-center bg-white border-r border-[#E2E2E2] text-[#222222]"> − </button>
                            <input id="quantity"  value={productQuantities[product._id] || 1} type="text" defaultValue="1" className="w-[28px] text-center border-none m-0 p-0 focus:outline-none" readOnly/>
                            <button  onClick={() => incrementQty(product._id)} className="w-[26px] h-[26px] text-center bg-white border-l border-[#E2E2E2] text-[#222222]"> + </button>
                          </div>
                          )}

                            {cartItem ? 
                                <button className="text-red-600 px-4 py-2 text-md flex items-end ml-[7rem] rounded-full justify-end border border-[#d8d8d8] hover:bg-red-100 transition-all duration-300 mt-4" onClick={() => removeFromCart(product?._id)} >  {t("remove_from_cart")}</button>
                            :  <button className="text-gray-50 px-4 py-2 text-md flex items-center gap-1 rounded-full flex items-center justify-center bg-green-600 border border-[#d8d8d8] hover:bg-green-500 hover:text-white transition-all duration-300" onClick={() => AddCall(product)}> {t("add_to_cart")} <FaCartShopping />  </button>
                            }
                        </div>
                      </div>
                    )}
                  )}
                </div>
                : <div className='text-center text-2xl font-heading flex justify-center my-[6rem]'> <img src='/images/no-product-found.webp' /> </div>}

              <ToastContainer />
            </div>
          }
      </div>
  )
}

export default ProductSection