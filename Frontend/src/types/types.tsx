export interface ButtonProps {
    className?: string;
    name: string;
    handleClick?: () => void;
    disabled?: boolean;
}

export interface ProfileInfo{
    crops: [];
    is_deleted:  boolean;
    _id: string;
    customer_name : string; 
    firstname : string;
    middlename :string;
    lastname : string;
    mobile_number:  number;
    land_area: number | string;
    land_type: string;
    irrigation_source: string;
    irrigation_type:  string;
    heard_about_agribharat:  string;
    address: string;
    district:  string;
    district_name:  string;
    taluka:  string;
    taluka_name:  string;
    village:  string;
    village_name:  string;
    pincode:  number;
    post_office : string;
    created_by:  string;
    __v: number;
    alternate_number: number;
    added_at:  string;
    smart_phone: boolean;
    ref_name: number | string;
    state : { name: string;  _id:string }
  }