import { FC, lazy, useEffect, useState } from "react";
import {  Button } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "reactstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AddTagloglist, ResetTagloglist } from "../../../Store/actions";
import { toast } from "react-toastify";
import ImageUploadPreview from "../../../components/common/inputComponent/imageuploader";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import Inputbox from "../../../components/common/inputComponent/inputbox";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const TestimonialAddPage : FC = function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null |  string>(null);

    const [initialValues, setinitialValues] = useState({
        name_eng: "",
        name_guj: "",
        village_eng: "",
        village_guj: "",
        body_guj : "",
        body_eng : "",
        rating : 1,
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
          name: Yup.string().required("Please enter testimonial name"),
          village: Yup.string().required("Please enter village"),
          body: Yup.string().required("Please enter desctiption"),
          rating: Yup.string().required("Please enter desctiption"),
        }),
        
        onSubmit: (values) => {
          let requserdata = {
            name_eng: values?.name_eng,
            name_guj : values?.name_guj,
            image : "sdfsdv" ,
            village : "Ahmedabad" ,
            body : "dddd", 
            rating : 1
          };
          dispatch(AddTagloglist(requserdata));
        },
    });


    // ------------- Get  Data From Reducer Code Start --------------
        const AddTagloglistData = useSelector((state: any) => state.Taglog.AddTagloglist)

        useEffect(() => {  
            if(AddTagloglistData?.success == true){
                dispatch(ResetTagloglist())
                toast.success(AddTagloglistData?.msg);
                navigate(ParentLink)
                validation.resetForm();
            }
        }, [AddTagloglistData ]);
    //  ------------- Get Data From Reducer Code end --------------

    let Name = "Testimonial Add";
    let ParentName = "Testimonial List";
    let ParentLink = "/testimonial/list";

    return (
        <>  
            <NavbarSidebarLayout  isSidebar={true} isNavbar={true}>
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[1rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >

                        <div className="my-3">  
                            <ImageUploadPreview onFileSelect={setFile}  />
                        </div> 

                        <div className="flex gap-x-3">
                            <div className="mb-3 flex-1 ">
                                <Inputbox
                                    id="name_eng"
                                    name="name_eng"
                                    label="Testimonial name Eng"
                                    required={true}
                                    placeholder="Testimonial name Eng"
                                    type="text"
                                    validation={validation}
                                />
                            </div>

                            <div className="mb-3 flex-1 ">
                                <Inputbox
                                    id="name_guj"
                                    name="name_guj"
                                    label="Testimonial name Guj"
                                    required={true}
                                    placeholder="Testimonial name Guj"
                                    type="text"
                                    validation={validation}
                                />
                            </div>
                        </div>

                        <div className="md:flex gap-x-3">
                                <div className="mb-3 flex-1 ">
                                    <Inputbox
                                        id="village_eng"
                                        name="village_eng"
                                        label="Testimonial village Eng"
                                        required={true}
                                        placeholder="Testimonial village Eng"
                                        type="text"
                                        validation={validation}
                                    />
                            </div>

                            <div className="mb-3 flex-1 ">
                                <Inputbox
                                    id="village_guj"
                                    name="village_guj"
                                    label="Testimonial village Guj"
                                    required={true}
                                    placeholder="Testimonial village Guj"
                                    type="text"
                                    validation={validation}
                                />
                            </div>
                        </div>

                        <div className="md:flex gap-x-3">
                            <div className="mb-3 flex-1 ">
                                <Inputbox
                                    id="body_eng"
                                    name="body_eng"
                                    label="Testimonial Description Eng"
                                    required={true}
                                    placeholder="Testimonial Description Eng"
                                    type="text"
                                    validation={validation}
                                />
                            </div>

                             <div className="mb-3 flex-1 ">
                                <Inputbox
                                    id="body_guj"
                                    name="body_guj"
                                    label="Testimonial Description Guj"
                                    required={true}
                                    placeholder="Testimonial Description Guj"
                                    type="text"
                                    validation={validation}
                                />
                            </div>  
                        </div>

                         <div className="mb-3 flex-1 ">
                                 <Inputbox
                                    id="rating"
                                    name="rating"
                                    label="Testimonial rating"
                                    required={true}
                                    placeholder="Testimonial rating"
                                    type="text"
                                    validation={validation}
                                />
                            </div>

                        <div className="flex gap-x-3 justify-end mt-[1rem]">
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Add Testimonial </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default TestimonialAddPage;