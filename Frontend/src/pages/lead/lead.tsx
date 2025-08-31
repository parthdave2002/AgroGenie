import { FC, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { Button,   Modal, Table} from "flowbite-react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FormFeedback, Input } from "reactstrap";
import { GiCheckMark } from "react-icons/gi";
import { getleadlist } from "../../Store/actions";
import moment from "moment";
import ExamplePagination from "../../components/pagination";
const LeadListPage : FC = function () {
  const dispatch = useDispatch();
    // ----------- next Button  Code Start -------------
      const [UserDataList, setUserDataList] = useState([]);
      const [PageNo, setPageNo] = useState(1);
      const [RoePerPage, setRoePerPage] = useState(5);
    
      const RowPerPage = (value: any) => { setRoePerPage(value)};
      const PageDataList = (data:any) =>{ setPageNo(data)}
    // ------------- Next button Code End -------------
    
    // ---------------- Search User code start ----------------
        const [searchData, setSearchData] = useState(null);
        const Changename = (data:any) =>{
            setSearchData(data)
        }
    // ---------------- Search User code end ----------------

    // ------------- Get  Data From Reducer Code Start --------------
    const  Leaddatalist= useSelector((state: any) => state.Lead.Leaddatalist)

      const [TotalListData, setTotalListData] = useState(0);
      const [CurrentUserListSize, setCurrentUserListSize] = useState();
      const [CurrentPageNo, setCurrentPageNo] = useState(0);
      
      useEffect(() => {
        setUserDataList(Leaddatalist ? Leaddatalist.data  : null);
        setTotalListData(Leaddatalist?.totalData  ? Leaddatalist?.totalData  : 0);
        setCurrentUserListSize(Leaddatalist?.size ? Leaddatalist.size : 0);
        setCurrentPageNo(Leaddatalist?.page ? Leaddatalist?.page : 1);
      }, [Leaddatalist]);
    //  ------------- Get  Data From Reducer Code end --------------

     //---------------- Satus option code start ----------------
     const [selectedStatusOption, setSelectedStatusOption] = useState(null);
     const [selectedStatusid, setSelectedStatusid] = useState<string>("");
     const IsActivedata = (data: any) => {
       if (!data) {
           setSelectedStatusid("");
           setSelectedStatusOption(null);
       } else {
           setSelectedStatusid(data.value);
           setSelectedStatusOption(data);
       }
     };
 
     const isactiveoption = [
       { label : "Contact Us Page", value:"contactus" },
       { label : "Help Page", value:"help" },
       { label : "Order", value:"order" }
     ]
   //---------------- Satus option code end ----------------


    let Name = "Lead List";
    let Searchplaceholder = "Search For Lead";

    const [isOpenDelteModel, setisOpenCommentModel] = useState(false);
    const OpenDesModal = () => {
      setcommentData("");
      setisOpenCommentModel(true)
    }

    const [ commentData, setcommentData] = useState("");
    const [ commentDataValidation, setcommentDataValidation] = useState(0);

    const CommentAddCall = ()  => {
      if(commentData == ""){
        setcommentDataValidation(1)
      }else{
        setcommentDataValidation(0)
      // dispatch(AddRoleslist(requserData));
      setisOpenCommentModel(false);
      }
    }

    const DataChange = (e:any) => {
      setcommentDataValidation(0);
      setcommentData(e.target.value);
    }

  useEffect(() => {
    let requserdata: { page: number; size: number; search?: string; type:string } = {
      page: PageNo,
      size: RoePerPage,
      type :selectedStatusid
    };
    if (searchData) requserdata.search = searchData;
    if(selectedStatusid) dispatch(getleadlist(requserdata));
  }, [dispatch, PageNo, RoePerPage, searchData, selectedStatusid]);


  console.log("UserDataList", UserDataList);
  

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} />

                <div className="bg-white dark:bg-gray-800 p-4 flex gap-x-4">
                  <Select
                    className="w-[15rem] dark:text-white"
                    classNames={{
                      control: () => "react-select__control",
                      singleValue: () => "react-select__single-value",
                      menu: () => "react-select__menu",
                      option: ({ isSelected }) =>
                        isSelected ? "react-select__option--is-selected" : "react-select__option",
                      placeholder: () => "react-select__placeholder",
                    }}
                    value={selectedStatusOption}
                    onChange={(e) => { IsActivedata(e) }}
                    options={isactiveoption}
                    isClearable={true}
                  />
                </div>
                
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                  {selectedStatusid === "order" ?
                    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                      <Table.Head className="bg-gray-100 dark:bg-gray-700">
                          <Table.HeadCell>Name</Table.HeadCell>
                          <Table.HeadCell>Phone number</Table.HeadCell>
                          <Table.HeadCell>Created Date</Table.HeadCell>
                          <Table.HeadCell>Status</Table.HeadCell>
                          {/* <Table.HeadCell>Actions</Table.HeadCell> */}
                      </Table.Head>

                      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                        {UserDataList && UserDataList.map((item: any, k) => (
                          <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                    
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white">  {item?.name} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white">  {item?.mobile_number} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white">  {moment(item.added_at).format("DD-MM-YYYY hh:ss:mm")} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white">  {item?.status}  </Table.Cell>
                            {/* <Table.Cell className="space-x-2 whitespace-nowrap py-0"> {item?.status == "pending" ?    <div className="flex items-center gap-x-3">   <Button gradientDuoTone="purpleToPink" onClick={() => OpenDesModal()}><div className="flex items-center gap-x-2 deletebutton"> <IoCheckmarkDoneSharp className="text-lg" /> Mark As Done </div> </Button>   </div> : "-"}  </Table.Cell> */}
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>

                  :selectedStatusid === "help" ?

                    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                      <Table.Head className="bg-gray-100 dark:bg-gray-700">
                          <Table.HeadCell>Name</Table.HeadCell>
                          <Table.HeadCell>Phone Number</Table.HeadCell>
                          <Table.HeadCell>Comment</Table.HeadCell>
                          <Table.HeadCell>Created At</Table.HeadCell>
                          <Table.HeadCell>Status</Table.HeadCell>
                          {/* <Table.HeadCell>Actions</Table.HeadCell> */}
                      </Table.Head>

                      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                        {UserDataList && UserDataList.map((item: any, k) => (
                          <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                    
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.name} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.mobile_number} </Table.Cell>
                            <Table.Cell className="truncate max-w-[15rem] text-base font-medium text-gray-900 dark:text-white py-0">  {item?.comment} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {moment(item.added_at).format("DD-MM-YYYY hh:ss:mm")} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.status} </Table.Cell>
                            {/* <Table.Cell className="space-x-2 whitespace-nowrap py-0">  {item?.status == "pending" ?   <div className="flex items-center gap-x-3"> <Button gradientDuoTone="purpleToPink" onClick={() => OpenDesModal()}><div className="flex items-center gap-x-2 deletebutton"> <IoCheckmarkDoneSharp className="text-lg" /> Mark As Done </div> </Button>  </div>  : "-"} </Table.Cell> */}
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                
                  :selectedStatusid === "contactus" ?

                    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                        <Table.Head className="bg-gray-100 dark:bg-gray-700">
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Reason</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Phone</Table.HeadCell>
                            <Table.HeadCell>Comment</Table.HeadCell>
                            <Table.HeadCell>Created At</Table.HeadCell>
                            <Table.HeadCell> Status</Table.HeadCell>
                            {/* <Table.HeadCell>Actions</Table.HeadCell> */}
                        </Table.Head>

                        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                            {UserDataList && UserDataList.map((item: any, k) => (
                              <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                                    <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.name} </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.user_type} </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.email} </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.mobile_number} </Table.Cell>
                                    <Table.Cell className="truncate max-w-[15rem] text-base font-medium text-gray-900 dark:text-white py-0">  {item?.comment} </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {moment(item.added_at).format("DD-MM-YYYY hh:ss:mm")} </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.status} </Table.Cell>
                                    {/* <Table.Cell className="space-x-2 whitespace-nowrap py-0">  {item?.status == "pending" ?     <div className="flex items-center gap-x-3">   <Button  gradientDuoTone="purpleToPink" onClick={() => OpenDesModal()}><div className="flex items-center gap-x-2 deletebutton"> <IoCheckmarkDoneSharp className="text-lg" /> Mark As Done </div> </Button>  </div> : "-"}  </Table.Cell> */}
                              </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>

                  :null}
                </div>

                <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
            </NavbarSidebarLayout>


        <Modal onClose={() => setisOpenCommentModel(false)} show={isOpenDelteModel} size="md">
          <Modal.Header className="p-2">
              <div> Closing Comment</div>
          </Modal.Header>
          <Modal.Body className="px-2 pt-6 pb-6">
            <div className="flex flex-col items-center gap-y-6 text-center"> 

                <div className="mt-1">
                  <Input
                    id="comment"
                    name="comment"
                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-[22rem]"
                    placeholder="Enter comment"
                    type="textarea"
                    onChange={(e) => { DataChange(e) }}
                    value={commentData}
                  />
                  {commentDataValidation && commentDataValidation ? 
                    <FormFeedback type="invalid" className="text-Red text-sm text-left"> Please Enter Comment </FormFeedback>
                   : null}
                </div>

              <Button gradientDuoTone="greenToBlue" onClick={() => CommentAddCall()}>  <div className="flex items-center gap-x-2"> <GiCheckMark className="text-xl" />  Submit  </div> </Button>
            </div>
          </Modal.Body>
        </Modal>
        </>
    );
}

export default LeadListPage;