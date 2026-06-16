// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { FaEnvelope,  FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaYoutube } from "react-icons/fa";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import CartSection from "../../pages/Cart/Cart";
// import { useNavigate } from "react-router-dom";
// import { LazyLoadImage } from 'react-lazy-load-image-component';

// type MenuItem = {
//   label: string;
//   path: string;
// };

// const Header: React.FC = () => {
//   const nagivate = useNavigate()
  
//   const [cartOpen, setCartOpen] = useState(false);
//   const onClose = () => setCartOpen(false)
//   const CartCall = () => setCartOpen(true)

//   const RedirectCall = (data: string) => {
//     nagivate(data)
//   }

//     /* -------------------- Menu Config -------------------- */
//   const menuItems: MenuItem[] = useMemo(
//     () => [
//       { label: "Home", path: "/" },
//       { label: "About", path: "/about" },
//       { label: "Research", path: "/research" },
//       { label: "Seeds/Products", path: "/product" },
//       { label: "Gallery", path: "/gallery" },
//       { label: "Contact", path: "/contactus" },
//     ],
//     []
//   );

//   const [cartCount, setCartCount] = useState(0);
//   useEffect(() => {
//     const loadCart = () => {
//       const storedCart = localStorage.getItem("product");
//       if (storedCart) {
//         const cartItems = JSON.parse(storedCart);
//         setCartCount(cartItems?.length);
//       } else {
//         setCartCount(0);
//       }
//     };

//     loadCart();
//     window.addEventListener("cartChanged", loadCart);

//     return () => {
//       window.removeEventListener("cartChanged", loadCart);
//     };
//   }, []);

//   const OpenBrochure = () => {
//     window.open("/pdf/brochure.pdf", "_blank");
//   };

//   return (
//     <>
//       <div className="w-full  bg-White ">

//         <div className="flex flex-wrap justify-between items-center bg-White px-6 py-2 text-Hydrocarbon">
//           <div className="flex flex-wrap items-center gap-4 font-heading">
//             <div className="flex items-center gap-2">
//               <FaMapMarkerAlt className="text-lime-500" />
//               <span> Anand, Gujarat 388001</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaPhoneAlt className="text-lime-500" />
//               <a href="tel:+919824153954" className="hover:text-lime-500">+91 90635 63590</a>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaEnvelope className="text-lime-500" />
//               <a href="mailto:touch@agrogenieseeds.com" className="hover:text-lime-500">touch@agrogenieseeds.com</a>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 font-heading">
//             <span>Follow Us:</span>
//             <div className="flex gap-x-4">
//               {/* <a target="_blank" href="#" className="hover:text-green-700"><FaFacebookF /></a>
//               <a target="_blank" href="#" className="hover:text-green-700"><FaInstagram /></a> */}
//               <a target="_blank" href="https://wa.me/919063563590?text=Namastey%2C%0APlease%20share%20information%20about%20AgroGenie%20Seeds.%0AJay%20Hind%21%21%21" className="hover:text-lime-500"><FaWhatsapp size={20} /></a>
//               <a target="_blank" href="https://www.youtube.com/@AgroGenie" className="hover:text-lime-500"><FaYoutube size={20} /></a>
//               <a target="_blank" href="https://www.linkedin.com/company/agrogenieseeds/?viewAsMember=true"  className="hover:text-lime-500"><FaLinkedinIn size={20} /></a>

//             </div>
//           </div>
//         </div>

//         <div className="container border-b border-TitaniumWhite mx-auto  py-3">
//           <div className="md:flex flex-wrap items-center justify-between gap-4">
//             <div className="text-center sm:text-left">  <div className="cursor-pointer"  onClick={ () =>RedirectCall("/")}>   <LazyLoadImage effect="blur" src="/images/logo.webp" alt="logo" className="h-[3.5rem] mx-auto sm:mx-0" /> </div> </div>
  
