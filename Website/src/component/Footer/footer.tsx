import React, { useCallback, useMemo } from "react";
import { FaLinkedinIn, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

type QuickLink = {
  label: string;
  path: string;
};

type SocialLink = {
  href: string;
  icon: React.ReactNode;
  color: string;
};

const Footer: React.FC = () => {
  const navigate = useNavigate();

  /* -------------------- Constants -------------------- */
  const year = new Date().getFullYear();

  const quickLinks: QuickLink[] = useMemo(
    () => [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Research", path: "/research" },
      { label: "Seeds/Products", path: "/product-category" },
      { label: "Contact", path: "/contactus" },
      { label: "Legal Policies", path: "/terms" },
    ],
    []
  );

  const socialLinks: SocialLink[] = useMemo(
    () => [
      {
        href: "https://wa.me/919063563590",
        icon: <FaWhatsapp size={28} />,
        color: "text-green-500",
      },
      {
        href: "https://www.youtube.com/@AgroGenie",
        icon: <FaYoutube size={28} />,
        color: "text-red-600",
      },
      {
        href: "https://www.linkedin.com/company/agrogenieseeds/",
        icon: <FaLinkedinIn size={28} />,
        color: "text-blue-600",
      },
    ],
    []
  );

  /* -------------------- Handlers -------------------- */
  const redirect = useCallback(
    (path: string) => navigate(path),
    [navigate]
  );

  /* -------------------- JSX -------------------- */
  return (
    <footer className=" relative bg-[#1d4a34] text-gray-100  overflow-hidden">

      <img src="/images/shape-15.png" alt="" className="absolute top-18 right-0 origin-center rotate-45 w-40 md:w-56 opacity-70 pointer-events-none" />
      <img src="/images/shape-14.png" alt="" className="absolute bottom-0 left-0 w-20 md:w-24 opacity-70 pointer-events-none bottom-12" />

      <div className=" relative z-10 container mx-auto px-6 font-semibold py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

          <section>
            <LazyLoadImage effect="blur" src="/images/logo.webp" alt="AgroGenie Logo" className="w-36 md:w-[15rem] mb-4 mx-auto md:mx-0" />

            <div>
              <h2 className="text-2xl font-semibold mb-3 tracking-wide"> AgroGenie Seeds </h2>
              <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
                Every seed packet is filled with magical
                innovation — designed to transform fields into thriving farms.
                Quality you can trust, results you can see.
              </p>
            </div>

            {/* <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map(({ href, icon, color }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={`transition hover:scale-110 ${color}`}  >
                  {icon}
                </a>
              ))}
            </div> */}
          </section>

          {/* Quick Links */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-3 tracking-wide"> Quick Links  </h2>
            <ul className="space-y-4">
              {quickLinks.map(({ label, path }) => (
                <li key={path}>
                  <span onClick={() => redirect(path)} className="cursor-pointer font-normal  hover:underline" >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Address */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 tracking-wide"> Office Address  </h2>

            <address className="not-italic  space-y-1  font-normal">
              <p className="md:text-[1.2rem]"> AgroGenie Ventures LLP  </p>
              <p>B-5, Hariba Vyapar Bhuvan, GPO Road</p>
              <p>Anand - 388001, Gujarat, Bharat</p>
              <p>Customer Care: +91 90635 63590</p>
              <p>Email: touch@agrogenieseeds.com</p>
              <p>Mon – Sat | 10 AM – 6 PM</p>
            </address>
          </section>
        </div>
      </div>

      <div className=" relative z-10 border-t border-white/10 text-center text-sm text-gray-300 py-4">
        © {year}. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
