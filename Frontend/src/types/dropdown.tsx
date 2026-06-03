import { BsCartCheckFill, BsFillStopwatchFill } from "react-icons/bs";
import { FaCircleCheck, FaRegClock } from "react-icons/fa6";
import { MdReport } from "react-icons/md";

export const genderoption = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export const yesnooption = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export const isactiveoption = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

export const reportoption = [
  { label: "Advisor", value: "advisor" },
  { label: "Farmer", value: "farmer" },
  // { label : "Lead", value:"lead" },
  { label: "Order", value: "order" },
];

export const isSendTooption = [
  { label: "All", value: "all" },
  { label: "Selected", value: "selected" },
];

export const isemployeeoption = [
  { label: "Priyanka", value: "all" },
  { label: "Akki", value: "selected" },
];

export const isDocTypeoption = [
  { label: "Text", value: "text" },
  { label: "PDF", value: "pdf" },
  { label: "Video", value: "video" },
  { label: "Youtube", value: "youtube" },
];

export const isDurationoption = [
  { label: "Permenet", value: "permenet" },
  { label: "Part Time", value: "part-time" },
];

export const isleaveoption = [
  { label: "Casual Leave", value: "casual" },
  { label: "Leave without pay", value: "lwp" },
];

export const isleaveplanoption = [
  { label: "Full Day", value: "full-day" },
  { label: "Half day (1st half)", value: "fist-half" },
  { label: "Half day (2st half)", value: "secound-half" },
];

export const ManagerDashboardTabData = [
  { title: "Pending", icon: <BsFillStopwatchFill size={20} /> },
  { title: "Completed", icon: <FaCircleCheck size={20} /> },
];

export const  FarmerDashboardTabData = [
  { title: "Order", icon: <BsCartCheckFill  size={20} /> },
  { title: "Complain", icon: <MdReport  size={20} /> },
  { title: "Taglog", icon: <FaRegClock  size={20} /> },
];