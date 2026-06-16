import { FC, lazy, useEffect, useState } from "react";
import { Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Form, FormFeedback } from "reactstrap";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AddUserCategorylist, getUserCategoryView, ResetUserdatalist, UpdateUserCategorylist } from "../../../Store/actions";
import { toast } from "react-toastify";
import { UserCategoryData } from "types/types";
import { isactiveoption } from "../../../types/dropdown";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));
const Inputbox = lazy(() => import("../../../components/common/inputComponent/inputbox"));
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));

const AddUserCategoryPage : FC = function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    // ---------- get default users list ----------

    useEffect(() => {
           dispatch(ResetUserdatalist())
            if(id){
                let requserdata = {  id: id };
                dispatch(getUserCategoryView(requserdata))
            } 
            else{
                validation.values.category_name=  "";
                validation.values.description=  "";
                validation.values.goal_amt = 0;
                validation.values.is_active = ""; 
            }   
        },[id])

      const [UserCategoryDataList, setUserCategoryDataList] = useState<UserCategoryData>();
      const  UserView  = useSelector((state: any) => state.User.UserCategoryView)
      
      useEffect(() => {
        setUserCategoryDataList(UserView ? UserView.data  : null);
      }, [UserView]);


       useEffect(() => { 
          if(UserCategoryDataList){
            setinitialValues(prev => ({
                ...prev,
                category_name : UserCategoryDataList?.category_name ?? "",
                description : UserCategoryDataList?.description ?? "",
                goal_amt : UserCategoryDataList?.goal_amt ?? 0,
            }));
          
            if (UserCategoryDataList?.is_active !== undefined && UserCategoryDataList?.is_active !== null &&  isactiveoption.length > 0) {
                const selectedSatus :any = isactiveoption.find((gender:any) => gender.value === UserCategoryDataList.is_active);
                setSelectedStatusOption(selectedSatus);
                setSelectedStatusid(selectedSatus?.value ?? null);
            }
          }
        }, [UserCategoryDataList]);
    // ---------- get default users list ----------

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

    const [initialValues, setinitialValues] = useState<UserCategoryData>({
        category_name: "",
        description:"",
        goal_amt: 0,
        is_active: "",
    });
    
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        
        validationSchema: Yup.object({
            category_name: Yup.string().required("Please Enter Category Name"),
            description: Yup.string().required("Please Enter Description"),
            goal_amt: Yup.number().required("Please Enter Daily Goal Amount").positive("Goal amount must be a positive number").integer("Goal amount must be an integer"),
        }), 
        
        onSubmit: (values) => { 
            if (selectedStatusid  == null) return setValidateStatusid(1);
            const requserdata = {
                category_name: values.category_name,
                goal_amt: values.goal_amt,
                description: values.description,
                is_active: selectedStatusid,
            };

            if(id){
                dispatch(UpdateUserCategorylist({ ...requserdata, id }));
            }else{
                dispatch(AddUserCategorylist(requserdata));
            }
        },
    });

    //  -------------- After Success back to list -------------------
        const UserAddedList = useSelector((state: any) => state.User.AddUserCategorylistdata || []);
        const UpdateUserList= useSelector((state: any) => state.User.UpdateUserCategoryList || []);

        useEffect(() =>{
            if(UserAddedList?.success || UpdateUserList?.success == true){
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
    //  -------------- After Success back to list -------------------
   
    let Name =  "Advisor Category"; ;
    let ParentName = "Advisor Category";
    let ParentLink = "/users/category/list";

    return (
        <>  
            <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-White dark:bg-Cosmos p-4">
                    <Form onSubmit={(e) => {  e.preventDefault();  validation.handleSubmit(); return false; }}>

                        <div className="md:flex gap-x-[2rem]">
                            <div className="flex-1 mt-[1rem]">
                                <div className="mt-1">
                                    <Inputbox
                                        id="category_name"
                                        name="category_name"
                                        label = "Category Name"
                                        required = {true}
                                        placeholder="Fresher Advisor (0-1 Year Experience)"
                                        type="text"
                                        validation={validation}
                                    />
                                </div>
                            </div>

                            <div  className="flex-1 mt-[1rem] ">
                                <div className="mt-1">
                                    <Inputbox
                                        id="description"
                                        name="description"
                                        label = "Description"
                                        required = {true}
                                        placeholder="This category is for advisors with 0-1 year of experience."
                                        type="text"
                                        validation={validation}
                                    />
                                </div>
                            </div>
                        </div> 

                        <div className="md:flex gap-x-[2rem]">
                            <div className="flex-1 mt-[1rem]">
                                <div className="mt-1">
                                    <Inputbox
                                        id="goal_amt"
                                        name="goal_amt"
                                        label = "Daily Goal Amount"
                                        required = {true}
                                        placeholder="20000"
                                        type="number"
                                        validation={validation}
                                    />
                                </div>
                            </div>

                              <div  className="flex-1 mt-[1rem]">
                                <Label htmlFor="email"> Status <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                    <Select
                                        className="w-full dark:text-White"
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
                        </div>
                       
                        <div className="flex gap-x-3 justify-end mt-[3rem]">
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit">  {id ? 'Update Category' : 'Add Category'}  </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>

            <ToastMessage />
        </>
    );
}

export default AddUserCategoryPage;