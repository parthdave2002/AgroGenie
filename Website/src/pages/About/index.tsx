import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { LazyLoadImage } from 'react-lazy-load-image-component';

/* ---------- Types ---------- */
interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  person: string;
}

/* ---------- Static Data ---------- */
const SERVICES: Service[] = [
  {
    id: 1,
    title: "Custom SEO Services",
    description: "Custom, organic SEO services that include technical audits, on-page SEO.",
    image: "/images/ourmission-1.webp",
    person: "Ahmed Sanders",
  },
  {
    id: 2,
    title: "SEO Website Design",
    description: "Highly effective PPC and SEO advertising including Google & Meta Ads.",
    image: "/images/ourmission-2.webp",
    person: "Andrew Silabus",
  },
  {
    id: 3,
    title: "SEO Consulting",
    description: "B2B SEO to generate inbound leads and improve visibility.",
    image: "/images/ourmission-3.webp",
    person: "Zaina Apollo",
  },
];

const FARMER_IMAGES = [
  "/images/farmer/1.webp",
  "/images/farmer/2.webp",
  "/images/farmer/3.webp",
  "/images/farmer/4.webp",
  "/images/farmer/5.webp",
];

const SWIPER_BREAKPOINTS = {
  320: { slidesPerView: 1 },
  640: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
};

/* ---------- Reusable Section ---------- */
const ImageTextSection = ({
  title,
  highlight,
  image,
  reverse = false,
}: {
  title: string;
  highlight: string;
  image: string;
  reverse?: boolean;
}) => (
  <div className={`flex flex-col md:flex-row font-body ${reverse ? "md:flex-row-reverse" : ""}`}>
    <div className="w-full md:w-1/2 flex items-center justify-center mb-10 md:mb-0">
      <LazyLoadImage src={image} effect="blur" alt={title} className="rounded-lg shadow-lg object-cover h-96 w-full" />
    </div>

    <div className="w-full md:w-1/2 flex flex-col justify-center">
      <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6">
        {title} <span className="text-lime-500">{highlight}</span>
      </h2>
      <p className="text-gray-600 mb-6 font-body">
        We are a leading agricultural company dedicated to revolutionizing modern farming practices. Our mission is to empower farmers with innovative solutions that enhance productivity, sustainability, and profitability. With a strong commitment to research and development, we provide cutting-edge technologies and services tailored to meet the evolving needs of the agricultural industry.
      </p>
      <p className="text-gray-600 font-body">
        Our team of experts works closely with farmers to understand their challenges and deliver customized solutions that drive success. From advanced seed varieties to precision farming techniques, we are at the forefront of agricultural innovation. Join us on our journey to transform agriculture and create a brighter future for farmers worldwide.
      </p>
    </div>
  </div>
);

/* ---------- Main Component ---------- */
const AboutSection: React.FC = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className=" relative  py-10  bg-gray-50  bg-[url('/images/ad-bg-pattern.png')]  bg-repeat bg-[length:600px_600px] ">
      <div className="relative z-10">

        {/* About / History / Why We */}
        <section className="py-16 px-6 md:px-20 space-y-20">
          <ImageTextSection title="About" highlight="Company" image="/images/about.webp" />
          <ImageTextSection title="Our" highlight="History" image="/images/ourhistory.webp" reverse />
          <ImageTextSection title="Why" highlight="We" image="/images/whywe.webp" />
        </section>

        {/* Mission */}
        <section className="py-16 px-6 md:px-20 font-body">
          <h2 className="text-center text-5xl font-bold mb-16 font-body">
            Our Mission <br />
            <span className="text-lime-500 font-body">Modern Agriculture</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10 font-body">
            {SERVICES.map(service => (
              <div key={service.id} className="bg-gray-50 rounded-3xl shadow hover:shadow-xl transition font-body">
                <div className="flex justify-center pt-8">
                  <LazyLoadImage
                    src={service.image}
                    effect="blur"
                    className="w-40 h-40 rounded-full"
                    alt={service.person}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-gray-600 text-sm my-3">{service.description}</p>
                  <span className="text-gray-500 text-sm">{service.person}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Slider */}
        <section className="py-16 px-6 md:px-20 font-body">
          <h2 className="text-center text-5xl font-bold mb-16 font-body">
            Our Community <br />
            <span className="text-lime-500 font-body">Farmer Engagement</span>
          </h2>

          <Swiper
            modules={[Navigation]}
            spaceBetween={40}
            loop
            breakpoints={SWIPER_BREAKPOINTS}
          >
            {FARMER_IMAGES.map((src, i) => (
              <SwiperSlide key={i}>
                <img src={src} className="h-64 w-full object-cover rounded-xl" />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

      </div>
    </section>
  );
};

export default AboutSection;