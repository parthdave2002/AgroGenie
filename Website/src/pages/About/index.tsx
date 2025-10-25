import React, { useEffect } from 'react'

const AboutSection = () => {

  useEffect(() =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  },[])

  return (
    <div>

        <div className="max-w-1600 mx-auto px-4">
        <h2 className="text-[1.5rem] md:text-[2rem] font-heading font-semibold my-5"> AgriBharat – Empowering Farmers, Elevating Agriculture  </h2>
        <p className='mb-6  font-heading text-[1.2rem]'>AgriBharat is India’s trusted online agri-commerce platform, built with a purpose: to simplify agriculture and support every Indian farmer in achieving better productivity, profitability, and peace of mind.</p>
        <p className='mb-6  font-heading text-[1.2rem]'>We believe agriculture is not just an occupation—it’s the foundation of our nation. At AgriBharat, we blend tradition with technology to help farmers make smarter decisions, access quality products, and grow sustainably. </p>
        <p className='mb-8  font-heading text-[1.2rem]'>Our journey began with a deep understanding of the day-to-day struggles farmers face—unreliable inputs, high costs, and limited guidance. That’s why we created AgriBharat: a one-stop digital platform for all agri needs. </p>
        
        <p className='mb-2 font-semibold font-heading text-[1.2rem]'>Our Mission </p>
        <p className='mb-8 font-heading text-[1.2rem]'>To enable every Indian farmer to “Farm Smart, Grow Big” by offering affordable, authentic, and easily accessible agricultural solutions.</p>
        
        <p className='mb-2 font-semibold font-heading text-[1.2rem]'>Our Vision</p>
        <p className='mb-8 font-heading text-[1.2rem]'>A future where technology, trust, and transparency uplift Indian agriculture and where every farmer—regardless of location—has access to the best tools, knowledge, and support. </p>
     
        <p className='mb-2 font-semibold font-heading text-[1.2rem]'>What We Offer </p>
        <p className='mb-2 font-heading text-[1.2rem]'>From seeds to soil enhancers, crop protection to harvesting tools, AgriBharat offers a wide range of products at competitive prices. Our carefully curated catalogue includes: </p>
        <p className='mb-2 font-heading text-[1.2rem]'>Certified Seeds </p>
        <p className='mb-2 font-heading text-[1.2rem]'>Fertilizers & Plant Growth Promoters </p>
        <p className='mb-2 font-heading text-[1.2rem]'>Insecticides, Pesticides & Crop Remedies </p>
        <p className='mb-2 font-heading text-[1.2rem]'>Farm Equipment & Tools </p>
        <p className='mb-6 font-heading text-[1.2rem]'>Expert Farming Advisory (Free) </p> 

      </div>
    </div>
  )
}

export default AboutSection