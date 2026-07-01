import { useMemo } from "react";
import { BsCartCheckFill, BsFillStopwatchFill } from "react-icons/bs";
import { FaRegClock, FaWallet } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
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

export const isleaveplanoption = [
  { label: "Full Day", value: "full-day" },
  { label: "Half day (1st half)", value: "fist-half" },
  { label: "Half day (2st half)", value: "secound-half" },
];

export const ManagerDashboardTabData = [
  { title: "Pending", icon: <BsFillStopwatchFill size={20} /> },
  { title: "Completed", icon: <FaCircleCheck size={20} /> },
];

export const FarmerDashboardTabData = [
  { title: "Order", icon: <BsCartCheckFill size={20} /> },
  { title: "Complain", icon: <MdReport size={20} /> },
  { title: "Taglog", icon: <FaRegClock size={20} /> },
  { title: "Wallet", icon: <FaWallet size={20} /> },
]

export const IrrigationSourceOptions= [
  { label :"Well", value : "well"},
  { label :"Borwell", value : "borwell"},
  { label :"Canal", value : "canal"},
  { label :"Other", value : "other"},
  { label :"No source", value : "no source"},
]

export const IrrigationTypeOptions= [
  { label :"Drip", value : "drip"},
  { label :"Sprinkler", value : "sprinkler"},
  { label :"Flood", value : "flood"},
]

export  const LandTypeOptions= [
  { label :"Acre", value : "acre"},
  { label :"Bigha", value : "bigha"},
  { label :"Hacter", value : "hacter"},
]

export const HeardAboutOprions =  [
  { label :"Newspaper", value : "newspaper"},
  { label :"TV Ad", value : "tv add"},
  { label :"Magazine", value : "magazine"},
  { label :"Van campaign", value : "van campaign"},
  { label :"Instagram", value : "instagram"},
  { label :"Facebook", value : "facebook"},
  { label :"What's App", value : "whatsapp"},
  { label :"Linkedin", value : "linkedin"},
  { label :"Youtube", value : "youtube"},
  { label :"Brochure ", value : "brochure"},
  { label :"Agro shop", value : "shop"},
  { label :"Field office", value : "officer"},
  { label :"Other farmer", value : "other farmer"},
]

export const NearByOptions= [
  { label :"Village", value : "village"},
  { label :"Taluka", value : "taluka"},
]

export const priorityoption =[
  {  label :"High", value : "high"  },
  {  label :"Medium", value : "medium" },
  {  label :"Low",   value : "low" },
]

export const leadoption = [
    { label: "Contact Us Page", value: "contactus" },
    { label: "Help Page", value: "help" },
    { label: "Order", value: "order" },
    { label: "Referral", value : "referral" }
  ];

export const WalletRuletypeoption = [
  {
    label: 'Farmer Registered',
    value: 'CUSTOMER_REGISTERED'
  },
  {
    label: 'Referral Success',
    value: 'REFERRAL_SUCCESS'
  },
  {
    label: 'Order Completed',
    value: 'ORDER_COMPLETED'
  },
  {
    label: 'First Order Completed',
    value: 'FIRST_ORDER_COMPLETED'
  },
  {
    label: 'Profile Completed',
    value: 'PROFILE_COMPLETED'
  },
  {
    label: 'Birthday Reward',
    value: 'BIRTHDAY_REWARD'
  },
  {
    label: 'Review Added',
    value: 'REVIEW_ADDED'
  }
]

export const WalletPerson = [
  {
    label: 'Customer',
    value: 'CUSTOMER'
  },
  {
    label: 'Referrer',
    value: 'REFERRER'
  },
  {
    label: 'Referred User',
    value: 'REFERRED_USER'
  },
  {
    label: 'Both',
    value: 'BOTH'
  }
]

export const WalletAmtType= [
  {
    label: 'Fixed Points',
    value: 'FIXED'
  },
  {
    label: 'Percentage',
    value: 'PERCENTAGE'
  }
]