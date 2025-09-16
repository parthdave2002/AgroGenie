import { useState, useEffect, FC } from "react";
const IMG_URL = import.meta.env["VITE_API_URL"];

interface PropsData{
  data : string[];
} 

const ProductCarousel: FC <PropsData>= ({data}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlay = true;
  const intervalTime = 3000;

  // useEffect(() => {
  //   if (!autoPlay) return;
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev ===  data.length - 1 ? 0 : prev + 1));
  //   }, intervalTime);
  //   return () => clearInterval(interval);
  // }, [currentIndex, autoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full">
      <div className="relative  h-[15rem] overflow-hidden rounded-lg md:h-96">
        {data && data.map((src, index) => (
          <img
            key={index}
            src={ `${IMG_URL}/public/product/${src}`}
            alt={`Slide ${index + 1}`}
            className={`absolute block w-full transition-opacity duration-700 ease-in-out  left-1/2 -translate-x-1/2  h-[15rem] ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute z-30 flex -translate-x-1/2 bottom-28 left-1/2 space-x-3 hidden md:block">
        {data && data.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full bg-white ${
              index === currentIndex ? "opacity-100" : "opacity-50"
            }`}
          ></button>
        ))}
      </div>
      
    </div>
  );
};

export default ProductCarousel;
