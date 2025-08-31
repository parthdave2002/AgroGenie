import { FC, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { Button,  Checkbox, Table} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { getCustomerDatalist, BlockCustomer } from "../../Store/actions";
import moment from "moment";
import ToastMessage from "../../components/ToastMessage";
import { FaUserLock, FaUnlock, FaExclamationCircle  } from "react-icons/fa";
import LoaderPage from "../../components/loader";

const CustomerListPage : FC = function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    interface AccessData{
      add: boolean;
      view: boolean;
      edit: boolean;
      delete: boolean;
    }
    const [AccessList, setAccessList] = useState<AccessData>();
    const [loader, setLoader] = useState(false);

    // ----------- next Button  Code Start -------------
      const [UserDataList, setUserDataList] = useState([]);
      const [PageNo, setPageNo] = useState(1);
      const [RoePerPage, setRoePerPage] = useState(5);
    
      const RowPerPage = (event: any) => {
        const value = Number(event)
         setRoePerPage(value);
         setPageNo(1)
       };
      const PageDataList = (data:any) =>{ setPageNo(data)}
    // ------------- Next button Code End -------------
    
    // ---------------- Search User code start ----------------
        const [searchData, setSearchData] = useState(null);
        const Changename = (data:any) =>{
            setSearchData(data)
        }
    // ---------------- Search User code end ----------------

    // ------------- Get  Data From Reducer Code Start --------------
      const { Customerlist,  UserListSize, TotalUserListData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
        Customerlist: state.Customer.Customerlist,
          UserListSize: state.Customer.CustomerlistSize,
          TotalUserListData: state.Customer.TotalCustomerData,
          CurrentPage: state.Customer.CurrentPage,
          permissionsdata: state.Login.permissionsdata
        }));

      const [TotalListData, setTotalListData] = useState(0);
      const [CurrentPageNo, setCurrentPageNo] = useState(0);
      
      useEffect(() => {
        setUserDataList(Customerlist ? Customerlist  : null);
        setTotalListData(TotalUserListData ? TotalUserListData : 0);
        setCurrentPageNo(CurrentPage ? CurrentPage : 1);
        setLoader(false)
      }, [Customerlist,  TotalUserListData, UserListSize, CurrentPage]);
    //  ------------- Get  Data From Reducer Code end --------------

    useEffect(() =>{
      let requserdata: { page: number; size: number; search?: string } = {
        page: PageNo,
        size: RoePerPage
      };
      if (searchData)  requserdata.search = searchData;
      dispatch(getCustomerDatalist(requserdata))
      setLoader(true)
    },[dispatch, searchData,PageNo, RoePerPage ])

    useEffect(() =>{
        const user = Cookies.get("role");
        if (user === "67b388a7d593423df0e24295") {
          setAccessList({
            add: true,
            view: true,
            edit: true,
            delete: true,
          })
        }
        else{
          const userPermissions = permissionsdata && permissionsdata?.find( (item:any) => item.module_name === "Customer")?.permissions;
          setAccessList(userPermissions || [])
        }
      },[permissionsdata]);
    
    // --------- Checkbox Code start ------------
      const CheckData = (data:any) =>{
        console.log(data)
      }
    // --------- Checkbox Code end ------------
  
    const BlockUserCall = (id : string) =>{
      dispatch(BlockCustomer({id:id}))
    }

    const DetailsCustomerCall= (id:string) =>{
        navigate(`/customer/details/${id}`)
      }

    let Name = "Customer List";
    let Searchplaceholder = "Search For Customers (Name)";

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
              {loader ? <LoaderPage /> :

                <>
                <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} />
                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                    <Table.Head className="bg-gray-100 dark:bg-gray-700">
                        <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Phone</Table.HeadCell>
                        <Table.HeadCell>District</Table.HeadCell>
                        <Table.HeadCell>Taluka</Table.HeadCell>
                        <Table.HeadCell>Village</Table.HeadCell>
                        <Table.HeadCell>Created At</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                        {UserDataList && UserDataList.map((item: any, k) => (
                                <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                                  <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }}>  <Checkbox  value={item?._id} onClick={() => {CheckData(item._id)}}/>  </Table.Cell>
                                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer truncate max-w-[15rem]" onClick={() => DetailsCustomerCall(item?._id)}>  {item?.firstname} {item?.middlename} {item?.lastname} </Table.Cell>
                                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.mobile_number} </Table.Cell>
                                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.district_name} </Table.Cell>
                                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.taluka_name} </Table.Cell>
                                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.village_name} </Table.Cell>
                                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment (item?.added_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                                  <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                                      {item.is_deleted == true ?  <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div> Deactive  </div> :   <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active  </div> }
                                  </Table.Cell>
                                  <Table.Cell className="space-x-2 whitespace-nowrap py-0">
                                      <div className="flex items-center gap-x-3">
                                        {AccessList?.delete ?  <Button  gradientDuoTone="purpleToPink" onClick={() => BlockUserCall(item._id)}><div className="flex items-center gap-x-2 deletebutton min-w-[5rem] text-center font-semibold">  {item?.is_deleted == true ? <FaUnlock className="text-lg" /> :  <FaUserLock className="text-xl" />  }  {item.is_deleted == true ? "Unblock"  :  "Block" }  </div> </Button> : null }  
                                        <Button  gradientDuoTone="purpleToBlue" onClick={() => DetailsCustomerCall(item._id)}><div className="flex items-center gap-x-2 deletebutton"> <FaExclamationCircle className="text-lg" /> Detail Customer  </div> </Button>
                                      </div>
                                  </Table.Cell>
                                </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}   RowsPerPageValue={RoePerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
                </>
                }
            </NavbarSidebarLayout>

            <ToastMessage />
        </>
    );
}

export default CustomerListPage;