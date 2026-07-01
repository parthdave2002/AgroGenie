import React, { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { UpdateProfilePassword }  from "../../../Store/actions";
import EyeInputbox from '../inputComponent/eyeinputbox';

const ChangeProfilePassword = () => {
    const dispatch =useDispatch()
     const [initialValues, setinitialValues] = useState<any>({
            password: "",
        });
    
            const validation = useFormik({
                enableReinitialize: true,
                initialValues: initialValues,
                validationSchema: Yup.object({
                    current_password: Yup.string()
                        .required("Old password is required")
                        .min(5, "Password must be at least 5 characters long")
                        .max(10, "Password must be at most 10 characters long")
                        .matches(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
                        .matches(/\d/, "Password must contain at least one numeric digit (0-9)")
                        .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)")
                        ,
                    new_password: Yup.string()
                        .required("New password is required")
                        .min(5, "Password must be at least 5 characters long")
                        .max(10, "Password must be at most 10 characters long")
                        .matches(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
                        .matches(/\d/, "Password must contain at least one numeric digit (0-9)")
                        .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
                    confirm_password: Yup.string()
                        .required("Confirm password is required")
                        .oneOf([Yup.ref('new_password')], 'Passwords must match with new password'),
                }),
                onSubmit: (values) => {
                    let payload = {
                        current_password: values.current_password,
                        password: values.new_password,
                    }
                    dispatch(UpdateProfilePassword(payload));
                },
            });

  return (
    <div>
          <form onSubmit={validation.handleSubmit} className="mt-8 bg-White dark:bg-DarkBackground p-3 rounded-xl shadow shadow-xl" autoComplete="off">
              <h2 className="text-2xl font-semibold mb-1 text-DarkBackground dark:text-TitaniumWhite">Update Your Password</h2>
              <div className="flex flex-col gap-5 mt-3">

                    <div className="flex flex-col gap-y-4">
                        <div className='flex-1'>
                            <EyeInputbox
                                id="current_password"
                                name="current_password"
                                label="Current Password"
                                placeholder="Enter your current password"
                                type="password"
                                required={true}
                                validation={validation}
                            />
                        </div>
                        <div className='flex-1'>
                            <EyeInputbox
                                id="new_password"
                                name="new_password"
                                label="New Password"
                                placeholder="Create a new password"
                                type="password"
                                required={true}
                                validation={validation}
                            />
                        </div>
                        <div className='flex-1'>
                            <EyeInputbox
                                id="confirm_password"
                                name="confirm_password"
                                label="Confirm New Password"
                                placeholder="Re-enter new password"
                                type="password"
                                required={true}
                                validation={validation}
                            />
                        </div>
                    </div>
                  <div className="flex justify-end gap-3 mt-2">
                      {/* <button type="button" className="py-2 px-5 rounded border border-SoothingBlueGrey dark:border-Hydrocarbon bg-White dark:bg-TranquilBlack text-TranquilBlack dark:text-WhiteMarble font-medium hover:bg-TitaniumWhite dark:hover:bg-Hydrocarbon transition-colors" onClick={() => validation.resetForm()} disabled={validation.isSubmitting} > Cancel </button> */}
                      <button type="submit" className="py-2 px-5 rounded bg-blue-600 text-White font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" > Save Changes </button>
                  </div>
              </div>
          </form>
    </div>
  )
}

export default ChangeProfilePassword