import type { FC } from "react";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight,HiViewList,HiPhone   } from "react-icons/hi";
import { FcPlanner } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const CommonSidebarPage: FC = function () {
    const navigate=useNavigate();

    const [open, setOpen] = useState(true);
    const Menus = [
      { title: "Files ", src: "React", gap: true},
      { title: "Dashboard", src: "notification" },
      { title: "Inbox", src: "Setting" },
      { title: "Accounts", src: "Message" },
      { title: "Analytics", src: "Chart" },
      { title: "Schedule ", src: "Calendar" },
    ];

    const plannercall = ()=>{
        navigate('/planner')
    }
    const kpicall = () => {
        navigate('/kpi');
    }
    const dialercall = () => {
        navigate('/dialer');
    }

  return (
    <>
     
     <div className="flex ">
      <div className={` ${ open ? "w-14" : "w-6"  } bg-dark-purple h-screen p-1 pt-8 relative duration-300 border-r-2 border-gray-200  rounded-md ` }>

        <HiChevronLeft  className={`absolute cursor-pointer -right-3 top-9 w-7 bg-Platinum h-[2rem]  ${!open && "rotate-180"}`}  onClick={() => setOpen(!open)}/>
        <ul className="pt-16">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 pt-3
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={`../images/users/${Menu.src}.png`} className="h-[2rem] w-7" />
            </li>
          ))}
           {open && (
            <li>
                <HiPhone size={34} className="mt-4 w-12" onClick={() => dialercall()}/>
                <FcPlanner size={40} className="mt-4 w-12" onClick={() => plannercall()}/>
                <HiViewList size={35} className="mt-4 w-12" onClick={() => kpicall()}/>
            </li>
           
            )}

        </ul>
      </div>
      
    </div>
      
    </>
  );
};

export default CommonSidebarPage;
