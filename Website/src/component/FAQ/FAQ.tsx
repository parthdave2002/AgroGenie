import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQSection = () => {
   const { t } = useTranslation();
 const faqs = t("faq.list", { returnObjects: true }) as Array<{ question: string; answer: string }>;
 const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className='py-5'>
      <div className='max-w-1600 mx-auto px-4'>
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 my-5 flex justify-center gap-x-3 ">Most Frequently <span className="text-lime-500"> Asked Questions </span> </h2>
        <div className="max-w-7xl mx-auto p-6 font-body">

          {faqs.map((faq: any, index: number) => (
            <div key={index} className="mb-4 border-b border-gray-300 pb-4 font-body">
              <button className="w-full flex justify-between items-center text-left text-gray-800 focus:outline-none" onClick={() => toggleFAQ(index)}>
                <div className='text-md md:text-xl'>{faq.question}</div>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openIndex === index && (
                <p className="mt-3 text-gray-600 transition-all duration-500 ease-in-out text-lg"> {faq.answer} </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQSection