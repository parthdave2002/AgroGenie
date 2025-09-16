export interface ButtonProps {
  className?: string;
  name: string;
  handleClick?: () => void;
  disabled?: boolean;
}

export interface ProfileInfo {
  crops: [];
  is_deleted: boolean;
  _id: string;
  customer_name: string;
  firstname: string;
  middlename: string;
  lastname: string;
  mobile_number: number;
  land_area: number | string;
  land_type: string;
  irrigation_source: string;
  irrigation_type: string;
  heard_about_agribharat: string;
  address: string;
  district: string;
  district_name: string;
  taluka: string;
  taluka_name: string;
  village: string;
  village_name: string;
  pincode: number;
  post_office: string;
  created_by: string;
  __v: number;
  alternate_number: number;
  added_at: string;
  smart_phone: boolean;
  ref_name: number | string;
  state: { name: string; _id: string }
}

export interface AccessData {
  add: boolean;
  view: boolean;
  edit: boolean;
  delete: boolean;
}

export interface totalCustomer {
  daily: number;
  monthly: number;
  weekly: number;
}

export interface RoleData {
  role_title: string;
  _id: string
}

export interface UserData {
  aadhar_card: boolean | "";
  // added_at: string;
  address: string;
  bank_passbook: boolean | null;
  date_of_birth: string;
  date_of_joining: string;
  email: string;
  emergency_contact_person: string | "";
  emergency_mobile_no: number | "";
  gender: string;
  is_active: boolean | "";
  mobile_no: number | "";
  name: string;
  pan_card: boolean | "";
  password: string;
  role: RoleData;
  user_pic: string;
  added_at?: string;
}


export interface DescriptionData {
  id: number | string;
  englishHeader: string;
  englishValue: string;
  gujaratiHeader: string;
  gujaratiValue: string;
}

export interface TechName {
  gujarati_tech_name: string;
  english_tech_name: string;
}
export interface CompanyData {
  _id ?: string;
  name_eng: string;
  name_guj: string;
}

export interface Category {
  _id ?: string;
  name_eng: string;
  name_guj: string;
}

export interface PackingType {
  _id ?: string;
  type_eng: string
  type_guj: string;
}

export interface Name {
  gujaratiname: string;
  englishname: string;
}

export interface ProductDetails {
  added_at: string;
  avl_qty: number | string;
  batch_no: string;
  c_gst: number;
  company: CompanyData;
  categories: Category;
  description: DescriptionData[];
  discount: number;
  hsn_code: string;
  is_active: boolean;
  is_deleted: boolean;
  name: Name;
  packaging: number | string;
  packagingtype: PackingType;
  price: number | string;
  product_pics: [];
  rating: any;
  s_gst: number;
  tech_name: TechName;
  _id: string;
  crops ?: any;
}

export interface ProfileData {
  name: string;
  email: string;
  role: RoleData;
  user_pic: string;
}

export interface cropData {
  name: string;
  _id: string;
}

export interface CustomerDetails {
  added_at: string;
  address: string;
  alternate_number: number;
  crops: cropData[];
  customer_name: string;
  district: string;
  heard_about_agribharat: string;
  irrigation_source: string;
  irrigation_type: string;
  is_deleted: boolean;
  land_area: string;
  land_type: string;
  mobile_number: number;
  pincode: string;
  taluka: string;
  village: string;
  _id: string;
}

export interface LeadList {
  data?: any[];
  totalData?: number;
  size?: number;
  page?: number;
}

export interface CustomerData {
    address: string;
    firstname: string;
    middlename: string;
    lastname: string;
    customer_name : string;
    district_name: string;
    mobile_number : number;
    alternate_number : number;
    pincode : string;
    taluka_name:string;
    village_name : string;
    state :any;
  }

export interface ProductData {
    name: string ; 
    hsn_code : number;
    discount :number;
    batch_no : number;
    price : number;
    c_gst : number;
    s_gst : number;
    quantity : number;
  }
  
export interface OrderDetailsType {
    added_at : string;
    order_id: string
    customer: CustomerData;
    products :  ProductData[];
    status: string;
    total_amount : number;
    coupon : any;
  }