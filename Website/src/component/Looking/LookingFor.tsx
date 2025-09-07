import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const PopularSearches = () => {
   const { t } = useTranslation();
   const navigate = useNavigate()
  const items = useMemo(() => [
    "Coriander",
    "Cluster bean",
    "Onion",
    "Spinach",
    "Pea",
    "Cow pea",
    "Papaya",
    "Cabbage",
    "Cauliflower",
    "Squash",
    "Brinjal",
    "Beet root",
    "Fenugreek",
    "Pumpkin",
    "Carrot",
    "Radish",
], []);

  const RedictCall = (data:any) =>{
    navigate(data)
  }

  return (
    <section className="py-5">
      <div className="max-w-1600 mx-auto px-4">
        <h2 className="md:text-[2rem] text-[1.8rem]  font-heading font-semibold my-5">{t("People are also looking for")}</h2>
        <div className="flex flex-wrap gap-5">
          {items.map((item :any, index:any) => (
            <button key={index} className="bg-[#e2f7e5] text-gray-500 hover:text-gray-50  px-4 py-2 rounded hover:bg-green-500 text-[0.8rem] md:text-[1rem]  transition w-[9rem] max-w-[9rem] overflow-hidden text-ellipsis whitespace-nowrap" onClick={() => RedictCall("/product")}> {t(item)} </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSearches;
