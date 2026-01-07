import React, { lazy, Suspense, useEffect, useState } from 'react'
import GlobalLoader from '../../component/Loader/Loader'
import BannerSection from '../../component/Home/Banner/Banner';
const About = lazy(() => import('../../component/Home/About/About'));
const CategoryCarouselSection = lazy(() => import('../../component/Home/Category/Category'));
const BestSellingProductSection = lazy(() => import('../../component/Home/BestSellingProduct/BestSellingProduct'));
const DiscountBannerSection = lazy(() => import('../../component/Home/DiscountBanner/DiscountBanner'));
const BrandCarouselSection = lazy(() => import('../../component/Home/Brand/Brand'));
const PopularProductSection = lazy(() => import('../../component/Home/PopularProduct/PopularProduct'));
const PromoBannerSection = lazy(() => import('../../component/PromotionBanner/PromotionBanner'));
const TestimonailSection = lazy(() => import('../../component/Testimonial/Testimonail'));
// const LookingForSection = lazy(() => import('../../component/Looking/LookingFor')); // optional

const HomeSection = () => {
  const [modal, setModal] = useState(false);

useEffect(() => {
  const hasShown = sessionStorage.getItem("homeModalShown");

  let timer: number | undefined;

  if (!hasShown) {
    timer = window.setTimeout(() => {
      setModal(true);
      sessionStorage.setItem("homeModalShown", "true");
    }, 5000);
  }

  return () => {
    if (timer) clearTimeout(timer);
  };
}, []);


  const OpenBrochure = () => {
    window.open("/pdf/brochure.pdf", "_blank");
  };

  return (
    <div>

      <section  className=" relative  py-10  bg-gray-50  bg-[url('/images/ad-bg-pattern.png')]  bg-repeat bg-[length:600px_600px] ">
        <div className="flex flex-col space-y-8 relative z-10">
        
          <BannerSection />
          <About />
          <CategoryCarouselSection />
          <BestSellingProductSection />
          <DiscountBannerSection />
          {/* <BrandCarouselSection /> */}
          <PopularProductSection />
          <PromoBannerSection />
          <TestimonailSection />
        </div>
        </section>


      {modal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-3xl p-8 text-center relative animate-fadeIn">

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* --- Left Section --- */}
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 14.828a4 4 0 01-5.656-5.656m7.07-1.414a4 4 0 010 5.656M15 10h6m0 0v6m0-6l-8 8" />
                  </svg>
                </div>

                <h2 className="text-2xl font-semibold mb-2 text-gray-800"> Visit Current Website </h2>
                <p className="text-gray-500 mb-6 max-w-sm"> This will open the selected website in a new browser tab.  </p>
                <button onClick={() => setModal(false)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"  >   Visit Website  </button>
              </div>

              {/* --- Divider Line --- */}
              <div className="hidden md:block w-px h-40 bg-gray-300"></div>
              <div className="block md:hidden w-40 h-px bg-gray-300 my-4"></div>

              {/* --- Right Section --- */}
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-red-100 p-4 rounded-full mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 2h7l6 6v14a1 1 0 01-1 1H7a1 1 0 01-1-1V3a1 1 0 011-1z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
                  </svg>
                </div>

                <h2 className="text-2xl font-semibold mb-2 text-gray-800">   Download Brochure </h2>
                <p className="text-gray-500 mb-6 max-w-sm">   This will take you to the official browser download page. </p>
                <button onClick={OpenBrochure} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition" >   Download Brochure</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default HomeSection