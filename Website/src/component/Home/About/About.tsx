import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate } from 'react-router-dom'

const About = () => {

    const navigate = useNavigate();

    const OpenAbout = () => {
        navigate('/about');
    }

  return (
    
        <div className='py-10  px-4 '>
            <div className='flex flex-col md:flex-row' >
                <div className="w-full md:w-1/2 lg:w-1/2 pr-0 md:pr-10 mb-10 md:mb-0 flex items-center justify-center">
                    <LazyLoadImage effect="blur" src="/images/about.webp" alt="About Us" className="rounded-lg shadow-lg object-cover h-96 w-full" />
                </div>

                <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-DarkBackground mb-6"> About <span className="text-lime-500"> Company </span> </h2>
                    <p className="text-Hydrocarbon mb-6 font-body">
                        We are a leading agricultural company dedicated to revolutionizing modern farming practices. Our mission is to empower farmers with innovative solutions that enhance productivity, sustainability, and profitability. With a strong commitment to research and development, we provide cutting-edge technologies and services tailored to meet the evolving needs of the agricultural industry.
                    </p>
                    <p className="text-Hydrocarbon mb-6 font-body">
                        Our team of experts works closely with farmers to understand their challenges and deliver customized solutions that drive success. From advanced seed varieties to precision farming techniques, we are at the forefront of agricultural innovation. Join us on our journey to transform agriculture and create a brighter future for farmers worldwide.
                    </p>

                    <p className="text-Hydrocarbon mb-6 font-body">
                        Our team of experts works closely with farmers to understand their challenges and deliver customized solutions that drive success. From advanced seed varieties to precision farming techniques, we are at the forefront of agricultural innovation. Join us on our journey to transform agriculture and create a brighter future for farmers worldwide.
                    </p>

                    <button onClick={OpenAbout} className="flex items-center gap-2 bg-gradient-to-r from-green-700 to-lime-500 text-White font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 w-max">
                        <span className="text-lg font-chilanka"> More Aboutus</span>
                        <FaArrowRightLong size={18} className="text-White transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
  )
}

export default About