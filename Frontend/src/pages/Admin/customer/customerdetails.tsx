

import { FC, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import moment from "moment";
import { CustomerDetails } from "../../../types/types";
import { getCustomerDatalist } from "../../../Store/actions";
import LoaderPage from "../../../components/common/loader/loader";

const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));

const CustomerDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [UserDataList, setUserDataList] = useState<CustomerDetails[]>([]);
  const Customerlist = useSelector((state: any) => state.Customer.Customerlist);

  useEffect(() => {
    if (id) {
      setLoader(true);
      dispatch(getCustomerDatalist({ id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setUserDataList(Customerlist ? Customerlist : []);
    setLoader(false);
  }, [Customerlist]);

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
            </div>
          </>
        }
      </NavbarSidebarLayout>
    </>
  );
};

export default CustomerDetailsPage;