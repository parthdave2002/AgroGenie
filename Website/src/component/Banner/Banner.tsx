import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay   } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import {getBannerlist} from "../../Store/actions";
// const IMG_URL = import.meta.env["VITE_API_URL"];
const IMG_URL = import.meta.env.VITE_API_URL; 


const BannerSection: React.FC = () => {

  const dispatch = useDispatch(); 
  const [bannerSlides, setbannerSlides] = useState([]); 
  useEffect(() => { dispatch(getBannerlist()) }, []); 

  // ------------- Get data from redux code start ------------- 
  const bannerdetail :any = useSelector((state:any) => state.Banner.Bannerlist); 
  useEffect(() => { 
    if (bannerdetail) { 
      setbannerSlides(bannerdetail); 
    }
  }, [bannerdetail]); 
  // ------------- Get data from redux code end -------------

  return (
     <section className=" bg-[url('/images/background-pattern.jpg')] bg-no-repeat bg-cover ">
      <div className="max-w-7xl mx-auto  grid grid-cols-1 ">
        <div className="z-6">
          <Swiper   modules={[ Pagination, Scrollbar, A11y, Autoplay ]}  spaceBetween={50}   autoplay={{ delay: 5000, disableOnInteraction: false }}   loop className="rounded-xl overflow-hidden" >
            {bannerSlides.map((item:any, i:number) => (
                <SwiperSlide>
                    {/* <div className="flex flex-col md:flex-row items-center bg-[#eaf5f7] rounded-xl p-6 md:p-10  z-1">
                        <div className="md:w-1/2 space-y-4">
                            <span className="text-yellow-600 text-lg font-semibold">{item?.category}</span>
                            <h2 className="text-3xl md:text-[3.5rem] leading-[4rem] font-heading font-bold text-gray-800">{item.title}</h2>
                            <p className="text-gray-600"> {item.description} </p>
                            <button className="mt-4 border border-gray-800 text-gray-800 px-6 py-2 uppercase text-sm rounded hover:bg-gray-800 hover:text-white transition"> Shop Now </button>
                        </div>
                        <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
                            <img src={item.img} alt="Smoothie Bottle" className="h-[30rem] object-contain" />
                        </div>
                    </div> */}
                       <img src={  `${IMG_URL}/public/banner/${item?.banner_pic}`}  key={i} alt={item?.banner_pic} className="object-contain z-6" />
                </SwiperSlide>
            ))}
          </Swiper>
        </div>

      
      </div>
    </section>
  );
};

export default BannerSection;
