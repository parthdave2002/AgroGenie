import {FC, lazy, Suspense, useEffect, useState } from "react";
import { Accordion, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { changeleavestatuslist, getleavelist } from "../../../Store/actions";
import moment from "moment";
import LeaveAdd from "../../../components/salesComponent/leaveAdd";
import AttendanceCalendar from "../../../components/admin/attendanceCalendar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const NavbarSidebarLayout = lazy(() =>import("../../../layouts/navbar-sidebar"));

const LeaveListPage: FC = function () {
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("Leave");
  const [currentMonth, setCurrentMonth] = useState(moment());

  const Leavedatalist = useSelector((state: any) => state.Leave.Leavedatalist) 
  const [leavelist, setLeavelist] = useState<any>([]);

  useEffect(() => {
   setLeavelist(Leavedatalist?.data)
  }, [Leavedatalist]);

  const nextMonth = () => setCurrentMonth(prev => prev.clone().add(1, "month"));
  const prevMonth = () => setCurrentMonth(prev => prev.clone().subtract(1, "month"));
  
  useEffect(() => {
    let requser= { month : currentMonth.format("MM-YYYY")  }
    dispatch(getleavelist(requser));
  }, [dispatch, currentMonth]);

  const ChangeStatus = (id:string, data:string) =>{
    let requser={
      id: id, 
      status : data
    }
    dispatch(changeleavestatuslist(requser));
  }

   const RequestLeave = () => {
        setConfirmationModal(true);
    }

  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true} >

          <div className="mb-4 flex justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Leave Management</h1>
              <div className="mt-2 flex space-x-2">
                <button  onClick={() => setSelectedTab('Attendance')}  className={`px-4 py-2 rounded-md ${selectedTab === 'Attendance' ? 'bg-white dark:bg-gray-800 text-blue-600 font-semibold shadow' : 'text-gray-600 dark:text-gray-300'}`}>   Attendance </button>
                <button  onClick={() => setSelectedTab('Leave')}  className={`px-4 py-2 rounded-md ${selectedTab === 'Leave' ? 'bg-white dark:bg-gray-800 text-blue-600 font-semibold shadow' : 'text-gray-600 dark:text-gray-300'}`}>   Leave  </button>
              </div>
            </div>
            <div className="self-center">  <Button gradientDuoTone="purpleToPink" onClick={() => RequestLeave()  }> Add Leave Request </Button>  </div>
          </div>
      
          {selectedTab === 'Attendance' ? (
            <div className="mt-4"> <AttendanceCalendar users={leavelist || []} />    </div>
          ) : (

            <>

              <div className="flex gap-x-3  mb-4">
                <button onClick={prevMonth} className="p-2 rounded-lg bg-purple-200 text-purple-700"> <FaArrowLeft />  </button>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">   {currentMonth.format("MMMM YYYY")} </h2>
                <button onClick={nextMonth} className="p-2 rounded-lg bg-purple-200 text-purple-700">  <FaArrowRight />  </button>
              </div>
                  
                  <Accordion alwaysOpen={true} >
                    {leavelist && leavelist.map((person:any, index:number) => (
                      <Accordion.Panel key={index}>
                        <Accordion.Title className="bg-gray-200 dark:bg-gray-800" >{person.name}</Accordion.Title>
                        <Accordion.Content className="transition-all ease-in-out duration-300 rounded-lg shadow-lg bg-white dark:bg-gray-700">
                          <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border-collapse dark:text-gray-200">
                              <thead>
                                <tr className="border-b">
                                  <th className="px-4 py-2 text-left">Leave Date</th>
                                  <th className="px-4 py-2 text-left">Leave Days</th>
                                  <th className="px-4 py-2 text-left">Leave Type</th>
                                  <th className="px-4 py-2 text-left">Status</th>
                                  <th className="px-4 py-2 text-left">Reason</th>
                                  <th className="px-4 py-2 text-left">Requested By </th>
                                  <th className="px-4 py-2 text-left"> Approved By </th>
                                  <th className="px-4 py-2 text-left"> Approved Date</th>
                                  <th className="px-4 py-2 text-left">  Action </th>
                                </tr>
                              </thead>
                              <tbody>
                                {person?.leaves.map((leave:any, idx:number) => (
                                  <tr key={leave._id} className={idx % 2 === 0 ? "bg-gray-100 dark:bg-gray-700" : "bg-white dark:bg-gray-800"}>
                                    <td className="px-4 py-2 text-wrap">
                                        <div className="flex flex-col">
                                          <span className="whitespace-nowrap  px-2 py-1">  {moment(leave.start_date).format("DD-MM-YYYY")}  </span>
                                          <div className="flex justify-center"> to</div>
                                          <span className="whitespace-nowrap  px-2 py-1 mt-1"> {moment(leave.end_date).format("DD-MM-YYYY")} </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">{leave?.days}</td>
                                    <td className="px-4 py-2">{leave?.leave_type ? leave?.leave_type.charAt(0).toUpperCase() + leave?.leave_type.slice(1).toLowerCase() : "-"}</td>
                                    <td className="px-4 py-2">{leave?.status ? leave?.status.charAt(0).toUpperCase() + leave?.status.slice(1).toLowerCase() : "-"}</td>
                                    <td className="px-4 py-2 min-w-[15rem]">{leave?.reason}</td>
                                    <td className="px-4 py-2  whitespace-nowrap">{leave?.requested_by?.name}</td>
                                    <td className="px-4 py-2  whitespace-nowrap">{leave?.approved_by?.name ? leave?.approved_by?.name : <div> - </div>}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{leave?.approved_date  ? moment(leave?.approved_date).format("DD-MM-YYYY") :  <div> - </div> }</td>
                                    <td className="px-4 py-2 ">
                                      <div className="flex flex-col space-y-1">
                                        {leave?.status =="approved" ?
                                            <Button gradientDuoTone="greenToBlue" onClick={() => ChangeStatus(leave?._id, "cancel")} >  Cancel </Button>
                                          : leave?.status =="pending" ?
                                          <div className="flex gap-x-4">
                                            <Button gradientDuoTone="greenToBlue" onClick={() => ChangeStatus(leave?._id, "approved")} > Approve </Button>
                                            <Button gradientDuoTone="purpleToPink" onClick={() => ChangeStatus(leave?._id, "rejected")}>  Reject </Button>
                                          </div>
                                          : <div>-</div>
                                        }
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </Accordion.Content>
                      </Accordion.Panel>
                    ))}
                  </Accordion>
             </>
          )}

        {confirmationModal ?
          <LeaveAdd CloseProfile={() => setConfirmationModal(false)} confirmationModal={confirmationModal} type="A" />
          : null}
      </NavbarSidebarLayout>
    </Suspense>
  );
}

export default LeaveListPage;