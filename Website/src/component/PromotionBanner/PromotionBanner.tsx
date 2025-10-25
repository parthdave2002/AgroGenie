import React from 'react';

const PromoBannerSection: React.FC = () => {
  return (
    <section className="py-5">
      <div className="max-w-1600 mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Left Banner */}
          <div className="w-full md:flex-1">
            <div className="relative bg-[#f9ebe7] rounded-lg overflow-hidden mb-3" >
              {/* <div className="p-[4rem]">
                <div className="text-yellow-400 text-2xl font-bold mb-2"> Upto 25% Off </div>
                <h3 className="text-gray-900 font-heading text-xl md:text-2xl font-semibold mb-2"> Luxa Dark Chocolate  </h3>
                <p className="text-gray-900 md:text-[1.2rem] mb-4"> Very tasty & creamy vanilla flavour creamy muffins. </p>
                <a  href="#" className="inline-block bg-black text-white uppercase text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800 transition"  > Show Now</a>
              </div> */}
              <img src="/images/banner/Research.webp" />
            </div>
          </div>

          {/* Right Banner */}
          <div className="w-full md:flex-1">
            <div className="relative bg-[#e6f3fa] rounded-lg overflow-hidden" >
              {/* <div className="p-[4rem]">
                <div className="text-yellow-600 text-2xl font-bold mb-2">  Upto 25% Off </div>
                <h3 className="text-geay-900 font-heading text-xl md:text-2xl font-semibold mb-2"> Creamy Muffins </h3>
                <p className="text-gray-900 md:text-[1.2rem] mb-4"> Very tasty & creamy vanilla flavour creamy muffins. </p>
                <a href="#" className="inline-block bg-black text-white uppercase text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800 transition"  >  Show Now </a>
              </div> */}
               <img src="/images/banner/Promotion.webp" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBannerSection;
