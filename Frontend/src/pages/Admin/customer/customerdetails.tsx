

import { FC, lazy, useEffect, useState,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import moment from "moment";
import { CustomerDetails } from "../../../types/types";
import { getCustomerDatalist  } from "../../../Store/actions";
import LoaderPage from "../../../components/common/loader/loader";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));

const CustomerDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  
  useEffect(() => {
    if(id){
      let requserdata = { id: id };
      dispatch(getCustomerDatalist(requserdata))
      setLoader(true);
    }
  },[id])

  const [UserDataList, setUserDataList] = useState<CustomerDetails[]>([]);
  const  Customerlist = useSelector((state: any) => state.Customer.Customerlist);

  useEffect(() => {
    setUserDataList(Customerlist ? Customerlist  : null);
    setLoader(false);
  }, [Customerlist]);

  //  ------------- Get User Data From Reducer Code Start --------------

  let Name = "Customer Details";
  let ParentName = "Customer List";
  let ParentLink = "/customer/list";

  return (
    <>
      <NavbarSidebarLayout   isSidebar={true} isNavbar={true} >
        {loader ? <LoaderPage /> :
          <>
            <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
            <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                <div>
                {UserDataList &&  UserDataList.map((data: any, index: number) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    <div className="detailswrapper">
                      <h3 className="detailslebel">Name</h3>
                      <p className="detailsvalue">{data?.firstname} {data?.middlename} {data?.lastname}</p>
                    </div>

                    <div className="detailswrapper">
                      <h3 className="detailslebel">Mobile Number</h3>
                      <p className="detailsvalue">{data?.mobile_number || "N/A"}</p>
                    </div>

                    <div className="detailswrapper">
                      <h3 className="detailslebel">Alternate Mobile Number</h3>
                      <p className="detailsvalue">{data?.alternate_number || "-"}</p>
                    </div>

                    <div className="detailswrapper">
                      <h3 className="detailslebel"> Smart phone</h3>
                      <p className="detailsvalue"> {data?.smart_phone === true ? "Yes" : data?.smart_phone === false ? "No" : "N/A"}</p>
                    </div>

                    <div className="detailswrapper">
                      <h3 className="detailslebel"> Land Area</h3>
                      <p className="detailsvalue">{data?.land_area || "N/A"} {data?.land_type || "N/A"}</p>
                    </div>

                    <div className="detailswrapper">
                      <h3 className="detailslebel">Irrigation source</h3>
                      <p className="detailsvalue">{data?.irrigation_source || "N/A"}</p>
                    </div>

                    <div className="detailswrapper">
                      <h3 className="detailslebel">Irrigation type</h3>
                      <p className="detailsvalue">{data?.irrigation_type || "N/A"}</p>
                    </div>
                    
                    <div className="detailswrapper">
                      <h3 className="detailslebel">Heard about agribharat</h3>
                      <p className="detailsvalue">{data?.heard_about_agribharat || "N/A"}</p>
                    </div>

                    <div className="detailswrapper">
                      <h3 className="detailslebel">Address</h3>
                      <p className="detailsvalue">{data?.address || "N/A"} </p>
                    </div>

                    {/* Address */}

                    <div className="detailswrapper">
                      <h3 className="detailslebel">District</h3>
                      <p className="detailsvalue">{data?.district_name || "N/A"}</p>
                    </div>

                    <div className="detailswrapper">
                      <h3 className="detailslebel">Taluka</h3>
                      <p className="detailsvalue">{data?.taluka_name || "N/A"}</p>
                    </div>
                    
                    <div className="detailswrapper">
                      <h3 className="detailslebel">Village</h3>
                      <p className="detailsvalue">{data?.village_name || "N/A"}</p>
                    </div>

                    <div className="detailswrapper">
                      <h3 className="detailslebel">Pincode</h3>
                      <p className="detailsvalue">{data?.pincode || "N/A"} </p>
                    </div>

                    <div className="detailswrapper">
                      <h3 className="detailslebel">Created Date</h3>
                      <p className="detailsvalue">
                        {data?.added_at ? moment(data.added_at).format("DD-MM-YYYY hh:mm:ss") : "N/A"}
                      </p>
                    </div>

                    <div className="detailswrapper">
                      <h3 className="detailslebel">Created By</h3>
                      <p className="detailsvalue">
                        {data?.created_by?.name || "N/A"}
                      </p>
                    </div>

                    <div className="detailswrapper">
                      <h3 className="detailslebel">Status</h3>
                      <p className="detailsvalue text-sm font-bold  rounded-lg">
                        {data?.is_deleted ==false  ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>
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