/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card,  Label } from "flowbite-react";
import type { FC } from "react";
import LOGO from "../../img/logo.webp";
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Form, Input, FormFeedback } from "reactstrap";
import { resetpasswordData, VerifyTokenData } from "../../Store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import ToastMessage from "../../components/ToastMessage";
import { toast } from "react-toastify";

const ResetPasswordPage: FC = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, id } = useParams(); 
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      new_password: "",
      confirm_password: "",
    },

    validationSchema: Yup.object({
      new_password: Yup.string().required("Please enter new password")
      .min(5, "Password must be at least 5 characters long")
      .max(10, "Password must be at most 10 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
      .matches(/\d/, "Password must contain at least one numeric digit (0-9)")
      .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
      confirm_password: Yup.string().required("Please enter confirm password").oneOf([Yup.ref("new_password")], "Confirm password not matched"),
    }),
    onSubmit: (values) => {
      let requserData ={
        user_id : id,
        password: values.new_password
      }
      dispatch(resetpasswordData(requserData));
      validation.resetForm();
    },
  });

  const {  resetpassword } = useSelector((state:any) => ({
    resetpassword: state.Login.resetpassword
  }));

  useEffect(() =>{
    if(resetpassword?.success == true){
      toast.success(resetpassword?.msg);
      setTimeout(()=>{
        navigate("/login")
      },5000) 
    }
  },[resetpassword])

  useEffect(() => {
    const verifyTokenCalll = async () => {
      const verifytokenAPI = {  token: token, user_id :id };
      await dispatch(VerifyTokenData(verifytokenAPI));
    };
    verifyTokenCalll();
  }, [dispatch, id]);

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="my-6 flex items-center gap-x-1 lg:my-0"> <img alt="Flowbite logo" src={LOGO} className="mr-3 h-12" /> </div>

      <Card horizontal imgSrc="/images/authentication/login_6.png" imgAlt=""  className="w-full lg:max-w-screen-lg md:max-w-screen-md [&>img]:hidden md:[&>img]:w-[31rem] md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block" >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl"> Reset Password </h1>

        <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >

          <div className="mb-4 flex flex-col gap-y-2">
            <Label htmlFor="new_password">Your New Password</Label>
            <div>
              <div className="relative w-full">
                <Input
                  name="new_password"
                  className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                  placeholder="Enter new password"
                  type={showPassword ? "text" : "password"}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.new_password || ""}
                  invalid={validation.touched.new_password && validation.errors.new_password ? true : false}
                />
                  <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-100" onClick={() => setShowPassword(!showPassword)} > {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />} </button>
              </div>
              {validation.touched.new_password && validation.errors.new_password ? ( <FormFeedback type="invalid" className="text-Red"> {validation.errors.new_password} </FormFeedback>) : null}
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-y-2">
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <div>
              <div className="relative w-full">
                <Input
                  name="confirm_password"
                  className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                  placeholder="Enter confirm password"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.confirm_password || ""}
                  invalid={validation.touched.confirm_password && validation.errors.confirm_password ? true : false}
                />
                  <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-100" onClick={() => setShowConfirmPassword(!showConfirmPassword)} > {showConfirmPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />} </button>
              </div>
              {validation.touched.confirm_password && validation.errors.confirm_password ? ( <FormFeedback type="invalid" className="text-Red"> {validation.errors.confirm_password} </FormFeedback>) : null}
            </div>
          </div>
          <div> <Button type="submit" className="w-full ">  Reset Password </Button> </div>
        </Form>

      </Card>
      <ToastMessage />
    </div>
  );
};

export default ResetPasswordPage;
