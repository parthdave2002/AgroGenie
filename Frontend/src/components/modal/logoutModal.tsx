import React, { FC, useEffect, useState } from 'react';
import { Button, Label, Modal } from "flowbite-react";
import Select from "react-select";
import { Form, FormFeedback, Input } from 'reactstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { AddCustomerTagloglist, getSubTagloglist, getTagloglist, ResetTagloglist } from '../../Store/actions';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { FaCartArrowDown, FaUserTag } from 'react-icons/fa';

interface PoropsData{
    openModal ?: boolean;
    handleClose : () => void;
    handleAccept: () => void;
}

const LogoutModal : FC <PoropsData> = ({openModal, handleClose, handleAccept}) => {

  const dispatch = useDispatch();
      const [data, setData] = useState(null)
      const customerDataString = Cookies.get("customer_data");
      useEffect(() => {
        if (customerDataString && customerDataString !== "undefined") {
          try {
            const customerData = JSON.parse(customerDataString);
            setData(customerData?._id ?customerData?._id : null);
          } catch (error) {
            console.error("Failed to parse customer_data:", error);
            setData(null);
          }
        }
        else{
          setData(null);
        }
      },[customerDataString]);
  // -------------- Taglog code start ---------
  const  taglogoptions = useSelector((state: any) => state.Taglog.Tagloglist)?.map( (item: any) => ({  label: item.taglog_name,  value: item._id}));
 
  useEffect(() =>{
    if(openModal ==true){
      dispatch(getTagloglist())
    }
  },[dispatch, openModal])
  
    const [selectedTaglogOption, setSelectedTaglogOption] = useState<{ label: string, value: string } | null>(null);
    const [selectedTaglogid, setSelectedTaglogid] = useState<string | null>(null);
    const [validateTaglog, setValidateTaglog] = useState(0);
    
    const IsTaglogdata = (data: any) => {
      if (!data) {
        setSelectedTaglogid("");
        setSelectedTaglogOption(null);
        setValidateTaglog(1)
      } else {
        setSelectedTaglogid(data.value);
        setSelectedTaglogOption(data);
        setValidateTaglog(0)
      }
    };
    // -------------- Taglog code end ---------

    // -------------- Subtglog code start ---------
    const subtaglogOptions = useSelector((state: any) => state.Taglog.SubTagloglist)?.map( (item: any) => ({ label: item?.name, value: item?._id }));

    useEffect(() =>{
      if(selectedTaglogid){
        dispatch(getSubTagloglist({id : selectedTaglogid}))
      }
    },[selectedTaglogid])

        const [selectedSubTaglogOption, setSelectedSubTaglogOption] = useState<{ label: string, value: string } | null>(null);
        const [selectedSubTaglogid, setSelectedSubTaglogid] = useState<string | null>(null);
        const [validateSubtaglog, setValidateSubtaglog] = useState(0);
        
        const IsSubTaglogdata = (data: any) => {
          if (!data) {
            setSelectedSubTaglogid("");
            setSelectedSubTaglogOption(null);
            setValidateSubtaglog(1)
          } else {
            setSelectedSubTaglogid(data.value);
            setSelectedSubTaglogOption(data);
            setValidateSubtaglog(0)
          }
        };
     // -------------- Subtglog code end ---------

    //  -------------- Submit Data code start ---------
      const [initialValues, setinitialValues] = useState({
        taglog_id: "",
        subtaglog_id: "",
        comment: "",
      });
    
      const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
          comment: Yup.string().required("Please enter comment"),
        }),

        onSubmit: (values) => {
          if (selectedTaglogid == null) return setValidateTaglog(1) 
          if (selectedSubTaglogid == null) return setValidateSubtaglog(1) 

          let requserData = {
            taglog_id: selectedTaglogid,
            subtaglog_id: selectedSubTaglogid,
            customer_id : data,
            comment: values?.comment,
          }
          dispatch(AddCustomerTagloglist(requserData));
        },
      });
    //  -------------- Submit Data code end --------- 

    //--------  get data and redirect call  staaart------------
    const taglogcreate = useSelector((state: any) => state.Taglog.AddCustomerTagloglist );
    useEffect(() =>{
      if(taglogcreate?.success == true ) {
        toast.success(taglogcreate?.msg);
        dispatch(ResetTagloglist());
        handleAccept()
      }else if(taglogcreate?.success == false){
        dispatch(ResetTagloglist());
        toast.error(taglogcreate?.msg);
      }
    },[taglogcreate])


    //--------  get data and redirect call  end------------

  return (
    <>
     <Modal dismissible show={openModal} onClose={() => handleClose()}>
            <Form 
            onSubmit={(e) => { e.preventDefault(); 
            validation.handleSubmit(); 
            }} >   
              <Modal.Header className='text-[1rem] font-bold'>Add Taglog</Modal.Header>
              <Modal.Body>
                    <div className="space-y-6">
                       <div className='flex-1'>
                                    <Label htmlFor="taglog"> Taglog <span className='text-red-500'>*</span></Label>
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
                                        value={selectedTaglogOption}
                                        onChange={(e) => { IsTaglogdata(e) }}
                                        options={taglogoptions}
                                        isClearable={true}
                                      />
                                      {validateTaglog == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select taglog </FormFeedback> ) : null}
                                    </div>
                        </div>

                        <div className='flex-1'>
                                    <Label htmlFor="Subtaglog">Sub Taglog <span className='text-red-500'>*</span></Label>
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
                                        value={selectedSubTaglogOption}
                                        onChange={(e) => { IsSubTaglogdata(e) }}
                                        options={subtaglogOptions}
                                        isClearable={true}
                                      />
                                      {validateSubtaglog == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select subtaglog </FormFeedback> ) : null}
                                    </div>
                        </div>

                        <div>
                                    <Label htmlFor="comment"> Comment <span className='text-red-500'>*</span></Label>
                                    <div className="mt-1">
                                      <Input
                                        id="comment"
                                        name="comment"
                                        className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                        placeholder="Enter comment"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values?.comment|| ""}
                                        invalid={validation.touched?.comment && validation.errors?.comment ? true : false}
                                      />
                                      {validation.touched.comment && validation.errors?.comment ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.comment} </FormFeedback>) : null}
                                    </div>
                                  </div>
                    </div>
              </Modal.Body>
              <Modal.Footer className='py-2 flex gapx-3 justify-end'>
                <Button type='submit' className='w-[8rem] bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl border-0'> <div className="flex items-center gap-x-3 text-[1.2rem]">  <FaUserTag  className='text-xl'  />  Submit  </div> </Button>
                <Button color="gray" className='w-[8rem]' onClick={() => handleClose()}> Close  </Button>
              </Modal.Footer>
            </Form>
      </Modal>
    </>
  )
}

export default LogoutModal