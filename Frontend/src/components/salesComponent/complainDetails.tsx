import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button, Label, Modal } from 'flowbite-react';
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Form, Input, FormFeedback } from "reactstrap";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { ResetComplainlist, UpdateComplainlist } from '../../Store/actions';
import { FaPuzzlePiece, FaQuestionCircle } from 'react-icons/fa';
import CommonTable from '../../components/common/table/commonTable';
import { ComplainProps, ComplainData } from '../../types/types';
import { priorityoption } from '../../types/dropdown';

const ComplainDetails : FC <ComplainProps> = ({setisOpenComplainModel,isOpenComplainModel, isComplainData }) => {

    const dispatch = useDispatch();
    const [complainResolution, setComplainResolution] = useState("");
    const [UserComplainDataList, setUserComplainDataList] = useState<ComplainData>();

    useEffect(() => {
      setUserComplainDataList(  isComplainData ? isComplainData  : [])
    }, [isComplainData]);

    const [selectedactiveOption, setSelectedactiveOption] = useState(null);
    const [selectedactiveid, setSelectedactiveid] = useState("");
    const [validateactive, setValidateactive] = useState(0);

    const IsActivedata = (data: any) => {
        if (!data) {
            setSelectedactiveid("");
            setSelectedactiveOption(null);
            setValidateactive(1)
        } else {
            setSelectedactiveid(data.value);
            setSelectedactiveOption(data);
            setValidateactive(0)
        }
    };

    const [initialValues, setinitialValues] = useState({
        comment: "",
        priority: "",
        status: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,

        validationSchema: Yup.object({
            comment: Yup.string().required("Please enter comment")
        }),

        onSubmit: (values) => {
            if (!selectedactiveid) {
                setValidateactive(1);
                return;
            }

            let requserdata = {
                id: UserComplainDataList?._id,
                priority: selectedactiveid,
                comment: values?.comment ,
                complain_id: UserComplainDataList?.complain_id,
                resolution : complainResolution
            };

            dispatch(UpdateComplainlist(requserdata)); 
        },
    });

    // --------------- Update Complainlist code start --------------------
        const ComplainUpdatedlist = useSelector((state: any) => state.Complain.updateComplainlist);
        useEffect(() => {
            if (ComplainUpdatedlist?.success) {
                setisOpenComplainModel(false)
                dispatch(ResetComplainlist());
                validation.values.comment = "";
                setSelectedactiveOption(null)
                setSelectedactiveid("")
                setValidateactive(0)
            }
        }, [ComplainUpdatedlist])
    // --------------- Update Complainlist code end --------------------

    const complainColumns = useMemo(() => [
        { key: "comment_date", label: "Date", render: (row: any) => moment(row?.comment_date).format("DD-MM-YYYY hh:mm:ss") },
        { key: "name", label: "Name", render: (row: any) => row?.name?.name },
        { key: "comment", label: "Comment" },
        { key: "resolution", label: "Status", render: (row: any) => row?.resolution.charAt(0).toUpperCase() + row?.resolution.slice(1).toLowerCase()},
    ],[]);

  return (
    <div>
        <Modal onClose={() => setisOpenComplainModel(false)} show={isOpenComplainModel} size="6xl" className="backdrop-blur-sm p-3" >
            <Modal.Header>   <div className='text-[2rem] dark:text-WhiteMarble font-bold'> Complain Details  </div>   </Modal.Header>
            <div className='p-3'>
                
            {UserComplainDataList?.resolution == "open" ?
                <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                      <div className='mb-[2rem] p-3'>
                          <div className='flex gap-x-4'>
                              <div className='flex-1'>
                                  <Label htmlFor="comment">Comment </Label>
                                  <div className="mt-1">
                                      <Input
                                          id="comment"
                                          name="comment"
                                          className="bg-White border border-SoothingBlueGrey dark:bg-TranquilBlack dark:border-Hydrocarbon dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-SilverSteel dark:text-White disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-DarkBackground text-sm w-full"
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

                              <div className='flex-1'>
                                  <Label htmlFor="priority"> Priority </Label>
                                  <div className="mt-1">
                                      <Select
                                          className="w-full dark:text-White"
                                          classNames={{
                                              control: () => "react-select__control",
                                              singleValue: () => "react-select__single-value",
                                              menu: () => "react-select__menu",
                                              option: ({ isSelected }) =>
                                                  isSelected ? "react-select__option--is-selected" : "react-select__option",
                                              placeholder: () => "react-select__placeholder",
                                          }}

                                          value={selectedactiveOption}
                                          onChange={(e) => { IsActivedata(e) }}
                                          options={priorityoption}
                                          isClearable={true}
                                      />
                                      {validateactive == 1 ? (<FormFeedback type="invalid" className="text-Red text-sm"> Please select priority </FormFeedback>) : null}
                                  </div>
                              </div>
                          </div>
                          <div className='flex gap-x-3 justify-end'>
                             <Button type='submit' className='mt-3 mt-3 bg-gradient-to-br from-green-400 to-blue-600 text-White hover:bg-gradient-to-bl border-0' onClick={() => setComplainResolution("open") } ><div className='flex items-center gap-x-3'> <FaQuestionCircle  className="text-xl "  /> Add Comment </div> </Button>
                            {UserComplainDataList?.is_resolved_by == true ?  
                            <Button type='submit' className='mt-3 mt-3 bg-gradient-to-br from-green-400 to-blue-600 text-White hover:bg-gradient-to-bl border-0' onClick={() => setComplainResolution("close") } ><div className='flex items-center gap-x-3'> <FaPuzzlePiece  className="text-xl "/> Resolved   </div>   </Button> 
                              : null  }  
                          </div>                
                      </div>
                </Form>
            : null}

                <div className='max-h-[18rem] overflow-scroll'>
                    <CommonTable columns={complainColumns} data={UserComplainDataList?.Comment || []} />
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default ComplainDetails