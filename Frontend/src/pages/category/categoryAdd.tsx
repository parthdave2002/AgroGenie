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
import { AddCategorylist, ResetCategorylist } from "../../Store/actions";
import ImageUploadPreview from "../../components/input/imageuploader";
import { toast } from "react-toastify";

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
        {  label :"Active",  value : true  },
        {  label :"Inactive", value : false }
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
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                        
                        <div>
                            <ImageUploadPreview onFileSelect={setFile}/>
                            {validateImage == 1 ? <FormFeedback type="invalid" className="text-Red text-sm"> Please select category image </FormFeedback> : null}
                        </div>

                        <div className="flex gap-x-[2rem] my-[1rem]">
                            <div className="flex-1">
                                <Label htmlFor="Name">Category Name ( Eng ) <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="name_eng"
                                    name="name_eng"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Enter category name in eng"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.name_eng || ""}
                                    invalid={ validation.touched.name_eng && validation.errors.name_eng ? true : false}
                                />
                                {validation.touched.name_eng && validation.errors.name_eng ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.name_eng} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1">
                                <Label htmlFor="Name">Category Name ( Guj ) <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="name_guj"
                                    name="name_guj"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Enter category name in guj"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.name_guj || ""}
                                    invalid={ validation.touched.name_guj && validation.errors.name_guj ? true : false}
                                />
                                {validation.touched.name_guj && validation.errors.name_guj ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.name_guj} </FormFeedback> ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="mt-[1rem]">
                            <Label htmlFor="Description">Description <span className='text-red-500'>*</span> </Label>
                            <div className="mt-1">
                            <Input
                                id="description"
                                name="description"
                                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                placeholder="description"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.description || ""}
                                invalid={ validation.touched.description && validation.errors.description ? true : false}
                            />
                            {validation.touched.description && validation.errors.description ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.description} </FormFeedback> ) : null}
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