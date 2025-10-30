import React, { FC, useEffect, useState } from 'react';
import { Label,Table, Modal, Button } from "flowbite-react";
import ExamplePagination from '../../components/common/pagination/pagination';
import * as Yup from "yup";
import Select from "react-select";
import { Form, FormFeedback } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { addleavelist, getleavelist } from '../../Store/actions';
import Inputbox from '../../components/common/inputComponent/inputbox';
import { useFormik } from 'formik';
import moment from 'moment';

interface PropsData{
    CloseProfile: () => void;
}

const SalesProfile : FC <PropsData> = function ({CloseProfile})  {
    const dispatch = useDispatch();

    const [SalesLeaveData, setSalesLeaveData] = useState([])
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [PageDataList, setPageDataList] = useState([])
    const [RowPerPage, setRowPerPage] = useState(10)
    const [RoePerPage, setRoePerPage] = useState(10)
    const [PageNo, setPageNo] = useState(1)
    const [CurrentPageNo, setCurrentPageNo] = useState(1)
    const [TotalListData, setTotalListData] = useState(0)

    const Leavedatalist = useSelector((state: any) => state.Leave.Leavedatalist)

    useEffect(() => {
        setSalesLeaveData(Leavedatalist?.data?.data)
    }, [Leavedatalist]);

    useEffect(() => {
        dispatch(getleavelist());
    }, [dispatch]);

    const RequestLeave = () => {
        setConfirmationModal(true);
    }

    const isleaveoption = [
        { label: "Casual Leave", value: "casual" },
        { label: "Leave without pay", value: "lwp" },
    ]

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

            let requser ={
               leave_type: selectedleaveTypeid,
               reason : values?.reason,
               request_date : moment(values?.request_date).format("DD-MM-YYYY") 
            }
            dispatch(addleavelist(requser));
            setConfirmationModal(false)
        },
    });

  return (
    <>
    
          <div className="mt-[4rem]">
                <div className='flex justify-between mb-6 self-center'>
                  <h3 className="self-center text-xl font-bold leading-none text-gray-900 dark:text-white"> Leave History </h3>
                  <Button gradientDuoTone="purpleToPink" onClick={ () =>  RequestLeave()}> Request Leave </Button>
                </div>

                {SalesLeaveData && SalesLeaveData.length > 0 ?
                  <>
                      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                          <Table.Head className="bg-gray-100 dark:bg-gray-700">
                              <Table.HeadCell> Leave Date</Table.HeadCell>
                              <Table.HeadCell>Leave Type</Table.HeadCell>
                              <Table.HeadCell> Status</Table.HeadCell>
                              <Table.HeadCell>Reason</Table.HeadCell>
                              <Table.HeadCell> Requested By</Table.HeadCell>
                              <Table.HeadCell> Requested Date</Table.HeadCell>
                              <Table.HeadCell>Approved By </Table.HeadCell>
                              <Table.HeadCell>Approved date </Table.HeadCell>

                          </Table.Head>

                          <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                              {SalesLeaveData && SalesLeaveData.map((item: any, k: number) => (
                                  <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.request_date} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.leave_type ? item?.leave_type.charAt(0).toUpperCase() + item?.leave_type.slice(1).toLowerCase() : "-"} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.status ? item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase() : "-"} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.reason} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.requested_by?.name} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.requested_at ? new Date(item?.requested_at).toLocaleDateString() : "N/A"} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.approved_by?.name ? item?.approved_by?.name : "N/A"} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.approved_date ? new Date(item?.approved_date).toLocaleDateString() : "N/A"} </Table.Cell>
                                  </Table.Row>
                              ))}
                          </Table.Body>
                      </Table>

                      <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
                  </>
                : null}
          </div>

          {confirmationModal ?
              <Modal onClose={() => setConfirmationModal(false)} show={confirmationModal} size="2xl">
                    <Modal.Header className="px-6 pt-3 pb-0">
                     <div> Request Leave </div>
                    </Modal.Header>
                    <Modal.Body className="px-6 pt-0 pb-6">
                          <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                             <div className="mt-[1rem]">
                            <Label htmlFor="Status"> Leave Type </Label>
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

                                    value={selectedleaveTypeOption}
                                    onChange={(e) => { IsActiveBannerdata(e) }}
                                    options={isleaveoption}
                                    isClearable={true}
                                />
                                {validateleaveType == 1 ? <FormFeedback type="invalid" className="text-Red text-sm"> Please select leave type </FormFeedback> : null}
                            </div>
                        </div>


                         <div className="mt-[1rem]">
                              <Inputbox
                                  id="request_date"
                                  name="request_date"
                                  label="Leave Date"
                                  required={true}
                                  placeholder="please select aate"
                                  type="date"
                                  validation={validation}
                              />
                          </div>

                          <div className="mt-[1rem]">
                              <Inputbox
                                  id="reason"
                                  name="reason"
                                  label="Reason"
                                  required={true}
                                  placeholder="please enter reason"
                                  type="text"
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
              : null}
    </>
  );
}

export default SalesProfile