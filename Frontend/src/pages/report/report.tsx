import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Suspense, useCallback, useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getReportDatalist } from "../../Store/actions";
import ExampleBreadcrumb from "../../components/breadcrumb";
import moment from "moment";
import { Button , Checkbox, Table} from "flowbite-react";
import ExportDataModal from "../../components/exportdata/exportCSV";

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
    console.log("GetReportDatalist",GetReportDatalist);
    
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

    const isactiveoption = [
      { label : "Advisor", value:"advisor" },
      { label : "Farmer", value:"farmer" },
      // { label : "Lead", value:"lead" },
      { label : "Order", value:"order" }
    ]
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

  let Name = "Report Page";

  return (
    <>
      <NavbarSidebarLayout
        isFooter={false}
        isSidebar={true}
        isNavbar={true}
        isRightSidebar={true}
      >
        <div className="min-h-screen">
          <ExampleBreadcrumb Name={Name} />
          <div className="bg-white dark:bg-gray-800 p-4 flex gap-x-4 ">

            <div>
              <Select
              className="w-[15rem] dark:text-white"
              classNames={{
                control: () => "react-select__control",
                singleValue: () => "react-select__single-value",
                menu: () => "react-select__menu",
                option: ({ isSelected }) =>
                  isSelected
                    ? "react-select__option--is-selected"
                    : "react-select__option",
                placeholder: () => "react-select__placeholder",
              }}
              value={selectedStatusOption}
              onChange={(e) => {
                IsActivedata(e);
              }}
              options={isactiveoption}
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
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <Table.Head className="bg-gray-100 dark:bg-gray-700">
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>email</Table.HeadCell>
                  <Table.HeadCell>gender</Table.HeadCell>
                  <Table.HeadCell>mobile no</Table.HeadCell>
                  <Table.HeadCell>role</Table.HeadCell>
                  <Table.HeadCell>date of joining</Table.HeadCell>
                  <Table.HeadCell>date of birth</Table.HeadCell>
                  <Table.HeadCell>Address</Table.HeadCell>
                  <Table.HeadCell>Emergency contact person</Table.HeadCell>
                  <Table.HeadCell>Emergency mobile no</Table.HeadCell>
                  <Table.HeadCell>Aadhar card</Table.HeadCell>
                  <Table.HeadCell>Pan card</Table.HeadCell>
                  <Table.HeadCell>Bank passbook</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Created Date</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {Userdata && Userdata.map((item: any, k: any) => (
                      <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700"  >
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.name} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.email}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.gender} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.mobile_no}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.role?.role_title} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.date_of_joining}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.date_of_birth} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.address}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.emergency_contact_person} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.emergency_mobile_no}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.aadhar_card == true ? "Yes"  : "No"} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.pan_card == true ? "Yes"  : "No"} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.bank_passbook == true ? "Yes"  : "No"} </Table.Cell>

                      <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                        {item.is_active == true ?  
                          <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>  Active </div>
                          : <div className="flex items-center"><div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div>  Deactive  </div>
                        }
                      </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {moment(item.added_at).format("DD-MM-YYYY hh:mm:ss")}  </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            ) : showReportData && selectedStatusid == "farmer" ? (
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <Table.Head className="bg-gray-100 dark:bg-gray-700">
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Mobile</Table.HeadCell>
                  <Table.HeadCell>Alternate mobile</Table.HeadCell>
                  <Table.HeadCell>Land Area</Table.HeadCell>
                  <Table.HeadCell>Land Type</Table.HeadCell>
                  <Table.HeadCell>Irrigation source</Table.HeadCell>
                  <Table.HeadCell>Irrigation Type</Table.HeadCell>
                  {/* <Table.HeadCell>Heard about agribharat</Table.HeadCell> */}
                  <Table.HeadCell>address</Table.HeadCell>
                  <Table.HeadCell>district</Table.HeadCell>
                  <Table.HeadCell>taluka</Table.HeadCell>
                  <Table.HeadCell>village</Table.HeadCell>
                  <Table.HeadCell>pincode</Table.HeadCell>
                  <Table.HeadCell>postoffice</Table.HeadCell>
                  <Table.HeadCell>Refrence</Table.HeadCell>
                  <Table.HeadCell>created at</Table.HeadCell>
                  <Table.HeadCell>created by</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {Customerdata && Customerdata.map((item: any, k: any) => (
                      <Table.Row  key={k}  className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.firstname} {item?.middlename} {item?.lastname} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.mobile_number} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.alternate_number ?  item?.alternate_number : "-"} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.land_area} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.land_type} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.irrigation_source} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.irrigation_type} </Table.Cell>
                        {/* <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.heard_about_agribharat} </Table.Cell> */}
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.address}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.district_name}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.taluka_name}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.village_name}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.pincode}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.post_office}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.ref_name ? item?.ref_name : "-"}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {moment(item.added_at).format("DD-MM-YYYY hh:mm:ss")}   </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.created_by?.name}  </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            ) : showReportData && selectedStatusid == "lead" ? 
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <Table.Head className="bg-gray-100 dark:bg-gray-700">
                  <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Company</Table.HeadCell>
                  <Table.HeadCell>Qty</Table.HeadCell>
                  <Table.HeadCell>cgst</Table.HeadCell>
                  <Table.HeadCell>sgst</Table.HeadCell>
                  <Table.HeadCell>price</Table.HeadCell>
                  <Table.HeadCell>discount</Table.HeadCell>
                  <Table.HeadCell>caetgory</Table.HeadCell>
                  <Table.HeadCell>created at</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {Productdata &&
                    Productdata.map((item: any, k: any) => (
                      <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700"  >
                        <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }} >  <Checkbox /> </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.name}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.company?.name}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.avl_qty} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.c_gst}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.s_gst} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.price}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">   {item.discount}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">    {item.categories?.name}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item.added_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
           : showReportData && selectedStatusid == "order" ? (
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <Table.Head className="bg-gray-100 dark:bg-gray-700">
                  <Table.HeadCell>Order id</Table.HeadCell>
                  <Table.HeadCell> Farmer name</Table.HeadCell>
                  <Table.HeadCell> Address</Table.HeadCell>
                  <Table.HeadCell> District</Table.HeadCell>
                  <Table.HeadCell> Taluka</Table.HeadCell>
                  <Table.HeadCell> village </Table.HeadCell>
                  <Table.HeadCell> post office</Table.HeadCell>
                  <Table.HeadCell> pincode</Table.HeadCell>
                  <Table.HeadCell> Mobile</Table.HeadCell>
                  <Table.HeadCell> Alternate Mobile</Table.HeadCell>
                  <Table.HeadCell> Products / Packing / Quantity</Table.HeadCell>
                  <Table.HeadCell> Coupon code</Table.HeadCell>
                  <Table.HeadCell> Discount amount </Table.HeadCell>
                  <Table.HeadCell> Final  amount </Table.HeadCell>
                  <Table.HeadCell> Advisor Name </Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Order Date</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {Orderdata &&
                    Orderdata.map((item: any, k: any) => (
                      <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700"  >
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.order_id}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.customer?.firstname} {item?.customer?.middlename} {item?.customer?.lastname}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.customer?.address}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.customer?.district_name}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.customer?.taluka_name}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.customer?.village_name}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.customer?.post_office}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.customer?.pincode}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.customer?.mobile_number}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.customer?.alternate_number ? item?.customer?.alternate_number  : "-"}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.products?.length ? 
                            item.products
                                .map((p:any) => {
                                  const name = p?.id?.name?.englishname || '';
                                  const pack = p?.id?.packaging || '';
                                  const packType = p?.id?.packagingtype?.type_eng || '';
                                  return `${name} (${pack} ${packType})`;
                                })
                                .join(', ')
                        : "-"}  </Table.Cell>
                        <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white"> { item?.coupon?.name ?  item?.coupon?.name : "-"} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white"> { item?.coupon?.amount ? item?.coupon?.amount : "-"} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white"> { item?.total_amount} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white"> { item?.advisor_name?.name} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white"> { item?.status ? item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase() : "-"} </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {moment (item.added_at).format("DD-MM-YYYY")}  </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            ) : null}
          </div>
        </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default ReportPage;