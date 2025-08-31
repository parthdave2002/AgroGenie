import type { FC, PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import { Menu, Transition } from "@headlessui/react";
import logo from "../img/logo.webp";
import { Modal } from "flowbite-react";
import userphoto from "../img/profile-picture-3.jpg";
import { Button } from "reactstrap";
import { IoIosSearch } from "react-icons/io";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { resetinsertlogin } from "../Store/actions";
const IMG_URL = import.meta.env["VITE_API_URL"];

interface NavbarSidebarLayoutProps {
  isNavbar?: boolean;
  isAppbar?: boolean;
}

interface UserImage{
  user_pic: string;
  _id: string;
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
      navigate("/login");
      dispatch(resetinsertlogin());
    };

    const Prodilefun = () => {
      navigate("/profile")
    }

    const handleNavigationdashboard = () =>{
      const role = Cookies.get("role");
      if(role === "685c305069eaa1084c92c5fe"){
        navigate("/warehouse");
      }else{
        navigate("/dashboard");
      }

    }

     const [LoginUserimg, setLoginUserimg] = useState<UserImage>();
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
                    <Menu.Button className="flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <button
                        id="dropdownUserAvatarButton"
                        data-dropdown-toggle="dropdownAvatar"
                        className="flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        type="button"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img  className="w-8 h-8 rounded-full"  src={`${IMG_URL}/public/user/${LoginUserimg}`}  alt="user photo"  />
                      </button>
                    </Menu.Button>
                  </div>

                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  dark:bg-black">
                      <Menu.Item>
                        <Button onClick={() => { Prodilefun()}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  min-w-full text-start dark:hover:bg-gray-600 dark:text-gray-200  dark:hover:text-white" > Profile </Button>
                      </Menu.Item>
                      
                      <Menu.Item>
                        <Button onClick={() => { Logoutfun()}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  min-w-full text-start dark:hover:bg-gray-600 dark:text-gray-200  dark:hover:text-white" > Sign out </Button>
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
                <IoIosSearch  className="w-5 h-5 text-gray-500 dark:text-gray-400 "   />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
