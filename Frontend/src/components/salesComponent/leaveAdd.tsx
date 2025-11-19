import React, { FC, useCallback, useEffect, useState } from 'react';
import Select from "react-select";
import { Label, Modal, Button } from "flowbite-react";
import { Form, FormFeedback } from "reactstrap";
import { addleavelist } from '../../Store/actions';
import * as Yup from "yup";
import { useFormik } from 'formik';
import Inputbox from '../../components/common/inputComponent/inputbox';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoCalendarNumberSharp } from 'react-icons/io5';

interface PropsData{
    CloseProfile: () => void;
    confirmationModal: boolean;
    type?: string;
}

const LeaveAdd: FC<PropsData>= ({CloseProfile, confirmationModal, type}) => {
        const dispatch = useDispatch();
        const isleaveoption = [
            { label: "Casual Leave", value: "casual" },
            { label: "Leave without pay", value: "lwp" },
        ]
        
          const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
          const [startDate, endDate] = dateRange;
        
          const [startDateData, setStartDateData] = useState<string | null>(null);
          const [endDateData, setEndDateData] = useState<string | null>(null);
        
          // Update formatted date state whenever the date range changes
          useEffect(() => {
            setStartDateData(startDate ? moment(startDate).format("YYYY-MM-DD") : null);
            setEndDateData(endDate ? moment(endDate).format("YYYY-MM-DD") : null);
          }, [startDate, endDate]);
        
          // Handle date selection
          const handleDateChange = useCallback((update: [Date | null, Date | null]) => {
            setDateRange(update);
          }, []);
        
    
        // ------ leave type code start ------
        const [selectedleaveTypeOption, setSelectedleaveTypeOption] = useState(null);
        const [selectedleaveTypeid, setSelectedleaveTypeid] = useState<string | null>(null);
        const [validateleaveType, setValidateleaveType] = useState(0);
    
        const IsActiveBannerdata = (data: any) => {
            if (!data) {
                setSelectedleaveTypeid(null);
                setSelectedleaveTypeOption(null);
                setValidateleaveType(1)
            } else {
                setSelectedleaveTypeid(data.value);
                setSelectedleaveTypeOption(data);
                setValidateleaveType(0)
            }
        };
        // ------  leave type code end ------
    
         const [initialValues, setinitialValues] = useState({
            leave_type: "",
            reason: "",
            request_date: "",
        });
    
        const validation = useFormik({
            enableReinitialize: true,
            initialValues: initialValues,
    
            validationSchema: Yup.object({
                reason: Yup.string().required("Please enter leave reason"),
            }),
    
            onSubmit: (values) => {
              
                if (selectedleaveTypeid == null) return setValidateleaveType(1)
                if (!startDateData || !endDateData) return alert("Please select both start and end dates");
    
                let requser ={
                   leave_type: selectedleaveTypeid,
                   reason : values?.reason,
                   start_date: startDateData,
                   end_date: endDateData,
                   days : startDate && endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1 : 1,
                }
                dispatch(addleavelist(requser));
                CloseProfile()
            },
        });
    

  return (
    <div>
           <Modal onClose={() => CloseProfile()} show={confirmationModal} size="2xl">
                    <Modal.Header className="px-6 pt-3 pb-0">
                     <div> Request Leave  </div>
                    </Modal.Header>
                    <Modal.Body className="px-6 pt-0 pb-6">
                          <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                           
                            {   startDate && endDate && <div className='dark:text-white mt-[1rem] flex justify-center text-2xl'> Days :  {startDate && endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1 : ""}</div>}

                            <div className='flex gap-x-4 mt-[1rem]'>
                                <div className="flex-1">
                                    <Label htmlFor="Status"> Leave Type </Label>
                                    <div className="mt-1">
                                        <Select className="w-full dark:text-white"
                                            classNames={{ control: () => "react-select__control", singleValue: () => "react-select__single-value", menu: () => "react-select__menu", option: ({ isSelected }) => isSelected ? "react-select__option--is-selected" : "react-select__option", placeholder: () => "react-select__placeholder", }}
                                            value={selectedleaveTypeOption}
                                            onChange={(e) => { IsActiveBannerdata(e) }}
                                            options={isleaveoption}
                                            isClearable={true}
                                        />
                                        {validateleaveType == 1 ? <FormFeedback type="invalid" className="text-Red  text-sm"> Please select leave type </FormFeedback> : null}
                                    </div>
                                </div>

                                <div className='flex-1 w-full'>
                                    <Label htmlFor="leaveDate"> Leave Date </Label>
                                    <div className="mt-1 w-full">
                                        <div className="relative w-full">
                                            <DatePicker
                                                selectsRange
                                                startDate={startDate}
                                                endDate={endDate}
                                                onChange={handleDateChange}
                                                isClearable
                                                minDate={type !== "A" ? new Date() : undefined}
                                                popperPlacement="bottom-start"
                                                dateFormat="dd/MM/yyyy"
                                                popperModifiers={[
                                                    {
                                                        name: 'preventOverflow',
                                                        options: {
                                                            boundary: 'viewport',
                                                        },
                                                    },
                                                ] as any}
                                                className="w-full pl-10 py-2 px-5 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                placeholderText={startDate ? `${moment(startDate).format("dd/MM/yyyy")} - ${endDate ? moment(endDate).format("dd/MM/yyyy") : "Select end date"}` : "Select Date Range"}
                                            />
                                            <IoCalendarNumberSharp className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                        {!startDateData || !endDateData ? <FormFeedback type="invalid" className="text-red-500 text-sm d-block"> Please select both start and end dates </FormFeedback> : null}
                                    </div>
                                </div>
                            </div>

                          <div className="mt-[1rem]">
                              <Inputbox
                                  id="reason"
                                  name="reason"
                                  label="Reason"
                                  required={true}
                                  placeholder="please enter reason"
                                  type="textarea"
                                  validation={validation}
                              />
                          </div>

                            <div className="flex gap-x-3 justify-end mt-[1rem]">
                                <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Request Leave </Button>
                                <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => CloseProfile()}>  Close </Button>
                            </div>
                        
                        </Form>
                    </Modal.Body>
              </Modal>
    </div>
  )
}

export default LeaveAdd