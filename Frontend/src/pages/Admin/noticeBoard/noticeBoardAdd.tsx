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
import { AddNoticeBoardlist, ResetNoticeBoardlist } from "../../../Store/actions";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const NoticeBoardAddPage: FC = function () {
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

    // ------ Send to code start ------
    const [selectedSendToOption, setSelectedSendToOption] = useState(null);
    const [selectedSendToid, setSelectedSenid] = useState<string | null>(null);
    const [validateSendTo, setValidateSendTo] = useState(0);

    const IsSendTodata = (data: any | null) => {
        if (!data) {
            setSelectedSenid(null);
            setSelectedSendToOption(null);
            setValidateSendTo(1)
        } else {
            setSelectedSenid(data.value);
            setSelectedSendToOption(data);
            setValidateSendTo(0)
        }
    };
    // ------ Send to code end ------

    // ------ Employee code start ------
    const [selectedEmployeeOption, setSelectedEmployeeOption] = useState(null);
    const [selectedEmployeeid, setSelectedEmployeeid] = useState<boolean | null>(null);
    const [validateEmployee, setValidateEmployee] = useState(0);

    const IsEmployeedata = (data: any | null) => {
        if (!data) {
            setSelectedEmployeeid(false);
            setSelectedEmployeeOption(null);
            setValidateEmployee(1)
        } else {
            setSelectedEmployeeid(data.value);
            setSelectedEmployeeOption(data);
            setValidateEmployee(0)
        }
    };
    // ------ Employee code end ------

    // ------ Document Type code start ------
    const [selectedDocTypeOption, setSelectedDocOption] = useState(null);
    const [selectedDocTypeid, setSelectedDocTypeid] = useState<string | null>(null);
    const [validateDocType, setValidateDocType] = useState(0);

    const IsDocTypedata = (data: any | null) => {
        if (!data) {
            setSelectedDocTypeid(null);
            setSelectedDocOption(null);
            setValidateDocType(1)
        } else {
            setSelectedDocTypeid(data.value);
            setSelectedDocOption(data);
            setValidateDocType(0)
        }
    };
    // ------ Document Type code end ------

    // ------ Duration code start ------
    const [selectedDurationOption, setSelectedDurationOption] = useState(null);
    const [selectedDurationid, setSelectedDurationid] = useState<string | null>(null);
    const [validateDuration, setValidateDuration] = useState(0);

    const IsDurationdata = (data: any | null) => {
        if (!data) {
            setSelectedDurationid("");
            setSelectedDurationOption(null);
            setValidateDuration(1)
        } else {
            setSelectedDurationid(data.value);
            setSelectedDurationOption(data);
            setValidateDuration(0)
        }
    };
    // ------ Duration code end ------


    const [initialValues, setinitialValues] = useState({
        name: "",
        duration: "",
        type_document:"",
        document_text : "",
        start_date :"",
        end_date : "",
        status: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,

        validationSchema: Yup.object({
            name: Yup.string().required("Please enter Notice name")
        }),

        onSubmit: (values) => {

            if (selectedactiveid == null) return setValidateactive(1)
        
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("send_to", String(selectedSendToid));
            {selectedEmployeeid &&  formData.append("employee", String(selectedEmployeeid))}
            formData.append("type_document", String(selectedDocTypeid));
            formData.append("duration", String(selectedDurationid));
            formData.append("document_text", values?.document_text);
            formData.append("start_date", values?.start_date);
            formData.append("end_date", values?.end_date);
            formData.append("is_active", JSON.stringify(selectedactiveid));

            if (file) {
                formData.append("document_pics", file);
            }
            dispatch(AddNoticeBoardlist(formData));
        },
    });

    const isactiveoption = [
        { label: "Active", value: true },
        { label: "Inactive", value: false }
    ]

    const isSendTooption = [
        { label: "All", value: "all" },
        { label: "Selected", value: "selected" }
    ]

    const isemployeeoption = [
        { label: "Priyanka", value: "all" },
        { label: "Akki", value: "selected" }
    ]

    const isDocTypeoption = [
        { label: "Text", value: "text" },
        { label: "PDF", value: "pdf" },
        { label: "Video", value: "video" },
        { label: "Youtube", value: "youtube" }
    ]

    const isDurationoption = [
        { label: "Permenet", value: "permenet" },
        { label: "Part Time", value: "part-time" }
    ]

    // ------------- Get  Data From Reducer Code Start --------------
    const AddNoticedatalist = useSelector((state: any) => state.NoticeBoard.AddNoticedatalist);

    useEffect(() => {
        if (AddNoticedatalist?.success == true) {
            dispatch(ResetNoticeBoardlist());
            toast.success(AddNoticedatalist?.msg)
            navigate(ParentLink)
            validation.resetForm();
            setSelectedactiveid(null);
            setSelectedactiveOption(null);
            setValidateactive(1)
        }
    }, [AddNoticedatalist]);
    //  ------------- Get Data From Reducer Code end --------------

    let Name = "Notice Board Add";
    let ParentName = "Notice Board List";
    let ParentLink = "/notice-board/list";

    return (
        <>
            <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
                <ExampleBreadcrumb Name={Name} ParentName={ParentName} ParentLink={ParentLink} />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >

                        {(selectedDocTypeid === "pdf" ||  selectedDocTypeid === "video") &&
                            <div>
                                <ImageUploadPreview  fileType="both" onFileSelect={setFile} />
                                {validateImage == 1 ? <FormFeedback type="invalid" className="text-Red text-sm"> Please select image/video/pdf </FormFeedback> : null}
                            </div>
                        }

                        <div className="flex mt-[1rem] gap-x-4">
                            <div className="flex-1">
                                <Inputbox
                                    id="name"
                                    name="name"
                                    label="Name"
                                    required={true}
                                    placeholder="Name"
                                    type="text"
                                    validation={validation}
                                />
                            </div>

                            {(selectedDocTypeid === "text" || selectedDocTypeid === "youtube") &&
                                <div className="flex-1">
                                    <Inputbox
                                        id="document_text"
                                        name="document_text"
                                        label="Document URL"
                                        required={true}
                                        placeholder="Document URL"
                                        type="text"
                                        validation={validation}
                                    />
                                </div>
                            }
                        </div>

                        <div className="md:flex w-full mt-[1rem] gap-x-4">
                            <div className="flex-1">
                                <Label htmlFor="Status"> Send to </Label>
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
                                        value={selectedSendToOption}
                                        onChange={(e) => { IsSendTodata(e) }}
                                        options={isSendTooption}
                                        isClearable={true}
                                    />
                                    {validateSendTo == 1 ? <FormFeedback type="invalid" className="text-Red text-sm"> Please select send to</FormFeedback> : null}
                                </div>
                            </div>

                            {selectedSendToid == "selected" &&
                                <div className="flex-1">
                                    <Label htmlFor="Status">  Select User </Label>
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
                                            isMulti={true}
                                            value={selectedEmployeeOption}
                                            onChange={(e) => { IsEmployeedata(e) }}
                                            options={isemployeeoption}
                                            isClearable={true}
                                        />
                                        {validateEmployee == 1 ? <FormFeedback type="invalid" className="text-Red text-sm"> Please Select Employee </FormFeedback> : null}
                                    </div>
                                </div>
                            } 
                        </div>

                         <div className="md:flex w-full mt-[1rem] gap-x-4">
                            <div className="flex-1">
                                <Label htmlFor="Status"> Type Of Document </Label>
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

                                        value={selectedDocTypeOption}
                                        onChange={(e) => { IsDocTypedata(e) }}
                                        options={isDocTypeoption}
                                        isClearable={true}
                                    />
                                    {validateDocType == 1 ? <FormFeedback type="invalid" className="text-Red text-sm"> Please Select Documnet Type </FormFeedback> : null}
                                </div>
                            </div>

                            <div className="flex-1">
                                <Label htmlFor="Status"> Duration </Label>
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

                                        value={selectedDurationOption}
                                        onChange={(e) => { IsDurationdata(e) }}
                                        options={isDurationoption}
                                        isClearable={true}
                                    />
                                    {validateDuration == 1 ? <FormFeedback type="invalid" className="text-Red text-sm"> Please Select Duration </FormFeedback> : null}
                                </div>
                            </div>
                        </div>

                        {selectedDurationid === "part-time" &&
                            <div className="md:flex mt-[1rem] gap-x-4">
                                <div className="flex-1">
                                    <Inputbox
                                        id="start_date"
                                        name="start_date"
                                        label="Start Date"
                                        required={true}
                                        placeholder="Start Date"
                                        type="date"
                                        validation={validation}
                                    />
                                </div>

                                <div className="flex-1">
                                    <Inputbox
                                        id="end_date"
                                        name="end_date"
                                        label="End Date"
                                        required={true}
                                        placeholder="End Date"
                                        type="date"
                                        validation={validation}
                                    />
                                </div>
                            </div>
                        }

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
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Add Notice </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default NoticeBoardAddPage;