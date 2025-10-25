import React from 'react'
import { FaQuoteLeft, FaQuoteRight, FaRegStar, FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
interface Testimonial {
  name: string;
  position: string;
  message: string;
  image: string;
  rating : number;
}

const TestimonailSection = () => {
 const { t } = useTranslation();
  const testimonials: Testimonial[] = [
    {
      name: 'testimonial1.name',
      position: 'testimonial1.village',
      message:'testimonial1.message',
      image: '/images/farmer/1.webp',
      rating: 4,
    },
    {
      name: 'testimonial2.name',
      position: 'testimonial2.village',
      message:'testimonial2.message',
      image: '/images/farmer/2.webp',
      rating: 5,
    },
    {
      name: 	"testimonial3.name",
      position:  'testimonial3.village',
      message : 'testimonial3.message',
      image: '/images/farmer/3.webp',
       rating: 5,
    },
    {
      name: 'testimonial4.name',
      position:  'testimonial4.village',
      message:'testimonial4.message',
      image: '/images/farmer/4.webp',
       rating: 5,
    },
    {
      name: 	"testimonial5.name",
      position:  'testimonial5.village',
      message : 'testimonial5.message',
      image: '/images/farmer/5.webp',
       rating: 4,
    },
    {
      name: 'testimonial6.name',
      position: 'testimonial6.village',
      message:"testimonial6.message",
      image: '/images/farmer/6.webp',
       rating: 5,
    },
        {
      name: 'testimonial7.name',
      position: 'testimonial7.village',
      message:"testimonial7.message",
      image: '/images/farmer/7.webp',
       rating: 5,
    },
        {
      name: 'testimonial8.name',
      position: 'testimonial8.village',
      message:"testimonial8.message",
      image: '/images/farmer/8.webp',
       rating: 5,
    },
        {
      name: 'testimonial9.name',
      position: 'testimonial9.village',
      message:"testimonial9.message",
      image: '/images/farmer/9.webp',
       rating: 5,
    },
        {
      name: 'testimonial10.name',
      position: 'testimonial10.village',
      message:"testimonial10.message",
      image: '/images/farmer/10.webp',
       rating: 5,
    },
  ];

  return (
    <section className="py-5">
      <div className="max-w-1600 mx-auto px-4">
        <h2 className="md:text-[2rem] text-[1.5rem]  font-heading font-semibold my-5"> {t("Farmer Testimonial")}</h2>

         <div className="max-w-7xl mx-auto md:px-4 pt-6">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            >
              {testimonials.map((testimonial: any, index: number) => (
                <SwiperSlide key={index}>
                  <div className="bg-[#e2f7e5] h-full flex flex-col justify-between p-6 transition-transform duration-300 hover:scale-105 rounded-2xl min-h-[18rem] max-h-[18rem]">
                    <div className="flex items-center gap-4 mb-4">
                      <LazyLoadImage   effect="blur"  src={testimonial?.image} alt={testimonial?.name} className="w-14 h-14 rounded-full object-cover border border-green-500"   />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{t(testimonial?.name)}</h4>
                        <p className="text-sm text-gray-500">{t(testimonial?.position)}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 text-base leading-relaxed mb-4 line-clamp-5">
                      <span className="text-2xl text-green-500 leading-none mr-1">“</span>
                       {t(testimonial?.message)}
                    </p>

                    <div className="flex">
                      {[...Array(5)].map((_, i) =>
                        i < testimonial.rating ? (
                          <FaStar key={i} className="text-green-500" />
                        ) : (
                          <FaRegStar key={i} className="text-gray-300" />
                        )
                      )}
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