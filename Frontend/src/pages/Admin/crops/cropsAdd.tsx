import { FC, lazy, useEffect, useState } from "react";
import { Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Form, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddCroplist, ResetCroplist } from "../../../Store/actions";
import MultiImageUploadPreview from "../../../components/common/inputComponent/multiimageuploader";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import Inputbox from "../../../components/common/inputComponent/inputbox";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const AddCropsPage : FC = function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [file, setFile] = useState<File[] >([]);
    const [cropImage, setcropImage] = useState<File[] | string[]>([]);
    const [validateCrop, setvalidateCrop] = useState(0);

    useEffect(() =>{
        if(file?.length && file?.length > 0 || cropImage?.length && cropImage?.length > 0){
            setvalidateCrop(0)
        }else if(file?.length == 0 ){
            setvalidateCrop(1)
            return;
        }
    },[file, cropImage])

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
        name_eng: "",
        name_guj: "",
        description_eng:"",
        description_guj:"",
        status: "",
        crop_pics: [],
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
            name_eng: Yup.string().required("Please enter crop name in english"),
            name_guj: Yup.string().required("Please enter crop name in gujarati"),
            description_eng: Yup.string().required("Please enter crop description in english"),
            description_guj: Yup.string().required("Please enter crop description in gujarati"),
        }),
        
        onSubmit: (values) => {
          if(selectedactiveid == null) return setValidateactive(1);

            const formData = new FormData();
            formData.append("name_eng",values?.name_eng);
            formData.append("name_guj", values?.name_guj);
            formData.append("description_guj",  values?.description_guj);
            formData.append("description_eng", values?.description_eng);
            formData.append("is_active", JSON.stringify(selectedactiveid));
            if (file) {
                file.forEach((data) => {
                    formData.append("crop_pics", data);
                });
            }
          dispatch(AddCroplist(formData));
        },
    });

    const isactiveoption =[
        { label :"Active",   value : true  },
        { label :"Inactive",  value : false }
    ]

    // ------------- Get  Data From Reducer Code Start --------------
        const AddCropdatalist  = useSelector((state: any) => state.Crop.AddCropdatalist );

        useEffect(() => {  
            if(AddCropdatalist?.success == true){
                dispatch(ResetCroplist())
                toast.success(AddCropdatalist?.msg);
                navigate("/crop/list")
                validation.resetForm();
                setSelectedactiveid(null);
                setSelectedactiveOption(null);
                setValidateactive(1)
            }
        }, [AddCropdatalist]);
    //  ------------- Get Data From Reducer Code end --------------

    let Name = "Crop Add";
    let ParentName = "Crop List";
    let ParentLink = "/crop/list";

    return (
        <>  
            <NavbarSidebarLayout   isSidebar={true} isNavbar={true} >
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >

                    <div className="mb-4">
                            <label className="dark:text-gray-100 text-[1.2rem]"> Product Image <span className='text-red-500'>*</span> </label>
                            <MultiImageUploadPreview onFileSelect={setFile} defaultImage={cropImage} onDefaultImageChange={setcropImage} />
                            {validateCrop == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select Crop photo </FormFeedback> ) : null}
                    </div>

                        <div className="flex gap-x-[2rem]">
                            <div className="flex-1">
                                <Inputbox
                                    id="name_eng"
                                    name="name_eng"
                                    label="Crop Name (Eng)"
                                    required={true}
                                    placeholder="Enter crop name in eng"
                                    type="text"
                                    validation={validation}
                                />
                            </div>

                            <div className="flex-1">
                                <Inputbox
                                    id="name_guj"
                                    name="name_guj"
                                    label="Crop Name (Guj)"
                                    required={true}
                                    placeholder="Enter crop name in guj"
                                    type="text"
                                    validation={validation}
                                />
                            </div>
                        </div>
                        
                        <div className="flex gap-x-[2rem] my-[1rem]">
                           
                            <div className="flex-1">
                                <Inputbox
                                    id="description_eng"
                                    name="description_eng"
                                    label="Description (Eng)"
                                    required={false}
                                    placeholder="Enter crop description in eng"
                                    type="text"
                                    validation={validation}
                                />
                            </div>

                            <div className="flex-1">
                                <Inputbox
                                    id="description_guj"
                                    name="description_guj"
                                    label="Description (Guj)"
                                    required={false}
                                    placeholder="Enter crop description in guj"
                                    type="text"
                                    validation={validation}
                                />
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
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Add Crop </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate("/crop/list")}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default AddCropsPage;