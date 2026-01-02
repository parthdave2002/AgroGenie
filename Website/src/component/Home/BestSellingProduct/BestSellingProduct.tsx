// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay } from 'swiper/modules';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { useNavigate } from 'react-router-dom';

// const products: any[] = [
//   {
//     id: "6862a4563ca787accd907b7f",
//     image: ['/images/product/areva1.webp'],
//     title: 'Areva',
//     quantity: '250 Gram',
//     rating: 4.5,
//     price: '500',
//   },
//   {
//     id: "6872596422256079e7dce566",
//     image: ['/images/product/tataBahar1.webp'],
//     title: 'Tata Bahar',
//     quantity: '250 ML',
//     rating: 4.5,
//     price: '500',
//   },
//   {
//     id: "68736b7b2ac170b904090ff0",
//     image: ['/images/product/meghaTorch.jpg'],
//     title: 'Megha Torch',
//     quantity: '1 Piece',
//     rating: 4.5,
//     price: '359',
//   },
//   {
//     id: "68737b492ac170b904091386",
//     image: ['/images/product/suketuBajara.webp'],
//     title: 'Suketu 101 Bajara',
//     quantity: '1 Unit',
//     rating: 4.5,
//     price: '18',
//   },
//   {
//     id: "6862a4563ca787accd907b7f",
//     image: ['/images/product/areva1.webp'],
//     title: 'Areva',
//     quantity: '250 Gram',
//     rating: 4.5,
//     price: '500',
//   },
//   {
//     id: "6872596422256079e7dce566",
//     image: ['/images/product/tataBahar1.webp'],
//     title: 'Tata Bahar',
//     quantity: '250 ML',
//     rating: 4.5,
//     price: '500',
//   },
//   {
//     id: "68736b7b2ac170b904090ff0",
//     image: ['/images/product/meghaTorch.jpg'],
//     title: 'Megha Torch',
//     quantity: '1 Piece',
//     rating: 4.5,
//     price: '359',
//   },
//   {
//     id: "68737b492ac170b904091386",
//     image: ['/images/product/suketuBajara.webp'],
//     title: 'Suketu 101 Bajara',
//     quantity: '1 Unit',
//     rating: 4.5,
//     price: '18',
//   },
// ];

// const BestSellingProductSection: React.FC = () => {
//     const navigate = useNavigate()
//     const RedirectCall = (data:string) => {
//       navigate(data)
//     }

//   const DetailspageCall = (id: string | number) => {
//     navigate(`/product-detail/${id}`)
//   }

//   return (
//     <section className="py-10 overflow-hidden">
//       <div className="max-w-1600 mx-auto px-4">
//         <div className=" md:flex justify-center items-center mb-6">
//           <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 my-5 flex justify-center gap-x-3"> Our Best <span className="text-lime-500"> Selling Product</span> </h2>
//         </div>
//            <div className="md:grid  md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-1600">
//           {products.map((product) => (
//             <div key={product.id} className="relative p-4 bg-[#e2f7e5] border border-[#FBFBFB] shadow-[0px_5px_22px_rgba(0,0,0,0.04)] rounded-2xl mb-7 hover:shadow-[0px_21px_44px_rgba(0,0,0,0.08)] transition-shadow duration-300">
//               <figure className="bg-white rounded-[12px] text-center mb-4">
//                 <Swiper modules={[Navigation, Autoplay]} spaceBetween={16} slidesPerView={1} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false, }} >
//                   {product.image.map((img:any, index:any) => (
//                     <SwiperSlide key={index}>
//                       <LazyLoadImage effect="blur" src={img} alt={`Product image ${index + 1}`} className="mx-auto max-h-[210px] h-auto object-contain" />
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//               </figure>
//                   <div className="flex justify-between items-center text-sm ">
//                       <h3 className="block w-full font-heading font-semibold text-[16px] leading-[25px] capitalize text-[#333333] mb-1 cursor-pointer truncate max-w-[11rem]" onClick={() => DetailspageCall(product?.id)}> {product?.title} </h3>
//                       <span className="font-normal font-heading text-[1rem] leading-[18px] flex gap-x-1">
//                         <div> {product?.quantity}  </div>
//                       </span>
//                   </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BestSellingProductSection;


import React, { useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';

/* ---------- Types ---------- */
interface Product {
  id: string;
  image: string[];
  title: string;
  quantity: string;
  rating: number;
  price: string;
}

/* ---------- Static Data ---------- */
const PRODUCTS: Product[] = [
  {
    id: '6862a4563ca787accd907b7f',
    image: ['/images/product/areva1.webp'],
    title: 'Areva',
    quantity: '250 Gram',
    rating: 4.5,
    price: '500',
  },
  {
    id: '6872596422256079e7dce566',
    image: ['/images/product/tataBahar1.webp'],
    title: 'Tata Bahar',
    quantity: '250 ML',
    rating: 4.5,
    price: '500',
  },
  {
    id: '68736b7b2ac170b904090ff0',
    image: ['/images/product/meghaTorch.jpg'],
    title: 'Megha Torch',
    quantity: '1 Piece',
    rating: 4.5,
    price: '359',
  },
  {
    id: '68737b492ac170b904091386',
    image: ['/images/product/suketuBajara.webp'],
    title: 'Suketu 101 Bajara',
    quantity: '1 Unit',
    rating: 4.5,
    price: '18',
  },
];

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

  const goToDetails = useCallback(
    (id: string) => navigate(`/product-detail/${id}`),
    [navigate]
  );

  return (
    <section className="py-10 overflow-hidden">
      <div className="max-w-1600 mx-auto px-4">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center my-6 font-heading">
          Our Best <span className="text-lime-500 ">Selling Product</span>
        </h2>

        {/* Products */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map(product => (
            <article  key={product.id}  className="relative p-4 bg-gray-50 border-0 shadow rounded-2xl mb-7 hover:shadow-lg transition-shadow">
              <figure className="bg-white rounded-xl text-center mb-4">
                <Swiper {...swiperConfig}>
                  {product.image.map((img, index) => (
                    <SwiperSlide key={index}>
                      <LazyLoadImage
                        src={img}
                        effect="blur"
                        alt={product.title}
                        className="mx-auto max-h-[210px] object-contain"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </figure>

              <div className="flex justify-between items-center text-sm">
                <h3
                  className="font-semibold text-[16px] truncate max-w-[11rem] cursor-pointer"
                  onClick={() => goToDetails(product.id)}
                >
                  {product.title}
                </h3>

                <span className="text-gray-700 font-body">{product.quantity}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellingProductSection;