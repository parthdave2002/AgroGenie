

import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerDatalist  } from "../../Store/actions";
import {  useEffect, useState,   } from "react";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useParams } from "react-router";
import moment from "moment";

const CustomerDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if(id){
      let requserdata = { id: id };
      dispatch(getCustomerDatalist(requserdata))
    }
  },[id])

  interface cropData{
    name: string;
    _id : string;
  }

  interface CustomerDetails{
    added_at :string;
    address:string;
    alternate_number:number;
    crops:  cropData[];
    customer_name:string;
    district:string;
    heard_about_agribharat:string;
    irrigation_source:string;
    irrigation_type:string;
    is_deleted: boolean;
    land_area:string;
    land_type:string;
    mobile_number:number;
    pincode:string;
    taluka:string;
    village:string;
    _id:string;
  }

  const [UserDataList, setUserDataList] = useState<CustomerDetails[]>([]);
  const { Customerlist } = useSelector((state: any) => ({
    Customerlist: state.Customer.Customerlist,
  }));

  useEffect(() => {
    setUserDataList(Customerlist ? Customerlist  : null);
  }, [Customerlist]);

  //  ------------- Get User Data From Reducer Code Start --------------

  let Name = "Customer Details";
  let ParentName = "Customer List";
  let ParentLink = "/customer/list";

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
        <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
            <div>
            {UserDataList &&  UserDataList.map((data: any, index: number) => (
              <div key={index} className="grid grid-cols-3 gap-4">
                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Name</h3>
                  <p className="text-gray-900 dark:text-white">{data?.firstname} {data?.middlename} {data?.lastname}</p>
                </div>

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Mobile Number</h3>
                  <p className="text-gray-900 dark:text-white">{data?.mobile_number || "N/A"}</p>
                </div>

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Alternate Mobile Number</h3>
                  <p className="text-gray-900 dark:text-white">{data?.alternate_number || "-"}</p>
                </div>

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold"> Smart phone</h3>
                  <p className="text-gray-900 dark:text-white"> {data?.smart_phone === true ? "Yes" : data?.smart_phone === false ? "No" : "N/A"}</p>
                </div>

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold"> Land Area</h3>
                  <p className="text-gray-900 dark:text-white">{data?.land_area || "N/A"} {data?.land_type || "N/A"}</p>
                </div>

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Irrigation source</h3>
                  <p className="text-gray-900 dark:text-white">{data?.irrigation_source || "N/A"}</p>
                </div>

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Irrigation type</h3>
                  <p className="text-gray-900 dark:text-white">{data?.irrigation_type || "N/A"}</p>
                </div>
                
                {/* <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Heard about agribharat</h3>
                  <p className="text-gray-900 dark:text-white">{data?.heard_about_agribharat || "N/A"}</p>
                </div> */}

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Address</h3>
                  <p className="text-gray-900 dark:text-white">{data?.address || "N/A"} </p>
                </div>

                {/* Address */}

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">District</h3>
                  <p className="text-gray-900 dark:text-white">{data?.district_name || "N/A"}</p>
                </div>

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Taluka</h3>
                  <p className="text-gray-900 dark:text-white">{data?.taluka_name || "N/A"}</p>
                </div>
                
                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Village</h3>
                  <p className="text-gray-900 dark:text-white">{data?.village_name || "N/A"}</p>
                </div>

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Pincode</h3>
                  <p className="text-gray-900 dark:text-white">{data?.pincode || "N/A"} </p>
                </div>

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Created Date</h3>
                  <p className="text-gray-900 dark:text-white">
                    {data?.added_at ? moment(data.added_at).format("DD-MM-YYYY hh:mm:ss") : "N/A"}
                  </p>
                </div>

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Created By</h3>
                  <p className="text-gray-900 dark:text-white">
                    {data?.created_by?.name || "N/A"}
                  </p>
                </div>

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Status</h3>
                  <p className="text-gray-900 dark:text-white text-sm font-bold  rounded-lg">
                    {data?.is_deleted ==false  ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            ))}
            </div>
        </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default CustomerDetailsPage;