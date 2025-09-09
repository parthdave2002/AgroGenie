import React, { useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from "react-i18next";
import Marquee from "react-fast-marquee";



const BrandCarouselSection: React.FC = () => {

  const brandData = useMemo(() => [
  { img: 'images/company/1_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/2_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/3_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/4_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/5_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/6_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/7_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/8_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/9_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/10_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/11_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/12_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/13_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/14_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/15_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/16_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/17_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/18_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/19_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/20_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/21_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/22_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/23_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/24_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/25_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/26_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/27_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/28_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/29_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/30_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/31_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/32_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/33_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/34_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/35_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/36_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/37_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/38_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/39_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/40_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/41_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/42_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/43_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/44_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/45_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/46_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/47_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/48_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/49_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/50_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/51_result.webp', subtitle: 'Gem One'},
  { img: 'images/company/52_result.webp', subtitle: 'Gem One'},
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
