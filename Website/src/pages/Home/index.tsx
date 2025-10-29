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
  const { ref: faqRef, isVisible: showFAQ } = useLazyLoad();

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
          <div ref={faqRef}>{showFAQ && <FAQSection />}</div>
        </div>
      </Suspense>
    </div>
     
  )
}

export default HomeSection