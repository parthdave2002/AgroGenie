import React, { useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from "react-i18next";
import Marquee from "react-fast-marquee";



const BrandCarouselSection: React.FC = () => {

  const brandData = useMemo(() => [
  { img: 'images/company/GemOne.webp', subtitle: 'Gem One'},
], []);
  
  const { t } = useTranslation();
  return (
    <section className="py-5  overflow-hidden">

      <div className="max-w-1600 mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center ">
          <h2 className="text-2xl md:text-3xl font-semibold">{t("Our Seeds")}</h2>
          <div className="w-full overflow-hidden bg-white py-4">
            <Marquee loop={0} speed={30} pauseOnClick={true} autoFill={true}>
              {brandData.map((item, index) => (
                <div key={index} className="flex-shrink-0   w-24 md:w-36 mx-10 flex items-center text-center justify-center">
                  <div className='flex flex-col '>
                    <LazyLoadImage effect="blur" src={item.img}  className="h-[13rem] w-[13rem] object-contain "   />
                    <h3 className="text-base font-semibold text-gray-900 mt-2 leading-tight">{item.subtitle}</h3>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCarouselSection;
