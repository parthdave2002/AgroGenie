import { FC, lazy, useEffect, useState } from "react";
const IMG_URL = import.meta.env["VITE_API_URL"];
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "types/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import Inputbox from "../../../components/common/inputComponent/inputbox";
import {ProfileUserdatalist, UpdateProfileUserdatalist }  from "../../../Store/actions";
import ImageUploadPreview from "../../../components/common/inputComponent/imageuploader";
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

     const [initialValues, setinitialValues] = useState<any>({
        password: "",
    });

        const validation = useFormik({
            enableReinitialize: true,
            initialValues: initialValues,
            validationSchema: Yup.object({
                current_password: Yup.string()
                    .required("Old password is required")
                    .min(5, "Password must be at least 5 characters long")
                    .max(10, "Password must be at most 10 characters long")
                    .matches(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
                    .matches(/\d/, "Password must contain at least one numeric digit (0-9)")
                    .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)")
                    ,
                new_password: Yup.string()
                    .required("New password is required")
                    .min(5, "Password must be at least 5 characters long")
                    .max(10, "Password must be at most 10 characters long")
                    .matches(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
                    .matches(/\d/, "Password must contain at least one numeric digit (0-9)")
                    .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
                confirm_password: Yup.string()
                    .required("Confirm password is required")
                    .oneOf([Yup.ref('new_password')], 'Passwords must match'),
            }),
            onSubmit: (values) => {
                // Handle password update here
                console.log("val", values);
                // dispatch(UpdateUserdatalist(values));
            },
        });


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
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <div className="flex flex-col ">
                        <ImageUploadPreview onFileSelect={setFile1}  defaultImage={userData?.user_pic ? `${IMG_URL}/public/user/${userData?.user_pic}` : ""}  />

                        <div>
                            <div className="flex flex-col gap-y-3 dark:text-gray-50 w-full mt-[3rem]">
                                <div> Name : {userData ? userData?.name : "N/A"}</div>
                                <div> Email : {userData ? userData?.email : "N/A"} </div>
                                <div> Role : {userData ? userData?.role?.role_title : "N/A"} </div>
                            </div>
                        </div>

                        {userData && userData?.role?.role_title === "Super Admin" ? (
                            <form onSubmit={validation.handleSubmit} className="mt-8 bg-white dark:bg-gray-800"  autoComplete="off">
                                <h2 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-gray-100">Update Your Password</h2>
                                <div className="flex flex-col gap-5 mt-3">
                                    <div>
                                        <Inputbox
                                            id="current_password"
                                            name="current_password"
                                            label="Current Password"
                                            placeholder="Enter your current password"
                                            type="password"
                                            required={true}
                                            validation={validation}
                                        />
                                    </div>
                                    <div>
                                        <Inputbox
                                            id="new_password"
                                            name="new_password"
                                            label="New Password"
                                            placeholder="Create a new password"
                                            type="password"
                                            required={true}
                                            validation={validation} 
                                        />
                                    </div>
                                    <div>
                                        <Inputbox
                                            id="confirm_password"
                                            name="confirm_password"
                                            label="Confirm New Password"
                                            placeholder="Re-enter new password"
                                            type="password"
                                            required={true}
                                            validation={validation}
                                        />
                                    </div>
                                    <div className="flex justify-end gap-3 mt-2">
                                        <button type="button" className="py-2 px-5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"  onClick={() => validation.resetForm()}  disabled={validation.isSubmitting} > Cancel </button>
                                        <button type="submit"  className="py-2 px-5 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={
                                                !validation.isValid ||
                                                !validation.dirty ||
                                                validation.isSubmitting
                                            }
                                        > Save Changes </button>
                                    </div>
                                </div>
                            </form>
                        ) : null}
                    
                    </div>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default ProfilePage;