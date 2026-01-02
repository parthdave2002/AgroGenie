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
      {is_loader ? (
        <GlobalLoader />
      ) : (
        <div className="mx:max-w-4xl mx-auto p-6 "   >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <aside className="rounded-lg p-8 text-white bg-gradient-to-b from-green-700 to-lime-500 flex flex-col justify-between bg-cover" style={{ backgroundImage: "url('/images/89125.webp')" }}>
              <div className='text-gray-800 font-body'>
                <h2 className="text-3xl font-semibold mb-3">{t('Contact Information')}</h2>
                <p className="text-sm opacity-90 mb-6">{t('Fill up the form and our Team will get back to you within 24 hours.')}</p>

                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3"><span className="text-2xl">📞</span><div>+0123 4567 8910</div></li>
                  <li className="flex items-start gap-3"><span className="text-2xl">✉️</span><div>hello@flowbase.com</div></li>
                  <li className="flex items-start gap-3"><span className="text-2xl">📍</span><div>102 Street 2714 Don</div></li>
                  <li className="flex items-start gap-3"> <div>{t('Office Hours')}: Mon - Fri, 9am - 6pm</div> </li>
                </ul>
              </div>
            </aside>

            <main className="bg-white rounded-lg shadow p-8" >
              <h2 className="text-2xl font-semibold font-heading mb-6">{t('Contact Us')}</h2>

              <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-heading">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('First name')} <span className='text-red-500'>*</span></label>
                    <Input
                      id="name"
                      name="name"
                      className="mt-1 w-full rounded-md border-gray-200 focus:ring-0 focus:border-green-500"
                      placeholder={t('enter_name')}
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
                    <label htmlFor="user_type" className="block text-sm font-medium text-gray-700">{t('Reason')} <span className='text-red-500'>*</span></label>
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
                        <option value="" disabled hidden>{t('select_reason')}</option>
                        <option value="farmer">{t('farmer')}</option>
                        <option value="job_application">{t('job_application')}</option>
                        <option value="dealer">{t('dealer')}</option>
                      </select>
                    </div>
                    {validation.touched.user_type && validation.errors.user_type ? (
                      <FormFeedback className="text-red-500 text-sm">{validation.errors.user_type}</FormFeedback>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('Email')}</label>
                    <Input
                      id="email"
                      name="email"
                      className="mt-1 w-full rounded-md border-gray-200 focus:ring-0 focus:border-green-500"
                      placeholder={t('enter_email')}
                      type="email"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.email || ''}
                      invalid={validation.touched.email && validation.errors.email ? true : false}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">{t('Phone')} <span className='text-red-500'>*</span></label>
                    <Input
                      id="phone_number"
                      name="phone_number"
                      className="mt-1 w-full rounded-md border-gray-200 focus:ring-0 focus:border-green-500"
                      placeholder={t('enter_contect')}
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

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('Message')} <span className='text-red-500'>*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder={t('enter_message')}
                    className="mt-1 w-full rounded-md border border-gray-200 p-3 focus:outline-none focus:border-green-500 min-h-[120px]"
                    value={messageData}
                    onChange={(e: any) => { setMessageData(e.target.value); }}
                    aria-invalid={messageError ? 'true' : 'false'}
                  />
                  {messageError ? (
                    <FormFeedback className="text-red-500 text-sm">{t('Please Enter message')}</FormFeedback>
                  ) : null}
                </div>

                <div className="pt-2">
                  <button type="submit" className="inline-flex items-center justify-center rounded-md bg-green-500 hover:bg-green-600 text-white px-5 py-2 font-medium">
                    {t('Submit')} <span className="ml-2">→</span>
                  </button>
                </div>
              </Form>
            </main>
          </div>
        </div>
      )}

      <ToastMessage />
    </div>
  )
}

export default ContactusSection