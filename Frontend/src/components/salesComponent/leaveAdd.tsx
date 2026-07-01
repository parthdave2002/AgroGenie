import React, { FC, useCallback, useEffect, useState } from 'react';
import Select from "react-select";
import { Label, Modal, Button } from "flowbite-react";
import { Form, FormFeedback } from "reactstrap";
import { addleavelist, getUserlist } from '../../Store/actions';
import * as Yup from "yup";
import { useFormik } from 'formik';
import Inputbox from '../../components/common/inputComponent/inputbox';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoCalendarNumberSharp } from 'react-icons/io5';
import { isleaveplanoption } from '../../types/dropdown';
import { LeavePropsData } from '../../types/types';

const LeaveAdd: FC<LeavePropsData>= ({CloseProfile, confirmationModal, type}) => {
        const dispatch = useDispatch();
        const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
        const [startDate, endDate] = dateRange;
        const [startDateData, setStartDateData] = useState<Date | null>(null);
        const [endDateData, setEndDateData] = useState<Date | null>(null);
        const [userDataList, setUserDataList] = useState<{ label: string; value: string }[]>([]);

        const LeaveOptionList = useSelector((state: any) => state.Leave.LeaveManagementdatalist?.data || []);
        const isleaveoption = LeaveOptionList && LeaveOptionList.map((leave : any) => ({  label: leave.leave_type,  value: leave._id  }));
        
        useEffect(() => {
            setStartDateData(startDate ? startDate : null);
            setEndDateData(endDate ? endDate : null);
        }, [startDate, endDate]);
        
          // Handle date selection
        const handleDateChange = useCallback((update: [Date | null, Date | null]) => {
            setDateRange(update);
        }, []);

        useEffect(() => {
            dispatch(getUserlist());
        }, [dispatch]);

        const UserList = useSelector((state: any) => state.User.UserList?.data);

        useEffect(() => { 
            if (UserList && Array.isArray(UserList)) {
                const formattedList = UserList.map((user: any) => ({
                    label: user.name || user.fullName || user.userName || "",
                    value:  user._id || "",
                }));
                setUserDataList(formattedList);
            } else {
                setUserDataList([]);
            }
        }, [UserList]);
  //  ------------- Get User Data From Reducer Code Start --------------

        // ------ leave User code start ------
            const [UserleaveOption, setUserleaveOption] = useState(null);
            const [Userleaveid, setUserleaveid] = useState<string | null>(null);
            const [validateUser, setValidateUser] = useState(0);
        
            const IsSelectedUserdata = (data: any) => {
                if (!data) {
                    setUserleaveid(null);
                    setUserleaveOption(null);
                    setValidateUser(1)
                } else {
                    setUserleaveid(data.value);
                    setUserleaveOption(data);
                    setValidateUser(0)
                }
            };
        // ------  leave User code end ------
    
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

        // ------ leave plan code start ------
        const [leaveplanOption, setleaveplanOption] = useState(null);
        const [leaveplanid, setleaveplanid] = useState<string | null>(null);
        const [validateleaveplan, setValidateleaveplan] = useState(0);
    
        const IsLeavePlandata = (data: any) => {
            if (!data) {
                setleaveplanid(null);
                setleaveplanOption(null);
                setValidateleaveplan(1)
            } else {
                setleaveplanid(data.value);
                setleaveplanOption(data);
                setValidateleaveplan(0)
            }
        };
        // ------  leave type code end ------
    
        const [initialValues, setinitialValues] = useState({
            leave_type: "",
            reason: "",
            request_date: "",
            request_for:"",
            leave_plan : "",
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
                   request_for : Userleaveid,
                   leave_plan : leaveplanid,
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
          <div> Request Leave </div>
        </Modal.Header>
        <Modal.Body className="px-6 pt-0 pb-6">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <div className="flex gap-x-4 mt-[1rem]">
              <div className="flex-1">
                <Label htmlFor="Status"> Leave Type </Label>
                <div className="mt-1">
                  <Select
                    className="w-full dark:text-White"
                    classNames={{
                      control: () => "react-select__control",
                      singleValue: () => "react-select__single-value",
                      menu: () => "react-select__menu",
                      option: ({ isSelected }) =>
                        isSelected
                          ? "react-select__option--is-selected"
                          : "react-select__option",
                      placeholder: () => "react-select__placeholder",
                    }}
                    value={selectedleaveTypeOption}
                    onChange={(e) => { IsActiveBannerdata(e);}}
                    options={isleaveoption}
                    isClearable={true}
                  />
                  {validateleaveType == 1 ? ( <FormFeedback type="invalid" className="text-Red  text-sm"> Please select leave type </FormFeedback>) : null}
                </div>
              </div>

              <div className="flex-1 w-full">
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
                      popperModifiers={[{
                            name: "preventOverflow",
                            options: { boundary: "viewport", },
                        },] as any}
                      className="w-full pl-10 py-2 px-5 border border-SoothingBlueGrey rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-TranquilBlack dark:bg-Cosmos dark:text-WhiteMarble"
                      placeholderText={
                        startDate
                          ? `${moment(startDate).format("dd/MM/yyyy")} - ${
                              endDate
                                ? moment(endDate).format("dd/MM/yyyy")
                                : "Select end date"
                            }`
                          : "Select Date Range"
                      }
                    />
                    <IoCalendarNumberSharp className="absolute left-3 top-2.5 w-5 h-5 text-SilverSteel pointer-events-none" />
                  </div>
                  {!startDateData || !endDateData ? ( <FormFeedback type="invalid" className="text-red-500 text-sm d-block" > Please select both start and end dates </FormFeedback>) : null}
                </div>
              </div>
            </div>

            <div className='mt-[1rem]'>
              <div className="flex-1">
                <Label htmlFor="user"> Leave Plan </Label>
                <div className="mt-1">
                  <Select
                    className="w-full dark:text-White"
                    classNames={{
                      control: () => "react-select__control",
                      singleValue: () => "react-select__single-value",
                      menu: () => "react-select__menu",
                      option: ({ isSelected }) =>
                        isSelected
                          ? "react-select__option--is-selected"
                          : "react-select__option",
                      placeholder: () => "react-select__placeholder",
                    }}
                    value={leaveplanOption}
                    onChange={(e) => {
                      IsLeavePlandata(e);
                    }}
                    options={isleaveplanoption}
                    isClearable={true}
                  />
                  {validateleaveplan == 1 ? ( <FormFeedback type="invalid" className="text-Red  text-sm"> Please select leave plan </FormFeedback>  ) : null}
                </div>
              </div>
            </div>

            {type === "A" && (
              <div className="flex-1 mt-[1rem]">
                <Label htmlFor="user"> Advisor Name </Label>
                <div className="mt-1">
                  <Select
                    className="w-full dark:text-White"
                    classNames={{
                      control: () => "react-select__control",
                      singleValue: () => "react-select__single-value",
                      menu: () => "react-select__menu",
                      option: ({ isSelected }) =>
                        isSelected
                          ? "react-select__option--is-selected"
                          : "react-select__option",
                      placeholder: () => "react-select__placeholder",
                    }}
                    value={UserleaveOption}
                    onChange={(e) => {
                      IsSelectedUserdata(e);
                    }}
                    options={userDataList}
                    isClearable={true}
                  />
                  {validateUser == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select advisor </FormFeedback> ) : null}
                </div>
              </div>
            )}

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
              <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit"> Request Leave </Button>
              <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => CloseProfile()}> Close </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LeaveAdd