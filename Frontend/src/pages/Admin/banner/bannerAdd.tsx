import { FC, lazy, useEffect, useState } from "react";
import * as Yup from "yup";
import Select from "react-select";
import { Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import { Form, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddBannerlist, ResetBannerlist } from "../../../Store/actions";
const ImageUploadPreview = lazy(() => import("../../../components/common/inputComponent/imageuploader"));
const Inputbox = lazy(() => import("../../../components/common/inputComponent/inputbox"));
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));
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

    // ------ Banner type code start ------
    const [selectedBannerTypeOption, setSelectedBannerTypeOption] = useState(null);
    const [selectedBannerTypeid, setSelectedBannerTypeid] = useState<string | null>(null);
    const [validatebannerType, setValidatebannerType] = useState(0);

    const IsActiveBannerdata = (data: any) => {
        if (!data) {
            setSelectedBannerTypeid(null);
            setSelectedBannerTypeOption(null);
            setValidatebannerType(1)
        } else {
            setSelectedBannerTypeid(data.value);
            setSelectedBannerTypeOption(data);
            setValidatebannerType(0)
        }
    };
    // ------  Banner type code end ------

    // ------ Is Promotional code start ------
    const [selectedisPromotionalOption, setSelectedisPromotionalOption] = useState(null);
    const [selectedisPromotionalid, setSelectedisPromotionalid] = useState<boolean | null>(null);
    const [validateisPromotional, setValidateisPromotional] = useState(0);

    const IsPromotionaldata = (data: any | null) => {
        if (!data) {
            setSelectedisPromotionalid(false);
            setSelectedisPromotionalOption(null);
            setValidateisPromotional(1)
        } else {
            setSelectedisPromotionalid(data.value);
            setSelectedisPromotionalOption(data);
            setValidateisPromotional(0)
        }
    };
    // ------  Is Promotional code end ------

    const [initialValues, setinitialValues] = useState({
        name: "",
        description: "",
        youtube_url: "",
        duration : "",
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
            if (selectedBannerTypeid == null) return setValidatebannerType(1)
            if (selectedBannerTypeid === "image"  || selectedBannerTypeid === "video"){
                if (!file) return setValidateImage(1)
            } 

            const formData = new FormData();
            formData.append("banner_type", selectedBannerTypeid);
            formData.append("banner_URL", values.youtube_url);
            formData.append("banner_duration", values.duration);
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("is_active", JSON.stringify(selectedactiveid));
            formData.append("is_promotion",  String(selectedisPromotionalid));
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

    const isbanneroption = [
        { label: "Image", value: "image" },
        { label: "Video", value: "video" },
        { label: "Youtube", value: "youtube" },
    ]

    const isPromotionoption = [
        { label: "Yes", value: true },
        { label: "No", value: false }
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
                <div className="mt-[2rem] bg-White dark:bg-Cosmos p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                        
                        {(selectedBannerTypeid  === "image"  || selectedBannerTypeid === "video")  &&
                            <div>
                                <ImageUploadPreview onFileSelect={setFile} />
                                {validateImage == 1 ? <FormFeedback type="invalid" className="text-Red text-sm"> Please select banner image </FormFeedback> : null}
                            </div>
                        }

                          <div className="mt-[1rem]">
                            <Label htmlFor="Status"> Banner Type </Label>
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

                                    value={selectedBannerTypeOption}
                                    onChange={(e) => { IsActiveBannerdata(e) }}
                                    options={isbanneroption}
                                    isClearable={true}
                                />
                                {validatebannerType == 1 ? <FormFeedback type="invalid" className="text-Red text-sm"> Please select banner type </FormFeedback> : null}
                            </div>
                        </div>

                        {selectedBannerTypeid  === "image"  &&
                        <div className="mt-[1rem]">
                            <Inputbox
                                id="duration"
                                name="duration"
                                label="Banner Duration"
                                required={true}
                                placeholder="Banner duration in sec..."
                                type="number"
                                validation={validation}
                            />
                        </div>
                        }

                        {/* { selectedBannerTypeid === "youtube" ||  && */}
                            <div className="mt-[1rem]">
                                                        <Inputbox
                                                            id="youtube_url"
                                                            name="youtube_url"
                                                            label="Banner URL"
                                                            required={true}
                                                            placeholder="Banner URL"
                                                            type="text"
                                                            validation={validation}
                                                        />
                            </div>
                        {/* } */}

                        <div className="mt-[1rem]">
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
                                {validateactive == 1 ? <FormFeedback type="invalid" className="text-Red text-sm"> Please select status </FormFeedback> : null}
                            </div>
                        </div>

                         <div className="mt-[1rem]">
                            <Label htmlFor="Status"> Is Promotional </Label>
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

                                    value={selectedisPromotionalOption}
                                    onChange={(e) => { IsPromotionaldata(e) }}
                                    options={isPromotionoption}
                                    isClearable={true}
                                />
                                {validateisPromotional == 1 ? <FormFeedback type="invalid" className="text-Red text-sm"> Please select status </FormFeedback> : null}
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