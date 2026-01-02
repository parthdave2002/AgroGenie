import { useState, useMemo } from "react";
import moment from "moment";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface User {
  name: string;
  leaves: {
    start_date: string;
    end_date: string;
  }[];
}

interface AttendanceCalendarProps {
  users: User[];
}

interface LeaveMap {
    [username: string]: Set<string>;
}

export default function AttendanceCalendar({ users }: AttendanceCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(moment());

    const monthDays = useMemo(() => {
        const start = currentMonth.clone().startOf("month");
        const end = currentMonth.clone().endOf("month");

        let days = [];
        for (let d = start.clone(); d <= end; d.add(1, "day")) {
            days.push(d.clone());
        }
        return days;
    }, [currentMonth]);

    const nextMonth = () => setCurrentMonth(prev => prev.clone().add(1, "month"));
    const prevMonth = () => setCurrentMonth(prev => prev.clone().subtract(1, "month"));

    // Format leave lookup by userId → set of leave days
    const leaveMap = useMemo(() => {
        let map: LeaveMap = {};

        const parseDate = (value: any) => {
            if (!value) return moment.invalid();
            // Try common formats first (strict), fallback to moment's parser
            const m = moment(value, ["DD-MM-YYYY", "YYYY-MM-DD", "DD/MM/YYYY"], true);
            return m.isValid() ? m : moment(value);
        };

        users.forEach((user: any) => {
            const set = new Set<string>();

            (user.leaves || []).forEach((leave: any) => {
                const start = parseDate(leave.start_date);
                const end = parseDate(leave.end_date);

                if (!start.isValid() || !end.isValid()) return;

                for (let d = start.clone(); d <= end; d.add(1, "day")) {
                    set.add(d.format("YYYY-MM-DD"));
                }
            });

            map[user?.name] = set;
        });

        return map;
    }, [users]);

   

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            {/* Header */}
            <div className="flex gap-x-3  mb-4">
                <button onClick={prevMonth} className="p-2 rounded-lg bg-purple-200 text-purple-700"> <FaArrowLeft />  </button>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">   {currentMonth.format("MMMM YYYY")} </h2>
                <button onClick={nextMonth} className="p-2 rounded-lg bg-purple-200 text-purple-700">  <FaArrowRight />  </button>
            </div>

            {/* Scrollable calendar: days header + user rows inside an overflow container */}
                            <div className="overflow-x-auto">
                                {/* Days row */}
                                <div className="grid grid-cols-[200px_repeat(31,minmax(28px,28px))] gap-x-3 text-sm mb-2">
                                    <div></div>
                                    {monthDays.map((day, idx) => (
                                        <div key={idx} className="text-center text-gray-500">  {day.format("dd")}  </div>
                                    ))}
                                </div>

                                {/* Users rows */}
                                {users.map((user: any, index: number) => (
                                    <div key={index} className="grid grid-cols-[200px_repeat(31,minmax(28px,28px))] gap-x-3  py-2 items-center">
                                        <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">{user.name} </div>

                                        {monthDays && monthDays.map((day: any, idx: number) => {
                                            const formatted = day.format("YYYY-MM-DD");
                                            const isWeekend = day.day() === 0 || day.day() === 6;
                                            const isLeave = leaveMap[user?.name]?.has(formatted) ?? false;

                                            const cellClass = `w-7 h-7 flex items-center justify-center text-sm rounded-full border border-gray-300 dark:text-white
                                                    ${isLeave ? "bg-purple-400 text-white" : ""}
                                                    ${isWeekend && !isLeave ? "bg-yellow-300 text-black dark:text-white" : ""}`;

                                            return (
                                                <div key={idx} className="flex justify-center">
                                                    <div className={cellClass}>
                                                        {day.format("D")}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
        </div>
    );
}
