import { FC, lazy, useCallback, useEffect, useMemo, useRef, useState } from "react";
import logo from "/images/authentication/logo.webp";
import { Button, Modal} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getOrderlist } from "../../../Store/actions";
import LoaderPage from "../../../components/common/loader/loader";
import CommonTable from "../../../components/common/table/commonTable";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

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
    const [searchData, setSearchData] = useState<string | null>(null);
    const Changename = useCallback((value: string) => {
      const timeout = setTimeout(() => {
        setSearchData(value.trim());
        setPageNo(1);
      }, 500); // 500ms debounce
      return () => clearTimeout(timeout);
    }, []);
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

    let Name = "Order List";
    let Searchplaceholder = "Search For Orders";

  const OrderDetailsCall = (data: any) => {
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

  const userColumns = useMemo(() => [
    {
      key: "order_id",
      label: "Order id",
      render: (row:any) =>(
        <div onClick={() => OrderDetailsCall(row?._id)}>  {row?.order_id}</div>
      )
    },
    {
      key: "advisor_name",
      label: "Advisor Name",
      render : (row : any) => (
        <div> {row?.advisor_name?.name} </div>
      )
    },
    {
      key: "total_amount",
      label: "COD Amt",
      render: (row:any) =>(
        <div> ₹ {Math.round(row?.total_amount)} </div>
      )
    },
    {
      key: "order_type",
      label: "Type",
      render : (row:any) =>(
        <div> {row?.order_type.charAt(0).toUpperCase() + row?.order_type.slice(1).toLowerCase() } </div>
      )
    },
    {
      key: "is_active",
      label: "Status",
      render: (row: any) => (
        <div>{row?.status ? row?.status.charAt(0).toUpperCase() + row?.status.slice(1).toLowerCase() : "-"}</div>
      )
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
       <div> {row?.status && row?.status === "confirm" ? <Button onClick={() => OpenParcelModal(row) }> Parcel cover </Button> : "-" } </div>
      ),
    },
  ], []);    

    return (
      <>
        <NavbarSidebarLayout isSidebar={true} isNavbar={true} >
          {loader ? <LoaderPage /> :
            <>
              <ExampleBreadcrumb Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename={Changename} />
              <CommonTable columns={userColumns} data={UserDataList || []} />
              <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
            </>
          }
        </NavbarSidebarLayout>

        <Modal onClose={() => setparcelModal(false)} show={parcelModal} size="xl" dismissible>
          <Modal.Header className="flex justify-between items-center px-6 py-3 border-b border-gray-200 ">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">COD Parcel Invoice</h2>
              <button onClick={Downloadcall} className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-3 py-1.5 rounded hover:bg-blue-700 transition" >   Download  </button>
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
                <p className="font-semibold underline">From: AGRI BHARAT</p>
                <p><span className="font-semibold">Phone:</span> 9100029429 / 7990987972 / 9624696200</p>
                <p><span className="font-semibold">Post Office:</span> Una Branch</p>
                <p><span className="font-semibold">Office Address:</span> Warehouse No:1, Olvan Road, Near Market Paldi</p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <p><span className="font-semibold">AT:</span> Paldi (Post - Delwada)</p>
                  <p><span className="font-semibold">TA:</span> Una</p>
                  <p><span className="font-semibold">Dist:</span> Gir Somnath - 362510</p>
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