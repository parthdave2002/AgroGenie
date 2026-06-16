import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { getTestimoniallist } from "../../Store/actions";

interface Testimonial {
  id: string;
  name_eng: string;
  village_eng: string;
  body_eng: string;
  testimonial_pic: string;
  rating: number;
}

const TestimonialSection: React.FC = () => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
         if (!entry) return;

       if (entry.isIntersecting && !hasFetched) {
          dispatch(getTestimoniallist());
         setHasFetched(true);
       }
     },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [dispatch]);

  const testimonials: Testimonial[] = useSelector(
    (state: any) => state.Testimonial.Testimoniallist
  );

  const swiperConfig = useMemo(
    () => ({
      modules: [Autoplay],
      autoplay: { delay: 5000, disableOnInteraction: false },
      loop: true,
      spaceBetween: 30,
      slidesPerView: 1,
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    }),
    []
  );

  return (
    <section className="py-10" ref={ref}>
      <div className="max-w-1600 mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-DarkBackground my-5 text-center">  Farmer <span className="text-lime-500">Testimonial</span>  </h2>

        <div className="max-w-7xl mx-auto md:px-4 pt-6">
          <Swiper {...swiperConfig}>
            {testimonials?.map((testimonial) => (
              <SwiperSlide key={testimonial?.id}>
                <div className="bg-[#e2f7e5] h-full flex flex-col justify-between p-6 rounded-2xl min-h-[18rem] max-h-[18rem] shadow-md shadow-green-100 font-body transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <LazyLoadImage effect="blur" src={testimonial?.testimonial_pic}  alt={testimonial?.name_eng}   className="w-14 h-14 rounded-full object-cover border border-green-500" />
                    <div>
                      <h4 className="text-lg text-DarkBackground">  {testimonial?.name_eng} </h4>
                      <p className="text-sm text-SharkGray">  {testimonial?.village_eng}  </p>
                    </div>
                  </div>

                  {/* Body */}
                  <p className="text-TranquilBlack text-base leading-relaxed mb-4 line-clamp-5">
                    <span className="text-2xl text-green-500 mr-1">“</span>
                    {testimonial?.body_eng}
                  </p>

                  {/* Rating */}
                  <div className="flex">
                    {[...Array(5)].map((_, i) =>
                      i < testimonial.rating ? (
                        <FaStar key={i} className="text-green-500" />
                      ) : (
                        <FaRegStar key={i} className="text-SoothingBlueGrey" />
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
  );
};

export default TestimonialSection;