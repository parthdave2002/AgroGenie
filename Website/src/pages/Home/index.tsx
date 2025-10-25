import React, { useEffect, useState } from 'react'
import LookingForSection from '../../component/Looking/LookingFor'
import PopularSearches from '../../component/PopularProduct/PopularProduct'
import PopularProductSection from '../../component/PopularProduct/PopularProduct'
import PromoBannerSection from '../../component/PromotionBanner/PromotionBanner'
import DiscountBannerSection from '../../component/DiscountBanner/DiscountBanner'
import BestSellingProductSection from '../../component/BestSellingProduct/BestSellingProduct'
import BrandCarouselSection from '../../component/Brand/Brand'
import CategoryCarouselSection from '../../component/Category/Category'
import BannerSection from '../../component/Banner/Banner'
import TestimonailSection from '../../component/Testimonial/Testimonail'
import FAQSection from '../../component/FAQ/FAQ'
import GlobalLoader from '../../component/Loader/Loader'

const HomeSection = () => {

  const [is_loader, set_is_loader] = useState(false)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [])

  return (
    <div>
        {is_loader ?  <GlobalLoader />
          : 
          <div className=''>
            <BannerSection />
            <CategoryCarouselSection />
            <BestSellingProductSection />
            <DiscountBannerSection />
            <BrandCarouselSection />
            <PopularProductSection />
            <PromoBannerSection />
            <TestimonailSection />
            <LookingForSection />
            {/* <FAQSection /> */}
          </div>
        }
      </div>
     
  )
}

export default HomeSection