import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, FormFeedback, Button } from "reactstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { AddLeadlist, ResetLeadlist } from '../../Store/Lead/action';
import { toast } from 'react-toastify';
import ToastMessage from '../../component/ToastMessage';
import GlobalLoader from '../../component/Loader/Loader';

const ContactusSection = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [messageData, setMessageData] = useState("")
  const [messageError, setMessageError] = useState(false);
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
      email: Yup.string().required("Please enter your email").email("Please enter valid email"),
      user_type: Yup.string().required("Please select reason "),
      phone_number: Yup.string()
        .required("Please enter phone number")
        .matches(/^\d+$/, "Phone number must be digits only")
        .min(10, "Phone number must be at least 10 digits")
        .max(10, "Phone number must be at most 10 digits"),
    }),

    onSubmit: (values) => {
      if (!messageData) return setMessageError(true)

      let requserdata = {
        name: values?.name,
        user_type: values?.user_type,
        email: values?.email,
        mobile_number: values?.phone_number,
        comment: messageData,
        type: "contactus"
      };
      dispatch(AddLeadlist(requserdata));
      set_is_loader(true);
      setFormSubmitted(true)
    },
  });

  // ------------- Get data from redux code start ------------- 
  const Adddetail: any = useSelector((state: any) => state.Lead.AddLeaddatalist);
  useEffect(() => {
    set_is_loader(false);
    if (formSubmitted && Adddetail && validation?.resetForm) {
      toast.success("Our Advisor will contact you soon.")
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
      {is_loader ? <GlobalLoader /> :
        <section className=" relative  py-10  bg-gray-50  bg-[url('/images/ad-bg-pattern.png')]  bg-repeat bg-[length:600px_600px] ">
          <div className="flex flex-col space-y-8 relative z-10">

            <div className="mx:max-w-4xl mx-auto p-6 "   >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <aside className="rounded-lg p-8 bg-[#139354] text-white flex flex-col justify-between bg-cover" >
                  <div className='text-gray-800  font-heading'>
                      <h2 className="text-xl md:text-3xl font-bold font-heading text-white  flex justify-center gap-x-2 ">Contact Information  </h2>
                      <p className="text-sm opacity-90 mb-6 flex justify-center text-white">Fill up the form and our Team will get back to you within 24 hours.</p>

                    <ul className="space-y-5 text-sm text-white">

                      {/* Phone */}
                      <li className="flex items-start gap-4">
                        <FaPhoneAlt className="mt-1 text-lg" />
                        <div className='text-[1rem]'>
                          <p className="font-medium ">Phone</p>
                          <p className="">+91 90635 63590</p>
                        </div>
                      </li>

                      {/* Email */}
                      <li className="flex items-start gap-4">
                        <FaEnvelope className="mt-1 text-lg" />
                        <div  className='text-[1rem]'>
                          <p className="font-medium">Email</p>
                          <p className="">touch@agrogenieseeds.com</p>
                        </div>
                      </li>

                      {/* Address */}
                      <li className="flex items-start gap-4">
                        <FaMapMarkerAlt className="mt-1 text-lg " />
                        <div  className='text-[1rem]'>
                          <p className="font-medium">Address</p>
                          <p className="">
                            B-5, Hariba Vyapar Bhuvan, GPO Road,<br />
                            Anand – 388001, Gujarat, Bharat
                          </p>
                        </div>
                      </li>

                      {/* Office Hours */}
                      <li className="flex items-start gap-4">
                        <FaClock className="mt-1 text-lg" />
                        <div  className='text-[1rem]'>
                          <p className="font-medium">Office Hours</p>
                          <p className="">Mon – Sat | 10 AM – 6 PM</p>
                        </div>
                      </li>

                    </ul>
                  </div>
                </aside>

                <main className="bg-white rounded-lg shadow p-8" >
                                    <h2 className="text-xl md:text-3xl font-bold font-heading text-gray-900  flex justify-center gap-x-2 "> <span className="text-lime-500"> Contact Us </span> </h2>
                      <p className="text-sm opacity-90 mb-6 flex justify-center">Fill up the form and our Team will get back to you within 24 hours.</p>


                  <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-heading">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">First name <span className='text-red-500'>*</span></label>
                        <Input
                          id="name"
                          name="name"
                          className="mt-1 w-full  border-b px-4 py-1 border-gray-500 focus:outline-none focus:ring-0 focus:border-green-500 active:ring-0"
                          placeholder='Enter your name'
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ''}
                          invalid={validation.touched.name && validation.errors.name ? true : false}
                          aria-invalid={validation.touched.name && validation.errors.name ? 'true' : 'false'}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback className="text-red-500 text-sm">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>

                      <div>
                        <label htmlFor="user_type" className="block text-sm font-medium text-gray-700">Reason <span className='text-red-500'>*</span></label>
                        <div className="mt-1">
                          <select
                            id="user_type"
                            name="user_type"
                            className="w-full rounded-md border border-gray-200 py-2 px-3 focus:outline-none focus:border-green-500"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.user_type || ''}
                            aria-invalid={validation.touched.user_type && validation.errors.user_type ? 'true' : 'false'}
                          >
                            <option value="" disabled hidden>select_reason</option>
                            <option value="farmer">farmer</option>
                            <option value="job_application">job_application</option>
                            <option value="dealer">dealer</option>
                          </select>
                        </div>
                        {validation.touched.user_type && validation.errors.user_type ? (
                          <FormFeedback className="text-red-500 text-sm">{validation.errors.user_type}</FormFeedback>
                        ) : null}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-heading">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <Input
                          id="email"
                          name="email"
                          className="mt-1 w-full  border-b px-4 py-1 border-gray-500 focus:outline-none focus:ring-0 focus:border-green-500 active:ring-0"
                          placeholder="Enter your email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ''}
                          invalid={validation.touched.email && validation.errors.email ? true : false}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone <span className='text-red-500'>*</span></label>
                        <Input
                          id="phone_number"
                          name="phone_number"
                          className="mt-1 w-full  border-b px-4 py-1 border-gray-500 focus:outline-none focus:ring-0 focus:border-green-500 active:ring-0"
                          placeholder="Enter your contect"
                          type="tel"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone_number?.toString() || ''}
                          invalid={validation.touched.phone_number && validation.errors.phone_number ? true : false}
                          aria-invalid={validation.touched.phone_number && validation.errors.phone_number ? 'true' : 'false'}
                        />
                        {validation.touched.phone_number && validation.errors.phone_number ? (
                          <FormFeedback className="text-red-500 text-sm">{validation.errors.phone_number}</FormFeedback>
                        ) : null}
                      </div>
                    </div>

                    <div className='font-heading'>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message <span className='text-red-500'>*</span></label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Enter your message"
                        className="mt-1 w-full rounded-md border border-gray-200 p-3 focus:outline-none focus:border-green-500 min-h-[120px]"
                        value={messageData}
                        onChange={(e: any) => { setMessageData(e.target.value); }}
                        aria-invalid={messageError ? 'true' : 'false'}
                      />
                      {messageError ? (
                        <FormFeedback className="text-red-500 text-sm">Please Enter message</FormFeedback>
                      ) : null}
                    </div>

                    <div className="pt-2 flex justify-center">
                      <button type="submit" className="bg-gradient-to-r from-green-700 to-lime-500 text-white w-[15rem] px-4 py-2 rounded-full text-lg   hover:shadow-lg hover:scale-105 transition-all duration-100">  Submit    </button>
                    </div>
                  </Form>
                </main>
              </div>
            </div>
          </div>
        </section>
      }

      <ToastMessage />
    </div>
  )
}

export default ContactusSection