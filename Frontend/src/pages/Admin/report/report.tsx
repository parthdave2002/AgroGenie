import { FC, lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Button } from "flowbite-react";
import { getReportDatalist } from "../../../Store/actions";
import { reportoption } from "../../../types/dropdown";
const ExportDataModal = lazy(() => import("../../../components/common/exportdata/exportCSV"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));
const CommonTable = lazy(() => import("../../../components/common/table/commonTable"));

const ReportPage: FC = function () {
  const dispatch = useDispatch();
  const [Exportdata, setExportdata ] = useState([]);
  const [showReportData, setshowReportData] = useState(false);
  const [Userdata, setUserdata ] = useState([]);
  const [Customerdata, setCustomerdata ] = useState([]);
  const [Productdata, setProductdata] = useState([]);
  const [Orderdata, setOrderdata] = useState([]);

  const { GetReportDatalist } = useSelector((state: any) => ({
    GetReportDatalist: state.AdminDashboard.GetReportDatalist,
  }));
  
  useEffect(() =>{
    setExportdata(GetReportDatalist?.data);
    if(selectedStatusid == "advisor"){
      setshowReportData(true);
      setUserdata(GetReportDatalist?.data)
    }
    else if(selectedStatusid == "farmer"){
      setshowReportData(true);
      setCustomerdata(GetReportDatalist?.data)
    }
    else if(selectedStatusid == "lead"){
      setshowReportData(true);
      setProductdata(GetReportDatalist?.data)
    }
    else if(selectedStatusid ==  "order"){
      setshowReportData(true);
      setOrderdata(GetReportDatalist?.data)
    }
  },[GetReportDatalist])

  //---------------- Satus option code start ----------------
    const [selectedStatusOption, setSelectedStatusOption] = useState(null);
    const [selectedStatusid, setSelectedStatusid] = useState<string>("");
    const IsActivedata = (data: any) => {
      if (!data) {
          setSelectedStatusid("");
          setSelectedStatusOption(null);
      } else {
        setshowReportData(false);
          setSelectedStatusid(data.value);
          setSelectedStatusOption(data);
      }
    };
  //---------------- Satus option code end ----------------

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  const [startDateData, setStartDateData] = useState<string | null>(null);
  const [endDateData, setEndDateData] = useState<string | null>(null);

  // Update formatted date state whenever the date range changes
  useEffect(() => {
    setshowReportData(false);
    setStartDateData(startDate ? moment(startDate).format("YYYY-MM-DD") : null);
    setEndDateData(endDate ? moment(endDate).format("YYYY-MM-DD") : null);
  }, [startDate, endDate]);

  // Handle date selection
  const handleDateChange = useCallback((update: [Date | null, Date | null]) => {
    setDateRange(update);
  }, []);

  const GetdataCall = () =>{
    let requserData= {
      ...(startDateData && { startDate: startDateData }),
      ...(endDateData && { endDate: endDateData }),
      type : selectedStatusid
    }
    dispatch(getReportDatalist(requserData))
  }

// ================ advisor code start =================
   const userColumns = useMemo(() => [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "gender",  label: "Gender", render: (row: any) => row?.gender ? row.gender.charAt(0).toUpperCase() + row.gender.slice(1).toLowerCase() : "-" },
      { key: "mobile_no", label: "Mobile No" },
      { key: "role",  label: "Role", render: (row: any) => row?.role?.role_title || "-"},
      { key: "date_of_joining", label: "Date of Joining" },
      { key: "date_of_birth", label: "Date of Birth" },
      { key: "address", label: "Address" },
      { key: "emergency_contact_person", label: "Emergency Contact Person" },
      { key: "emergency_mobile_no", label: "Emergency Mobile No" },
      { key: "aadhar_card",  label: "Aadhar Card", render: (row: any) => (row?.aadhar_card ? "Yes" : "No") },
      { key: "pan_card", label: "Pan Card", render: (row: any) => (row?.pan_card ? "Yes" : "No")},
      {  key: "bank_passbook",  label: "Bank Passbook", render: (row: any) => (row?.bank_passbook ? "Yes" : "No")},
      { key: "is_active", label: "Status",
        render: (row: any) => row?.is_active ? ( 
            <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>  Active </div>
          ) : (
            <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Deactive </div>
          ),
      },
      { key: "added_at", label: "Created Date", render: (row: any) => row?.added_at ? moment(row.added_at).format("DD-MM-YYYY hh:mm:ss") : "-",},
    ], []);
