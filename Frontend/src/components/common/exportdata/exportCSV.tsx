import React, { FC, useState, useEffect } from "react";
import {  Dropdown } from "flowbite-react";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import moment from "moment";
interface IExportDataModalProps {
  data: any;
  name: string;
  endpoint?: string;
  status?:string;
  startDate?:string | null;
  endDate?:string | null;
}

interface Payload {
  page?: number;
  limit?: number;
}

const ExportDataModal: FC<IExportDataModalProps> = ({
  data,
  name,
  status,
  startDate,
  endDate,
  ...rest
}) => {
  const [download, setDownload] = useState<string>("");

  const exportdata: any = data;
  console.log("exportdata", exportdata);
  

  const formatDataModuleWise=(exportData:any,name:string)=>{
    let arr:any=[];
    if(name === "advisor"){
      exportData.map((data:any)=>{
        arr.push({
          "Name":(data && data?.name)?data?.name:'N/A',
          "Email":(data && data?.email) ? data?.email:'N/A',
          "Gender":(data && data?.gender) ? data?.gender:'N/A',
          "Mobile No":(data && data?.mobile_no) ? data?.mobile_no:'N/A',
          "Role":(data && data?.role?.role_title) ? data?.role?.role_title:'N/A',
          "Date of joining":(data && data?.date_of_joining) ? data?.date_of_joining:'N/A',
          "Date of birth":(data && data?.date_of_birth) ? data?.date_of_birth:'N/A',
          "Address": (data && data?.address ) ? data?.address : 'N/A',
          "Emergency contact person":(data && data?.emergency_contact_person) ? data?.emergency_contact_person : 'N/A',
          "Emergency mobile": (data && data?.emergency_mobile_no) ? data?.emergency_mobile_no : 'N/A',
          "Addhar card": (data && data?.aadhar_card) ? data?.aadhar_card == true ?  "Yes" : "No" : 'N/A',
          "Pan card": (data && data?.pan_card) ? data?.pan_card == true ?  "Yes" : "No" : 'N/A',
          "Bank Passbook": (data && data?.bank_passbook) ? data?.bank_passbook == true ?  "Yes" : "No" : 'N/A',
          "Status":(data && data?.is_active) ? data?.is_active == true ? "Active" : "Deactive" :'N/A',
          "Created Date":(data && data?.added_at) ?  moment(data?.added_at).format("DD-MM-YYYY") : 'N/A',
        })
      })
    } else if(name=="farmer"){
        exportData.map((data:any)=>{
          arr.push({
            "Name":(data && data?.firstname)? [data.firstname, data.middlename, data.lastname].filter(Boolean).join(' ') : 'N/A',
            "Mobile":(data && data?.mobile_number) ? data?.mobile_number : 'N/A',
            "Alternate mobile":(data && data?.alternate_number) ? data?.alternate_number : 'N/A',
            "Crop":(data && data?.crops) ? data.crops.map((crop:any) => crop.name_eng).join(', ') : 'N/A',
            "Address":(data && data?.address) ? data?.address : 'N/A',
            "District":(data && data?.district_name) ? data?.district_name : 'N/A',
            "Taluka":(data && data?.taluka_name) ? data?.taluka_name : 'N/A',
            "Village":(data && data?.village_name) ? data?.village_name : 'N/A',
            "Pincode":(data && data?.pincode) ? data?.pincode : 'N/A',
            "Postoffice":(data && data?.post_office) ? data?.post_office : 'N/A',
            "Land area":(data && data?.land_area)?data?.land_area : 'N/A',
            "Land type":(data && data?.land_type)?data?.land_type : 'N/A',
            "Irrigation source":(data && data?.irrigation_source) ? data?.irrigation_source : 'N/A',
            "Irrigation type":(data && data?.irrigation_type) ? data?.irrigation_type : 'N/A',
            "Heard about agribharat":(data && data?.heard_about_agribharat) ? data?.heard_about_agribharat : 'N/A',
            "Refrence":(data && data?.ref_name) ? data?.ref_name : 'N/A',
            "Created Date":(data && data?.added_at) ? moment(data?.added_at).format("DD-MM-YYYY") : 'N/A',
            "Created by":(data && data?.created_by?.name) ? data?.created_by?.name:'N/A',
          })
        })
    } else if(name=="lead"){
        exportData.map((data:any)=>{
          arr.push({
            "Title":(data && data?.title)?data?.title:'N/A',
            "Status":(data && data?.status) ? data?.status:'N/A',
            "Created at":(data && data?.created_at) ? data?.created_at:'N/A',
          })
        })
    } else if(name=="order"){
        exportData.map((data:any)=>{
          arr.push({
            "Order id":(data && data?.order_id)? data?.order_id : 'N/A',
            "Farmer name":(data && data?.customer?.customer_name) ? data?.customer?.customer_name : 'N/A',
            "Address":(data && data?.customer?.address) ? data?.customer?.address : 'N/A',
            "District":(data && data?.customer?.district_name) ? data?.customer?.district_name : 'N/A',
            "Taluka":(data && data?.customer?.taluka_name) ? data?.customer?.taluka_name : 'N/A',
            "Village":(data && data?.customer?.village_name) ? data?.customer?.village_name : 'N/A',
            "Pincode":(data && data?.customer?.pincode) ? data?.customer?.pincode : 'N/A',
            "Post office":(data && data?.customer?.post_office) ? data?.customer?.post_office : 'N/A',
            "Mobile":(data && data?.customer?.mobile_number) ? data?.customer?.mobile_number : 'N/A',
            "Alternate Mobile":(data && data?.customer?.alternate_number) ? data?.customer?.alternate_number : 'N/A',
            "Products / Packing / Quantity":(data &&  data?.products?.length) ?  
            data.products
                .map((p:any) => {
                  const name = p?.id?.name?.englishname || '';
                  const pack = p?.id?.packaging || '';
                  const packType = p?.id?.packagingtype?.type_eng || '';
                  return `${name} (${pack} ${packType})`;
                })
                .join(', ') 
            : 'N/A',
            "Coupon code":(data && data?.coupon?.name) ? data?.coupon?.name : 'N/A',
            "Discount amount":(data && data?.coupon?.amount) ? data?.coupon?.amount : 'N/A',
            "Final  amount ":(data && data?.total_amount) ? data?.total_amount : 'N/A',
            "Advisor Name":(data && data?.advisor_name?.name) ? data?.advisor_name?.name : 'N/A',
            "Status":(data && data?.status) ? data?.status : 'N/A',
            "Order date":(data && data?.added_at) ?  moment(data?.added_at).format("DD-MM-YYYY") : 'N/A',

          })
        })
    } 
    return arr;
  }
  
  useEffect(() => {
    if (exportdata?.length && Array.isArray(exportdata)) {
      if (download === "csv") {
        const data= formatDataModuleWise(exportdata,name)
        const csv = Papa.unparse(data); // Use Redux data directly
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, `${name}.csv`);
      } else if (download === "excel") {
        const data= formatDataModuleWise(exportdata,name)
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "advisor");
        XLSX.writeFile(workbook, `${name}.xlsx`);
      }
      setDownload(""); 
    }
  }, [exportdata, download]); 

  const fetchData = async (method = "") => {
    setDownload(method); // Set the download type
  };

  return (
    <>
        <Dropdown inline label="Export">
          <Dropdown.Item onClick={() => fetchData("csv")}>Export CSV</Dropdown.Item>
          <Dropdown.Item onClick={() => fetchData("excel")}>Export Excel</Dropdown.Item>  
        </Dropdown>
    </>
  );
};

export default ExportDataModal;
