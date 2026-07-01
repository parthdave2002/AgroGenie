import { FC, lazy, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "react-select";
import { useNavigate, useParams } from "react-router";
import { Form, FormFeedback } from "reactstrap";
import { Label, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { isactiveoption } from "../../../types/dropdown";
import { addleavemanagementlist, getleavemanagemenetlist, resetleavelistmanagement } from "../../../Store/actions"
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));
const Inputbox = lazy(() => import("../../../components/common/inputComponent/inputbox"));
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const LeaveManagmentAddPage : FC = function () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
            dispatch(resetleavelistmanagement())
            if(id){
                let requserdata = {  id: id };
                dispatch(getleavemanagemenetlist(requserdata))
            } 
            else{
                validation.values.name=  "";
                validation.values.count= 0;
                setSelectedactiveid(0);
                setSelectedactiveOption(null)
            }   
    },[id])

     const LeaveManagementdatalist = useSelector((state: any) => state.Leave.LeaveManagementdatalist);

    useEffect(() => { 
        if(LeaveManagementdatalist){
            setinitialValues(prev => ({
                ...prev,
                name: LeaveManagementdatalist?.data?.name ?? "",
                count : LeaveManagementdatalist?.data?.count ?? 0,
            }));
     
            if (LeaveManagementdatalist?.data?.is_active !== undefined && LeaveManagementdatalist?.data?.is_active !== null &&  isactiveoption.length > 0) {
                const selectedSatus :any = isactiveoption.find((data:any) => data.value === LeaveManagementdatalist?.data?.is_active);
                setSelectedactiveOption(selectedSatus);
                setSelectedactiveid(selectedSatus?.value ?? null);
            }
        }
    },[LeaveManagementdatalist])

    // ------ status code start ------
    const [selectedactiveOption, setSelectedactiveOption] = useState(null);
    const [selectedactiveid, setSelectedactiveid] = useState(0);
    const [validateactive, setValidateactive] = useState(0);
  
    const IsActivedata = (data: any) => {
      if (!data) {
        setSelectedactiveid(0);
        setSelectedactiveOption(null);
        setValidateactive(1)
      } else {
        setSelectedactiveid(data.value);
        setSelectedactiveOption(data);
        setValidateactive(0)
      }
    };
    // ------ status code end ------

    const [initialValues, setinitialValues] = useState({
        name: "",
        count:0,
        status: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required("Please enter company name"),
            count: Yup.number().required("Please enter leave count")
        }),
        
        onSubmit: (values) => {
          {selectedactiveid == 0 ? setValidateactive(1) : setValidateactive(0) }

          let requserdata = {
            name: values?.name,
            count: values?.count,
            is_active: selectedactiveid,
            ...(id && { _id: id })
          };
          dispatch(addleavemanagementlist(requserdata));
        },
    });

    // ------------- Get  Data From Reducer Code Start --------------
        const  AddLeaveManagementdatalist  = useSelector((state: any) =>  state.Leave.AddLeaveManagementdatalist);

        useEffect(() => {  
            if(AddLeaveManagementdatalist?.success == true){
                dispatch(resetleavelistmanagement())
                navigate(ParentLink)
                validation.resetForm();
                setSelectedactiveid(0);
                setSelectedactiveOption(null);
                setValidateactive(1)
            }
        }, [AddLeaveManagementdatalist]);
    //  ------------- Get Data From Reducer Code end --------------

    let Name = "Leave Management Add";
    let ParentName = "Leave Management List";
    let ParentLink = "/leave/management/list";

    return (
        <>  
            <NavbarSidebarLayout   isSidebar={true} isNavbar={true} >
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-White dark:bg-Cosmos p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                        <div className="flex gap-x-[2rem]">
                            <div className="flex-1">
                                <Inputbox
                                    id="name"
                                    name="name"
                                    label="Leave Name"
                                    required={true}
                                    placeholder="Enter leave name"
                                    type="text"
                                    validation={validation}
                                />
                            </div>
                        </div>

                        <div className="mt-[1rem]">
                            <Inputbox
                                id="count"
                                name="count"
                                label="Count"
                                required={true}
                                placeholder="Enter Leave Count"
                                type="number"
                                validation={validation}
                            />
                        </div>

                        <div className="mt-[1rem]">
                            <Label htmlFor="Status">Status <span className='text-red-500'>*</span> </Label>
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
                              
                                value={selectedactiveOption}
                                onChange={(e) => { IsActivedata(e) }}
                                options={isactiveoption}
                                isClearable={true}
                            />
                            {validateactive == 1 ? (
                                <FormFeedback type="invalid" className="text-Red text-sm"> Please Select status </FormFeedback>
                            ) : null}
                            </div>
                        </div>

                        <div className="flex gap-x-3 justify-end mt-[1rem]">
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > { id ? "Update Leave Type" : "Add Leave Type" } </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
            <ToastMessage />
        </>
    );
}

export default LeaveManagmentAddPage;