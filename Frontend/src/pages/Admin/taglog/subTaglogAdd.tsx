import { FC, lazy, useEffect, useMemo, useState } from "react";
import { Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Form, FormFeedback } from "reactstrap";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import { AddSubTagloglist, ResetTagloglist } from "../../../Store/actions";
import Inputbox from "../../../components/common/inputComponent/inputbox";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const SubTaglogAddPage : FC = function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const  { id } = useParams();

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
            taglog_id : id,
            name: values?.name,
            is_active: selectedactiveid,
          };
          dispatch(AddSubTagloglist(requserdata));
        },
    });

    const isactiveoption = useMemo( () => [
        { label: "Active", value: true },
        { label: "Inactive", value: false }
    ],[])

    // ------------- Get  Data From Reducer Code Start --------------
        const  AddTagloglistData = useSelector((state: any) =>  state.Taglog.AddSubTagloglist );

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

    let Name = "Sub-Taglog Add";
    let ParentName = "Taglog List";
    let ParentLink = "/taglog/list";

    return (
        <>  
            <NavbarSidebarLayout   isSidebar={true} isNavbar={true} >
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                        <div>
                            <Inputbox
                                id="name"
                                name="name"
                                label="Sub Taglog Name"
                                required={true}
                                placeholder="Sub Taglog Name"
                                type="text"
                                validation={validation}
                            />
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
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Add Sub-Taglog </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default SubTaglogAddPage;