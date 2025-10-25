import React from 'react';
import { useTranslation } from 'react-i18next';

const DiscountBannerSection: React.FC = () => {
  const {t} = useTranslation();

const stats = [
  { label: 'Years of Excellence', value: '10+' },
  { label: 'Research Varieties', value: '50+' },
  { label: 'Achievements', value: '5+' },
  { label: 'Satisfied Farmer', value: '2.5+' },
];
  return (
    <section className="py-5">
      <div className="max-w-1600 mx-auto px-4">
        <div className="bg-[#e2f7e5] bg-no-repeat rounded-2xl py-12 px-4 md:px-12 max-w-1600" >
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 text-center text-green-700 font-heading">
            {stats.map((stat:any, index:number) => (
              <div key={index}>
                <div className="text-4xl md:text-[3rem] font-heading font-bold mb-2">{stat.value}</div>
                <div className="text-2xl  font-heading">{t(stat.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountBannerSection;
