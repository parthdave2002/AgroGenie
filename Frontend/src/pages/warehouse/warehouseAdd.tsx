import { FC, lazy, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "react-select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Label, Button } from "flowbite-react";
import { Form, FormFeedback } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddBannerlist, AddWarehouselist, ResetBannerlist } from "../../Store/actions";
import { isactiveoption } from "../../types/dropdown";
const ExampleBreadcrumb = lazy(() => import("../../components/common/breadcrumb/breadcrumb"));
const NavbarSidebarLayout = lazy(() => import("../../layouts/navbar-sidebar"));
const Inputbox = lazy(() => import("../../components/common/inputComponent/inputbox"));

const WarehouseAddPage: FC = function () {
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
        location: "",
        address: "",
        status: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,

        validationSchema: Yup.object({
            name: Yup.string().required("Please enter warehouse name"),
            location: Yup.string().required("Please enter warehouse location"),
            address: Yup.string().required("Please enter warehouse address")
        }),

        onSubmit: (values) => {
            if (selectedactiveid == null) return setValidateactive(1);
            let reqdata ={
                name: values.name,
                location: values.location,
                address: values.address,
                is_active: selectedactiveid
            }
            dispatch(AddWarehouselist(reqdata));
        },
    });


    // ------------- Get  Data From Reducer Code Start --------------
    const AddWarehouselistdata = useSelector((state: any) => state.Warehouse.AddWarehouselistdata);

    useEffect(() => {
        if (AddWarehouselistdata?.success == true) {
            dispatch(ResetBannerlist());
            toast.success(AddWarehouselistdata?.msg)
            navigate(ParentLink)
            validation.resetForm();
            setSelectedactiveid(null);
            setSelectedactiveOption(null);
            setValidateactive(1)
        }
    }, [AddWarehouselistdata]);
    //  ------------- Get Data From Reducer Code end --------------

    let Name = "Warehouse Add";
    let ParentName = "Warehouse List";
    let ParentLink = "/warehouse/list";

    return (
        <>
            <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
                <ExampleBreadcrumb Name={Name} ParentName={ParentName} ParentLink={ParentLink} />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                        <div className="mt-[1rem]">
                            <Inputbox
                                id="name"
                                name="name"
                                label="Warehouse Name"
                                required={true}
                                placeholder="Warehouse Name"
                                type="text"
                                validation={validation}
                            />
                        </div>

                        <div className="mt-[1rem]">
                            <Inputbox
                                id="location"
                                name="location"
                                label="Warehouse Location"
                                required={true}
                                placeholder="Warehouse Location"
                                type="text"
                                validation={validation}
                            />
                        </div>

                        <div className="mt-[1rem]">
                            <Inputbox
                                id="address"
                                name="address"
                                label="Warehouse Address"
                                required={true}
                                placeholder="Warehouse Address"
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
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Add Warehouse </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default WarehouseAddPage;