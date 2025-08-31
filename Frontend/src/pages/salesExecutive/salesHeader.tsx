import { FC} from "react";
import {  FaAccessibleIcon, FaCapsules, FaOpencart } from "react-icons/fa";
import { MdGridView  } from "react-icons/md";
import { BiShocked } from "react-icons/bi";

interface PropsData{
  setDatactive :any;
  openProfile: boolean;
  active : string;
}

const SalesHeaderPage : FC<PropsData> = function ({ active, setDatactive, openProfile}) {
    // const menuItems = [
    //   { name: "Dashboard", icon: <MdGridView size={20}  /> },
    //   { name: "Farmer", icon: <FaAccessibleIcon   size={20}  /> },
    //   { name: "Products", icon: <FaCapsules   size={20}  /> },
    //   { name: "Order", icon: <FaOpencart   size={20}  /> },
    //   { name: "Complain", icon: <BiShocked   size={20}  /> },
    // ];


        const menuItems = [
      { name: "Dashboard", icon: <img src="/images/icon/dashboard.webp" alt="Dashboard" width={30} height={30} /> },
      { name: "Farmer", icon: <img src="/images/icon/farmer.webp" alt="Farmer" width={30} height={30} />},
      { name: "Products", icon: <img src="/images/icon/product.webp" alt="Product" width={30} height={30} /> },
      { name: "Order", icon: <img src="/images/icon/order.webp" alt="Order" width={30} height={30} /> },
      { name: "Complain", icon: <img src="/images/icon/complain.webp" alt="Complain" width={30} height={30} /> },
    ];


    return (
      <div className="flex justify-end  ">
        <div className=" flex  gap-x-4  justify-center"  >
            {menuItems.map((item:any, k:number) => (
              <div key={k} >
                {openProfile ?
                  <li  key={item.name}  className={`relative flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer transition-all font-medium text-sm ${ active === item.name  ? "bg-blue-100 text-blue-600"   : "text-gray-300 dark:text-gray-500 dark:hover:text-gray-600  dark:hover:bg-gray-800"  }`} >
                    {item.icon}
                    <span className="text-[1rem]">{item.name}</span>
                  </li>
                  :
                    <li key={item.name} className={`relative flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer transition-all font-medium text-sm ${active === item.name ? "bg-blue-100 text-blue-600" : "text-gray-600 dark:text-gray-100 dark:hover:text-blue-600 hover:bg-blue-100"}`}   onClick={() => setDatactive(item.name)}  >
                      {item.icon}
                      <span className="text-[1rem]">{item.name}</span>
                    </li>
                }
              </div>
            ))}
        </div>
      </div>
    );
}

export default SalesHeaderPage;