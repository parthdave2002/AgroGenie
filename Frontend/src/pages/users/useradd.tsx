import { FC, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Form, Input, FormFeedback } from "reactstrap";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AddUserlist, getRoleslist, getUserView, ResetUserdatalist, UpdateUserdatalist } from "../../Store/actions";
import { toast } from "react-toastify";
import ImageUploadPreview from "../../components/input/imageuploader";
import moment from "moment";
import ToastMessage from "../../components/ToastMessage";
const IMG_URL = import.meta.env["VITE_API_URL"];

const AddUserPage : FC = function () {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [file, setFile] = useState<File | null |  string>(null);

    interface RoleData{
        role_title: string;
        _id: string
    }

    interface UserData {
        aadhar_card: boolean | "";
        // added_at: string;
        address: string;
        bank_passbook: boolean | null;
        date_of_birth: string;
        date_of_joining: string;
        email: string;
        emergency_contact_person: string | "";
        emergency_mobile_no: number | "";
        gender: string;
        is_active: boolean | "";
        mobile_no: number | "";
        name: string;
        pan_card: boolean | "";
        password: string;
        role: RoleData;
        user_pic: string;
    }

    // ---------- get default users list ----------
    useEffect(() => {
       dispatch(ResetUserdatalist())
        
        if(id){
            let requserdata = {  id: id };
            dispatch(getUserView(requserdata))
        } 
        else{
            validation.values.name=  "";
            validation.values.email=  "";
            validation.values.gender = "";
            validation.values.mobile_no = "";
            validation.values.address=  "";
            validation.values.date_of_birth=  "";
            validation.values.date_of_joining=  "";
            validation.values.emergency_mobile_no="";
            validation.values.emergency_contact_person=  "";
            validation.values.aadhar_card=  "";
            validation.values.pan_card=  "";
            validation.values.bank_passbook= null; 
        }   
    },[id])

      const [UserDataList, setUserDataList] = useState<UserData>();
      const { UserView } = useSelector((state: any) => ({
        UserView: state.User.UserView,
      }));
    
      useEffect(() => {
        setUserDataList(UserView ? UserView.data  : null);
      }, [UserView]);
    // ---------- get default users list ----------
    
    //---------------- Role option code start ----------------
        const [selectedRoleOption, setSelectedRoleOption] = useState<any>(null);
        const [selectedRoleid, setSelectedRoleid] = useState<string | null>(null);;
        const [ValidateRoleid, setValidateRoleid] = useState(0);

        const IsActiveRoledata = (data: any) => {
        if (!data) {
            setValidateRoleid(1);
            setSelectedRoleid(null);
            setSelectedRoleOption(null);
        } else {
            setValidateRoleid(0);
            setSelectedRoleid(data.value);
            setSelectedRoleOption(data);
        }
        };
    //---------------- Role option code end ----------------


    const genderoption =[
        { label : "Male", value : "male"},
        { label : "Female", value : "female"},
        { label : "Other", value : "other"},
    ]

    const Dropdownoption =[
        { label :"Yes", value : true },
        { label :"No", value : false }
    ]

    const isactiveoption =[
        {label :"Active", value : true},
        { label :"Inactive", value : false}
    ]

    //---------------- Gender option code start ----------------
        const [selectedGenderOption, setSelectedGenderOption] = useState<{ label: string; value: string } | null>(null);
        const [selectedGenderid, setSelectedGenderid] = useState<string | null>(null);
        const [ValidateGenderid, setValidateGenderid] = useState(0);

        const IsActiveGenderdata = (data: any) => {
        if (!data) {
            setValidateGenderid(1)
            setSelectedGenderid(null);
            setSelectedGenderOption(null);
        } else {
            setValidateGenderid(0)
            setSelectedGenderid(data.value);
            setSelectedGenderOption(data);
        }
        };
    //---------------- Gender option code end ----------------

    //---------------- Satus option code start ----------------
        const [selectedStatusOption, setSelectedStatusOption] = useState<{ label: string; value: boolean } | null>(null);
        const [selectedStatusid, setSelectedStatusid] = useState<boolean | null>(null);
        const [ValidateStatusid, setValidateStatusid] = useState(0);

        const IsActivedata = (data:any) => {
        if (!data) {
            setValidateStatusid(1)
            setSelectedStatusid(null);
            setSelectedStatusOption(null);
        } else {
            setValidateStatusid(0)
            setSelectedStatusid(!!data.value);
            setSelectedStatusOption(data);
        }
        };
    //---------------- Satus option code end ----------------

    //---------------- Aadhar option code start ----------------
        const [selectedAadharOption, setSelectedAadharOption] = useState(null);
        const [selectedAadharid, setSelectedAadharid] = useState<boolean | null>(null);
        const [ValidateAadharStatusid, setValidateAadharStatusid] = useState(0);

        const IsActiveAadhardata = (data: any) => {
        if (!data) {
            setValidateAadharStatusid(1);
            setSelectedAadharid(null);
            setSelectedAadharOption(null);
        } else {
            setValidateAadharStatusid(0);
            setSelectedAadharid(data.value);
            setSelectedAadharOption(data);
        }
        };
    //---------------- Aadhar option code end ----------------

    //---------------- pan card option code start ----------------
        const [selectedpancardOption, setSelectedpancardOption] = useState(null);
        const [selectedPancardid, setSelectedPancardid] = useState<null | boolean>(null);
        const [ValidatePanStatusid, setValidatePanStatusid] = useState(0);
    
        const IsActivePancarddata = (data: any) => {

        if (!data) {
            setValidatePanStatusid(1);
            setSelectedPancardid(null);
            setSelectedpancardOption(null);
        } else {
            setValidatePanStatusid(0);
            setSelectedPancardid(data.value);
            setSelectedpancardOption(data);
        }
        };
    //---------------- pan card option code end ----------------

    //---------------- Bank passbook option code start ----------------
        const [selectedBankPassbookOption, setSelectedBankPassbookOption] = useState(null);
        const [selectedBankPassbookid, setSelectedBankPassbookid] = useState<null | boolean>(null);
        const [ValidatePassbookStatusid, setValidatePassbookStatusid] = useState(0);

        const IsActiveBankPassbookdata = (data: any) => {
        if (!data) {
            setValidatePassbookStatusid(1);
            setSelectedBankPassbookid(null);
            setSelectedBankPassbookOption(null);
        } else {
            setValidatePassbookStatusid(0);
            setSelectedBankPassbookid(data.value);
            setSelectedBankPassbookOption(data);
        }
        };
    //---------------- Bank passbook option code end ----------------

    const navigate = useNavigate();
    const [initialValues, setinitialValues] = useState<UserData>({
        name: "",
        email:"",
        gender:"",
        role:{ role_title: "", _id: "" },
        password:"",
        mobile_no: "",
        address:"",
        date_of_birth:"",
        date_of_joining:"",
        is_active: "",
        emergency_mobile_no:"",
        emergency_contact_person:"",
        aadhar_card:"",
        pan_card:"",
        bank_passbook : null,
        user_pic : ""
    });
    
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Advisor Name"),
            email: Yup.string().required("Please Enter Email")
            .matches(/^[^@]+@[^@]+$/, "Email must contain exactly one '@'") // Ensures exactly one '@'
            .matches(/@[^@]+\.[^@]+$/, "Email must contain exactly one '.' after '@'") // Ensures '.' after '@'
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"), // General email validation,
            // password: Yup.string().required("Please Enter Password")
            // .min(5, "Password must be at least 5 characters long")
            // .max(10, "Password must be at most 10 characters long")
            // .matches(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
            // .matches(/\d/, "Password must contain at least one numeric digit (0-9)")
            // .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
           
            password: Yup.string()
                .when([], {
                    is: () => !id, // If `id` does NOT exist, apply validation
                    then: (schema) =>
                        schema.required("Please Enter Password")
                            .min(5, "Password must be at least 5 characters long")
                            .max(10, "Password must be at most 10 characters long")
                            .matches(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
                            .matches(/\d/, "Password must contain at least one numeric digit (0-9)")
                            .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
                    otherwise: (schema) => schema.notRequired(), // If `id` exists, make it optional
                }),
            mobile_no: Yup.string().required("Please Enter Mobile Number")
            .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
            address: Yup.string().required("Please Enter Address"),
            emergency_mobile_no: Yup.string().required("Please Enter Emergency Mobile Number")
            .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
            emergency_contact_person: Yup.string().required("Please Enter Emergency Contact Person"),
            date_of_birth: Yup.string().required("Please Enter Date of birth"),
            date_of_joining: Yup.string().required("Please Enter Date of joining"),
        }), 
        
        onSubmit: (values) => { 
            if (selectedGenderid  == null) return setValidateGenderid(1);
            if (selectedRoleid  == null) return setValidateRoleid(1);
            if (selectedStatusid  == null) return setValidateStatusid(1);
            if (selectedAadharid == null) return setValidateAadharStatusid(1);
            if (selectedPancardid  == null) return setValidatePanStatusid(1);
            if (selectedBankPassbookid  == null) return setValidatePassbookStatusid(1);

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("email", values.email);
            if(!id) formData.append("password", values.password);
            formData.append("gender", selectedGenderid);
            formData.append("mobile_no", String(values.mobile_no));
            formData.append("date_of_joining", moment(values?.date_of_joining).format("DD-MM-YYYY"));
            formData.append("date_of_birth", moment(values.date_of_birth).format("DD-MM-YYYY"));
            formData.append("emergency_mobile_no", String(values.emergency_mobile_no));
            formData.append("emergency_contact_person", values.emergency_contact_person);
            formData.append("address", values.address);
            formData.append("aadhar_card", JSON.stringify(selectedAadharid));
            formData.append("pan_card", JSON.stringify(selectedPancardid));
            formData.append("bank_passbook",JSON.stringify(selectedBankPassbookid));
            formData.append("is_active", JSON.stringify(selectedStatusid));
            formData.append("role", selectedRoleid);
            if (file instanceof File)  formData.append("user_pic", file);

            if(id){
                formData.append("id", id);
                dispatch(UpdateUserdatalist(formData));
            }
            else{
                dispatch(AddUserlist(formData));
            }
        },
    });

    //  -------------- Get Role Data list -------------------
        const RolesList = useSelector((state: any) => state.Role.Roleslist || []);
        const roleoption = RolesList && RolesList.map((role : any) => ({  label: role.role_title,  value: role._id  }));
        
        useEffect(() =>{
        dispatch(getRoleslist());
        },[])
    //  -------------- Get Role Data list -------------------

     //  -------------- Get Role Data list -------------------
     const UserAddedList = useSelector((state: any) => state.User.AddUserlistdata || []);
     const UpdateUserList  = useSelector((state: any) => state.User.UpdateUserList || []);

     useEffect(() =>{
        if(UserAddedList?.success == true || UpdateUserList?.success == true){
            if(UpdateUserList){
                toast.success(UpdateUserList?.msg);
            }else{
                toast.success(UserAddedList?.msg);
            }
            navigate(ParentLink)
            dispatch(ResetUserdatalist());
            validation.resetForm();
        }
     },[UserAddedList, UpdateUserList])
 //  -------------- Get Role Data list -------------------

 useEffect(() => { 
    if(UserDataList){
        setinitialValues(prev => ({
            ...prev,
            name : UserDataList?.name ?? "",
            email : UserDataList?.email ?? "",
            gender : UserDataList?.gender ?? "",
            mobile_no: UserDataList?.mobile_no,
            address : UserDataList?.address ?? "",
            date_of_birth : UserDataList?.date_of_birth ? moment(UserDataList.date_of_birth).format("YYYY-DD-MM") : "",
            date_of_joining : UserDataList?.date_of_joining ? moment(UserDataList.date_of_joining).format("YYYY-DD-MM") : "",
            emergency_mobile_no : UserDataList?.emergency_mobile_no ?? "",
            emergency_contact_person : UserDataList?.emergency_contact_person ?? "",
            aadhar_card : UserDataList?.aadhar_card ?? "",
            pan_card : UserDataList?.pan_card ?? "",
            bank_passbook : UserDataList?.bank_passbook ?? null,
            setFile: UserDataList?.user_pic ? new File([], UserDataList.user_pic) : null
        }));
 
        setSelectedRoleOption({ label: UserDataList?.role.role_title,  value: UserDataList?.role._id });
        setSelectedRoleid(UserDataList?.role?._id ? UserDataList?.role?._id : null);
        if (UserDataList?.gender && genderoption.length > 0) {
            const selectedGender = genderoption.find((gender:any) => gender.value === UserDataList.gender);
            setSelectedGenderOption(selectedGender || null);
            setSelectedGenderid(selectedGender ? String(selectedGender.value) : "");
        }
    
        if (UserDataList?.is_active !== undefined && UserDataList?.is_active !== null &&  isactiveoption.length > 0) {
            const selectedSatus :any = isactiveoption.find((gender:any) => gender.value === UserDataList.is_active);
            setSelectedStatusOption(selectedSatus);
            setSelectedStatusid(selectedSatus?.value ?? null);
        }
    
        if (UserDataList?.aadhar_card !== undefined && UserDataList?.aadhar_card !== null && Dropdownoption.length > 0) {
            const selectedAadhar :any = Dropdownoption.find((dropdown:any) => dropdown.value === UserDataList.aadhar_card);
            setSelectedAadharOption(selectedAadhar || null);
            setSelectedAadharid(selectedAadhar?.value);
        }
    
        if (UserDataList?.pan_card !== undefined && UserDataList?.pan_card !== null && Dropdownoption.length > 0) {
            const selectedPan :any = Dropdownoption.find((dropdown:any) => dropdown.value === UserDataList.pan_card);
            setSelectedpancardOption(selectedPan || null);
            setSelectedPancardid(selectedPan?.value);
        }
    
        if (UserDataList?.bank_passbook !== undefined && UserDataList?.bank_passbook !== null &&  Dropdownoption.length > 0) {
            const selectedSatus :any = Dropdownoption.find((dropdown:any) => dropdown.value === UserDataList.bank_passbook);
            setSelectedBankPassbookOption(selectedSatus);
            setSelectedBankPassbookid(selectedSatus?.value ?? null);
        }
    }
 
  }, [UserDataList]);

    const today = new Date();
    const minDate = new Date(today.setFullYear(today.getFullYear() - 18));
    const formattedMinDate = minDate.toISOString().split("T")[0]; // Format to yyyy-mm-dd=  

    let Name =  id ? "Advisor Update" : "Advisor Add" ;
    let ParentName = "Advisor List";
    let ParentLink = "/users/list";

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => {  e.preventDefault();  validation.handleSubmit(); return false; }}>

                        <ImageUploadPreview onFileSelect={setFile}  defaultImage={UserDataList?.user_pic ? `${IMG_URL}/public/user/${UserDataList?.user_pic}` : ""}/>

                        <div className="md:flex gap-x-[2rem]">
                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="AdvisorName">Advisor Name <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="name"
                                    name="name"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Advisor Name"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.name || ""}
                                    invalid={validation.touched.name && validation.errors.name ? true : false }
                                />
                                {validation.touched.name && validation.errors.name ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.name}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>

                            <div  className="flex-1 mt-[1rem]">
                                <Label htmlFor="email">Email <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="email"
                                    name="email"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Advisor email"
                                    type="email"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.email || ""}
                                    invalid={validation.touched.email && validation.errors.email ? true : false }
                                />
                                {validation.touched.email && validation.errors.email ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.email}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>

                            <div  className="flex-1 mt-[1rem]">
                                <Label htmlFor="email">Gender <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                    <Select
                                        className="w-full dark:text-white"
                                        classNames={{
                                            control: () => "react-select__control",
                                            singleValue: () => "react-select__single-value",
                                            menu: () => "react-select__menu",
                                            option: ({ isSelected }) =>
                                                isSelected ? "react-select__option--is-selected" : "react-select__option",
                                            placeholder: () => "react-select__placeholder",
                                        }}
                                        value={selectedGenderOption}
                                        onChange={(e) => { IsActiveGenderdata(e) }}
                                        options={genderoption}
                                        isClearable={true}
                                    />
                                    {ValidateGenderid == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select gender  </FormFeedback> : null}
                                </div>
                            </div>
                        </div>

                        <div className="md:flex  gap-x-[2rem]">
                            
                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="role">Role <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                    <Select
                                        className="w-full dark:text-white"
                                        classNames={{
                                            control: () => "react-select__control",
                                            singleValue: () => "react-select__single-value",
                                            menu: () => "react-select__menu",
                                            option: ({ isSelected }) =>
                                                isSelected ? "react-select__option--is-selected" : "react-select__option",
                                            placeholder: () => "react-select__placeholder",
                                        }}
                                        value={selectedRoleOption}
                                        onChange={(e) => { IsActiveRoledata(e) }}
                                        options={roleoption}
                                        isClearable={true}
                                    />
                                    {ValidateRoleid == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select role  </FormFeedback> : null}
                                </div>
                            </div>
                            
                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="password">Password <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="password"
                                    name="password"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Password"
                                    type="password"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.password || ""}
                                    invalid={validation.touched.password && validation.errors.password ? true : false }
                                />
                                {validation.touched.password && validation.errors.password ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.password}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>

                            <div  className="flex-1 mt-[1rem]">
                                <Label htmlFor="mobile_no"> Mobile Number <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="mobile_no"
                                    name="mobile_no"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Advisor Mobile Number"
                                    type="number"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.mobile_no || ""}
                                    invalid={validation.touched.mobile_no && validation.errors.mobile_no ? true : false }
                                />
                                {validation.touched.mobile_no && validation.errors.mobile_no ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.mobile_no}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="md:flex gap-x-[2rem]">
                            
                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="address">Address <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="address"
                                    name="address"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Advisor Address"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.address || ""}
                                    invalid={ validation.touched.address && validation.errors.address ? true : false }
                                />
                                {validation.touched.address && validation.errors.address ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.address} </FormFeedback>
                                ) : null}
                                </div>
                            </div>
                            
                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="date_of_birth">Date of Birth  <span className='text-red-500'>*</span></Label>
                                <div className="mt-1">
                                <Input
                                    id="date_of_birth"
                                    name="date_of_birth"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="date_of_birth"
                                    type="date"
                                    max={formattedMinDate}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.date_of_birth || ""}
                                    invalid={validation.touched.date_of_birth && validation.errors.date_of_birth ? true : false }
                                />
                                {validation.touched.date_of_birth && validation.errors.date_of_birth ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.date_of_birth}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>

                            <div  className="flex-1 mt-[1rem]">
                                <Label htmlFor="date_of_joining">Date of Joining  <span className='text-red-500'>*</span></Label>
                                <div className="mt-1">
                                <Input
                                    id="date_of_joining"
                                    name="date_of_joining"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Advisor date_of_joining"
                                    type="date"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.date_of_joining || ""}
                                    invalid={validation.touched.date_of_joining && validation.errors.date_of_joining ? true : false }
                                />
                                {validation.touched.date_of_joining && validation.errors.date_of_joining ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.date_of_joining}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="md:flex gap-x-[2rem] ">
                            <div  className="flex-1 mt-[1rem]">
                                <Label htmlFor="email"> Status <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                    <Select
                                        className="w-full dark:text-white"
                                        classNames={{
                                            control: () => "react-select__control",
                                            singleValue: () => "react-select__single-value",
                                            menu: () => "react-select__menu",
                                            option: ({ isSelected }) =>
                                                isSelected ? "react-select__option--is-selected" : "react-select__option",
                                            placeholder: () => "react-select__placeholder",
                                        }}
                                        value={selectedStatusOption}
                                        onChange={(e) => { IsActivedata(e) }}
                                        options={isactiveoption}
                                        isClearable={true}
                                    />
                                    {ValidateStatusid == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select status  </FormFeedback> : null}
                                </div>
                            </div>

                            <div  className="flex-1 mt-[1rem]">
                                <Label htmlFor="emergency_contact_person">Emergency contact person <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="emergency_contact_person"
                                    name="emergency_contact_person"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Emergency contact person name"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.emergency_contact_person || ""}
                                    invalid={validation.touched.emergency_contact_person && validation.errors.emergency_contact_person ? true : false }
                                />
                                {validation.touched.emergency_contact_person && validation.errors.emergency_contact_person ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.emergency_contact_person}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="emergency_mobile_no">Emergency mobile no <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="emergency_mobile_no"
                                    name="emergency_mobile_no"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Emergency contact person mobile number"
                                    type="number"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.emergency_mobile_no || ""}
                                    invalid={validation.touched.emergency_mobile_no && validation.errors.emergency_mobile_no ? true : false }
                                />
                                {validation.touched.emergency_mobile_no && validation.errors.emergency_mobile_no ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.emergency_mobile_no}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>
                        </div>
                        
                        <div className="md:flex gap-x-[2rem]">
                            <div className="flex-1  mt-[1rem]">
                                <Label htmlFor="password">Aadhar card <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                    <Select
                                        className="w-full dark:text-white"
                                        classNames={{
                                            control: () => "react-select__control",
                                            singleValue: () => "react-select__single-value",
                                            menu: () => "react-select__menu",
                                            option: ({ isSelected }) =>
                                                isSelected ? "react-select__option--is-selected" : "react-select__option",
                                            placeholder: () => "react-select__placeholder",
                                        }}
                                        value={selectedAadharOption}
                                        onChange={(e) => { IsActiveAadhardata(e) }}
                                        options={Dropdownoption}
                                        isClearable={true}
                                    />
                                    {ValidateAadharStatusid == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select aadhar card status  </FormFeedback> : null}
                                </div>
                            </div>

                            <div className="flex-1  mt-[1rem]">
                                <Label htmlFor="pan_card">Pan card <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                    <Select
                                        className="w-full dark:text-white"
                                        classNames={{
                                            control: () => "react-select__control",
                                            singleValue: () => "react-select__single-value",
                                            menu: () => "react-select__menu",
                                            option: ({ isSelected }) =>
                                                isSelected ? "react-select__option--is-selected" : "react-select__option",
                                            placeholder: () => "react-select__placeholder",
                                        }}
                                        value={selectedpancardOption}
                                        onChange={(e) => { IsActivePancarddata(e) }}
                                        options={Dropdownoption}
                                        isClearable={true}
                                    />
                                    {ValidatePanStatusid == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select pan card status  </FormFeedback> : null}
                                </div>
                            </div>

                            <div className="flex-1  mt-[1rem]">
                                <Label htmlFor="bank_passbook">Bank passbook <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                    <Select
                                        className="w-full dark:text-white"
                                        classNames={{
                                            control: () => "react-select__control",
                                            singleValue: () => "react-select__single-value",
                                            menu: () => "react-select__menu",
                                            option: ({ isSelected }) =>
                                                isSelected ? "react-select__option--is-selected" : "react-select__option",
                                            placeholder: () => "react-select__placeholder",
                                        }}
                                        value={selectedBankPassbookOption}
                                        onChange={(e) => { IsActiveBankPassbookdata(e) }}
                                        options={Dropdownoption}
                                        isClearable={true}
                                    />
                                    {ValidatePassbookStatusid == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select passbook status  </FormFeedback> : null}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-x-3 justify-end mt-[3rem]">
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit">  {id ? "Update Advisor" : " Add Advisor"} </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>

            <ToastMessage />
        </>
    );
}

export default AddUserPage;