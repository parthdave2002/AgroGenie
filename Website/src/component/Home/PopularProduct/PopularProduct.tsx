import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getProductlist } from "../../../Store/actions";

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


/* -------------------- Component -------------------- */
const PopularProductSection: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [productList, setProductList] = useState<Product[]>([])
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

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

  /* -------------------- Handlers -------------------- */
  const goToDetails = useCallback(
    (id: string) => navigate(`/product-detail/${id}`),
    [navigate]
  );

  useEffect(() =>{
   const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
         if (!entry) return;

       if (entry.isIntersecting && !hasFetched) {
         let requser = {
           isMostpopular: true
         }
         dispatch(getProductlist(requser))
         setHasFetched(true);
       }
     },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  },[dispatch])

    const productListData: any = useSelector((state: any) => state.Product.Productlist);

    useEffect(() => {
        setProductList(productListData?.data)
    }, [productListData])

  /* -------------------- JSX -------------------- */
  return (
    <section className="py-10 overflow-hidden" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-heading font-bold"> Our Most <span className="text-lime-500">Popular Products</span>  </h2>
        </div>

        {/* Product Grid */}
        {/* <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productList && productList.map(product => (
            <article key={product._id} className="relative p-4 bg-white shadow-md rounded-2xl mb-7 hover:shadow-lg transition-shadow">
              <figure className="bg-white rounded-xl text-center mb-4">
                <Swiper {...swiperConfig}>
                  {product.product_pics.map((img, index) => (
                    <SwiperSlide key={index}>
                      <LazyLoadImage src={img} effect="blur" alt={product?.name?.englishname} className="mx-auto max-h-[210px] object-contain" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </figure>

              <div className="text-center"> <h3 className="font-semibold text-[16px] truncate cursor-pointer text-uppercase my-3" onClick={() => goToDetails(product?._id)} > {product?.name?.englishname.toUpperCase()} </h3> </div>
              <div className=" items-center text-md space-y-1">
                <div className="text-gray-700 font-body font-semibold">  Category :  <span > {product?.categories?.name_eng} </span> </div>
                <div className="text-gray-700 font-body font-semibold"> Company :  <span > {product?.company?.name_eng} </span></div>
                <div className="text-gray-700 font-body font-semibold"> Packing :  <span > {product?.packaging} {product?.packagingtype?.type_eng} </span></div>
              </div>
            </article>
          ))}
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productList?.map((product) => (
            <article key={product._id} className="group relative bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden" >
              <figure className="bg-gray-50 p-4">
                <Swiper {...swiperConfig}>
                  {product.product_pics?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <LazyLoadImage src={img} effect="blur" alt={product?.name?.englishname} className="mx-auto h-[200px] object-contain transition-transform duration-300 group-hover:scale-105" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </figure>

              {/* Content */}
              <div className="p-4 space-y-3">
                <h3 className="text-[15px] font-semibold text-gray-800 text-center truncate cursor-pointer hover:text-green-600 transition" onClick={() => goToDetails(product._id)} title={product?.name?.englishname} >
                  {product?.name?.englishname.toUpperCase()}
                </h3>

                {/* Meta Info */}
                <div className="text-sm text-gray-600 space-y-1">
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
                <button onClick={() => goToDetails(product?._id)} className="w-full mt-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 transition"  > View Details  </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularProductSection;