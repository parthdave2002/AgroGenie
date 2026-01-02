import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaEnvelope,  FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import CartSection from "../../pages/Cart/Cart";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

type MenuItem = {
  label: string;
  path: string;
};

const Header: React.FC = () => {
  const nagivate = useNavigate()
  
  const [cartOpen, setCartOpen] = useState(false);
  const onClose = () => setCartOpen(false)
  const CartCall = () => setCartOpen(true)

  const RedirectCall = (data: string) => {
    nagivate(data)
  }

    /* -------------------- Menu Config -------------------- */
  const menuItems: MenuItem[] = useMemo(
    () => [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Research", path: "/research" },
      { label: "Seeds/Products", path: "/product" },
      { label: "Gallery", path: "/gallery" },
      { label: "Contact", path: "/contactus" },
    ],
    []
  );

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
            <div className="text-center sm:text-left">  <div className="cursor-pointer"  onClick={ () =>RedirectCall("/")}>   <LazyLoadImage effect="blur" src="/images/logo.webp" alt="logo" className="h-[3.5rem] mx-auto sm:mx-0" /> </div> </div>
  
            <nav className="flex gap-x-8 justify-center my-6 md:my-0">
              {menuItems.map(({ label, path }) => (
                <span key={path}  onClick={() => RedirectCall(path)}   className="cursor-pointer font-heading hover:text-lime-600"  >
                  {label}
                </span>
              ))}
            </nav>

            <div className="flex gap-x-4">
              <li  className="relative flex gap-x-3 rounded-full bg-green-600 hover:bg-green-500 p-2.5 mx-1 cursor-pointer text-gray-50"  onClick={() => CartCall()}> 
                  <MdOutlineShoppingCart size={24} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"> {cartCount}</span>
                </li>
              <button onClick={OpenBrochure} className="flex items-center gap-2 bg-gradient-to-r from-green-700 to-lime-500 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                <span className="text-lg font-chilanka">Download Brochure</span>
                {/* <FaArrowRightLong size={18} className="text-white transition-transform duration-200 group-hover:translate-x-1" /> */}
              </button>
            </div>

          </div>
        </div>
      </div>

      <CartSection cartOpen={cartOpen} onClose={onClose} />

    </>
  );
};

export default Header;