import {FC, lazy, Suspense, useEffect, useState } from "react";
import { Accordion, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { changeleavestatuslist, getleavelist } from "../../../Store/actions";
import moment from "moment";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import LoaderPage from "../../../components/common/loader/loader";
const NavbarSidebarLayout = lazy(() =>import("../../../layouts/navbar-sidebar"));
const LeaveAdd = lazy(() => import("../../../components/salesComponent/leaveAdd"));
const AttendanceCalendar = lazy(() => import("../../../components/admin/attendanceCalendar"));
const CommonTable = lazy(() => import("../../../components/common/table/commonTable"));

const LeaveListPage: FC = function () {
  const dispatch = useDispatch();
  const [AdminaddLeaveModal, setAdminAddLeaveModal] = useState(false);
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
    setAdminAddLeaveModal(true);
  }

  const leaveColumns = [
    {
      key: 'leave_date',
      label: 'Leave Date',
      render: (leave: any) => (
        <div className="flex flex-col">
          <span className="whitespace-nowrap px-2 py-1">{moment(leave.start_date).format("DD-MM-YYYY")}</span>
          <div className="flex justify-center">to</div>
          <span className="whitespace-nowrap px-2 py-1 mt-1">{moment(leave.end_date).format("DD-MM-YYYY")}</span>
        </div>
      )
    },
    { key: 'days', label: 'Leave Days' },
    {
      key: 'leave_plan',
      label: 'Leave Plan',
      render: (leave: any) => leave?.leave_plan ? leave?.leave_plan.charAt(0).toUpperCase() + leave?.leave_plan.slice(1).toLowerCase() : "-"
    },
    {
      key: 'leave_type',
      label: 'Leave Type',
      render: (leave: any) => leave?.leave_type ? leave?.leave_type.charAt(0).toUpperCase() + leave?.leave_type.slice(1).toLowerCase() : "-"
    },
    {
      key: 'status',
      label: 'Status',
      render: (leave: any) => leave?.status ? leave?.status.charAt(0).toUpperCase() + leave?.status.slice(1).toLowerCase() : "-"
    },
    { key: 'reason', label: 'Reason' },
    {
      key: 'requested_by',
      label: 'Requested By',
      render: (leave: any) => leave?.requested_by?.name
    },
    {
      key: 'approved_by',
      label: 'Approved By',
      render: (leave: any) => leave?.approved_by?.name ? leave?.approved_by?.name : "-"
    },
    {
      key: 'approved_date',
      label: 'Approved Date',
      render: (leave: any) => leave?.approved_date ? moment(leave?.approved_date).format("DD-MM-YYYY") : "-"
    },
    {
      key: 'action',
      label: 'Action',
      render: (leave: any) => (
        <div className="flex flex-col space-y-1">
          {leave?.status === "approved" ?
            <Button gradientDuoTone="greenToBlue" onClick={() => ChangeStatus(leave?._id, "cancel")}>Cancel</Button>
            : leave?.status === "pending" ?
            <div className="flex gap-x-4">
              <Button gradientDuoTone="greenToBlue" onClick={() => ChangeStatus(leave?._id, "approved")}>Approve</Button>
              <Button gradientDuoTone="purpleToPink" onClick={() => ChangeStatus(leave?._id, "rejected")}>Reject</Button>
            </div>
            : <div>-</div>
          }
        </div>
      )
    }
  ];

  return (
    <Suspense fallback={<div className="p-6 text-center"><LoaderPage /></div>}>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
        <div className="mb-4 flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-DarkBackground dark:text-White mb-4">
              Leave Management
            </h1>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => setSelectedTab("Attendance")}
                className={`px-4 py-2 rounded-md ${
                  selectedTab === "Attendance"
                    ? "bg-White dark:bg-Cosmos text-blue-600 font-semibold shadow"
                    : "text-Hydrocarbon dark:text-SoothingBlueGrey"
                }`}
              >
                
                Attendance
              </button>
              <button
                onClick={() => setSelectedTab("Leave")}
                className={`px-4 py-2 rounded-md ${
                  selectedTab === "Leave"
                    ? "bg-White dark:bg-Cosmos text-blue-600 font-semibold shadow"
                    : "text-Hydrocarbon dark:text-SoothingBlueGrey"
                }`}
              >
                Leave
              </button>
            </div>
          </div>
          <div className="self-center">
            
            <Button
              gradientDuoTone="purpleToPink"
              onClick={() => RequestLeave()}
            >
              Add Leave Request
            </Button>
          </div>
        </div>

        {selectedTab === "Attendance" ? (
          <div className="mt-4">
            
            <AttendanceCalendar users={leavelist || []} />
          </div>
        ) : (
          <>
            <div className="flex gap-x-3  mb-4">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg bg-purple-200 text-purple-700"
              >
                
                <FaArrowLeft />
              </button>
              <h2 className="text-xl font-semibold text-DarkBackground dark:text-White">
                
                {currentMonth.format("MMMM YYYY")}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg bg-purple-200 text-purple-700"
              >
                
                <FaArrowRight />
              </button>
            </div>

            <Accordion alwaysOpen={true}>
              {leavelist &&
                leavelist.map((person: any, index: number) => (
                  <Accordion.Panel key={index}>
                    <Accordion.Title className="bg-WhiteMarble dark:bg-Cosmos">
                      {person.name}
                    </Accordion.Title>
                    <Accordion.Content className="transition-all ease-in-out duration-300 rounded-lg shadow-lg bg-White dark:bg-TranquilBlack">
                      <CommonTable
                        columns={leaveColumns}
                        data={person?.leaves}
                      />
                    </Accordion.Content>
                  </Accordion.Panel>
                ))}
            </Accordion>
          </>
        )}

        {AdminaddLeaveModal ? (
          <LeaveAdd
            CloseProfile={() => setAdminAddLeaveModal(false)}
            confirmationModal={AdminaddLeaveModal}
            type="A"
          />
        ) : null}
      </NavbarSidebarLayout>
    </Suspense>
  );
}

export default LeaveListPage;