import React, { lazy, Suspense, useEffect, useState } from 'react'
import PopularSearches from '../../component/PopularProduct/PopularProduct'
import GlobalLoader from '../../component/Loader/Loader'
import useLazyLoad from '../../hooks/useLazyLoad';
const BannerSection = lazy(() => import('../../component/Banner/Banner'));
const About = lazy(() => import('../../component/About/About'));
const CategoryCarouselSection = lazy(() => import('../../component/Category/Category'));
const BestSellingProductSection = lazy(() => import('../../component/BestSellingProduct/BestSellingProduct'));
const DiscountBannerSection = lazy(() => import('../../component/DiscountBanner/DiscountBanner'));
const BrandCarouselSection = lazy(() => import('../../component/Brand/Brand'));
const PopularProductSection = lazy(() => import('../../component/PopularProduct/PopularProduct'));
const PromoBannerSection = lazy(() => import('../../component/PromotionBanner/PromotionBanner'));
const TestimonailSection = lazy(() => import('../../component/Testimonial/Testimonail'));
const FAQSection = lazy(() => import('../../component/FAQ/FAQ'));
// const LookingForSection = lazy(() => import('../../component/Looking/LookingFor')); // optional

const HomeSection = () => {

  const { ref: bannerRef, isVisible: showBanner } = useLazyLoad();
  const { ref: aboutRef, isVisible: showAbout } = useLazyLoad();
  const { ref: categoryRef, isVisible: showCategory } = useLazyLoad();
  const { ref: bestRef, isVisible: showBest } = useLazyLoad();
  const { ref: discountRef, isVisible: showDiscount } = useLazyLoad();
  const { ref: brandRef, isVisible: showBrand } = useLazyLoad();
  const { ref: popularRef, isVisible: showPopular } = useLazyLoad();
  const { ref: promoRef, isVisible: showPromo } = useLazyLoad();
  const { ref: testimonialRef, isVisible: showTestimonial } = useLazyLoad();
  // const { ref: faqRef, isVisible: showFAQ } = useLazyLoad();

  const [modal, setModal] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("homeModalShown");
    if (!hasShown) {
      setTimeout(() => setModal(true), 5000);
      sessionStorage.setItem("homeModalShown", "true");
    }
  }, []);

    const OpenBrochure = () => {
    window.open("/pdf/brochure.pdf", "_blank");
  };

  return (
    <div>
      <Suspense fallback={<GlobalLoader />}>
        <div className="flex flex-col space-y-8">
          <div ref={bannerRef}>{showBanner && <BannerSection />}</div>
          <div ref={aboutRef}>{showAbout && <About />}</div>
          <div ref={categoryRef}>{showCategory && <CategoryCarouselSection />}</div>
          <div ref={bestRef}>{showBest && <BestSellingProductSection />}</div>
          <div ref={discountRef}>{showDiscount && <DiscountBannerSection />}</div>
          <div ref={brandRef}>{showBrand && <BrandCarouselSection />}</div>
          <div ref={popularRef}>{showPopular && <PopularProductSection />}</div>
          <div ref={promoRef}>{showPromo && <PromoBannerSection />}</div>
          <div ref={testimonialRef}>{showTestimonial && <TestimonailSection />}</div>
          {/* <div ref={faqRef}>{showFAQ && <FAQSection />}</div> */}
        </div>
      </Suspense>

      {modal && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-3xl p-8 text-center relative animate-fadeIn">
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* --- Left Section --- */}
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <svg   className="w-8 h-8 text-blue-600"  fill="none"  stroke="currentColor"  strokeWidth={2}  viewBox="0 0 24 24"  >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 14.828a4 4 0 01-5.656-5.656m7.07-1.414a4 4 0 010 5.656M15 10h6m0 0v6m0-6l-8 8" />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold mb-2 text-gray-800"> Visit Current Website </h2>
          <p className="text-gray-500 mb-6 max-w-sm"> This will open the selected website in a new browser tab.  </p>
          <button onClick={() => { setModal(false);  }}  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"  >   Visit Website  </button>
        </div>

        {/* --- Divider Line --- */}
        <div className="hidden md:block w-px h-40 bg-gray-300"></div>
        <div className="block md:hidden w-40 h-px bg-gray-300 my-4"></div>

        {/* --- Right Section --- */}
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-red-100 p-4 rounded-full mb-4">
           <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" >
              <path strokeLinecap="round"  strokeLinejoin="round"  d="M7 2h7l6 6v14a1 1 0 01-1 1H7a1 1 0 01-1-1V3a1 1 0 011-1z" />
              <path strokeLinecap="round"  strokeLinejoin="round"  d="M14 2v6h6" />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold mb-2 text-gray-800">   Download Brochure </h2>
          <p className="text-gray-500 mb-6 max-w-sm">   This will take you to the official browser download page. </p>
          <button onClick={OpenBrochure}   className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition" >   Download Brochure</button>
        </div>
      </div>


    </div>
  </div>
)}


    </div>
     
  )
}

export default HomeSection