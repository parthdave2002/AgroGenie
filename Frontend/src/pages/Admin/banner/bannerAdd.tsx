import { FC, lazy, useEffect, useState } from "react";
import * as Yup from "yup";
import Select from "react-select";
import { Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import { Form, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ImageUploadPreview from "../../../components/common/inputComponent/imageuploader";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import Inputbox from "../../../components/common/inputComponent/inputbox";
import { AddBannerlist, ResetBannerlist } from "../../../Store/actions";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const BannerAddPage: FC = function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [file, setFile] = useState<File | null>(null);
    const [validateImage, setValidateImage] = useState(0);

    useEffect(() => {
        if (file) {
            setValidateImage(0)
        } else {
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
        name: "",
        description: "",
        status: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,

        validationSchema: Yup.object({
            name: Yup.string().required("Please enter banner name"),
            description: Yup.string().required("Please enter banner description")
        }),

        onSubmit: (values) => {
            if (selectedactiveid == null) return setValidateactive(1)
            if (!file) return setValidateImage(1)
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("is_active", JSON.stringify(selectedactiveid));
            if (file) {
                formData.append("banner_pic", file);
            }
            dispatch(AddBannerlist(formData));
        },
    });

    const isactiveoption = [
        { label: "Active", value: true },
        { label: "Inactive", value: false }
    ]

    // ------------- Get  Data From Reducer Code Start --------------
    const { AddBannerDatalist } = useSelector((state: any) => ({
        AddBannerDatalist: state.Banner.AddBannerlist,
    }));

    useEffect(() => {
        if (AddBannerDatalist?.success == true) {
            dispatch(ResetBannerlist());
            toast.success(AddBannerDatalist?.msg)
            navigate(ParentLink)
            validation.resetForm();
            setSelectedactiveid(null);
            setSelectedactiveOption(null);
            setValidateactive(1)
        }
    }, [AddBannerDatalist]);
    //  ------------- Get Data From Reducer Code end --------------

    let Name = "Banner Add";
    let ParentName = "Banner List";
    let ParentLink = "/banner/list";

    return (
        <>
            <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
                <ExampleBreadcrumb Name={Name} ParentName={ParentName} ParentLink={ParentLink} />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                        <div>
                            <ImageUploadPreview onFileSelect={setFile} />
                            {validateImage == 1 ? <FormFeedback type="invalid" className="text-Red text-sm"> Please select category image </FormFeedback> : null}
                        </div>

                        <div>

                            <Inputbox
                                id="name"
                                name="name"
                                label="Banner Name"
                                required={true}
                                placeholder="Banner Name"
                                type="text"
                                validation={validation}
                            />
                        </div>

                        <div className="mt-[1rem]">
                            <Inputbox
                                id="description"
                                name="description"
                                label="Description"
                                required={true}
                                placeholder="Enter description"
                                type="text"
                                validation={validation}
                            />
                        </div>

                        <div className="mt-[1rem]">
                            <Label htmlFor="Status">Status</Label>
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
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Add Banner </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default BannerAddPage;