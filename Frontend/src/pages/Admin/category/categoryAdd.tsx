import { FC, lazy, useEffect, useState } from "react";
import { Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Form, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddCategorylist, ResetCategorylist } from "../../../Store/actions";
import ImageUploadPreview from "../../../components/common/inputComponent/imageuploader";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import Inputbox from "../../../components/common/inputComponent/inputbox";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const CategoryAddPage : FC = function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [file, setFile] = useState<File | null>(null);
    const [validateImage, setValidateImage] = useState(0);

    useEffect(() =>{
        if(file){
            setValidateImage(0)
        }else{
            setValidateImage(1)
        }
    }, [file])

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
        name_guj: "",
        name_eng : "",
        description:"",
        status: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
            name_guj: Yup.string().required("Please enter category name in english"),
            name_eng: Yup.string().required("Please enter category name in gujarati"),
            description: Yup.string().required("Please enter category description")
        }),
        
        onSubmit: (values) => {
          if(selectedactiveid == null) return setValidateactive(1);
          if(!file) return setValidateImage(1) 
          const formData = new FormData();
          formData.append("name_eng", values.name_eng);
          formData.append("name_guj", values.name_guj);
          formData.append("description", values.description);
          formData.append("is_active", JSON.stringify(selectedactiveid));
          if (file) {
            formData.append("category_pic", file); 
          }
          dispatch(AddCategorylist(formData));
        },
    });

    const isactiveoption =[
        { label :"Active",  value : true  },
        { label :"Inactive", value : false }
    ]

    // ------------- Get  Data From Reducer Code Start --------------
        const { AddCategoryDatalist } = useSelector((state: any) => ({
            AddCategoryDatalist: state.Category.AddCategorylist,
        }));

        useEffect(() => {  
            if(AddCategoryDatalist?.success == true){
                dispatch(ResetCategorylist());
                toast.success(AddCategoryDatalist?.msg);
                navigate(ParentLink)
                validation.resetForm();
                setSelectedactiveid(null);
                setSelectedactiveOption(null);
                setValidateactive(1)
            }
        }, [AddCategoryDatalist]);
    //  ------------- Get Data From Reducer Code end --------------

    let Name = "Category Add";
    let ParentName = "Category List";
    let ParentLink = "/category/list";

    return (
        <>  
            <NavbarSidebarLayout  isSidebar={true} isNavbar={true}>
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                        
                        <div>
                            <ImageUploadPreview onFileSelect={setFile}/>
                            {validateImage == 1 ? <FormFeedback type="invalid" className="text-Red text-sm"> Please select category image </FormFeedback> : null}
                        </div>

                        <div className="flex gap-x-[2rem] my-[1rem]">
                            <div className="flex-1">
                                <Inputbox
                                    id="name_eng"
                                    name="name_eng"
                                    label="Category Name (Eng)"
                                    required={true}
                                    placeholder="Enter category name in eng"
                                    type="text"
                                    validation={validation}
                                />
                            </div>

                            <div className="flex-1">
                                <Inputbox
                                    id="name_guj"
                                    name="name_guj"
                                    label="Category Name (guj)"
                                    required={true}
                                    placeholder="Enter category name in guj"
                                    type="text"
                                    validation={validation}
                                />
                            </div>
                        </div>

                        <div className="mt-[1rem]">
                            <Inputbox
                                id="description"
                                name="description"
                                label="Description"
                                required={true}
                                placeholder="description"
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
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Add Category </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default CategoryAddPage;