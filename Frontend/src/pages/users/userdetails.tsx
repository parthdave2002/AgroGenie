import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserView  } from "../../Store/actions";
import { useEffect, useState  } from "react";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useParams } from "react-router";
import moment from "moment";
const IMG_URL = import.meta.env["VITE_API_URL"];

interface RoleData{
  role_title :string;
  _id : string;
}

interface UserData{
  aadhar_card: boolean; 
  added_at : string;
  address: string;
  bank_passbook: boolean;
date_of_birth: string;
date_of_joining: string;
email: string;
emergency_contact_person: string;
emergency_mobile_no: number;
gender: string | undefined;
is_active: boolean; 
is_deleted: boolean; 
mobile_no: number;
name: string;
pan_card: boolean; 
password: string;
role: RoleData;
user_pic: string;
}

const UserDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if(id){
      let requserdata = {  id: id };
      dispatch(getUserView(requserdata))
    }
  },[id])

  const [UserDataList, setUserDataList] = useState<UserData>();
  const { UserView } = useSelector((state: any) => ({
    UserView: state.User.UserView,
  }));

  useEffect(() => {
    setUserDataList(UserView ? UserView.data  : null);
  }, [UserView]);
  //  ------------- Get Advisor Data From Reducer Code Start --------------

  let Name = "Advisor Details";
  let ParentName = "Advisor List";
  let ParentLink = "/users/list";

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
        <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
            <div>
              <div  className="grid grid-cols-3 gap-4">
                 <img  className="w-20 h-20 rounded-full"  src={ UserDataList?.user_pic ? `${IMG_URL}/public/user/${UserDataList?.user_pic}` : ""}  alt="advisor photo"  />

                {/* Name */}
                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Advisor Name</h3>
                  <p className="text-gray-900 dark:text-white">{UserDataList?.name || "N/A"}</p>
                </div>

                {/* Email */}
                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Email</h3>
                  <p className="text-gray-900 dark:text-white">{UserDataList?.email || "N/A"}</p>
                </div>

                {/* Gender */}
                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Gender</h3>
                  <p className="text-gray-900 dark:text-white">
                      {UserDataList?.gender ? UserDataList.gender.charAt(0).toUpperCase() + UserDataList.gender.slice(1).toLowerCase() : "Unknown"}
                    </p>
                </div>

                {/* Mobile Number */}
                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Mobile Number</h3>
                  <p className="text-gray-900 dark:text-white">{UserDataList?.mobile_no || "N/A"}</p>
                </div>

                 {/* Role */}
                 <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Role</h3>
                  <p className="text-gray-900 dark:text-white">{UserDataList?.role?.role_title || "N/A"}</p>
                </div>

                {/* Date of Joining */}
                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Date of Joining</h3>
                  <p className="text-gray-900 dark:text-white">{UserDataList?.date_of_joining || "N/A"}</p>
                </div>

                {/* Date of birth */}
                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Date of Birth</h3>
                  <p className="text-gray-900 dark:text-white">{UserDataList?.date_of_birth || "N/A"}</p>
                </div>
               
                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold"> Address</h3>
                  <p className="text-gray-900 dark:text-white">{UserDataList?.address || "N/A"}</p>
                </div>

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold"> Emergency contact person</h3>
                  <p className="text-gray-900 dark:text-white">{UserDataList?.emergency_contact_person || "N/A"}</p>
                </div>

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold"> Emergency mobile no</h3>
                  <p className="text-gray-900 dark:text-white">{UserDataList?.emergency_mobile_no || "N/A"}</p>
                </div>


                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold"> Aadhar card</h3>
                  <p className="text-gray-900 dark:text-white">{UserDataList?.aadhar_card == true? "Yes" : "No" }</p>
                </div>

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold"> Pan card</h3>
                  <p className="text-gray-900 dark:text-white">{UserDataList?.pan_card == true? "Yes" : "No" }</p>
                </div>

                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold"> Bank passbook</h3>
                  <p className="text-gray-900 dark:text-white">{UserDataList?.bank_passbook == true? "Yes" : "No" }</p>
                </div>



                {/* Created Date */}
                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Created Date</h3>
                  <p className="text-gray-900 dark:text-white">
                    {UserDataList?.added_at ? moment(UserDataList.added_at).format("DD-MM-YYYY HH:mm:ss") : "N/A"}
                  </p>
                </div>

                {/* Status */}
                <div className="p-4 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Status</h3>
                  <p className="text-gray-900 dark:text-white text-sm font-bold  rounded-lg">
                    {UserDataList?.is_active ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>

            </div>
        </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default UserDetailsPage;