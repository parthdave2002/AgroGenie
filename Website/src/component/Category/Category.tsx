import React, { useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';


const CategoryCarouselSection: React.FC = () => {
      const { t } = useTranslation();
      const navigate = useNavigate();

      const categoryData = useMemo(() => [
        { img: 'images/category/plant-protection.webp', title: 'category.plant_protection' },
        { img: 'images/category/plant-nutrition.webp', title: 'category.plant_nutrition' },
        { img: 'images/category/fertilizer.webp', title: 'category.fertilizer' },
        { img: 'images/category/seed.webp', title: 'category.seed' },
        { img: 'images/category/hardware.webp', title: 'category.hardware' },
        { img: 'images/category/animal-husbandry.webp', title: 'category.animal_husbandry' },
         { img: 'images/category/plant-protection.webp', title: 'category.plant_protection' },
        { img: 'images/category/plant-nutrition.webp', title: 'category.plant_nutrition' },
        { img: 'images/category/fertilizer.webp', title: 'category.fertilizer' },
        { img: 'images/category/seed.webp', title: 'category.seed' },
        { img: 'images/category/hardware.webp', title: 'category.hardware' },
        { img: 'images/category/animal-husbandry.webp', title: 'category.animal_husbandry' },
      ], []);

      const RedictCall = (data:any) =>{
        navigate("/product",{ state: { filter: data } })
      }

  return (
    <section className="py-5 overflow-hidden">
      <div className=" max-w-1600 mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">{t("Crops")}</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 max-w-1600">
          {categoryData.map((item:any, idx:number) => (
            <div key={idx} className="flex flex-col items-center text-center group cursor-pointer" onClick={() => RedictCall(item?.title)}>
              <div className="bg-gray-100 flex items-center justify-center group-hover:shadow-md transition rounded-full p-1"><LazyLoadImage effect="blur" src={item.img} alt={item.title} className=" object-contain rounded-full border-2 border-green-600" />  </div>
              <div className='mt-2 text-md md:text-[1rem] font-heading font-semibold   text-gray-800'>  {t(item.title)} </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarouselSection;
