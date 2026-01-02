import React from "react";

/* -------------------- Types -------------------- */
type StatItem = {
  label: string;
  value: string;
};

/* -------------------- Data -------------------- */
const STATS: StatItem[] = [
  { label: "Years of Excellence", value: "10+" },
  { label: "Research Varieties", value: "50+" },
  { label: "Achievements", value: "5+" },
  { label: "Satisfied Farmers", value: "2.5+" },
];

/* -------------------- Component -------------------- */
const DiscountBannerSection: React.FC = () => {
  return (
    <section className="py-10">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="bg-[#e2f7e5] rounded-2xl py-12 px-4 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 text-center text-green-700 font-heading">
            {STATS.map(({ label, value }) => (
              <div key={label}>
                <div className="text-4xl md:text-[3rem] font-bold mb-2">
                  {value}
                </div>
                <div className="text-xl md:text-2xl">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountBannerSection;
