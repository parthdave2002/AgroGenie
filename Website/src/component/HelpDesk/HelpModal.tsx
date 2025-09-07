import React, { useEffect, useState } from 'react'
import type { FC, PropsWithChildren } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Form, Input, FormFeedback, Button } from "reactstrap";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { AddLeadlist, ResetLeadlist } from '../../Store/Lead/action';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ToastMessage from '../ToastMessage';
import GlobalLoader from '../../component/Loader/Loader';

interface HelpModalProps{
 isOpenDelteModel : boolean;
    setisOpenDelteModel : (value : boolean) => void;
}

const HelpModal: FC<HelpModalProps>= ({isOpenDelteModel, setisOpenDelteModel}) => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const [formSubmitted, setFormSubmitted] = useState(false);
      const [ messageData, setMessageData] = useState("")
      const [ messageError, setMessageError] = useState(false)
    const [is_loader, set_is_loader] = useState(false)

    const [initialValues, setinitialValues] = useState({
      name: "",
      email: "",
      phone_number: ""
    });
  
    const validation = useFormik({
      enableReinitialize: true,
      initialValues: initialValues,
      
      validationSchema: Yup.object({
        name: Yup.string().required("Please enter  name"),
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
          email : values?.email,
          mobile_number: values?.phone_number,
          comment: messageData,
          type: "help"
        };
        dispatch(AddLeadlist(requserdata));
        set_is_loader(true);
        setFormSubmitted(true);
        toast.success(t('advisor_contact_success'));
      },
      });

  // ------------- Get data from redux code start ------------- 
     const Adddetail :any = useSelector((state:any) => state.Lead.AddLeaddatalist); 
      useEffect(() => { 
        set_is_loader(false);
       if (formSubmitted  && Adddetail) { 
        validation.resetForm();
        setMessageData("");
        setisOpenDelteModel(false)
        setMessageError(false);
        toast.success(t('advisor_contact_success'));
        dispatch(ResetLeadlist()) 
        setFormSubmitted(false)
       }
    }, [Adddetail]); 
  // ------------- Get data from redux code end -------------

  return (

    <>
        {is_loader ?  <GlobalLoader />
          : 
          <div>

                <Dialog open={isOpenDelteModel} onClose={setisOpenDelteModel} className="relative z-50">
                    <DialogBackdrop   transition  className="fixed inset-0 bg-gray-800/90 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"  />

                    <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel transition  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-[60rem] data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                
                                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">

                                    <div className="mt-2">
                                            <div className="flex flex-col md:flex-row items-start">
                                              <div className="w-full md:w-1/2 p-5">
                                                <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }}  className="bg-white rounded-lg p-6 text-gray-900 ">
                                                  <div className="mb-4">
                                                    <label className="text-md block uppercase tracking-wide text-left"> {t("First name")}  <span className='text-red-500'>*</span></label>
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
                                                                      {validation.touched.name && validation.errors.name ? (<FormFeedback type="invalid" className="text-red-500 text-sm"> {validation.errors.name} </FormFeedback>) : null}
                                                        </div>
                                                  </div>
                                                  <div className=' mt-[2.5rem]' >
                                                                <label className="text-md block uppercase tracking-wide text-left"> {t("Phone")}  <span className='text-red-500'>*</span></label>
                                                
                                                                <div className="mt-1">
                                                                  <Input
                                                                    id="phone_number"
                                                                    name="phone_number"
                                                                    className="w-full border-b border-green-600 focus:outline-none py-2"
                                                                    placeholder={t("enter_contect")}
                                                                    type="number"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.phone_number || ""}
                                                                    invalid={validation.touched.phone_number && validation.errors.phone_number ? true : false}
                                                                  />
                                                                  {validation.touched.phone_number && validation.errors.phone_number ? (<FormFeedback type="invalid" className="text-red-500 text-sm"> {validation.errors.phone_number}  </FormFeedback>) : null}
                                                                </div>
                                                              </div>

                                                          <div className=' my-[2.5rem]'> 
                                                                <label className="text-md  block uppercase tracking-wide text-left">{t("Message")}  <span className='text-red-500'>*</span> </label>
                                                                <textarea  placeholder={t("enter_message")} className="w-full border-b border-green-600 focus:outline-none py-2"   onChange={(e:any) => setMessageData(e.target.value)}/>
                                                                {messageError ?  <FormFeedback type="invalid" className="text-red-500 text-sm"> Please Enter message  </FormFeedback>  : null }
                                                          </div>
                                                  
                                                  <button className="w-full bg-black text-white py-3 text-lg font-semibold rounded hover:bg-gray-800 transition"> {t("Submit")}  </button>
                                                </Form>
                                              </div>

                                              <div className="w-full md:w-1/2 col-md-6 p-5">
                                                <div className="mb-4"> <img src='/images/need-help.webp' /> </div>
                                              </div>
                                            
                                          </div>
                                    </div>
                                  </div>
                              </div>
                            
                        </DialogPanel>
                      </div>
                    </div>
                  </Dialog>

                <ToastMessage />
          </div>
        }
    </>
  )
}

export default HelpModal