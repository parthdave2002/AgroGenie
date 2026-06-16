import { useRef, useState, type FC ,type PropsWithChildren } from "react";
import {  Breadcrumb,  Button,} from "flowbite-react";
import { Input } from "reactstrap";
import {  HiCog, HiDotsVertical, HiExclamationCircle, HiHome,  HiPlus, HiTrash} from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface NavbarSidebarLayoutProps {
  Name?: any;
  Searchplaceholder?: any;
  searchData?: any;
  Changename ?: any;
  AcccessData ?: any;
  isOpenAddModel ?: any;
  AddAccess?: boolean;
  ParentName?: String;
  ParentLink?: any;
}

const ExampleBreadcrumb: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = function ({Name, Searchplaceholder, searchData, Changename, AcccessData, isOpenAddModel, AddAccess, ParentName, ParentLink }) {

  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = useState(searchData || "");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setInputRef = (el: any) => {
    if (el && el instanceof HTMLElement) {
      inputRef.current = el as HTMLInputElement;
    } else if (el && el.inputRef && el.inputRef instanceof HTMLElement) {
      inputRef.current = el.inputRef as HTMLInputElement;
    } else if (el && el.inputRef && el.inputRef.current instanceof HTMLElement) {
      inputRef.current = el.inputRef.current as HTMLInputElement;
    }
  };

   const DataChange = (e: any) => {
    const value = e.target.value;
    setLocalSearch(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      Changename(value);
    }, 3000);
  };
  
  const OpenAddModel = () =>{
    isOpenAddModel(true)
  }

  const handleNavigation = () =>{
    if (ParentLink) {
      navigate(ParentLink);
    }
  }

  const handleNavigationdashboard = () =>{
    navigate("/dashboard");
  }

  return (
    <>
      <div className="block items-center justify-between border-b border-WhiteMarble bg-White p-4 dark:border-TranquilBlack dark:bg-Cosmos sm:flex">
          <div className="mb-1 w-full">
            <div className="mb-3">
              <Breadcrumb className="mb-4">
                <Breadcrumb.Item  onClick={handleNavigationdashboard}>
                    <div className="flex items-center gap-x-3 cursor-pointer">
                      <HiHome className="text-xl" />
                      <span className="dark:text-White">Home</span>
                    </div>
                </Breadcrumb.Item>

                {ParentName && ParentLink ?
                  <Breadcrumb.Item  onClick={handleNavigation} >
                    <div className="flex items-center gap-x-3 cursor-pointer">
                      <span className="dark:text-White">{ParentName}</span>
                    </div>
                  </Breadcrumb.Item>
                : null
                }
               
                <Breadcrumb.Item>{Name}</Breadcrumb.Item>
              </Breadcrumb>
              <h1 className="text-xl font-semibold text-DarkBackground dark:text-White sm:text-2xl"> {Name}  </h1>
            </div>
            <div className="sm:flex">
              {Searchplaceholder && 
                <div className="mb-3 hidden items-center dark:divide-TranquilBlack sm:mb-0 sm:flex sm:divide-x sm:divide-TitaniumWhite">
                <form className="lg:pr-3">
                  
                  <div className="relative mt-1 lg:w-64 xl:w-96">
                    <Input
                      id="Search_Module"
                      name="Search_Module"
                      className="bg-White border border-SoothingBlueGrey dark:bg-TranquilBlack dark:border-Hydrocarbon dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-SilverSteel dark:text-White disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-DarkBackground text-sm w-full"
                      placeholder={Searchplaceholder}
                      type="text"
                      onChange={DataChange}
                      value={localSearch}
                       ref={setInputRef}
                    />
                  </div>
                </form>
                <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                  <a
                    href="#"
                    className="inline-flex cursor-pointer justify-center rounded p-1 text-SharkGray hover:bg-TitaniumWhite hover:text-DarkBackground dark:text-SilverSteel dark:hover:bg-TranquilBlack dark:hover:text-White"
                  >
                    <span className="sr-only">Configure</span>
                    <HiCog className="text-2xl" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex cursor-pointer justify-center rounded p-1 text-SharkGray hover:bg-TitaniumWhite hover:text-DarkBackground dark:text-SilverSteel dark:hover:bg-TranquilBlack dark:hover:text-White"
                  >
                    <span className="sr-only">Delete</span>
                    <HiTrash className="text-2xl" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex cursor-pointer justify-center rounded p-1 text-SharkGray hover:bg-TitaniumWhite hover:text-DarkBackground dark:text-SilverSteel dark:hover:bg-TranquilBlack dark:hover:text-White"
                  >
                    <span className="sr-only">Purge</span>
                    <HiExclamationCircle className="text-2xl" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex cursor-pointer justify-center rounded p-1 text-SharkGray hover:bg-TitaniumWhite hover:text-DarkBackground dark:text-SilverSteel dark:hover:bg-TranquilBlack dark:hover:text-White"
                  >
                    <span className="sr-only">Settings</span>
                    <HiDotsVertical className="text-2xl" />
                  </a>
                </div>
              </div>
              }
              
              <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
                {AddAccess  ? 
                  <Button gradientDuoTone="purpleToPink"  onClick={() => OpenAddModel()} ><div className="flex items-center gap-x-3"> <HiPlus className="text-xl " />  Add {Name}  </div> </Button>
                : null }
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default ExampleBreadcrumb;