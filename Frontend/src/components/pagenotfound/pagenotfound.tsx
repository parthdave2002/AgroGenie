/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from "react";
import LOGO from "/images/authentication/404-page.webp"
import { useNavigate } from "react-router";


const PageNotFound: FC = function () {
  const navigate =useNavigate();

  const DashboardCall = () => {
    navigate(-1);
  }

  return (
    <>
        <div className="block items-center p-6 justify-between  sm:flex">
          <div className="flex-1 dark:text-gray-50 text-[3rem] font-semibold text-center"> 
            <p> Page Not Found!!</p>
            <div className="justify-self-center border rounded-full text-[1rem] px-4 py-2 bg-blue-800 text-gray-100 cursor-pointer" onClick={() => DashboardCall()}> Back to Home</div>
          </div>
          <img alt="Flowbite logo" src={LOGO}  className="flex-1 max-h-[36rem] w-9"  />
          
        </div>
    </>
  );
};

export default PageNotFound;
