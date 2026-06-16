import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserView  } from "../../../Store/actions";
import { lazy, useEffect, useState  } from "react";
import { useParams } from "react-router";
import moment from "moment";
import { UserData } from "types/types";
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const LoaderPage = lazy(() => import("../../../components/common/loader/loader"));

const UserDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if(id){
      setLoader(true)
      let requserdata = {  id: id };
      dispatch(getUserView(requserdata))
    }
  },[id,dispatch])

  const [UserDataList, setUserDataList] = useState<UserData>();
  const UserView = useSelector((state: any) => state.User.UserView);

  useEffect(() => {
    setLoader(false);
    setUserDataList(UserView ? UserView.data  : null);
  }, [UserView]);

  const details = [
    { label: "Advisor Name", value: UserDataList?.name },
    { label: "Email", value: UserDataList?.email },
    {
      label: "Gender",
      value: UserDataList?.gender
        ? UserDataList.gender.charAt(0).toUpperCase() +
          UserDataList.gender.slice(1).toLowerCase()
        : "Unknown",
    },
    { label: "Mobile Number", value: UserDataList?.mobile_no },
    { label: "Role", value: UserDataList?.role?.role_title },
    { label: "Date of Joining", value: UserDataList?.date_of_joining },
    { label: "Date of Birth", value: UserDataList?.date_of_birth },
    { label: "Address", value: UserDataList?.address },
    {
      label: "Emergency Contact Person",
      value: UserDataList?.emergency_contact_person,
    },
    { label: "Emergency Mobile No", value: UserDataList?.emergency_mobile_no },
    { label: "Aadhar Card", value: UserDataList?.aadhar_card ? "Yes" : "No" },
    { label: "Pan Card", value: UserDataList?.pan_card ? "Yes" : "No" },
    { label: "Bank Passbook", value: UserDataList?.bank_passbook ? "Yes" : "No" },
    {
      label: "Created Date",
      value: UserDataList?.added_at
        ? moment(UserDataList.added_at).format("DD-MM-YYYY HH:mm:ss")
        : "N/A",
    },
    { label: "Category", value: UserDataList?.user_category?.category_name || "N/A" },
    { label: "Status", value: UserDataList?.is_active ? "Active" : "Inactive" },
  ];
  //  ------------- Get Advisor Data From Reducer Code Start --------------

  let Name = "Advisor Details";
  let ParentName = "Advisor List";
  let ParentLink = "/users/list";

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
        {loader ? (  <LoaderPage /> ) : (
          <>
            <ExampleBreadcrumb
              Name={Name}
              ParentName={ParentName}
              ParentLink={ParentLink}
            />
            <div className="mt-[2rem] bg-White dark:bg-Cosmos p-4">
              <div>
                <div className="grid grid-cols-3 gap-x-4 gap-y-8">
                  <img
                    className="w-20 h-20 rounded-full"
                    src={UserDataList?.user_pic ? UserDataList?.user_pic : ""}
                    alt="advisor photo"
                  />

                  {details.map((item, index) => (
                    <div key={index} className="detailswrapper dark:text-White">
                      <h3 className="detailslebel">{item.label}</h3>
                      <p className="detailsvalue">{item.value || "N/A"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </NavbarSidebarLayout>
    </>
  );
};

export default UserDetailsPage;