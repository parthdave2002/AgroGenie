import React, { lazy, FC, useState, } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Button } from 'flowbite-react';
import { Form } from "reactstrap";
import * as Yup from 'yup';
import Inputbox from '../../components/common/inputComponent/inputbox';

const AddReferralFarmer : FC  = () => {
  const dispatch = useDispatch();

    const [initialValues, setinitialValues] = useState({
      name: "",
      mobile: ""
    });
        
    const validation = useFormik({
      enableReinitialize: true,
      initialValues: initialValues,

      validationSchema: Yup.object({
        name: Yup.string().required("Please enter name"),
        mobile: Yup.string()
          .required("Please enter mobile number")
          .matches(/^[0-9]+$/, "Must be only digits")
          .min(10, "Must be exactly 10 digits")
          .max(10, "Must be exactly 10 digits"),
      }),

      onSubmit: (values) => {
        console.log(values);
        // dispatch(addleavelist(values));
      },
    });

  return (
    <>
      <div className="w-full rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100"> Referral Farmers </h2>
          <span className="text-xs text-gray-400"> 0 points </span>
        </div>

         <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <div className="space-y-3">
              <div>
                <Inputbox
                  id="name"
                  name="name"
                  label="Name"
                  required={true}
                  placeholder="please enter name"
                  type="text"
                  validation={validation}
                />
              </div>

              <div>
                <Inputbox
                  id="mobile"
                  name="mobile"
                  label="Mobile"
                  required={true}
                  placeholder="please enter mobile"
                  type="number"
                  validation={validation}
                />
              </div>
            </div>

            <div className="flex gap-x-3 justify-end mt-[1rem]">
              <Button className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl border-0 "  type="submit" > Add Referral </Button>
            </div>
          </Form>
      </div>
    </>
  )
}

export default AddReferralFarmer