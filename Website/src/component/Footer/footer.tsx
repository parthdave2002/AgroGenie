import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaLinkedinIn, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate()
  const RedictCall = (data: string) =>{
    navigate(data)
  }

  const { t } =useTranslation()
  const d = new Date();
  const year = d.getFullYear();

  return (
    <>
      <footer className="bg-stone-900 bg-gradient-to-t from-green-800 to-lime-800 text-gray-100 py-10  ">
        <div className="container mx-auto px-6 font-semibold">
          <div className="grid grid-cols-1 justify-items-center md:grid-cols-3 gap-8">

            <div className="col-span-1">
              <LazyLoadImage effect="blur" src="/images/logo.webp" alt="AgroGenie Logo" className="w-36 md:w-[15rem] mb-3 justify-self-center" />
              {/* <div className='text-2xl md:text-[1.5rem] font-heading font-semibold mb-3 text-center'> Logo </div> */}

              <div className='text-md md:text-[1rem] font-heading mb-3'> At AgroGenie Seeds, every seed packet is filled with magical innovation - designed to transform fields into thriving farms. Quality you can Trust, Results you can See. </div>


              <div className="flex space-x-3 ">
                <a target="_blank" rel='noopener noreferre' href="https://wa.me/919063563590?text=Namastey%2C%0APlease%20share%20information%20about%20AgroGenie%20Seeds.%0AJay%20Hind%21%21%21" className=" flex items-center justify-center transition cursor-pointer">  <FaWhatsapp size={28} className='text-green-500' />   </a>
                {/* <div  className="w-10 h-10 flex items-center justify-center transition cursor-pointer"> <LazyLoadImage effect="blur"  src="/images/instagram.png" />   </div> */}
                <a target="_blank" rel='noopener noreferre' href="https://www.youtube.com/@AgroGenie" className="flex items-center justify-center transition cursor-pointer">  <FaYoutube size={28} className='text-red-600' />   </a>
                {/* <div  className="w-10 h-10 flex items-center justify-center transition cursor-pointer"> <LazyLoadImage effect="blur"  src="/images/facebook.png" />   </div> */}
                <a target="_blank" rel='noopener noreferre' href="https://www.linkedin.com/company/agrogenieseeds/?viewAsMember=true" className="flex items-center justify-center transition cursor-pointer">  <FaLinkedinIn className='text-blue-600' size={28} />   </a>
              </div>
            </div>

            <div>
              <h4 className="text-xl md:text-[1.2rem] text-center font-heading font-semibold font-semibold mb-4">{t("Quick Links")}</h4>
              <ul className="space-y-4 text-sm text-center">
                <li><div onClick={() => RedictCall("/")} className="cursor-pointer text-[1rem] font-heading hover:underline">{t("Home")}</div></li>
                <li><div onClick={() => RedictCall("/about")} className="cursor-pointer text-[1rem] font-heading hover:underline">{t("About")}</div></li>
                <li><div onClick={() => RedictCall("/research")} className="cursor-pointer text-[1rem] font-heading hover:underline">{t("Research")}</div></li>
                <li><div onClick={() => RedictCall("/product")} className="cursor-pointer text-[1rem] font-heading hover:underline">{t("Seeds/Products")}</div></li>
                <li><div onClick={() => RedictCall("/contactus")} className="cursor-pointer text-[1rem] font-heading hover:underline">{t("Contact")}</div></li>
                <li><div onClick={() => RedictCall("/terms")} className="cursor-pointer text-[1rem] font-heading hover:underline">{t("legal policies")}</div></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl md:text-[1.2rem] text-center font-heading font-semibold font-semibold mb-5">{t("Office Address")}</h4>
              <div className="flex flex-col gap-6">

                <div className="text-sm md:text-base font-semibold leading-relaxed">
                  <div className="flex flex-wrap gap-2 items-start">

                    <div>
                      <p className="md:text-[1.2rem] font-heading mb-3"> AgroGenie Ventures LLP </p>
                      <p className="mb-0 md:text-[1rem] font-heading font-normal"> B-5, Hariba Vyapar Bhuvan, GPO Road,</p>
                      <p className="mb-0 md:text-[1rem] font-heading font-normal"> Anand - 388001, Gujarat, Bharat</p>
                      <p className="mb-0 md:text-[1rem] font-heading font-normal"> Customer Care No. : +91 90635 63590 </p>
                      <p className="mb-0 md:text-[1rem] font-heading font-normal"> Write us : touch@agrogenieseeds.com</p>
                      <p className="mb-0 md:text-[1rem] font-heading font-normal"> Timing: Monday to Saturday 10 AM to 6 PM</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
         <div className="max-w-[1600px] mx-auto px-12 mt-[4rem]">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-sm ">
            <p className='text-md md:text-[1rem] font-heading font-semibold'>© {year}. {t("All Rights Reserved")}.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer