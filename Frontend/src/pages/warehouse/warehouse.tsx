import { FC, useEffect,  useState } from "react";
import { Button, Table, Modal } from "flowbite-react";
import moment from "moment";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getOrderlist, ReturnOrderlist } from "../../Store/actions";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExampleBreadcrumb from "../../components/breadcrumb";
import ExamplePagination from "../../components/pagination";
const IMG_URL = import.meta.env["VITE_API_URL"];

const WarehousePage  = function ()  {     

    const dispatch = useDispatch();
    const [leadData, setLeadData] = useState<any>(null)
    const [ProductModalData, setProductModalData] = useState([]);
    const [ProductModal, setProductModal] = useState(false);
      const OpenModal = (data:any) =>{
        setProductModal(true)
        setProductModalData(data?.products)
      }

      const [confirmationModal, setConfirmationModal] = useState(false);
        const [LeadeId, setLeadeId] = useState("");
        
            const OPenConfirmModal =(data:string) =>{
              setConfirmationModal(true)
              setLeadeId(data)
            }

               const DelCall = () =>{
                  let requser={  order_id : LeadeId}
                  dispatch(ReturnOrderlist(requser))
                  setConfirmationModal(false);
                }

          // ------------- Get  Data From Reducer Code Start --------------
            const { Orderlist,  OrderlistSize, TotalOrderData, CurrentPage } = useSelector((state: any) => ({
                Orderlist: state.Order.Orderlist,
                OrderlistSize: state.Order.OrderlistSize,
                TotalOrderData: state.Order.TotalOrderData,
                CurrentPage: state.Order.CurrentPage,
              }));
      
            const [TotalListData, setTotalListData] = useState(0);
            const [CurrentPageNo, setCurrentPageNo] = useState(0);
            
            useEffect(() => {
              setLeadData(Orderlist?.data ? Orderlist?.data  : Orderlist);
              setTotalListData(TotalOrderData ? TotalOrderData : 0);
              setCurrentPageNo(CurrentPage ? CurrentPage : 1);
            }, [Orderlist, TotalOrderData, OrderlistSize, CurrentPage]);
          //  ------------- Get  Data From Reducer Code end --------------

      // ----------- next Button  Code Start -------------
        // const [TotalListData, setTotalListData] = useState(0);
        // const [CurrentPageNo, setCurrentPageNo] = useState(0);
        const [PageNo, setPageNo] = useState(1);
        const [RoePerPage, setRoePerPage] = useState(5);

        const RowPerPage = (event: any) => {
          const value = Number(event)
          setRoePerPage(value);
          setPageNo(1);
          setCurrentPageNo(0)
        };
        const PageDataList = (data:any) =>{ setPageNo(data)}
      // ------------- Next button Code End -------------

      // ---------------- Search code start ----------------
        const [searchData, setSearchData] = useState(null);
        const Changename = (data:any) =>{
          setSearchData(data)
        }
      // ---------------- Search code end ----------------
          
        useEffect(() => {          
          dispatch(getOrderlist({returnOrder : true}))
        }, [dispatch])

      let Name = "Warehouse ";
      let Searchplaceholder = "Search For order id";

    return (
        <>
        
              <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                    <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} />
                    <>
                        {leadData && leadData.length > 0 ? (
                            <>
                                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                                    <Table.Head className="bg-gray-100 dark:bg-gray-700">
                                    <Table.HeadCell>Order id</Table.HeadCell>
                                    <Table.HeadCell>Farmer Name</Table.HeadCell>
                                    <Table.HeadCell>Mobile Number</Table.HeadCell>
                                    <Table.HeadCell>Created Date</Table.HeadCell>
                                    <Table.HeadCell>Status</Table.HeadCell>
                                    <Table.HeadCell>Advisor Name</Table.HeadCell>
                                    <Table.HeadCell> Action</Table.HeadCell>
                                    </Table.Head>

                                    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                    {leadData &&
                                        leadData.map((item: any, k: number) => (
                                        <Table.Row key={k}    className="hover:bg-gray-100 dark:hover:bg-gray-700"    >
                                            <Table.Cell  className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer"  onClick={() => OpenModal(item)} >   {item?.order_id}  </Table.Cell>
                                            <Table.Cell  className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer"  onClick={() => OpenModal(item)} >   {item?.customer?.firstname}  {item?.customer?.middlename}  {item?.customer?.lastname}  </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">   {item?.customer?.mobile_number ? item?.customer?.mobile_number : "-"}   </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">   {moment(item?.added_at).format( "DD-MM-YYYY hh:mm:ss"   )}   </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">   {item?.status ? item?.status.charAt(0).toUpperCase() +  item?.status.slice(1).toLowerCase()  : "-"} </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">    {item?.advisor_name?.name}     </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">   <Button onClick={() => OPenConfirmModal(item._id)}>  Mark As Return   </Button>    </Table.Cell>
                                        </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>

                                <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}   RowsPerPageValue={RoePerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
                          </>
                        ) : (
                        <div className="text-center py-4 dark:text-gray-50">   No DataFound   </div>
                        )}

                        {confirmationModal ? (
                        <Modal onClose={() => setConfirmationModal(false)}   show={confirmationModal} size="md"  >
                            <Modal.Header className="px-6 pt-6 pb-0"> <span className="sr-only"> Change status</span>   </Modal.Header>
                            <Modal.Body className="px-6 pt-0 pb-6 ">
                              <div className="flex flex-col items-center gap-y-6 text-center">
                                  
                                  <HiOutlineExclamationCircle className="text-7xl text-red-500" />
                                  <p className="text-xl text-gray-500">  Are you sure you want to mark as return ?   </p>
                                  <div className="flex items-center gap-x-3">
                                  <Button color="failure" onClick={() => DelCall()}>  Yes, I'm sure  </Button>
                                  <Button   color="gray"  onClick={() => setConfirmationModal(false)}  >    No, cancel  </Button>
                                  </div>
                              </div>
                            </Modal.Body>
                        </Modal>
                        ) : null}

                        {ProductModal == true ? (
                        <Modal  onClose={() => setProductModal(false)}  show={ProductModal}  size="xl" dismissible>
                                <Modal.Header className="px-6 pt-6 pb-0">   <span className="sr-only"> Change status</span> </Modal.Header>
                                <Modal.Body className="px-6 pt-0 pb-6 max-h-[22rem] overflow-scroll">
                                <div className="space-y-4">
                                    {ProductModalData &&  ProductModalData.map((item: any, k: number) => ( 
                                        <div  className="flex items-start gap-4 p-4 border rounded-lg shadow-sm bg-white" key={k}>
                                            <span>  <img  className="w-12 h-12 rounded-full object-cover border"  src={`${IMG_URL}/public/product/${item?.id?.product_pics?.[0]}`} alt="product photo"  />   </span>
                                             <div className="flex flex-col text-sm">
                                              <span className="text-sm font-medium text-gray-900">    {item?.id?.name?.englishname}    </span>
                                              <div className="text-gray-600 mt-1">   Quantity: <strong>{item?.quantity}</strong> </div>
                                              <div className="text-gray-600 mt-1">  Packaging: {item?.id?.packaging}  {item?.id?.packagingtype?.type_eng} </div>
                                              </div>
                                          </div>
                                    ))}
                                </div>
                                </Modal.Body>
                        </Modal>
                        ) : null}
                    </>
            </NavbarSidebarLayout>
        </>
           
    );
} 
export default WarehousePage;