import React, { useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const AboutSection = () => {

  const services: any[] = [
    {
      id: 1,
      title: "Custom SEO Services",
      description:
        "Custom, organic SEO services that include technical audits, on-page search engine optimization.",
      image: "/images/ourmission-1.webp",
      person: "Ahmed Sanders",
    },
    {
      id: 2,
      title: "SEO Website Design",
      description:
        "Highly effective PPC and SEO advertising for every budget including Google, Bing & Meta Ads.",
      image: "/images/ourmission-2.webp",
      person: "Andrew Silabus",
    },
    {
      id: 3,
      title: "SEO Consulting",
      description:
        "B2B SEO to generate valuable inbound leads and increase visibility across search engines.",
      image: "/images/ourmission-3.webp",
      person: "Zaina Apollo",
    },
  ];

  useEffect(() =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  },[])

  const aboutImageSrc = useMemo(() => "/images/about-new.webp", []);
  const historyImageSrc = useMemo(() => "/images/ourhistory.webp", []);
  const whyweImageSrc = useMemo(() => "/images/whywe.webp", []);


  const images = useMemo(() => [
  "/images/farmer/1.webp",
  "/images/farmer/2.webp",
  "/images/farmer/3.webp",
  "/images/farmer/4.webp",
  "/images/farmer/5.webp",
 ], []); 

  return (
    <div>
      {/* <div className='font-body'> About Company </div> */}
      <section className=" text-gray-900 py-16 px-6 md:px-20 flex flex-col gap-20">
        <div className='flex flex-col md:flex-row' >
            <div className="w-full md:w-1/2 lg:w-1/2 pr-0 md:pr-10 mb-10 md:mb-0 flex items-center justify-center">
              <LazyLoadImage effect="blur" src={aboutImageSrc} alt="About Us" className="rounded-lg shadow-lg object-cover h-96 w-full" />
            </div>

            <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6"> About <span className="text-lime-500"> Company </span> </h2>
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
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6"> Our <span className="text-lime-500"> History </span> </h2>
              <p className="text-gray-600 mb-6 font-body">
                We are a leading agricultural company dedicated to revolutionizing modern farming practices. Our mission is to empower farmers with innovative solutions that enhance productivity, sustainability, and profitability. With a strong commitment to research and development, we provide cutting-edge technologies and services tailored to meet the evolving needs of the agricultural industry.
              </p>
              <p className="text-gray-600 mb-6 font-body">
                Our team of experts works closely with farmers to understand their challenges and deliver customized solutions that drive success. From advanced seed varieties to precision farming techniques, we are at the forefront of agricultural innovation. Join us on our journey to transform agriculture and create a brighter future for farmers worldwide.
              </p>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/2 pr-0 md:pr-10 mb-10 md:mb-0 flex items-center justify-center">
              <LazyLoadImage effect="blur" src={historyImageSrc} alt="About history" className="rounded-lg shadow-lg object-cover h-96 w-full" />
            </div>

        </div>

        <div className='flex  flex-col md:flex-row' >
            <div className="w-full md:w-1/2 lg:w-1/2 pr-0 md:pr-10 mb-10 md:mb-0 flex items-center justify-center">
              <LazyLoadImage effect="blur" src={whyweImageSrc} alt="Why we" className="rounded-lg shadow-lg object-cover h-96 w-full" />
            </div>

            <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6"> Why <span className="text-lime-500"> We </span> </h2>
              <p className="text-gray-600 mb-6 font-body">
                We are a leading agricultural company dedicated to revolutionizing modern farming practices. Our mission is to empower farmers with innovative solutions that enhance productivity, sustainability, and profitability. With a strong commitment to research and development, we provide cutting-edge technologies and services tailored to meet the evolving needs of the agricultural industry.
              </p>
              <p className="text-gray-600 mb-6 font-body">
                Our team of experts works closely with farmers to understand their challenges and deliver customized solutions that drive success. From advanced seed varieties to precision farming techniques, we are at the forefront of agricultural innovation. Join us on our journey to transform agriculture and create a brighter future for farmers worldwide.
              </p>
            </div>
        </div>
      </section>

      {/*  <div className='font-body'> misssion </div> */}
        <section className="text-gray-900 py-16 px-6 md:px-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-3"> Our Mission <br /> <span className="text-lime-500"> morden Agriculture. </span> </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((service) => (
                <div key={service.id} className="group relative bg-gray-50 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">

                  <div className="flex justify-center pt-8 pb-4 bg-gradient-to-b from-white to-gray-50">
                    <LazyLoadImage effect="blur" src={service.image} alt={service.person} className="w-40 h-40 object-cover rounded-full border border-gray-200" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-2"> {service.title} </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5"> {service.description} </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 font-medium"> {service.person} </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* <div className='font-body'> Vision  </div> */}
        <section className=" text-gray-900 py-16 px-6 md:px-20">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-3"> Your Vision <br /> <span className="text-lime-500"> Our Expertise </span> </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">

              <div className="rounded-lg overflow-hidden">
                <LazyLoadImage effect="blur" src="/images/ourexprtise.webp" alt="Team discussion" className="w-full h-full object-cover" />
              </div>

              <div>
                <p className="text-gray-400 mb-8 font-body">
                  Tempor commodo ullamcorper a lacus. Amet commodo nulla facilisi nullam. Molestie
                  nunc non blandit massa enim nec. Felis bibendum ut tristique et egestas quis ipsum
                  suspendisse ultrices. Eros in cursus turpis massa tincidunt dui.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 text-center md:text-left font-body">
                  <div>
                    <h3 className="text-2xl font-bold">10k+</h3>
                    <p className="text-gray-400 text-sm">Completed Projects</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">15k</h3>
                    <p className="text-gray-400 text-sm">Satisfied Customers</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">10k+</h3>
                    <p className="text-gray-400 text-sm">Years of Mastery</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">45+</h3>
                    <p className="text-gray-400 text-sm">Worldwide Honors</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-6">
                  <div className="flex -space-x-2">
                    <LazyLoadImage effect="blur" className="w-10 h-10 rounded-full border-2 border-black" src="/images/farmer/1.webp" alt="User 1" />
                    <LazyLoadImage effect="blur" className="w-10 h-10 rounded-full border-2 border-black" src="/images/farmer/2.webp" alt="User 2" />
                    <LazyLoadImage effect="blur" className="w-10 h-10 rounded-full border-2 border-black" src="/images/farmer/3.webp" alt="User 3" />
                  </div>

                  <button className="flex items-center gap-2 bg-gradient-to-r from-green-700 to-lime-500 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 md:mt-3">
                    <div className="w-10 h-10 rounded-full border border-red-500 flex items-center justify-center mr-2">  ▶ </div>
                    <span className="text-lg font-chilanka"> WATCH INTRO </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* <div className='font-body'> Farmer Engagement ( image and youtube )  </div> */}
        <section className=" text-gray-900 py-16 px-6 md:px-20">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-3"> Our Community <br /> <span className="text-lime-500"> Farmer Engagement </span> </h2>
            </div>

            <Swiper modules={[Navigation]} spaceBetween={40} slidesPerView={4} loop
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              className="rounded-2xl"
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <div className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img src={src} alt={`Slide ${index + 1}`} className="w-full h-64 object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>


    </div>
  )
}

export default AboutSection