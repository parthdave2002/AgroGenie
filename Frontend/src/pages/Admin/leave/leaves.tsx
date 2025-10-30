import { FC, lazy, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import { Accordion, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { changeleavestatuslist, getleavelist } from "../../../Store/actions";

const LeaveListPage: FC = function () {
  const dispatch = useDispatch();

  const Leavedatalist = useSelector((state: any) => state.Leave.Leavedatalist) 
  const [leavelist, setLeavelist] = useState<any>([]);

  useEffect(() => {
   setLeavelist(Leavedatalist?.data)
  }, [Leavedatalist]);
  
  useEffect(() => {
    dispatch(getleavelist());
  }, [dispatch]);

  const ChangeStatus = (id:string, data:string) =>{
    let requser={
      id: id, 
      status : data
    }
    dispatch(changeleavestatuslist(requser));
  }

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true} >
     
        <Accordion alwaysOpen={true} >
           {leavelist && leavelist.map((person:any, index:number) => (
            <Accordion.Panel key={index}>
              <Accordion.Title >{person.name}</Accordion.Title>
              <Accordion.Content className="transition-all ease-in-out duration-300 rounded-lg shadow-lg bg-white dark:bg-gray-700">
               
                <table className="min-w-full table-auto border-collapse dark:text-gray-200">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Leave Date</th>
                      <th className="px-4 py-2 text-left">Leave Type</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Reason</th>
                      <th className="px-4 py-2 text-left">Requested By</th>
                      <th className="px-4 py-2 text-left"> Approved By / Approved Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {person?.leaves.map((leave:any, idx:number) => (
                      <tr key={leave._id} className={idx % 2 === 0 ? "bg-gray-100 dark:bg-gray-700" : "bg-white dark:bg-gray-800"}>
                        <td className="px-4 py-2">{leave?.request_date}</td>
                        <td className="px-4 py-2">{leave?.leave_type ? leave?.leave_type.charAt(0).toUpperCase() + leave?.leave_type.slice(1).toLowerCase() : "-"}</td>
                        <td className="px-4 py-2">{leave?.status ? leave?.status.charAt(0).toUpperCase() + leave?.status.slice(1).toLowerCase() : "-"}</td>
                        <td className="px-4 py-2">{leave?.reason}</td>
                        <td className="px-4 py-2">{leave?.requested_by?.name}</td>
             
                        <td className="px-4 py-2 ">
                          <div className="flex flex-col space-y-1">
                            {leave.approved_by?.name && leave.approved_date ?
                              <>
                                <span>{leave.approved_by.name}</span>
                                <span>{new Date(leave.approved_date).toLocaleDateString()}</span>
                              </>
                              :
                              <div className="flex gap-x-4">
                                <Button gradientDuoTone="greenToBlue" onClick={() => ChangeStatus(leave?._id, "approved")} > Approve </Button>
                                <Button gradientDuoTone="purpleToPink" onClick={() => ChangeStatus(leave?._id, "rejected")}>  Reject </Button>
                              </div>
                            }
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      </NavbarSidebarLayout>

    </>
  );
}

export default LeaveListPage;