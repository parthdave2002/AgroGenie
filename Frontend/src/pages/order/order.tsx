import { FC, useEffect, useRef, useState } from "react";
import logo from "../../img/logo.webp";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";
import LoaderPage from "../../components/loader";
import { Button,  Checkbox, Table, Modal} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderlist } from "../../Store/actions";
import { useNavigate } from "react-router";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const OrderListPage : FC = function () {
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const invoiceRef = useRef<HTMLDivElement>(null);

    // ----------- next Button  Code Start -------------
      const [UserDataList, setUserDataList] = useState([]);
      const [PageNo, setPageNo] = useState(1);
      const [RoePerPage, setRoePerPage] = useState(5);
      const [loader, setLoader] = useState(false);
    
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

    useEffect(() => {
        let requserdata: { page: number; size: number; search?: string } = {
            page: PageNo,
            size: RoePerPage
        };
        if (searchData) requserdata.search = searchData;
        dispatch(getOrderlist(requserdata));
        setLoader(true)
    }, [dispatch, PageNo, RoePerPage, searchData]);
 
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
        setUserDataList(Orderlist?.data ? Orderlist?.data  : Orderlist);
        setTotalListData(TotalOrderData ? TotalOrderData : 0);
        setCurrentPageNo(CurrentPage ? CurrentPage : 1);
        setLoader(false)
      }, [Orderlist, TotalOrderData, OrderlistSize, CurrentPage]);
    //  ------------- Get  Data From Reducer Code end --------------
    
    // --------- Checkbox Code start ------------
      const CheckData = (data:any) =>{
        console.log(data)
      }
    // --------- Checkbox Code end ------------
  

    let Name = "Order List";
    let Searchplaceholder = "Search For Orders";

    const OrderDetailsCall = (data:any) =>{
        navigate(`/order/details/${data}`)
    }

    const [ parcelModal, setparcelModal ] = useState(false);
    const [ parcelModalData, setparcelModalData ] = useState<any>({});
    const OpenParcelModal = (id:any) =>{
      setparcelModalData(id)
      setparcelModal(true)
    }

    const Downloadcall = async () => {
      const input = invoiceRef.current;
      if (!input) return;

      const canvas = await html2canvas(input, {
        scale: 3,            // HIGH quality
        useCORS: true,
        allowTaint: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdfWidth = canvas.width * 0.264583;  // px to mm
      const pdfHeight = canvas.height * 0.264583;

      const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("COD_Parcel.pdf");
    };


    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
             {loader ? <LoaderPage /> :   
                <>
                <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} />
                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                    <Table.Head className="bg-gray-100 dark:bg-gray-700">
                        <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                        <Table.HeadCell>Order id</Table.HeadCell>
                        <Table.HeadCell> Advisor Name </Table.HeadCell>
                        <Table.HeadCell>COD Amt</Table.HeadCell>
                        <Table.HeadCell>Type</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Created At</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                        {UserDataList && UserDataList.map((item: any, k:number) => (
                            <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                                <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }}>  <Checkbox  value={item?._id} onClick={() => {CheckData(item?._id)}}/>  </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => OrderDetailsCall(item._id)}>  {item.order_id} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.advisor_name?.name} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">₹ {Math.round(item?.total_amount)} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.order_type.charAt(0).toUpperCase() + item?.order_type.slice(1).toLowerCase() } </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.status ? item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase()  : "-"} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {moment(item?.added_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">   {item?.status && item?.status === "confirm" ?<Button onClick={() => OpenParcelModal(item) }> Parcel cover </Button> : "-" }</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}   RowsPerPageValue={RoePerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/> 
                </>
              } 
            </NavbarSidebarLayout>

            <Modal onClose={() => setparcelModal(false)} show={parcelModal} size="xl" dismissible>
              <Modal.Header className="flex justify-between items-center px-6 py-3 border-b border-gray-200 ">
                <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">COD Parcel Invoice</h2>
                <button   onClick={Downloadcall}   className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-3 py-1.5 rounded hover:bg-blue-700 transition" >   Download  </button>
                </div>
              </Modal.Header>

              <Modal.Body className="px-6 py-4 bg-gray-50 max-h-[30rem] overflow-scroll">
                <div
                  ref={invoiceRef}
                  className="bg-white shadow-md rounded-lg overflow-hidden p-6 text-sm text-black font-[sans-serif] mx-auto max-w-2xl"
                >
                  {/* Top Notice */}
                  <div className="text-red-600 mb-4 text-[0.9rem] space-y-1 font-semibold">
                    <p>[1] ગ્રાહક બહારગામ હોય તો પાર્સલ 7 દિવસ સુધી હોલ્ડ માં રાખવું.</p>
                    <p>[2] કોઈ પણ સંજોગોમાં ગ્રાહક જોડેથી COD કરતા વધુ ચાર્જ લેવો નહિં.</p>
                    <p>[3] ગ્રાહકને પાર્સલ ઘર સુધી પહોંચાડવું અને ફરજીયાત ફોન કરવો.</p>
                  </div>

                  {/* Header */}
                  <div className="border-y border-black py-2 text-center">
                    <p className="font-bold text-base">COD Book Parcel - Under Business Parcel BNPL Service</p>
                  </div>

                  {/* COD Info */}
                  <div className="border-b border-black py-3 space-y-1">
                    <p className="font-bold text-xl">COD Amount: ₹ {Math.round(parcelModalData?.total_amount)}</p>
                    <p><span className="font-semibold">Biller ID:</span> 0000054470 / 0000057616 / 0000058794</p>
                    <p><span className="font-semibold">Date:</span> {moment(parcelModalData?.added_at).format("DD-MM-YYYY")}</p>
                  </div>

                  {/* Delivery Address */}
                  <div className="border-b border-black py-3 space-y-1">
                    <p className="font-semibold underline">Delivery Address</p>
                    <p><span className="font-semibold">To:</span> {parcelModalData?.customer?.firstname} {parcelModalData?.customer?.middlename}  {parcelModalData?.customer?.lastname} </p>
                    <p><span className="font-semibold">Mo.:</span> {parcelModalData?.customer?.mobile_number} / {parcelModalData?.customer?.alternate_number}</p>
                    <p><span className="font-semibold">Address:</span> {parcelModalData?.customer?.address}</p>
                    <p><span className="font-semibold">AT:</span> {parcelModalData?.customer?.village_name}</p>
                    <p><span className="font-semibold">TA:</span> {parcelModalData?.customer?.taluka_name}</p>
                    <p><span className="font-semibold">Dist:</span> {parcelModalData?.customer?.district_name} - {parcelModalData?.customer?.pincode}</p>
                    <p><span className="font-semibold">Post:</span> {parcelModalData?.customer?.post_office}</p>
                  </div>

                  {/* Sender Info */}
                  <div className="py-3 space-y-1">
                    <p className="font-semibold underline">From: AgroGenie Ventures LLP</p>
                    <p><span className="font-semibold">Phone:</span>+91 90635 63590 </p>
                    <p><span className="font-semibold">Post Office:</span> Anand Branch</p>
                    <p><span className="font-semibold">Office Address:</span>B-5, Hariba Vyapar Bhuvan, GPO Road,</p>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <p><span className="font-semibold">AT:</span> Anand </p>
                      <p><span className="font-semibold">TA:</span> Anand</p>
                      <p><span className="font-semibold">Dist:</span>Anand - 388001</p>
                    </div>

                    {/* Logo aligned to right */}
                    <div className="flex justify-end mt-3">
                      <img src={logo} alt="Logo" className="w-24 h-auto" />
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>


        </>
    );
}

export default OrderListPage;