import React, { useEffect, useState } from "react";
import { FaEnvelope, FaFacebookF, FaFacebookMessenger, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useTranslation } from "react-i18next";
import CartSection from "../../pages/Cart/Cart";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaArrowRightLong } from "react-icons/fa6";


const Header: React.FC = () => {
  const nagivate = useNavigate()
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState("en");
  const [isOpenlanguage, setIsOpenlang] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("i18nextLng") || "en";
    i18n.changeLanguage(savedLang);
    setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setIsOpenlang(false);
  };

  const labelMap: Record<string, string> = {
    en: "English",
    gj: "ગુજરાતી",
  };

  const [cartOpen, setCartOpen] = useState(false);
  const onClose = () => setCartOpen(false)
  const CartCall = () => setCartOpen(true)

  const RedirectCall = (data: string) => {
    nagivate(data)
  }

  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const loadCart = () => {
      const storedCart = localStorage.getItem("product");
      if (storedCart) {
        const cartItems = JSON.parse(storedCart);
        setCartCount(cartItems?.length);
      } else {
        setCartCount(0);
      }
    };

    loadCart();
    window.addEventListener("cartChanged", loadCart);

    return () => {
      window.removeEventListener("cartChanged", loadCart);
    };
  }, []);

  const OpenBrochure = () => {
    window.open("/pdf/brochure.pdf", "_blank");
  };

  return (
    <>
      <div className="w-full  bg-white ">

        <div className="flex flex-wrap justify-between items-center bg-gray-50 px-6 py-2 text-gray-600">
          <div className="flex flex-wrap items-center gap-4 font-heading">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-lime-500" />
              <span> Anand, Gujarat 388001</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-lime-500" />
              <a href="tel:+919824153954" className="hover:text-lime-500">+91 90635 63590</a>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-lime-500" />
              <a href="mailto:touch@agrogenieseeds.com" className="hover:text-lime-500">touch@agrogenieseeds.com</a>
            </div>
          </div>

          <div className="flex items-center gap-4 font-heading">
            <span>Follow Us:</span>
            <div className="flex gap-x-4">
              {/* <a target="_blank" href="#" className="hover:text-green-700"><FaFacebookF /></a>
              <a target="_blank" href="#" className="hover:text-green-700"><FaInstagram /></a> */}
              <a target="_blank" href="https://wa.me/919063563590?text=Namastey%2C%0APlease%20share%20information%20about%20AgroGenie%20Seeds.%0AJay%20Hind%21%21%21" className="hover:text-lime-500"><FaWhatsapp size={20} /></a>
              <a target="_blank" href="https://www.youtube.com/@AgroGenie" className="hover:text-lime-500"><FaYoutube size={20} /></a>
              <a target="_blank" href="https://www.linkedin.com/company/agrogenieseeds/?viewAsMember=true"  className="hover:text-lime-500"><FaLinkedinIn size={20} /></a>

            </div>
          </div>
        </div>

        <div className="container border-b border-gray-100 mx-auto  py-3">
          <div className="md:flex flex-wrap items-center justify-between gap-4">
            {/* <div className="text-center sm:text-left">  <div className="cursor-pointer"  onClick={ () =>RedirectCall("/")}>   <LazyLoadImage effect="blur" src="/images/logo.webp" alt="logo" className="h-[3.5rem] mx-auto sm:mx-0" /> </div> </div> */}
            <div className="text-center sm:text-left">  <div className="cursor-pointer"  onClick={ () =>RedirectCall("/")}> Logo </div> </div>

            <div className="flex flex-row gap-x-[3rem] justify-center my-6 md:my-0">
              <div className="text-xl md:text-[1rem] hover:text-lime-600 font-heading  cursor-pointer" onClick={() => RedirectCall("/")}> {t("Home")}</div>
              <div className="text-xl md:text-[1rem] hover:text-lime-600 font-heading  cursor-pointer" onClick={() => RedirectCall("/about")}> {t("About")}</div>
              <div className="text-xl md:text-[1rem] hover:text-lime-600 font-heading  cursor-pointer" onClick={() => RedirectCall("/research")}> {t("Research")}</div>
              <div className="text-xl md:text-[1rem] hover:text-lime-600 font-heading  cursor-pointer" onClick={() => RedirectCall("/product")}> {t("Seeds/Products")} </div>
              <div className="text-xl md:text-[1rem] hover:text-lime-600 font-heading  cursor-pointer" onClick={() => RedirectCall("/contactus")}> {t("Contact")} </div>
            </div>

            <button onClick={OpenBrochure} className="flex items-center gap-2 bg-gradient-to-r from-green-700 to-lime-500 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
              <span className="text-lg font-chilanka">Download Brochure</span>
              <FaArrowRightLong size={18} className="text-white transition-transform duration-200 group-hover:translate-x-1" />
            </button>

          </div>
        </div>
      </div>

      <CartSection cartOpen={cartOpen} onClose={onClose} />

    </>
  );
};

export default Header;