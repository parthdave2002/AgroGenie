import React, { FC, useEffect, useState } from 'react';
import { Button, Label, Modal } from 'flowbite-react';
import { Form, Input, FormFeedback } from "reactstrap";
import * as Yup from "yup";
import Select from "react-select";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AddComplainlist, ResetComplainlist } from '../../Store/actions';
import SuccessErrorModalPage from '../../components/modal/successErrorModal';
import { MdNoteAlt } from 'react-icons/md';
import { FaAddressCard } from 'react-icons/fa';
import Cookies from 'js-cookie';

interface ComplainCreateProps{
    setisOpenComplainCreateModel :  ( value :  boolean ) => void;
    isOpenComplainCreateModel ? : boolean;
    orderId : string | null;
    product_id ?: string;
    orderItem : any;
} 

const ComplainCreate : FC <ComplainCreateProps> = ({setisOpenComplainCreateModel,isOpenComplainCreateModel, orderId, product_id, orderItem}) => {
    
    const dispatch  = useDispatch();
    const [data, setData] = useState(null);
    const customerDataString = Cookies.get("customer_data");
    useEffect(() => {
        if (customerDataString && customerDataString !== "undefined") {
            try {
                const customerData = JSON.parse(customerDataString);
                setData(customerData?._id ? customerData?._id : null);
            } catch (error) {
                console.error("Failed to parse customer_data:", error);
                setData(null);
            }
        }
        else {
            setData(null);
        }
    }, []);

    useEffect(() =>{
        validation.values.comment= "";
        validation.values.title = "";
        setSelectedpriorityOption(null);
        setSelectedpriorityid("");
        setValidatepriority(0);
        setSelectedproductid([]);
        setSelectedproductOption(null);
        setValidateproduct(1)
    },[])

    // ----------  priority code start --------------------------
    const priorityoption =[
        {  label :"High",  value : "high"  },
        {   label :"Medium",   value : "medium" },
        {   label :"Low",   value : "low" },
    ]
    const [selectedpriorityOption, setSelectedpriorityOption] = useState(null);
    const [selectedpriorityid, setSelectedpriorityid] = useState("");
    const [validatepriority, setValidatepriority] = useState(0);

    const IsPrioritydata = (data: any) => {
        if (!data) {
            setSelectedpriorityid("");
            setSelectedpriorityOption(null);
            setValidatepriority(1)
        } else {
            setSelectedpriorityid(data.value);
            setSelectedpriorityOption(data);
            setValidatepriority(0)
        }
    };
    // ----------  priority code end --------------------------

    // ============= Product code start ------------------------
    const [selectedproductOption, setSelectedproductOption] = useState(null);
    const [selectedproductid, setSelectedproductid] = useState<string[]>([]);
    const [validateproduct, setValidateproduct] = useState(0);

    const IsProductdata = (data: any) => {
        if (!data || data.length === 0) {
            setSelectedproductid([]);
            setSelectedproductOption(null);
            setValidateproduct(1)
        } else {
            const selectedIds = data.map((item: any) => item.value); // Extract IDs
            setSelectedproductid(selectedIds);
            setSelectedproductOption(data);
            setValidateproduct(0)
        }
    };
    // ============= Product code end --------------------------

    const [initialValues, setinitialValues] = useState({
        title: "",
        comment :"",
        priority: "",
        resolution: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,

        // validationSchema: Yup.object({
        //     title: Yup.string().required("Please enter title"),
        //     comment: Yup.string().required("Please enter comment")
        // }),

        onSubmit: (values) => {
            // if (selectedpriorityid == "") {
            //     setValidatepriority(1);
            //     return;
            // }

            // if (selectedproductid.length == 0) {
            //     setValidateproduct(1);
            //     return;
            // }
            

            let requserdata = {
                title: values?.title,
                product_id: product_id ? [product_id] : selectedproductid,
                order_id: orderId,
                customer_id: data,
                priority: selectedpriorityid,
                Comment: [{ "comment": values?.comment }],
                resolution: "open"
            };
            dispatch(AddComplainlist(requserdata));
        },
    });

    // --------------- Add Complainlist code start --------------------
    const [isOpenSuccessOrderModel, setisOpenSuccessOrderModel ] = useState(false);
    const [isOpenSuccessOrderMessage, setisOpenSuccessOrderMessage ] = useState("");
    const ComplainAddedlist = useSelector((state: any) => state.Complain.AddComplainlist);
    useEffect(() => {
        if(ComplainAddedlist?.success){
            setisOpenComplainCreateModel(false)
            setisOpenSuccessOrderModel(true)
            setisOpenSuccessOrderMessage("Complain created succesfully")
            dispatch(ResetComplainlist());
            validation.values.title ="";
            validation.values.comment ="";
            setSelectedpriorityOption(null);
            setSelectedpriorityid("");
            setValidatepriority(0);
            setSelectedproductid([]);
            setSelectedproductOption(null);
            setValidateproduct(1)
        }
    }, [ComplainAddedlist])
    // --------------- Add Complainlist code end --------------------

    const OkayCall =() =>{
        setisOpenSuccessOrderModel(false);
        setisOpenSuccessOrderMessage("");
    }

  return (
    <>
        <Modal onClose={() => setisOpenComplainCreateModel(false)} show={isOpenComplainCreateModel} size="6xl" className="backdrop-blur-sm p-3" >
            <Modal.Header> <div className='text-[2rem] dark:text-gray-200 font-bold'> Complain Create  </div>   </Modal.Header>
            <div className='p-3'>
                <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                    <div className='my-[2rem] mx-[1rem] '>
                        <div className='flex gap-x-4'>
                            <div className='flex-1'>
                                <Label htmlFor="title"> Title </Label>
                                <div className="mt-1">
                                    <Input
                                        id="title"
                                        name="title"
                                        className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                        placeholder="Enter title"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.title || ""}
                                        invalid={validation.touched.title && validation.errors.title ? true : false}
                                    />
                                    {validation.touched.title && validation.errors.title ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.title} </FormFeedback>) : null}
                                </div>
                            </div>

                            <div className='flex-1'>
                                <Label className='text-[1.2rem]' htmlFor="priority"> Priority </Label>
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

                                        value={selectedpriorityOption}
                                        onChange={(e) => { IsPrioritydata(e) }}
                                        options={priorityoption}
                                        isClearable={true}
                                    />
                                    {validatepriority == 1 ? (<FormFeedback type="invalid" className="text-Red text-sm"> Please select priority </FormFeedback>) : null}
                                </div>
                            </div>

                                {!product_id ?
                                <div className='flex-1 '>
                                    <Label className='text-[1.2rem]' htmlFor="priority"> Product </Label>
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

                                            value={selectedproductOption}
                                            onChange={(e) => { IsProductdata(e) }}
                                            options={orderItem}
                                            isClearable={true}
                                            isMulti={true}
                                        />
                                        {validateproduct == 1 ? (<FormFeedback type="invalid" className="text-Red text-sm"> Please select product </FormFeedback>) : null}
                                    </div>
                                </div>
                                : null}          
                            
                        </div>

                        <div className='mt-[1rem]'>
                                <Label className='text-[1.2rem]' htmlFor="comment">Comment </Label>
                                <div className="mt-1">
                                    <Input
                                        id="comment"
                                        name="comment"
                                        className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                        placeholder="Enter comment"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.comment || ""}
                                        invalid={validation.touched.comment && validation.errors.comment ? true : false}
                                    />
                                    {validation.touched.comment && validation.errors.comment ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.comment} </FormFeedback>) : null}
                                </div>
                            </div>

                        <div className=' justify-end flex'><Button type='submit' className='mt-3 bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl border-0 text-[1.2rem]' > <div className="flex items-center gap-x-3"> <FaAddressCard className="text-xl" /> Create Complain  </div></Button> </div>
                    </div>
                </Form>
            </div>
        </Modal>

        <SuccessErrorModalPage isOpenSuccessOrderModel={isOpenSuccessOrderModel} setisOpenSuccessOrderModel={setisOpenSuccessOrderModel} message={isOpenSuccessOrderMessage} OkayCall={OkayCall} />
    </>
  )
}

export default ComplainCreate