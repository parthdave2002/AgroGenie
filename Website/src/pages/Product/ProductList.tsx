import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToastMessage from '../../component/ToastMessage';
import GlobalLoader from '../../component/Loader/Loader';
import {  getProductlist } from '../../Store/actions';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate, useParams } from 'react-router-dom';
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaCartShopping } from 'react-icons/fa6';
import { CartItemProps, ProductDetails } from 'types/types';
import { toast } from 'react-toastify';


/* -------------------- Types -------------------- */
interface ProductName {
  englishname: string;
}

interface Category{
  name_eng: string
}

interface Company{
  name_eng : string
}

interface PackingType {
  type_eng : string;
}

interface Product {
  _id: string;
  product_pics: string[];
  name: ProductName;
  categories : Category;
  company : Company;
  packagingtype : PackingType;
  avl_qty: string;
  packaging: number;
  rating: number;
  price: string;
}


const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams()
    const [is_loader, set_is_loader] = useState(false);
    const [productList, setProductList] = useState<ProductDetails[]>([])
    const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
    const [productQuantities, setProductQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      set_is_loader(true);
        let requser={
            category : params?.['id']
        }
      dispatch(getProductlist(requser));
    } else {
      console.warn("Wrong route params");
    }
  }, [params, dispatch]);

    const productListData: any = useSelector((state: any) => state.Product.Productlist);

    useEffect(() => {
         set_is_loader(false);
        setProductList(productListData?.data)
    }, [productListData])

      const goToDetails = useCallback(
        (id: string) => navigate(`/product-detail/${id}`),
        [navigate]
      );
    

      /* -------------------- Swiper Config -------------------- */
      const swiperConfig = useMemo(
        () => ({
          modules: [Navigation, Autoplay],
          slidesPerView: 1,
          spaceBetween: 16,
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
        }),
        []
      );

        const AddCall = (item: ProductDetails) => {
          set_is_loader(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
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

        const removeFromCart = (productId: string) => {
          set_is_loader(true);
          const updatedCart = cartItems.filter((item: any) => item._id !== productId);
          setCartItems(updatedCart);
          localStorage.setItem("product", JSON.stringify(updatedCart));
          window.dispatchEvent(new Event("cartChanged"));

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

  return (
    <div>
              {is_loader ?   <GlobalLoader /> : 
                  <section  className=" relative  py-10  bg-White  bg-[url('/images/ad-bg-pattern.png')]  bg-repeat bg-[length:600px_600px] ">
                      <div className="flex flex-col space-y-8 relative z-10">
                          <div className=" max-w-1600 mx-auto px-4">
                              <h2 className="text-4xl md:text-5xl font-bold font-heading text-DarkBackground my-5 flex justify-center  gap-x-2"> Product List of  <span className="text-lime-500">  {params?.['name']} </span> </h2>
                                {productList?.length === 0 ? (
                                  <div className="text-center py-10 text-SharkGray text-lg font-medium">
                                    No items found
                                  </div>
                                ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {productList?.map((product: any, k: number) => {
                                          const cartItem = cartItems.find((item: any) => item._id === product._id);
                                          return (
                                            <article key={product._id} className="group relative bg-White rounded-2xl border border-TitaniumWhite shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden" >
                                              <figure className="bg-White p-4">
                                                <Swiper {...swiperConfig}>
                                                  {product.product_pics?.map((img: any, index: number) => (
                                                    <SwiperSlide key={index}>
                                                      <LazyLoadImage src={img} effect="blur" alt={product?.name?.englishname} className="mx-auto h-[200px] object-contain transition-transform duration-300 " />
                                                    </SwiperSlide>
                                                  ))}
                                                </Swiper>
                                              </figure>

                                              {/* Content */}
                                              <div className="p-4 space-y-3">
                                                <h3 className="text-[15px] font-semibold text-Cosmos text-center truncate cursor-pointer hover:text-green-600 transition" onClick={() => goToDetails(product._id)} title={product?.name?.englishname} >
                                                  {product?.name?.englishname.toUpperCase()}
                                                </h3>

                                                {/* Meta Info */}
                                                <div className="text-sm text-Hydrocarbon space-y-1">
                                                  <p className="flex justify-between">
                                                    <span className="font-medium">Category</span>
                                                    <span className="truncate">{product?.categories?.name_eng}</span>
                                                  </p>

                                                  <p className="flex justify-between">
                                                    <span className="font-medium">Company</span>
                                                    <span className="truncate">{product?.company?.name_eng}</span>
                                                  </p>

                                                  <p className="flex justify-between">
                                                    <span className="font-medium">Packing</span>
                                                    <span> {product?.packaging} {product?.packagingtype?.type_eng}  </span>
                                                  </p>
                                                </div>

                                                {/* CTA */}
                                                {/* <button onClick={() => goToDetails(product?._id)} className="w-full mt-3 py-2 text-sm font-semibold text-White bg-green-600 rounded-xl hover:bg-green-700 transition"  > View Details  </button> */}

                                                <div className="flex items-center justify-between">
                                                  {!cartItem && (
                                                    <div className="flex items-center border border-[#E2E2E2] rounded w-[85px] overflow-hidden">
                                                      <button onClick={() => decrementQty(product._id)} className="w-[26px] h-[26px] text-center bg-White border-r border-[#E2E2E2] text-[#222222]"> − </button>
                                                      <input id="quantity" value={productQuantities[product._id] || 1} type="text" defaultValue="1" className="w-[28px] text-center border-none m-0 p-0 focus:outline-none" />
                                                      <button onClick={() => incrementQty(product._id)} className="w-[26px] h-[26px] text-center bg-White border-l border-[#E2E2E2] text-[#222222]"> + </button>
                                                    </div>
                                                  )}

                                                  {cartItem ?
                                                    <button className="text-red-600 px-4 py-2 text-md flex items-end ml-[7rem] rounded-full justify-end border border-[#d8d8d8] hover:bg-red-100 transition-all duration-300 mt-4" onClick={() => removeFromCart(product?._id)} > Remove from cart </button>
                                                    : <button className="text-White px-4 py-2 text-md flex items-center gap-1 rounded-full flex items-center justify-center bg-gradient-to-r from-green-700 to-lime-500 hover:scale-105 border border-[#d8d8d8] hover:bg-green-500 hover:text-White transition-all duration-300" onClick={() => AddCall(product)}> Add to Cart <FaCartShopping />  </button>
                                                  }
                                                </div>

                                              </div>
                                            </article>
                                          )
                                        })}
                                </div>
                                )}
                          </div>
                            <ToastMessage />
                      </div>
                  </section>
                }
    
          </div>
  )
}

export default ProductList