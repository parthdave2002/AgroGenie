import React, { useEffect, useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { getTestimoniallist } from '../../Store/actions';

const TestimonailSection = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getTestimoniallist()) }, []); 

  const [testimonials, setTestimonials] = useState([]);

  // ------------- Get data from redux code start ------------- 
    const testimonialdetail: any = useSelector((state: any) => state.Testimonial.Testimoniallist);

    useEffect(() => {
    setTestimonials(testimonialdetail)
    }, [testimonialdetail]);
  // ------------- Get data from redux code end -------------

  return (
    <section className="py-10">
      <div className="max-w-1600 mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 my-5 flex justify-center "> Farmer <span className="text-lime-500"> Testimonial </span> </h2>
        
         <div className="max-w-7xl mx-auto md:px-4 pt-6">
            <Swiper modules={[Autoplay]} autoplay={{ delay: 5000, disableOnInteraction: false }} loop spaceBetween={30} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}>
              {testimonials && testimonials.map((testimonial: any, index: number) => (
                <SwiperSlide key={index}>
                  <div className="bg-[#e2f7e5] h-full flex flex-col justify-between p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-2xl min-h-[18rem] max-h-[18rem] shadow-md shadow-green-100 font-body">
                    <div className="flex items-center gap-4 mb-4 ">
                      <LazyLoadImage effect="blur" src= {testimonial?.testimonial_pic} alt={testimonial?.name} className="w-14 h-14 rounded-full object-cover border border-green-500"   />
                      <div>
                        <h4 className="text-lg  text-gray-900">{t(testimonial?.name_eng)}</h4>
                        <p className="text-sm text-gray-500">{t(testimonial?.village_eng)}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 text-base leading-relaxed mb-4 line-clamp-5">
                      <span className="text-2xl text-green-500 leading-none mr-1">“</span>
                       {t(testimonial?.body_eng)}
                    </p>

                    <div className="flex">
                      {[...Array(5)].map((_, i) => i < testimonial.rating ? ( <FaStar key={i} className="text-green-500" /> ) : ( <FaRegStar key={i} className="text-gray-300" /> ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
      </div>
    </section>
  )
}

export default TestimonailSection