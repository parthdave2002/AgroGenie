import React, { useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import {getBannerlist} from "../../../Store/actions";

const BannerSection: React.FC = () => {

  const dispatch = useDispatch(); 
  useEffect(() => { dispatch(getBannerlist()) }, []); 

  // ------------- Get data from redux code start ------------- 
  const bannerdetail: any = useSelector((state: any) => state.Banner.Bannerlist);

  const allBanners = useMemo(() => {
    return bannerdetail && bannerdetail
      .filter((item: any) => item.is_active)
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0)); // optional sorting by order if you have one
  }, [bannerdetail]);

  // ------------- Get data from redux code end -------------

  const convertYoutubeURL = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const Itemcall = (data: string) =>{
      if (data) {
        window.open(data, "_blank");
      }
  }

  return (

      <div className="max-w-7xl mx-auto grid grid-cols-1">
        <div className="z-6">
          <Swiper modules={[A11y, Autoplay]} spaceBetween={50} pagination={{ clickable: true }} scrollbar={{ draggable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }} loop={allBanners && allBanners.length > 1} className="rounded-xl overflow-hidden" >
            {allBanners && allBanners.map((item: any, i: number) => (
              <SwiperSlide key={item._id || i} data-swiper-autoplay={item.banner_duration || 5000} >
                {item.banner_type === 'image' && (
                  <img src={item?.banner_pic} alt={item?.name} className="object-contain w-full h-[450px]" onClick={() => Itemcall(item?.banner_URL) } />
                )}

                {item.banner_type === 'video' && (
                  <video className="w-full h-[450px]" autoPlay loop muted playsInline controls={false} >
                    <source src={item.banner_pic} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                {item.banner_type === 'youtube' && (
                  <iframe className="w-full h-[450px]" src={convertYoutubeURL(item?.banner_URL)} title={item?.name} allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
  );
};

export default BannerSection;