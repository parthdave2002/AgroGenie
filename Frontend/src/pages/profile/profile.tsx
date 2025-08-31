import { FC, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExampleBreadcrumb from "../../components/breadcrumb";
const IMG_URL = import.meta.env["VITE_API_URL"];
import { useDispatch, useSelector } from "react-redux";
import ImageUploadPreview from "../../components/input/imageuploader";
import {ProfileUserdatalist, UpdateProfileUserdatalist }  from "../../Store/actions"
const ProfilePage : FC = function () {
    const dispatch =useDispatch()
    interface RoleData{
        id:string;
        role_title:string;
    }
    interface UserData{
        name:string;
        email:string;
        role: RoleData;
        user_pic:string;
    }

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
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <div className="flex flex-col ">

                        <ImageUploadPreview onFileSelect={setFile1}  defaultImage={userData?.user_pic ? `${IMG_URL}/public/user/${userData?.user_pic}` : ""}  />

                        <div>
                                <div className="flex flex-col gap-y-3 dark:text-gray-50 w-full mt-[3rem]">
                                <div> Name : { userData ? userData?.name : "N/A"}</div>
                                <div> Email : { userData ? userData?.email : "N/A" } </div>
                                <div> Role : {   userData ? userData?.role?.role_title : "N/A"   } </div>
                            </div>
                        </div>
                    </div>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default ProfilePage;