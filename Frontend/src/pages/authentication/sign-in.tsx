/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Checkbox, Label, Modal } from "flowbite-react";
import type { FC } from "react";
import LOGO from "../../img/logo.webp";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";
import { Form, Input, FormFeedback } from "reactstrap";
import { CheckUserdatalist, forgotpasswordData, insertlogin, resetinsertlogin} from "../../Store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ToastMessage from "../../components/ToastMessage";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import LoaderPage from "../../components/loader";

const SignInPage: FC = function () {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validation = useFormik<{ email: string; password: string }>({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Email")
        .matches(/^[^@]+@[^@]+$/, "Email must contain one '@'")
        .matches(/@[^@]+\.[^@]+$/, "Email must contain one '.' after '@'") 
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"), 
      password: Yup.string().required("Please Enter Password")
      .min(5, "Password must be at least 5 characters long")
      .max(10, "Password must be at most 10 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
      .matches(/\d/, "Password must contain at least one numeric digit (0-9)")
      .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
    }),
    onSubmit: async(values) => {
        setisLoading(true)
       dispatch(insertlogin(values));
       setisLoading(false)
    },
  });

  const [Login, setLogin] = useState(false);
  const [LoginRols, setLoginRols] = useState("");

  const { login,error,  CheckUserList} = useSelector((state:any) => ({
    login: state.Login.Logincode,
    error :state.Login.error,
    CheckUserList: state.User.CheckUserList,
  }));

  useEffect(() => {
    setisLoading(false)
    setLogin(login ? login.success : null);
    setLoginRols(login ? login?.data?.roles : null);
  }, [login]);

  useEffect(() =>{      
      if(CheckUserList?.success == false) {
        toast.error(CheckUserList?.msg);
      } 
      else if(CheckUserList?.success == true){
        setisOpenDelteModel(true);
      }
  },[CheckUserList])
  
  useEffect(() => {
    setisLoading(false)
    if (Login == true) {  
      validation.resetForm();
      if( LoginRols == "67b1195be442284118ab89bf" || LoginRols == "68331b9e271c0b706832de91"){
        navigation("/sales-crm");
        location.reload();
      }else if(LoginRols == "685c305069eaa1084c92c5fe"){
         navigation("/warehouse");
         location.reload();
      }
      else{
        navigation("/dashboard");
        location.reload();
      }
    }else if(error){
        validation.resetForm();
        dispatch(resetinsertlogin());
    }
    // 
  }, [Login, error]); 

  //--------------  if User Alredy login redirect to their page code start --------------
    // useEffect(() =>{
    //   dispatch(ResetUserdatalist())
    //   const id = localStorage.getItem("user");
    //   const jsonObject = id ? JSON.parse(id): null;
    //   let roleTitle = jsonObject ? jsonObject[0].role_title : null;
    //   if (roleTitle) {  
    //     if (roleTitle?.includes("CSR") || roleTitle?.includes("Sales Executive")) {
    //       navigation("/dialer");
    //       location.reload();
    //     }
    //     else{
    //       navigation("/dashboard");
    //       location.reload();
    //     }
    //   }
    // },[])

    useEffect(()=>{
      const role = Cookies.get("role");
      const token = Cookies.get("token");
      if(token  && role  != "67b1195be442284118ab89bf" || token  && role  != "68331b9e271c0b706832de91" ){
          navigation("/dashboard");
      }else if(token  && role == "67b1195be442284118ab89bf" || token  && role == "68331b9e271c0b706832de91"){
        navigation("/sales-crm");
      }else if(token  && role == "685c305069eaa1084c92c5fe" ){
        navigation("/warehouse");
      }
    },[])
  //--------------  if User Alredy login redirect to their page code end --------------

  const [ isOpenDelteModel,setisOpenDelteModel] = useState(false);
  const LostPasswordCall = () =>{
    if (validation.values.email) {
      let data={ search: validation.values.email }
      dispatch(CheckUserdatalist(data));
    } else {
      toast.error("Please enter email");
    }
  }

  const LostPassword = () => {
    setisOpenDelteModel(false);
    let requser={
      email: validation.values.email
    }
    dispatch(forgotpasswordData(requser))
    toast.success("Please contact your admin");
  };

  return (
    <>
      {isLoading ? <LoaderPage /> : null  }

      <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-6">
        <div className="my-6 flex items-center gap-x-1 lg:my-0"> <img alt="logo" src={LOGO} className="mr-3 h-12" /> </div>

        <Card horizontal imgSrc="/images/authentication/login_3.png" imgAlt=""  className="w-full lg:max-w-screen-lg md:max-w-screen-md [&>img]:hidden md:[&>img]:w-[31rem] md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block" >
          <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl"> Sign in </h1>

          <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
            <div className="mb-4 flex flex-col gap-y-2">
              <Label htmlFor="email">Your Email</Label>

              <Input
                name="email"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter your email"
                type="email"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.email || ""}
                invalid={ validation.touched.email && validation.errors.email  ? true : false }
              />
              {validation.touched.email && validation.errors.email ? (
                <FormFeedback type="invalid" className="text-Red">
                  {validation.errors.email}
                </FormFeedback>
              ) : null}
            </div>

            <div className="mb-6 flex flex-col gap-y-2">
              <Label htmlFor="password">Your password</Label>
                          <div>
                            <div className="relative w-full">
                              <Input
                                name="password"
                                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                placeholder="Enter password"
                                type={showConfirmPassword ? "text" : "password"}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.password || ""}
                                invalid={validation.touched.password && validation.errors.password ? true : false}
                              />
                                <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-100" onClick={() => setShowConfirmPassword(!showConfirmPassword)} > {showConfirmPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />} </button>
                            </div>
                            {validation.touched.password && validation.errors.password ? ( <FormFeedback type="invalid" className="text-Red"> {validation.errors.password} </FormFeedback>) : null}
                          </div>
              {/* <Input
                id="password"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                name="password"
                placeholder="Enter Password"
                type="password"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.password || ""}
                invalid={ validation.touched.password && validation.errors.password ? true : false }
              />
              {validation.touched.password && validation.errors.password ? ( <FormFeedback type="invalid" className="text-Red"> {validation.errors.password} </FormFeedback>) : null} */}
            </div>

            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-x-3"> <Checkbox id="rememberMe" name="rememberMe" /> <Label htmlFor="rememberMe">Remember me</Label>  </div>
              <a onClick={() => LostPasswordCall() } className="w-1/2 text-right text-sm text-primary-600 dark:text-primary-300 cursor-pointer"  > Lost Password? </a>
            </div>

            <div className="mb-6">  <Button type="submit" className="w-full ">  Login to your account  </Button> </div>
          </Form>

        </Card>

        <Modal onClose={() => setisOpenDelteModel(false)}  show={isOpenDelteModel} size="md">
            <Modal.Header className="px-6 pt-6 pb-0"> <span className="sr-only"> Send Email to admin</span></Modal.Header>
              <Modal.Body className="px-6 pt-0 pb-6">
                  <div className="flex flex-col items-center gap-y-6 text-center">  <p className="text-xl text-gray-500"> Are you sure? You want  to send email to admin? </p>
                      <div className="flex items-center gap-x-3">
                          <Button color="failure"   onClick={() => LostPassword()}>  Yes, I'm sure </Button> 
                          <Button color="gray"  onClick={() => setisOpenDelteModel(false)}> No, cancel </Button> 
                      </div>
                  </div>
              </Modal.Body>
        </Modal>
        <ToastMessage />
      </div>
    </>
  );
};

export default SignInPage;
