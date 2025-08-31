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
import { AddCouponlist, ResetCouponlist } from "../../Store/actions";
import { toast } from "react-toastify";

const AddCouponPage : FC = function () {
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
        coupon_amt: "",
        coupon_name: "",
        status: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
            coupon_name: Yup.string().required("Please enter coupon name"),
            coupon_amt: Yup.string().required("Please enter coupon amount"),
        }),
        
        onSubmit: (values) => {
          if(selectedactiveid == null) return setValidateactive(1);

            let Requser ={
                name : values?.coupon_name.toUpperCase().trim(),
                amount : values?.coupon_amt,
                is_active : selectedactiveid
            }
          dispatch(AddCouponlist(Requser));
        },
    });

    const isactiveoption =[
        {  label :"Active",   value : true  },
        {  label :"Inactive",  value : false }
    ]

    // ------------- Get  Data From Reducer Code Start --------------
        const { AddCoupondatalist } = useSelector((state: any) => ({
            AddCoupondatalist: state.Coupon.AddCoupondatalist,
        }));

        useEffect(() => {  
            if(AddCoupondatalist?.success == true){
                dispatch(ResetCouponlist())
                toast.success(AddCoupondatalist?.msg);
                navigate("/coupon/list")
                validation.resetForm();
                setSelectedactiveid(null);
                setSelectedactiveOption(null);
                setValidateactive(1)
            }
        }, [AddCoupondatalist]);
    //  ------------- Get Data From Reducer Code end --------------

    let Name = "Coupon Add";
    let ParentName = "Coupon List";
    let ParentLink = "/coupon/list";

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >

                        <div className="flex gap-x-[2rem]">
                            <div className="flex-1">
                                <Label htmlFor="name"> Coupon Name <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="coupon_name"
                                    name="coupon_name"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Enter coupon"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.coupon_name || ""}
                                    invalid={
                                    validation.touched.coupon_name &&
                                    validation.errors.coupon_name ? true  : false  }
                                />
                                {validation.touched.coupon_name &&  validation.errors.coupon_name ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.coupon_name}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>

                            <div className="flex-1">
                                <Label htmlFor="name">Coupon Amount <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="coupon_amt"
                                    name="coupon_amt"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Enter coupon amount"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.coupon_amt || ""}
                                    invalid={ validation.touched.coupon_amt &&  validation.errors.coupon_amt ? true  : false}
                                />
                                {validation.touched.coupon_amt && validation.errors.coupon_amt ? (  <FormFeedback type="invalid" className="text-Red text-sm">   {validation.errors.coupon_amt}  </FormFeedback> ) : null}
                                </div>
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
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Add Coupon </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate("/coupon/list")}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default AddCouponPage;