//             <nav className="flex gap-x-8 justify-center my-6 md:my-0">
//               {menuItems.map(({ label, path }) => (
//                 <span key={path}  onClick={() => RedirectCall(path)}   className="cursor-pointer font-heading hover:text-lime-600"  >
//                   {label}
//                 </span>
//               ))}
//             </nav>

//             <div className="flex gap-x-4">
//               <li  className="relative flex gap-x-3 rounded-full bg-green-600 hover:bg-green-500 p-2.5 mx-1 cursor-pointer text-White"  onClick={() => CartCall()}> 
//                   <MdOutlineShoppingCart size={24} />
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-White text-xs w-5 h-5 flex items-center justify-center rounded-full"> {cartCount}</span>
//                 </li>
//               <button onClick={OpenBrochure} className="flex items-center gap-2 bg-gradient-to-r from-green-700 to-lime-500 text-White font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
//                 <span className="text-lg font-chilanka">Download Brochure</span>
//                 {/* <FaArrowRightLong size={18} className="text-White transition-transform duration-200 group-hover:translate-x-1" /> */}
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>

//       <CartSection cartOpen={cartOpen} onClose={onClose} />

//     </>
//   );
// };

// export default Header;


import React, { useEffect, useMemo, useState } from "react";
import {
  FaEnvelope,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import CartSection from "../../pages/Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { getCategorylist } from "../../Store/actions";

/* ================= TYPES ================= */
type MenuItem = {
  label: string;
  path: string;
  hasDropdown?: boolean;
};

type DropdownItem = {
  _id: string;
  name_eng: string;
  category_pic : string;
};

/* ================= DATA ================= */
// const productDropdown: DropdownItem[] = [
//   { label: "Vegetable Seeds", path: "/product/vegetable" },
//   { label: "Field Crop Seeds", path: "/product/field" },
//   { label: "Hybrid Seeds", path: "/product/hybrid" },
// ];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const RedirectCall = (path: string) => {
    navigate(path);
  };

  const DropdownRedirect = (data: string, id: string ) => {
    if (data != null) {
      navigate(`/product/${data}/${id}`);
    }
  }

  const OpenBrochure = () => {
    window.open("/pdf/brochure.pdf", "_blank");
  };

  /* ================= MENU ================= */
  const menuItems: MenuItem[] = useMemo(
    () => [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Research", path: "/research" },
      {
        label: "Seeds / Products",
        path: "/product-category",
        hasDropdown: true,
      },
      { label: "Gallery", path: "/gallery" },
      { label: "Contact", path: "/contactus" },
    ],
    []
  );

  /* ================= CART COUNT ================= */
  useEffect(() => {
    const loadCart = () => {
      const storedCart = localStorage.getItem("product");
      if (storedCart) {
        const cartItems = JSON.parse(storedCart);
        setCartCount(cartItems?.length || 0);
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

  const [categoryList, setCategoryList] = useState<DropdownItem[]>([])

  useEffect(() => {
    let requser ={
        page: 1,
        size : 25
    }
    dispatch(getCategorylist(requser))
  }, [dispatch])

  const categorydetail: any = useSelector((state: any) => state.Category.Categorylist);

  useEffect(() => {
    setCategoryList(categorydetail)
  }, [categorydetail])

  return (
    <>

      <div className="w-full bg-White">
        <div className="flex flex-col md:flex-row md:justify-between gap-3 bg-White px-4 md:px-6 py-2 text-Hydrocarbon text-sm">
          <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-lime-500" />
              <span>Anand, Gujarat 388001</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-lime-500" />
              <a  href="https://wa.me/919063563590" target="_blank" rel="noopener noreferrer" className="hover:text-lime-500"> +91 90635 63590 </a>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-lime-500" />
              <a  href="https://mail.google.com/mail/?view=cm&fs=1&to=touch@agrogenieseeds.com" target="_blank" rel="noopener noreferrer"   className="hover:text-lime-500" >  touch@agrogenieseeds.com  </a>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-4">
            <span>Follow Us:</span>
            <div className="flex gap-4">
              <a href="https://wa.me/919063563590" target="_blank"  rel="noreferrer"   className="hover:text-lime-500" >
                <FaWhatsapp />
              </a>
              <a href="https://www.youtube.com/@AgroGenie"  target="_blank"  rel="noreferrer"  className="hover:text-lime-500">
                <FaYoutube />
              </a>
              <a  href="https://www.linkedin.com/company/agrogenieseeds/" target="_blank"  rel="noreferrer"  className="hover:text-lime-500" >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* ================= MAIN HEADER ================= */}
        <div className="container mx-auto border-b border-TitaniumWhite px-4 py-3">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <div className="cursor-pointer" onClick={() => RedirectCall("/")}>
              <LazyLoadImage src="/images/logo.webp" effect="blur" alt="logo"  className="h-12" />
            </div>

            {/* ================= DESKTOP MENU ================= */}
            <nav className="hidden md:flex gap-x-8">
              {menuItems.map(({ label, path, hasDropdown }) => {
                if (!hasDropdown) {
                  return (
                    <span key={path}   onClick={() => RedirectCall(path)}   className="cursor-pointer hover:text-lime-600"  >  {label}   </span>
                  );}

                return (
                  <div key={path} className="relative group">

                    <span onClick={() => RedirectCall(path)}  className="cursor-pointer hover:text-lime-600 flex items-center gap-1" > {label} </span>

                    {/* DROPDOWN (DESKTOP ONLY) */}
                    <div  className=" absolute left-0 top-full mt-3 w-56  bg-White border border-TitaniumWhite  shadow-lg rounded-lg opacity-0 invisible  group-hover:opacity-100 group-hover:visible transition-all duration-200 hidden md:block z-50 ">
                      {categoryList && categoryList?.map((item) => (
                        <div key={item?._id} onClick={() => DropdownRedirect(item?.name_eng, item?._id)}  className="px-4 py-2 text-sm cursor-pointer hover:bg-lime-50 hover:text-lime-600 flex gap-x-3" >
                           <div className=" flex items-center justify-center  transition "><LazyLoadImage effect="blur"   src={item?.category_pic} alt={item?.name_eng} className=" object-contain rounded-full  h-[2rem] w-[2rem]" />  </div>
                           <div className="font-semibold text-[1rem] self-center"> {item?.name_eng}   </div>
                          </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* ================= DESKTOP ACTIONS ================= */}
            <div className="hidden md:flex items-center gap-4">
              <div className="relative bg-green-600 hover:bg-green-700 p-2.5 rounded-full cursor-pointer text-White" onClick={() => setCartOpen(true)}>
                <MdOutlineShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              </div>

              <button onClick={OpenBrochure}  className="bg-gradient-to-r from-green-700 to-lime-500 text-White px-4 py-2 rounded-full text-sm  hover:shadow-lg hover:scale-105 transition-all duration-100" > Download Brochure </button>
            </div>

            {/* ================= MOBILE MENU BUTTON ================= */}
            <button  className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}  >  ☰  </button>
          </div>

          {/* ================= MOBILE MENU ================= */}
          {menuOpen && (
            <div className="md:hidden mt-4 bg-White shadow-lg rounded-lg p-4 space-y-4">
              {menuItems.map(({ label, path }) => (
                <div  key={path}  onClick={() => { RedirectCall(path);  setMenuOpen(false); }}  className="cursor-pointer hover:text-lime-600"  >
                  {label}
                </div>
              ))}

              <div className="flex gap-4 pt-4">
                <button  onClick={() => setCartOpen(true)} className="flex items-center gap-2 bg-green-600 text-White px-4 py-2 rounded-full" >
                  <MdOutlineShoppingCart />
                  {cartCount}
                </button>

                <button  onClick={OpenBrochure} className="bg-lime-600 text-White px-4 py-2 rounded-full"  >
                  Brochure
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= CART ================= */}
      <CartSection cartOpen={cartOpen}   onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;