import React, { useEffect, useState } from "react";
import {  FaFacebookF, FaFacebookMessenger, FaInstagram, FaLinkedinIn,  FaWhatsapp,  FaYoutube } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useTranslation } from "react-i18next";
import CartSection from "../../pages/Cart/Cart";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaArrowRightLong } from "react-icons/fa6";


const Header: React.FC= ( ) => {
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

    const [cartOpen , setCartOpen] = useState(false);
    const onClose =() => setCartOpen(false)
    const CartCall = () =>  setCartOpen(true)

    const RedirectCall =(data:string) =>{
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
    <div className="w-full  bg-white mb-3">
        {/* <div className="container border-b border-gray-100 mx-auto  py-1">
          <div className="md:flex justify-between">
            <div className="text-green-600 font-heading font-semibold text-md md:text-[1rem] text-center"> {t('call_us')} : {t("9100029429 / 9100029329")}</div>
            <div className="flex gap-x-3 my-3 md:my-0 self-center justify-center">
              <a  target="_blank" rel='noopener noreferre'  href="https://wa.me/919100029429"> <FaWhatsapp  className="text-gray-300 hover:text-green-500 cursor-pointer" size={22} /> </a>
              <a  target="_blank" rel='noopener noreferre'  href="https://www.instagram.com/agribharat.in?igsh=MXQwbnlwMmI5c3RvMw=="> <FaInstagram className="text-gray-300 hover:text-green-500 cursor-pointer" size={22} /> </a>
              <a  target="_blank" rel='noopener noreferre'  href="https://youtube.com/@agribharat2023?si=ip4lwikEkp4SCBgy"> <FaYoutube className="text-gray-300 hover:text-green-500 cursor-pointer" size={22} /> </a>
              <a  target="_blank" rel='noopener noreferre'  href="https://www.facebook.com/agribharat.in/"> <FaFacebookF  className="text-gray-300 hover:text-green-500 cursor-pointer" size={22} /> </a>
            </div>
          </div>
        </div> */}

      <div className="container border-b border-gray-100 mx-auto  py-3">
        <div className="md:flex flex-wrap items-center justify-between gap-4">
          <div className="text-center sm:text-left">  <div className="cursor-pointer"  onClick={ () =>RedirectCall("/")}>   <LazyLoadImage effect="blur" src="/images/logo.webp" alt="logo" className="h-[3.5rem] mx-auto sm:mx-0" /> </div> </div>

            <div className="flex flex-row gap-x-[3rem] justify-center my-6 md:my-0">
              <div className="text-xl md:text-[1.2rem] hover:text-green-600 hover: font-heading font-bold  cursor-pointer" onClick={() => RedirectCall("/")}> {t("Home")}</div>
              {/* <div className="text-xl md:text-[1.2rem] hover:text-green-600 hover: font-heading font-bold  cursor-pointer" onClick={() => RedirectCall("/about")}> {t("About")}</div> */}
              <div className="text-xl md:text-[1.2rem] hover:text-green-600 hover: font-heading font-bold  cursor-pointer" onClick={() => RedirectCall("/product")}> {t("Products")} </div>
              <div className="text-xl md:text-[1.2rem] hover:text-green-600 hover: font-heading font-bold  cursor-pointer" onClick={() => RedirectCall("/")}> {t("Research")}</div>
            </div>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mt-4 sm:mt-0">
            <ul className="flex items-center justify-center gap-x-3">

                <div>
                  <button onClick={() => OpenBrochure()} className="flex items-center bg-green-600 rounded-full px-4 py-2 space-x-2 hover:bg-green-500 hover:scale-105 hover:shadow-lg transition-all duration-200">
                    <h3 className="text-md text-gray-50 font-semibold">Broucher</h3>
                    <div> <FaArrowRightLong size={24} className="text-gray-50" /> </div>
                  </button>
                </div>
                  
                <li  className="relative flex gap-x-3 rounded-full bg-green-600 hover:bg-green-500 p-2.5 mx-1 cursor-pointer text-gray-50"  onClick={() => CartCall()}> 
                  <MdOutlineShoppingCart size={24} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"> {cartCount}</span>
                </li>

              {/* <li className=" flex gap-x-3 rounded-full bg-green-600 hover:bg-green-500 p-2.5 mx-1 cursor-pointer text-gray-50" onClick={() => CartCall()}>    <MdOutlineShoppingCart   size={24} />    </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>

     <CartSection  cartOpen={cartOpen} onClose={onClose} />

    </>
  );
};

export default Header;