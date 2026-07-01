

import { FC, lazy, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import moment from "moment";
import { CustomerDetails } from "../../../types/types";
import { WalletRuletypeoption } from "../../../types/dropdown";
import LoaderPage from "../../../components/common/loader/loader";
import { getCustomerDatalist, getWalletHistorylist } from "../../../Store/actions";
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const CommonTable = lazy(() => import("../../../components/common/table/commonTable"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));

const CustomerDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [WalletDataList, setWalletDataList] = useState<CustomerDetails[]>([]);
  const [UserDataList, setUserDataList] = useState<CustomerDetails[]>([]);
  const Customerlist = useSelector((state: any) => state.Customer.Customerlist);

  const { WalletHistorylist, WalletHistorylistSize, TotalWalletHistoryData, CurrentPage } = useSelector((state: any) => ({
    WalletHistorylist: state.Wallet.WalletHistorylist,
    WalletHistorylistSize: state.Wallet.WalletHistorylistSize,
    TotalWalletHistoryData: state.Wallet.TotalWalletHistoryData,
    CurrentPage : state.Wallet.CurrentPage
  }));

  useEffect(() => {        
      setWalletDataList(WalletHistorylist ? WalletHistorylist : []);
      setRoePerPage(WalletHistorylistSize ? WalletHistorylistSize : 0);
      setTotalListData(TotalWalletHistoryData ? TotalWalletHistoryData : 0);
      setCurrentPageNo(CurrentPage ? CurrentPage : 1);
      setLoader(false)
  }, [WalletHistorylist]);

  useEffect(() => {
    if (id) { 
      setLoader(true);
      dispatch(getWalletHistorylist({ customer_id : id, page:PageNo, size :RoePerPage }))
      dispatch(getCustomerDatalist({ id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setUserDataList(Customerlist ? Customerlist : []);
    setLoader(false);
  }, [Customerlist]);

  // ----------- next Button  Code Start -------------
      const [TotalListData, setTotalListData] = useState(0);
      const [CurrentPageNo, setCurrentPageNo] = useState(0);
      const [PageNo, setPageNo] = useState(1);
      const [RoePerPage, setRoePerPage] = useState(5);
    
      const RowPerPage = (event: any) => {
        const value = Number(event)
         setRoePerPage(value);
         setPageNo(1)
       };
      const PageDataList = (data:any) =>{ setPageNo(data)}
  // ------------- Next button Code End -------------

  const customerColumns = useMemo(() => [
    { key: "added_at", label: "Created Date", render: (row: any) => ( <div>{moment(row?.added_at).format("DD-MM-YYYY hh:mm:ss")}</div>) },
    { key: "transaction_type", label: "Type"},
    { key: "points", label: "Points"},
    { key: "event_type", label: "Wallet Rules", render: (row) => WalletRuletypeoption.find(item => item.value === row.event_type)?.label || row.event_type },
  ],[Customerlist],);

  const customer = UserDataList[0] as any;

  const customerDetails = [
    { label: "Name", value: [customer?.firstname, customer?.middlename, customer?.lastname].filter(Boolean).join(" ") || "N/A" },
    { label: "Mobile Number", value: customer?.mobile_number || "N/A" },
    { label: "Alternate Mobile Number", value: customer?.alternate_number || "-" },
    { label: "Smart Phone", value: customer?.smart_phone === true ? "Yes" : customer?.smart_phone === false ? "No" : "N/A" },
    { label: "Land Area", value: `${customer?.land_area || "N/A"} ${customer?.land_type || ""}`.trim() || "N/A" },
    { label: "Irrigation Source", value: customer?.irrigation_source || "N/A" },
    { label: "Irrigation Type", value: customer?.irrigation_type || "N/A" },
    { label: "Heard About Agribharat", value: customer?.heard_about_agribharat || "N/A" },
    { label: "Address", value: customer?.address || "N/A" },
    { label: "District", value: customer?.district_name || "N/A" },
    { label: "Taluka", value: customer?.taluka_name || "N/A" },
    { label: "Village", value: customer?.village_name || "N/A" },
    { label: "Pincode", value: customer?.pincode || "N/A" },
    { label: "Created Date", value: customer?.added_at ? moment(customer.added_at).format("DD-MM-YYYY hh:mm:ss") : "N/A" },
    { label: "Created By", value: customer?.created_by?.name || "N/A" },
    { label: "Status", value: customer?.is_deleted === false ? "Active" : "Inactive" },
  ];

  const Name = "Customer Details";
  const ParentName = "Customer List";
  const ParentLink = "/customer/list";

  return (
    <>
      <NavbarSidebarLayout   isSidebar={true} isNavbar={true} >
        {loader ? <LoaderPage /> :
          <>
            <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
            <div className="mt-[2rem] rounded-xl bg-White p-4 shadow-sm dark:bg-Cosmos">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {customerDetails.map((item) => (
                  <article key={item.label} className="detailswrapper">
                    <h3 className="detailslebel">{item.label}</h3>
                    <p className={`detailsvalue ${item.label === "Status" ? "font-semibold" : ""}`}>{item.value}</p>
                  </article>
                ))}
              </div>

              <div className="mt-[4rem]">
                  <h2 className="text-2xl font-semibold mb-1 text-DarkBackground dark:text-TitaniumWhite"> Wallet History </h2>
                  <CommonTable columns={customerColumns} data={WalletDataList || []} />
                  <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
                </div>
            </div>
          </>
        }
      </NavbarSidebarLayout>
    </>
  );
};

export default CustomerDetailsPage;