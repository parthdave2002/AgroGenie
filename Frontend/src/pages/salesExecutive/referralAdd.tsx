import React, { lazy, FC, useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Form } from "reactstrap";
import * as Yup from 'yup';
import Inputbox from '../../components/common/inputComponent/inputbox';
import { AddLeadlist, ResetLeadlist } from '../../Store/actions';
import Cookies from 'js-cookie';
import { ProfileInfo } from '../../types/types';

const AddReferralFarmer : FC  = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState<ProfileInfo | null>()  
  const [modalReferral, setModalReferral] = useState(false)  

  useEffect(() =>{
    dispatch(ResetLeadlist())
    setinitialValues({
      name: "",
      mobile_number: ""
    })
  },[])

    //  -------------Farmer Data get  code start ----------------------
      const customerDataString = Cookies.get("customer_data");
      useEffect(() => {
        if (customerDataString && customerDataString !== "undefined") {
          try {
            const customerData = JSON.parse(customerDataString);
            setData(customerData || null);
          } catch (error) {
            console.error("Failed to parse customer_data:", error);
            setData(null);
          }
        } else {
          setData(null);
        }
      }, [customerDataString]);
    //  -------------Farmer Data get  code end  ----------------------

    const [initialValues, setinitialValues] = useState({
      name: "",
      mobile_number: ""
    });
        
    const validation = useFormik({
      enableReinitialize: true,
      initialValues: initialValues,

      validationSchema: Yup.object({
        name: Yup.string().required("Please enter name"),
        mobile_number: Yup.string()
          .required("Please enter mobile number")
          .matches(/^[0-9]+$/, "Must be only digits")
          .min(10, "Must be exactly 10 digits")
          .max(10, "Must be exactly 10 digits"),
      }),

      onSubmit: (values) => {
        let requserdata = {
          name: values?.name,
          mobile_number: values?.mobile_number,
          referrer : data?._id,
          type: "referral"
        };
        dispatch(AddLeadlist(requserdata));
      },
    });

    const AddReferraloption = useSelector((state: any) => state.Lead.AddLeaddatalist)
    useEffect(() =>{
      if( AddReferraloption?.data){
        setinitialValues({
          name: "",
          mobile_number: ""
        })
        setModalReferral(true)
        dispatch(ResetLeadlist())
      }
    },[AddReferraloption])

  return (
    <>
      <div className="w-full rounded-2xl border dark:border-TranquilBlack bg-White dark:bg-Cosmos p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-Cosmos dark:text-TitaniumWhite"> Referral Farmers </h2>
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
                  id="mobile_number"
                  name="mobile_number"
                  label="Mobile"
                  required={true}
                  placeholder="please enter mobile"
                  type="number"
                  validation={validation}
                />
              </div>
            </div>

            <div className="flex gap-x-3 justify-end mt-[1rem]">
              <Button className="PurpleButton border-0 "  type="submit" > Add Referral </Button>
            </div>
          </Form>
      </div>

      <Modal onClose={() => setModalReferral(false)} show={modalReferral} size="xl">
          <ModalHeader className="px-6 pt-6 pb-0"> <span className="sr-only">Delete </span></ModalHeader>
          <ModalBody> Close </ModalBody>
      </Modal>
    </>
  )
}

export default AddReferralFarmer