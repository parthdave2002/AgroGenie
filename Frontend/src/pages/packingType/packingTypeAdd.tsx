import { FC, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Form, Input, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AddPackingTypelist, ResetPackingTypelist } from "../../Store/actions";
import { toast } from "react-toastify";
import ToastMessage from "../../components/ToastMessage";

const AddpackingTypePage : FC = function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // ------ status code start ------
    const [selectedactiveOption, setSelectedactiveOption] = useState(null);
    const [selectedactiveid, setSelectedactiveid] = useState<boolean | null>(null);
    const [validateactive, setValidateactive] = useState(0);
  
    const IsActivedata = (data: any) => {
      if (!data) {
        setSelectedactiveid(null);
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
        packing_type_eng:"",
        packing_type_guj: "",
        status: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
            packing_type_eng: Yup.string().required("Please enter english packing type"),
            packing_type_guj: Yup.string().required("Please enter gujarati packing type"),
        }),
        
        onSubmit: (values) => {
          if(selectedactiveid == null) return setValidateactive(1);
          let requserdata = {
            type_eng: values?.packing_type_eng,
            type_guj: values?.packing_type_guj,
            is_active: selectedactiveid,
          };
          dispatch(AddPackingTypelist(requserdata));
        },
    });

    const isactiveoption =[
        {  label :"Active",   value : true  },
        {  label :"Inactive",  value : false }
    ]

    // ------------- Get  Data From Reducer Code Start --------------
        const { AddPackingtypelist } = useSelector((state: any) => ({
            AddPackingtypelist: state.PackingType.AddPackingtypelist,

        }));

        useEffect(() => {  
            if(AddPackingtypelist?.success == true){
                dispatch(ResetPackingTypelist())
                toast.success(AddPackingtypelist?.msg);
                navigate(ParentLink)
                validation.resetForm();
                setSelectedactiveid(null);
                setSelectedactiveOption(null);
                setValidateactive(1)
            }
        }, [AddPackingtypelist]);
    //  ------------- Get Data From Reducer Code end --------------

    let Name = "Packing type Add";
    let ParentName = "Packing type List";
    let ParentLink = "/packing-type/list";

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                        
                        <div className="flex gap-x-[2rem] ">
                            <div className="flex-1">
                                <Label htmlFor="PackingType">Packing Type ( Eng ) <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="packing_type_eng"
                                    name="packing_type_eng"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Enter packing type in eng "
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.packing_type_eng || ""}
                                    invalid={ validation.touched.packing_type_eng && validation.errors.packing_type_eng ? true : false}
                                />
                                {validation.touched.packing_type_eng && validation.errors.packing_type_eng ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.packing_type_eng} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1">
                                <Label htmlFor="PackingType">Packing Type ( Guj ) <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="packing_type_guj"
                                    name="packing_type_guj"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Enter packing type in guj "
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.packing_type_guj || ""}
                                    invalid={ validation.touched.packing_type_guj && validation.errors.packing_type_guj  ? true : false }
                                />
                                {validation.touched.packing_type_guj && validation.errors.packing_type_guj ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.packing_type_guj}  </FormFeedback> ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="my-[1rem]">
                            <Label htmlFor="Status">Status <span className='text-red-500'>*</span> </Label>
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
                              
                                value={selectedactiveOption}
                                onChange={(e) => { IsActivedata(e) }}
                                options={isactiveoption}
                                isClearable={true}
                            />
                            {validateactive == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select status </FormFeedback> : null}
                            </div>
                        </div>

                        <div className="flex gap-x-3 justify-end">
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Add packing type </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
            <ToastMessage />
        </>
    );
}

export default AddpackingTypePage;