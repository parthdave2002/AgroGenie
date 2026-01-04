import React, { useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "swiper/css";
import "swiper/css/navigation";

/* -------------------- Types -------------------- */
type Product = {
  id: string;
  image: string[];
  title: string;
  quantity: string;
  rating: number;
  price: number | string;
};

/* -------------------- Data -------------------- */
const PRODUCTS: Product[] = [
  {
    id: "6872596422256079e7dce566",
    image: [
      "/images/product/tataBahar.jpg",
      "/images/product/tataBahar1.webp",
      "/images/product/tataBahar2.jpg",
    ],
    title: "Tata Bahar",
    quantity: "250 ML",
    rating: 4.5,
    price: 500,
  },
  {
    id: "6863f3f03ca787accd908167",
    image: ["/images/product/roket.webp", "/images/product/rocket1.webp"],
    title: "Roket",
    quantity: "1 Liter",
    rating: 4.5,
    price: 500,
  },
  {
    id: "6862a4563ca787accd907b7f",
    image: [
      "/images/product/areva.webp",
      "/images/product/areva1.webp",
      "/images/product/areva2.jpg",
    ],
    title: "Areva",
    quantity: "250 Gram",
    rating: 4.5,
    price: 500,
  },
  {
    id: "68721ee122256079e7dcdb18",
    image: [
      "/images/product/saaf.webp",
      "/images/product/saaf2.webp",
      "/images/product/saaf3.webp",
    ],
    title: "Saaf",
    quantity: "1 Kg",
    rating: 4.5,
    price: 500,
  },
];

/* -------------------- Component -------------------- */
const PopularProductSection: React.FC = () => {
  const navigate = useNavigate();

  /* -------------------- Swiper Config -------------------- */
  const swiperConfig = useMemo(
    () => ({
      modules: [Navigation, Autoplay],
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    }),
    []
  );

  /* -------------------- Handlers -------------------- */
  const redirect = useCallback(
    (path: string) => navigate(path),
    [navigate]
  );

  const goToDetails = useCallback(
    (id: string) => navigate(`/product-detail/${id}`),
    [navigate]
  );

  /* -------------------- JSX -------------------- */
  return (
    <section className="py-10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Our Most <span className="text-lime-500">Popular Products</span>
          </h2>

        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map(({ id, image, title, quantity }) => (
            <article
              key={id}
              className="p-4 bg-[#e2f7e5] border shadow rounded-2xl hover:shadow-lg transition"
            >
              {/* Image Slider */}
              <figure className="bg-white rounded-xl mb-4">
                <Swiper {...swiperConfig}>
                  {image.map((src, index) => (
                    <SwiperSlide key={index}>
                      <LazyLoadImage
                        src={src}
                        effect="blur"
                        alt={title}
                        className="mx-auto max-h-[210px] object-contain"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </figure>

              {/* Content */}
              <div className="flex justify-between items-center">
                <h3
                  onClick={() => goToDetails(id)}
                  className="font-heading font-semibold text-[16px] truncate cursor-pointer hover:text-green-600"
                >
                  {title}
                </h3>

                <span className="text-sm font-heading">{quantity}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProductSection;