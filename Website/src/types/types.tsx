export interface DescriptionData{
  id:number;
  englishHeader :string;
  englishValue :string;
  gujaratiHeader :string;
  gujaratiValue :string;
}

export interface TechName{
  gujarati_tech_name: string;
  english_tech_name : string;
}

export interface CompanyData{  
  name_eng : string; 
  name_guj :string;
}

export interface Category{ 
  name_eng: string; 
  name_guj :string;
}

export interface PackingType { 
   type_eng: string 
   type_guj : string;
}

export interface Name{
  gujaratiname: string;
  englishname : string;
}

export interface ProductDetails {
    added_at: string;
    avl_qty: number;
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
    packaging: number;
    packagingtype: PackingType;
    price: number;
    product_pics: [];
    rating: any;
    s_gst: number;
    tech_name: TechName;
    _id: string;
}

export interface Product {
   added_at: string;
    avl_qty: number;
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
    packaging: number;
    packagingtype: PackingType;
    price: number;
    product_pics: [];
    rating: any;
    s_gst: number;
    tech_name: TechName;
    _id: string;
}

export interface CartItemProps {
  image: string;
  title: string;
  price: number;
  quantity: number;
  product_pics: string[];
  // onDelete: () => void;
  // onIncrement: () => void;
  // onDecrement: () => void;
}