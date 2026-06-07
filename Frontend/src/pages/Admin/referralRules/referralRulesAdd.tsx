import { FC, lazy, useEffect, useState } from "react";
import { Label, Button } from "flowbite-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "react-select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Form, FormFeedback } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { isactiveoption } from "../../../types/dropdown";
import { AddReferralRulelist, ResetReferralRulelist } from "../../../Store/actions";
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));
const Inputbox = lazy(() => import("../../../components/common/inputComponent/inputbox"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const AddReferralRulesPage : FC = function () {
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
        referral_amt: "",
        referral_name: "",
        status: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
            referral_name: Yup.string().required("Please enter referral name"),
            referral_amt: Yup.string().required("Please enter referral amount"),
        }),
        
        onSubmit: (values) => {
          if(selectedactiveid == null) return setValidateactive(1);

            let Requser ={
                name : values?.referral_name.toUpperCase().trim(),
                amount : values?.referral_amt,
                is_active : selectedactiveid
            }
          dispatch(AddReferralRulelist(Requser));
        },
    });

    // ------------- Get  Data From Reducer Code Start --------------
        const AddReferralRulelistData = useSelector((state: any) =>  state.Referral.AddReferralRulelist);

        useEffect(() => {  
            if(AddReferralRulelistData?.success == true){
                dispatch(ResetReferralRulelist())
                toast.success(AddReferralRulelistData?.msg);
                navigate("/referral-rules/list")
                validation.resetForm();
                setSelectedactiveid(null);
                setSelectedactiveOption(null);
                setValidateactive(1)
            }
        }, [AddReferralRulelistData]);
    //  ------------- Get Data From Reducer Code end --------------

    let Name = "Referral Rules Add";
    let ParentName = "Referral Rules List";
    let ParentLink = "/referral-rules/list";

    return (
        <>  
            <NavbarSidebarLayout   isSidebar={true} isNavbar={true} >
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >

                        <div className="flex gap-x-[2rem]">
                            <div className="flex-1">
                                <Inputbox
                                    id="referral_name"
                                    name="referral_name"
                                    label="Referral Name"
                                    required={true}
                                    placeholder="Enter referral name"
                                    type="text"
                                    validation={validation}
                                />
                            </div>

                            <div className="flex-1">
                                <Inputbox
                                    id="referral_amt"
                                    name="referral_amt"
                                    label="Referral Amount"
                                    required={true}
                                    placeholder="Enter referral amount"
                                    type="number"
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
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Add Referral </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate("/referral-rules/list")}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default AddReferralRulesPage;