import { FC, lazy, useEffect, useState } from "react";
import {  Button } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {  AddTestimoniallist, ResetTestimoniallist } from "../../../Store/actions";
import { toast } from "react-toastify";
import ImageUploadPreview from "../../../components/common/inputComponent/imageuploader";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import Inputbox from "../../../components/common/inputComponent/inputbox";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const TestimonialAddPage : FC = function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null >(null);
    const [validateImage, setValidateImage] = useState(0);

       useEffect(() => {
            if (file) {
                setValidateImage(0)
            } else {
                setValidateImage(1)
            }
        }, [file])
    

    const [initialValues, setinitialValues] = useState({
        name_eng: "",
        name_guj: "",
        village_eng: "",
        village_guj: "",
        body_guj : "",
        body_eng : "",
        rating : 5,
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
          name_eng: Yup.string().required("Please enter testimonial name"),
          village_eng: Yup.string().required("Please enter village"),
          body_eng: Yup.string().required("Please enter desctiption"),
        }),
        
        onSubmit: (values) => {

            if (!file) return setValidateImage(1)
            const formData = new FormData();
                       formData.append("name_eng", values?.name_eng);
                      formData.append("name_guj", values.name_guj);
                      formData.append("village_eng", values?.village_eng);
                      formData.append("village_guj", values.village_guj);

                      formData.append("body_eng", values?.body_eng);
                      formData.append("body_guj", values?.body_guj);
                      formData.append("rating", "5");
                      if (file) {
                          formData.append("testimonial_pic", file);
                      }

          dispatch(AddTestimoniallist(formData));
        },
    });


    // ------------- Get  Data From Reducer Code Start --------------
        const AddTestimoniallistData = useSelector((state: any) => state.Testimonial.AddTestimonialdatalist)

        useEffect(() => {  
            if(AddTestimoniallistData?.success == true){
                dispatch(ResetTestimoniallist())
                toast.success(AddTestimoniallistData?.msg);
                navigate(ParentLink)
                validation.resetForm();
            }
        }, [AddTestimoniallistData ]);
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
                            {validateImage == 1 ? <FormFeedback type="invalid" className="text-Red text-sm"> Please select Farmer image </FormFeedback> : null}
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
                                    type="number"
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