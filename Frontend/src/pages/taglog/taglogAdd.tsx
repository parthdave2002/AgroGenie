import { FC, lazy, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Form, Input, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AddTagloglist, ResetTagloglist } from "../../Store/actions";
import { toast } from "react-toastify";

const TaglogAddPage : FC = function () {
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
        name: "",
        status: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
          name: Yup.string().required("Please enter taglog name"),
        }),
        
        onSubmit: (values) => {
          if(selectedactiveid == null) return setValidateactive(1)
          let requserdata = {
            taglog_name: values?.name,
            is_active: selectedactiveid,
          };
          dispatch(AddTagloglist(requserdata));
        },
    });

    const isactiveoption =[
        {
            label :"Active",
            value : true
        },
        {
            label :"Inactive",
            value : false
        }
    ]

    // ------------- Get  Data From Reducer Code Start --------------
        const { AddTagloglistData  } = useSelector((state: any) => ({
            AddTagloglistData : state.Taglog.AddTagloglist,
        }));

        useEffect(() => {  
            if(AddTagloglistData?.success == true){
                dispatch(ResetTagloglist())
                toast.success(AddTagloglistData?.msg);
               
                navigate(ParentLink)
                validation.resetForm();
                setSelectedactiveid(null);
                setSelectedactiveOption(null);
                setValidateactive(0)
            }
        }, [AddTagloglistData ]);
    //  ------------- Get Data From Reducer Code end --------------

    let Name = "Taglog Add";
    let ParentName = "Taglog List";
    let ParentLink = "/taglog/list";

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                        <div>
                            <Label htmlFor="Name">Name <span className='text-red-500'>*</span> </Label>
                            <div className="mt-1">
                            <Input
                                id="name"
                                name="name"
                                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                placeholder="Taglog name"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                                invalid={ validation.touched.name && validation.errors.name ? true : false}
                            />
                            {validation.touched.name && validation.errors.name ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.name} </FormFeedback> ) : null}
                            </div>
                        </div>

                        <div className="mt-[1rem]">
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
                            {validateactive == 1 ? <FormFeedback type="invalid" className="text-Red text-sm"> Please select status </FormFeedback> : null}
                            </div>
                        </div>

                        <div className="flex gap-x-3 justify-end mt-[1rem]">
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Add Taglog </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default TaglogAddPage;