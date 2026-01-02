import { FC, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "types/types";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import {ProfileUserdatalist, UpdateProfileUserdatalist }  from "../../../Store/actions";
import ImageUploadPreview from "../../../components/common/inputComponent/imageuploader";
import ChangeProfilePassword from "../../../components/common/profile/changeprofilePassword";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const ProfilePage : FC = function () {
    const dispatch =useDispatch()

    const [file1, setFile1] = useState<File | null>(null);
    const [userData, setuserData] = useState<UserData>();

    // ------------- Get  Data From Reducer Code Start --------------
        const Profileuserdata  = useSelector((state: any) => state.User.Profileuserdata);
        useEffect(() => {
            setuserData(Profileuserdata.data  ? Profileuserdata.data   : null);
        }, [ Profileuserdata]);
    //  ------------- Get  Data From Reducer Code end --------------

    useEffect(() =>{
        dispatch(ProfileUserdatalist())
    },[])

    useEffect(() =>{
        if(file1){
            const formData = new FormData();
            formData.append("user_pic", file1); 
            dispatch(UpdateProfileUserdatalist(formData))
        }
    },[file1])

    let Name = "Profile";

    return (
        <>  
            <NavbarSidebarLayout   isSidebar={true} isNavbar={true} >
                <ExampleBreadcrumb  Name={Name}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4 flex flex-col ">
                        <ImageUploadPreview onFileSelect={setFile1}  defaultImage={userData?.user_pic ? `${userData?.user_pic}` : ""}  />

                        <div>
                            <div className="flex justify-between dark:text-gray-50 w-full mt-[3rem]">
                                <div> Name : {userData ? userData?.name : "N/A"}</div>
                                <div> Email : {userData ? userData?.email : "N/A"} </div>
                                <div> Role : {userData ? userData?.email : "N/A"} </div>
                            </div>
                        </div>
                </div>
                <div>
                    <ChangeProfilePassword />
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default ProfilePage;