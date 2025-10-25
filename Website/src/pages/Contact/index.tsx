import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, FormFeedback, Button } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { AddLeadlist, ResetLeadlist } from '../../Store/Lead/action';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ToastMessage from '../../component/ToastMessage';
import GlobalLoader from '../../component/Loader/Loader';

const ContactusSection = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ messageData, setMessageData] = useState("")
  const [ messageError, setMessageError] = useState(false);
  const [is_loader, set_is_loader] = useState(false);

  const [initialValues, setinitialValues] = useState({
    name: "",
    email: "",
    phone_number: "",
    user_type: ""
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter your name"),
      user_type: Yup.string().required("Please select reason "),
      phone_number: Yup.string()
        .required("Please enter phone number")
        .matches(/^\d+$/, "Phone number must be digits only")
        .min(10, "Phone number must be at least 10 digits")
        .max(10, "Phone number must be at most 10 digits"),
    }),
        
    onSubmit: (values) => {
      if(!messageData) return setMessageError(true)

      let requserdata = {
        name: values?.name,
        user_type: values?.user_type,
        email : values?.email,
        mobile_number: values?.phone_number,
        comment : messageData,
        type: "contactus"
      };
      dispatch(AddLeadlist(requserdata));
      set_is_loader(true);
      setFormSubmitted(true)
    },
    });

  // ------------- Get data from redux code start ------------- 
    const Adddetail :any = useSelector((state:any) => state.Lead.AddLeaddatalist); 
    useEffect(() => { 
      set_is_loader(false);
      if (formSubmitted && Adddetail  && validation?.resetForm ) { 
        toast.success(t('advisor_contact_success'));
        dispatch(ResetLeadlist())
        validation.resetForm();
        setMessageError(false);
        setMessageData("");
        setFormSubmitted(false);
      }
    }, [Adddetail]); 
  // ------------- Get data from redux code end -------------

  return (
    <div>
        {is_loader ?  <GlobalLoader />
          : 
          <div className="min-h-screen md:flex ">
            <div className="w-full md:w-1/2  text-white px-10 py-0 flex flex-col justify-between">
              <img src="/images/contact-us.webp" className="transform" />
            </div>

            <div className="w-full md:w-1/2 bg-white p-10">
              <h2 className="text-2xl font-semibold mb-8 font-heading">{t("Contact Us")}</h2>

              <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                  <div className="flex-1">
                    <label className="text-md block mb-1 uppercase tracking-wide">{t("First name")}  <span className='text-red-500'>*</span></label>
                    <div className="mt-1">
                      <Input
                        id="name"
                        name="name"
                        className="w-full border-b border-green-600 focus:outline-none py-2"
                        placeholder={t("enter_name")}
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ""}
                        invalid={validation.touched.name && validation.errors.name ? true : false}
                      />
                      {validation.touched.name && validation.errors.name  ? (<FormFeedback type="invalid" className="text-red-500 text-sm"> {validation.errors.name} </FormFeedback>) : null}
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="text-md block mb-1 uppercase tracking-wide"> {t("Reason")} <span className='text-red-500'>*</span></label>

                <div className="mt-4">
                    <select
                      id="user_type"
                      name="user_type"
                      className="w-full border-b border-green-600 focus:outline-none py-1 bg-transparent"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.user_type || ""}
                    >
                      <option value="" disabled hidden>    {t("select_reason")}   </option>
                      <option value="farmer">{t("farmer")}</option>
                      <option value="job_application">{t("job_application")}</option>
                      <option value="dealer">{t("dealer")}</option>
                    </select>

                    {validation.touched.user_type && validation.errors.user_type && (
                        <FormFeedback type="invalid" className="text-red-500 text-sm"> {validation.errors.user_type}   </FormFeedback>
                      )}
                  </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className=' mt-[2.5rem]'>
                    <label className="text-md block mb-1 uppercase tracking-wide">{t("Email")} </label>
                    <div className="mt-1">
                      <Input
                        id="email"
                        name="email"
                        className="w-full border-b border-green-600 focus:outline-none py-2"
                        placeholder={t("enter_email")}
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={validation.touched.email && validation.errors.email ? true : false}
                      />
                    </div>
                  </div>

                  <div className=' mt-[2.5rem]' >
                    <label className="text-md block mb-1 uppercase tracking-wide"> {t("Phone")}  <span className='text-red-500'>*</span></label>

                    <div className="mt-1">
                      <Input
                        id="phone_number"
                        name="phone_number"
                        className="w-full border-b border-green-600 focus:outline-none py-2"
                        placeholder={t("enter_contect")}
                        type="tel"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.phone_number?.toString() || ""}
                        invalid={validation.touched.phone_number && validation.errors.phone_number ? true : false}
                      />
                      {validation.touched.phone_number && validation.errors.phone_number ? (<FormFeedback type="invalid" className="text-red-500 text-sm"> {validation.errors.phone_number}  </FormFeedback>) : null}
                    </div>
                  </div>
                </div>

                <div className=' mt-[2.5rem]' >
                  <label className="text-md  block mb-1 uppercase tracking-wide">{t("Message")}  <span className='text-red-500'>*</span> </label>
                  <textarea placeholder={t("enter_message")}className="w-full border-b border-green-600 focus:outline-none py-2" value={messageData} onChange={(e:any) => setMessageData(e.target.value)} />
                  {messageError ?  <FormFeedback type="invalid" className="text-red-500 text-sm"> Please Enter message  </FormFeedback>  : null }
                </div>

                <button type="submit" className=" text-sm font-medium text-black  border border-green-500 px-8 py-2 flex justify-center hover:bg-green-600 hover:text-white inline-flex items-center md:mt-[4rem]"> {t("Submit")} <span className="ml-2">→</span>   </button>
              </Form>
            </div>
          </div>
         }

        <ToastMessage />
    </div>
  )
}

export default ContactusSection