import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductlist } from '../../../Store/actions';

/* ---------- Types ---------- */
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

/* ---------- Swiper Config ---------- */
const swiperConfig = {
  modules: [Navigation, Autoplay],
  spaceBetween: 16,
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
};

const BestSellingProductSection: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [productList, setProductList] = useState<Product[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

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
             isBestSelling: true
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

  return (
    <section className="py-10 overflow-hidden" ref={ref}>
      <div className="max-w-1600 mx-auto px-4">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center my-6 font-heading">  Our Best <span className="text-lime-500 ">Selling Product</span> </h2>

        {/* Products */}
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

export default BestSellingProductSection;