// ================ advisor code end =================

// ================ farmer code start =================
const farmerColumns = useMemo(() => [
  { key: "name", label: "Name", render: (row: any) =>[row?.firstname, row?.middlename, row?.lastname].filter(Boolean) .join(" ") || "-",},
  { key: "mobile_number", label: "Mobile" },
  { key: "alternate_number", label: "Alternate Mobile", render: (row: any) => row?.alternate_number || "-",},
  { key: "land_area", label: "Land Area" },
  { key: "land_type", label: "Land Type" },
  { key: "irrigation_source", label: "Irrigation Source" },
  { key: "irrigation_type", label: "Irrigation Type" },
  { key: "heard_about_agribharat", label: "Heard About Agribharat" },
  { key: "address", label: "Address" },
  { key: "district_name", label: "District" },
  { key: "taluka_name", label: "Taluka" },
  { key: "village_name", label: "Village" },
  { key: "pincode", label: "Pincode" },
  { key: "post_office", label: "Post Office" },
  { key: "ref_name", label: "Reference",  render: (row: any) => row?.ref_name || "-", },
  { key: "added_at", label: "Created At", render: (row: any) => row?.added_at ? moment(row.added_at).format("DD-MM-YYYY HH:mm:ss") : "-"},
  { key: "created_by",  label: "Created By", render: (row: any) => row?.created_by?.name || "-" },
], []);
// ================ farmer code end =================
// ================ Order code start =================

 const orderColumns = useMemo(() => [
  { key: "order_id", label: "Order ID" },
  {
    key: "customer_name",
    label: "Farmer Name",
    render: (row: any) =>
      `${row?.customer?.firstname || ""} ${row?.customer?.middlename || ""} ${row?.customer?.lastname || ""}`.trim() || "-",
  },

  {
    key: "address",
    label: "Address",
    render: (row: any) => row?.customer?.address || "-",
  },

  {
    key: "district",
    label: "District",
    render: (row: any) => row?.customer?.district_name || "-",
  },

  {
    key: "taluka",
    label: "Taluka",
    render: (row: any) => row?.customer?.taluka_name || "-",
  },

  {
    key: "village",
    label: "Village",
    render: (row: any) => row?.customer?.village_name || "-",
  },

  {
    key: "post_office",
    label: "Post Office",
    render: (row: any) => row?.customer?.post_office || "-",
  },

  {
    key: "pincode",
    label: "Pincode",
    render: (row: any) => row?.customer?.pincode || "-",
  },

  {
    key: "mobile",
    label: "Mobile",
    render: (row: any) => row?.customer?.mobile_number || "-",
  },

  {
    key: "alternate_mobile",
    label: "Alternate Mobile",
    render: (row: any) => row?.customer?.alternate_number || "-",
  },

  {
    key: "products",
    label: "Products / Packing",
    render: (row: any) =>
      row?.products?.length
        ? row.products
            .map((p: any) => {
              const name = p?.id?.name?.englishname || "";
              const pack = p?.id?.packaging || "";
              const packType = p?.id?.packagingtype?.type_eng || "";
              return `${name} (${pack} ${packType})`;
            })
            .join(", ")
        : "-",
  },

  {
    key: "coupon",
    label: "Coupon Code",
    render: (row: any) => row?.coupon?.name || "-",
  },

  {
    key: "discount",
    label: "Discount Amount",
    render: (row: any) => row?.coupon?.amount || "-",
  },

  {
    key: "total_amount",
    label: "Final Amount",
  },

  {
    key: "advisor",
    label: "Advisor Name",
    render: (row: any) => row?.advisor_name?.name || "-",
  },
  {
    key: "status",
    label: "Status",
    render: (row: any) =>
      row?.status
        ? row.status.charAt(0).toUpperCase() + row.status.slice(1).toLowerCase()
        : "-",
  },
  {
    key: "added_at",
    label: "Order Date",
    render: (row: any) =>
      row?.added_at
        ? moment(row.added_at).format("DD-MM-YYYY")
        : "-",
  },
], []);
// ================ Order code end =================

  let Name = "Report Page";

  return (
    <>
      <NavbarSidebarLayout  isSidebar={true} isNavbar={true}>
        <div className="min-h-screen">
          <ExampleBreadcrumb Name={Name} />
          <div className="bg-white dark:bg-gray-800 p-4 flex gap-x-4 ">

            <div>
              <Select className="w-[15rem] dark:text-white"
              classNames={{
                control: () => "react-select__control",
                singleValue: () => "react-select__single-value",
                menu: () => "react-select__menu",
                option: ({ isSelected }) => isSelected  ? "react-select__option--is-selected"  : "react-select__option",
                placeholder: () => "react-select__placeholder",
              }}
              value={selectedStatusOption}
              onChange={(e) => { IsActivedata(e); }}
              options={reportoption}
              isClearable={true}
            />
            </div>

            <div className="relative">
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                isClearable
                maxDate={new Date()}
                popperPlacement="bottom-start"
                popperModifiers={[
                  {
                    name: 'preventOverflow',
                    options: {
                      boundary: 'viewport',
                    },
                  },
                ] as any}          
                className="w-full pl-10 py-2 px-5 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                placeholderText="Select Date Range"
              />
              <IoCalendarNumberSharp className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            {selectedStatusid != "" ? 
              <Button  gradientDuoTone="purpleToPink"  onClick={() => GetdataCall()} > <div className="flex items-center gap-x-3 w-[5rem] text-center"> <FaSearch /> Submit </div>  </Button>
             : null}

            {selectedStatusid != ""  && showReportData == true ? 
              <div className="flex-1 justify-items-end self-center">  <Suspense fallback={<div>Loading...</div>}>  <ExportDataModal data={Exportdata} name={selectedStatusid} />  </Suspense>  </div>
            : null}
          </div>

          <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
            {showReportData && selectedStatusid == "advisor" ? (
              <CommonTable columns={userColumns} data={Userdata || []}/>
            ) : showReportData && selectedStatusid == "farmer" ? (
               <CommonTable columns={farmerColumns} data={Customerdata || []}/>
            ) : showReportData && selectedStatusid == "lead" ? 
              // <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              //   <Table.Head className="bg-gray-100 dark:bg-gray-700">
              //     <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
              //     <Table.HeadCell>Name</Table.HeadCell>
              //     <Table.HeadCell>Company</Table.HeadCell>
              //     <Table.HeadCell>Qty</Table.HeadCell>
              //     <Table.HeadCell>cgst</Table.HeadCell>
              //     <Table.HeadCell>sgst</Table.HeadCell>
              //     <Table.HeadCell>price</Table.HeadCell>
              //     <Table.HeadCell>discount</Table.HeadCell>
              //     <Table.HeadCell>caetgory</Table.HeadCell>
              //     <Table.HeadCell>created at</Table.HeadCell>
              //   </Table.Head>

              //   <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              //     {Productdata &&
              //       Productdata.map((item: any, k: any) => (
              //         <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700"  >
              //           <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }} >  <Checkbox /> </Table.Cell>
              //           <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.name}  </Table.Cell>
              //           <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.company?.name}  </Table.Cell>
              //           <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.avl_qty} </Table.Cell>
              //           <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.c_gst}  </Table.Cell>
              //           <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.s_gst} </Table.Cell>
              //           <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.price}  </Table.Cell>
              //           <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">   {item.discount}  </Table.Cell>
              //           <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">    {item.categories?.name}  </Table.Cell>
              //           <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item.added_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
              //         </Table.Row>
              //       ))}
              //   </Table.Body>
              // </Table>
               <CommonTable columns={userColumns} data={Userdata || []}/>
           : showReportData && selectedStatusid == "order" ? (
               <CommonTable columns={orderColumns} data={Orderdata || []}/>
            ) : null}
          </div>
        </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default ReportPage;