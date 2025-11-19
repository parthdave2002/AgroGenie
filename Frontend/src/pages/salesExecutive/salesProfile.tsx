import React, { FC, useEffect, useState } from 'react';
import { Table, Button } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getleavelist } from '../../Store/actions';
import ExamplePagination from '../../components/common/pagination/pagination';
import LeaveAdd from '../../components/salesComponent/leaveAdd';

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
                              <Table.HeadCell> Leave Days</Table.HeadCell>
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
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item?.start_date).format("DD-MM-YYYY")}  To  {moment(item?.end_date).format("DD-MM-YYYY")} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.days}</Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.leave_type ? item?.leave_type.charAt(0).toUpperCase() + item?.leave_type.slice(1).toLowerCase() : "-"} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.status ? item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase() : "-"} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.reason} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.requested_by?.name} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.requested_at ? moment(item?.requested_at).format("DD-MM-YYYY") : "N/A"} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.approved_by?.name ? item?.approved_by?.name : "N/A"} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.approved_date ? moment(item?.approved_date).format("DD-MM-YYYY") : "N/A"} </Table.Cell>
                                  </Table.Row>
                              ))}
                          </Table.Body>
                      </Table>

                      <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
                  </>
                : null}
          </div>

        {confirmationModal ?
            <LeaveAdd CloseProfile={() => setConfirmationModal(false)}  confirmationModal={confirmationModal} type="S"/>
        : null}
    </>
  );
}

export default SalesProfile