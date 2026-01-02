import { FC, lazy, useEffect, useState } from "react";
import { Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Form, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddRoleslist, ResetRoleslist } from "../../../Store/actions"
import Inputbox from "../../../components/common/inputComponent/inputbox";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const AddRolePage : FC = function () {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const isactiveoption =[
        { label :"Active", value : true},
        { label :"Inactive", value : false}
    ]

    //---------------- Satus option code start ----------------
        const [selectedStatusOption, setSelectedStatusOption] = useState(null);
        const [selectedStatusid, setSelectedStatusid] = useState<boolean | null>(null);
        const [validateStatusid, setvalidateStatusid] = useState(0);


        const IsActivedata = (data: any) => {
        if (!data) {
            setvalidateStatusid(1);
            setSelectedStatusid(null);
            setSelectedStatusOption(null);
        } else {
            setvalidateStatusid(0);
            setSelectedStatusid(data.value);
            setSelectedStatusOption(data);
        }
        };
    //---------------- Satus option code end ----------------

    const [initialValues, setinitialValues] = useState({
        id: 0,
        role_title: "",
        description: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
          role_title: Yup.string().required("Please Enter Role Name"),
          description: Yup.string().required("Please Enter Description"),
        }),
    
        onSubmit: (values) => {
            if (selectedStatusid == null) return setvalidateStatusid(1);
            let requserData ={
                role_title : values.role_title,
                description : values.description,
                is_active: selectedStatusid,
            }

          dispatch(AddRoleslist(requserData));
          validation.resetForm();
        },
    });

    // ------------- Get  Data From Reducer Code Start --------------
            const { AddRolesDatalist } = useSelector((state: any) => ({
                AddRolesDatalist: state.Role.AddRoleslist,
            }));
    
            useEffect(() => {  
                if(AddRolesDatalist?.success == true){
                    dispatch(ResetRoleslist())
                    toast.success(AddRolesDatalist?.msg)
                    navigate(ParentLink)
                    validation.resetForm();
                    setSelectedStatusid(null);
                    setSelectedStatusOption(null);
                }
            }, [AddRolesDatalist]);
    //  ------------- Get Data From Reducer Code end --------------

    let Name = "Role Add";
    let ParentName = "Role List";
    let ParentLink = "/roles/list";

    return (
        <>  
            <NavbarSidebarLayout   isSidebar={true} isNavbar={true} >
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                        <div>
                            <Inputbox
                                id="role_title"
                                name="role_title"
                                label="Role Title"
                                required={true}
                                placeholder="Role Title"
                                type="text"
                                validation={validation}
                            />
                        </div>

                        <div className="my-[1rem]">
                            <Inputbox
                                id="description"
                                name="description"
                                label="Role Description"
                                required={true}
                                placeholder="Role Description"
                                type="text"
                                validation={validation}
                            />
                        </div>
                        
                        <div className="mb-[1rem]">
                            <Label htmlFor="Description"> Status <span className='text-red-500'>*</span>  </Label>
                            <div className="">
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
                                     {validateStatusid == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select status  </FormFeedback> : null}
                            </div>
                        </div>

                        <div className="flex gap-x-3 justify-end">
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Add Role </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate("/roles/list")}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default AddRolePage;