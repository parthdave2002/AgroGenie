import type { FC, PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import { Menu } from "@headlessui/react";
import logo from "/images/authentication/logo.webp";
import { Modal } from "flowbite-react";
import userphoto from "/images/authentication/logo.webp";
import { Button } from "reactstrap";
import { IoIosSearch } from "react-icons/io";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { resetinsertlogin } from "../../../Store/actions";

interface NavbarSidebarLayoutProps {
  isNavbar?: boolean;
  isAppbar?: boolean;
}

const ExampleNavbar: FC<PropsWithChildren<NavbarSidebarLayoutProps>> =
  function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);

    const Logoutfun = () => {
      Cookies.remove("token");
      Cookies.remove("username");
      Cookies.remove("access");
      Cookies.remove("role");
      Cookies.remove("userType");
      navigate("/login");
      dispatch(resetinsertlogin());
    };

    const Prodilefun = () => {
      navigate("/profile")
    }

    const handleNavigationdashboard = () =>{
        navigate("/dashboard");
    }

     const [LoginUserimg, setLoginUserimg] = useState("");
     const login = useSelector((state:any) => state.Login.Logincode);
     const Profileuserdata = useSelector((state:any) =>  state.User.Profileuserdata);
   
     useEffect(() => {
       setLoginUserimg( Profileuserdata?.data?.user_pic ? Profileuserdata?.data?.user_pic  :  login?.data?.user_img?.user_pic ? login?.data?.user_img?.user_pic : userphoto);
     }, [login]);
     
    return (
      <Navbar fluid className="px-4">
        <div className="w-full ">
          <div className="flex items-center justify-between">
              <div className="flex items-center">
                  <Navbar.Brand onClick={handleNavigationdashboard}>
                    <img alt="logo" src={logo} className="mr-3 h-6 sm:h-10 ml-16 cursor-pointer" />
                  </Navbar.Brand>
              </div>

             
              <div className="flex items-center gap-[1rem]">

                <DarkThemeToggle />
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-TranquilBlack">
                      <button
                        id="dropdownUserAvatarButton"
                        data-dropdown-toggle="dropdownAvatar"
                        className="flex text-sm bg-Cosmos rounded-full md:mr-0 focus:ring-4 focus:ring-SoothingBlueGrey dark:focus:ring-Hydrocarbon"
                        type="button"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img  className="w-8 h-8 rounded-full"  src={LoginUserimg}  alt="user photo"  />
                      </button>
                    </Menu.Button>
                  </div>

                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-White py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  dark:bg-black">
                      <Menu.Item>
                        <Button onClick={() => { Prodilefun()}} className="block px-4 py-2 text-sm text-TranquilBlack hover:bg-TitaniumWhite  min-w-full text-start dark:hover:bg-Hydrocarbon dark:text-WhiteMarble  dark:hover:text-White" > Profile </Button>
                      </Menu.Item>
                      
                      <Menu.Item>
                        <Button onClick={() => { Logoutfun()}} className="block px-4 py-2 text-sm text-TranquilBlack hover:bg-TitaniumWhite  min-w-full text-start dark:hover:bg-Hydrocarbon dark:text-WhiteMarble  dark:hover:text-White" > Sign out </Button>
                      </Menu.Item>
                    </Menu.Items>
                </Menu>
              </div>
          </div>
        </div>

        <Modal
          className="min-h-full max-h-40 backdrop-blur-sm  bg-black text-blue-500  "
          onClose={() => setOpen(false)}
          show={isOpen}
        >
          <form>
            <div className="relative shadow-2xl">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IoIosSearch  className="w-5 h-5 text-SharkGray dark:text-SilverSteel "   />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-DarkBackground border border-SoothingBlueGrey rounded-lg bg-White focus:ring-blue-500 focus:border-blue-500 dark:bg-TranquilBlack dark:border-Hydrocarbon dark:placeholder-SilverSteel dark:text-White dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
                className="text-White absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </Navbar>
    );
  };

export default ExampleNavbar;
