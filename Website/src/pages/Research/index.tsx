import React, { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ResearchSection = () => {

  useEffect(() =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  },[])


  return (
        <section className=" relative  py-10  bg-gray-50  bg-[url('/images/ad-bg-pattern.png')]  bg-repeat bg-[length:600px_600px] ">
      <div className="relative z-10">

   
      <section className=" text-gray-900 py-16 px-6 md:px-20 flex flex-col gap-20">
        <div className='flex flex-col md:flex-row' >
            <div className="w-full md:w-1/2 lg:w-1/2 pr-0 md:pr-10 mb-10 md:mb-0 flex items-center justify-center">
              <LazyLoadImage effect="blur" src="/images/about.webp" alt="About Us" className="rounded-lg shadow-lg object-cover h-96 w-full" />
            </div>

            <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6"> Our <span className="text-lime-500"> Innovation </span> </h2>
              <p className="text-gray-600 mb-6 font-body">
                We are a leading agricultural company dedicated to revolutionizing modern farming practices. Our mission is to empower farmers with innovative solutions that enhance productivity, sustainability, and profitability. With a strong commitment to research and development, we provide cutting-edge technologies and services tailored to meet the evolving needs of the agricultural industry.
              </p>
              <p className="text-gray-600 mb-6 font-body">
                Our team of experts works closely with farmers to understand their challenges and deliver customized solutions that drive success. From advanced seed varieties to precision farming techniques, we are at the forefront of agricultural innovation. Join us on our journey to transform agriculture and create a brighter future for farmers worldwide.
              </p>
            </div>
        </div>

        <div className='flex flex-col md:flex-row' >
            
            <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6"> Our <span className="text-lime-500"> Farms </span> </h2>
              <p className="text-gray-600 mb-6 font-body">
                We are a leading agricultural company dedicated to revolutionizing modern farming practices. Our mission is to empower farmers with innovative solutions that enhance productivity, sustainability, and profitability. With a strong commitment to research and development, we provide cutting-edge technologies and services tailored to meet the evolving needs of the agricultural industry.
              </p>
              <p className="text-gray-600 mb-6 font-body">
                Our team of experts works closely with farmers to understand their challenges and deliver customized solutions that drive success. From advanced seed varieties to precision farming techniques, we are at the forefront of agricultural innovation. Join us on our journey to transform agriculture and create a brighter future for farmers worldwide.
              </p>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/2 pr-0 md:pr-10 mb-10 md:mb-0 flex items-center justify-center">
              <LazyLoadImage effect="blur" src="/images/ourhistory.webp" alt="About Us" className="rounded-lg shadow-lg object-cover h-96 w-full" />
            </div>

        </div>

        <div className='flex  flex-col md:flex-row' >
            <div className="w-full md:w-1/2 lg:w-1/2 pr-0 md:pr-10 mb-10 md:mb-0 flex items-center justify-center">
              <LazyLoadImage effect="blur" src="/images/whywe.webp" alt="About Us" className="rounded-lg shadow-lg object-cover h-96 w-full" />
            </div>

            <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6"> Facility <span className="text-lime-500"> We Provide </span> </h2>
              <p className="text-gray-600 mb-6 font-body">
                We are a leading agricultural company dedicated to revolutionizing modern farming practices. Our mission is to empower farmers with innovative solutions that enhance productivity, sustainability, and profitability. With a strong commitment to research and development, we provide cutting-edge technologies and services tailored to meet the evolving needs of the agricultural industry.
              </p>
              <p className="text-gray-600 mb-6 font-body">
                Our team of experts works closely with farmers to understand their challenges and deliver customized solutions that drive success. From advanced seed varieties to precision farming techniques, we are at the forefront of agricultural innovation. Join us on our journey to transform agriculture and create a brighter future for farmers worldwide.
              </p>
            </div>
        </div>

        <div className='flex flex-col md:flex-row' >
            
            <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6"> Our <span className="text-lime-500"> Breeder working </span> </h2>
              <p className="text-gray-600 mb-6 font-body">
                We are a leading agricultural company dedicated to revolutionizing modern farming practices. Our mission is to empower farmers with innovative solutions that enhance productivity, sustainability, and profitability. With a strong commitment to research and development, we provide cutting-edge technologies and services tailored to meet the evolving needs of the agricultural industry.
              </p>
              <p className="text-gray-600 mb-6 font-body">
                Our team of experts works closely with farmers to understand their challenges and deliver customized solutions that drive success. From advanced seed varieties to precision farming techniques, we are at the forefront of agricultural innovation. Join us on our journey to transform agriculture and create a brighter future for farmers worldwide.
              </p>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/2 pr-0 md:pr-10 mb-10 md:mb-0 flex items-center justify-center">
              <LazyLoadImage effect="blur" src="/images/ourhistory.webp" alt="About Us" className="rounded-lg shadow-lg object-cover h-96 w-full" />
            </div>

        </div>
      </section>
    </div>
    </section>
  )
}

export default ResearchSection