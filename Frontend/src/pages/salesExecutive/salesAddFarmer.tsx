import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Label, Button } from "flowbite-react";
import { FaUser, FaWindowClose } from 'react-icons/fa';
import { Form, Input, FormFeedback } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { toast } from 'react-toastify';
import { AddCustomerDatalist, CheckCustomerExist, getCroplist, getdistrictdata, getstatedatalist, gettalukadata, getvillagedata, ResetCustomerDatalist, UpdateCustomerDatalist } from '../../Store/actions';
import Cookies from 'js-cookie';
import {ProfileInfo} from "../../types/types"

interface ProfileData{
  isEditFarmer ?: boolean;
  setFarmerAdded : (value: boolean) => void;
  CloseAddmodal: (value: any) => void;
  handleAccept : (value: boolean) => void;
  Mobile_number ?: string;
}

const SalesAddFarmer: FC<ProfileData> = ({setFarmerAdded, isEditFarmer, handleAccept, Mobile_number, CloseAddmodal}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<ProfileInfo | null>()
  useEffect(() => {
    const customerDataString = Cookies.get("customer_data");
    if (customerDataString && customerDataString !== "undefined") {
      try {
        const customerData = JSON.parse(customerDataString);
        setData(customerData ? customerData : null);
      } catch (error) {
        console.error("Failed to parse customer_data:", error);
        setData(null);
      }
    }else{
      setData(null);
    }
  }, []);
  
  useEffect(() => { 
    if(data){
      setinitialValues((prev :any) => ({
        ...prev,
        firstname : data?.firstname ?? "",
        middlename : data?.middlename ?? "",
        lastname : data?.lastname ?? "",
        mobile_number: data?.mobile_number ?? "",
        alternate_number : String(data?.alternate_number ?? ""),
        address : data?.address ?? "",
        land_area : String(data?.land_area ?? ""),
        pincode : String(data?.pincode ?? ""),
        post_office: String(data?.post_office ?? ""),
        ref_name : data?.ref_name ?? "",
      }));
      // setSelectedRefnumber(data?.ref_name)

     if (Array.isArray(data?.crops)) {
      const cropOptions = data.crops.map((crop: any) => ({
        label: crop.name_eng,
        value: crop._id
      }));
      setSelectedcropOption(cropOptions);
      setSelectedcropid(data.crops.map((crop: any) => crop._id));
    }
    
      setSelectedStateOption({label : data?.state?.name, value : data?.state?._id })
      setSelectedStateid(data?.state?._id)

      setSelectedDistrictOption({ label : data?.district_name, value :data?.district })
      setSelectedDistrictid(data?.district)

      setSelectedTalukaOption({ label : data?.taluka_name, value :data?.taluka })
      setSelectedTalukaid(data?.taluka)

      setSelectedVillageOption({ label : data?.village_name, value :data?.village })
      setSelectedVillageid(data?.village)

      // Header About
      const matchedaboutOption = HeardAboutOprions.find(opt => opt.value === data.heard_about_agribharat);
      if (matchedaboutOption) {
        setSelectedheaderaboutOption(matchedaboutOption);
        setSelectedheaderaboutid(matchedaboutOption.value);
      }

      // Land Type
      const matchedOption = LandTypeOptions.find(opt => opt.value === data.land_type);
      if (matchedOption) {
        setSelectedlandtypeOption(matchedOption);
        setSelectedlandtypeid(matchedOption.value);
      }

      // Itrrigation Type
      const matchedItrrigationTypeOption = IrrigationTypeOptions.find(opt => opt.value === data.irrigation_type);
      if (matchedItrrigationTypeOption) {
        setSelectedirrigationtypeOption(matchedItrrigationTypeOption);
        setSelectedirrigationtypeid(matchedItrrigationTypeOption.value);
      }

      // Itrrigation Source
      const matchedSourceOption = IrrigationSourceOptions.find(opt => opt.value === data.irrigation_source);
      if (matchedSourceOption) {
        setSelectedirrigationsourceOption(matchedSourceOption);
        setSelectedirrigationsourceid(matchedSourceOption.value);
      }
    }
    }, [data]);

  // ------------- State Get Data From Reducer Code Start --------------
  const hasStateFetchedRef = useRef(false);

  const handleStateLoad = () => {
    if (!hasStateFetchedRef.current) {
      dispatch(getstatedatalist())
      hasStateFetchedRef.current = true;
    }
  };

  const stateoption = useSelector((state: any) => state.Location.Statedatalist?.data)?.map( (item: any) => ({ label: item.name, value: item._id }));
  const districtoption = useSelector((state: any) => state.Location.Districtdatalist?.data)?.map((item: any) => ({ label: item.name, value: item._id  }));
  const talukaoption = useSelector((state: any) => state.Location.Talukadatalist?.data)?.map( (item: any) => ({ label: item.name, value: item._id}));
  const villageoption = useSelector((state: any) => state.Location.Villagedatalist?.data)?.map( (item: any) => ({  label: item.name, value: item._id }) );
    const [selectedStateOption, setSelectedStateOption] = useState<{ label: string, value: string } | null>(null);
    const [selectedStateid, setSelectedStateid] = useState<string | null>(null);
    const [validateState, setValidateState] = useState(0);

    const IsStatedata = (data: any) => {
      if (!data) {
        setSelectedStateid("");
        setSelectedStateOption(null);
        setValidateState(1)
        setSelectedDistrictid("");
        setSelectedDistrictOption(null);
        setValidateDistrict(1)
        setSelectedTalukaid("");
        setSelectedTalukaOption(null);
        setValidateTaluka(1);
        setSelectedVillageid("");
        setSelectedVillageOption(null);
        setValidateVaillage(1)
      } else {
        setSelectedStateid(data.value);
        setSelectedStateOption(data);
        setValidateState(0);
        setSelectedDistrictid("");
        setSelectedDistrictOption(null);
        setValidateDistrict(1)
        setSelectedTalukaid("");
        setSelectedTalukaOption(null);
        setValidateTaluka(1);
        setSelectedVillageid("");
        setSelectedVillageOption(null);
        setValidateVaillage(1)
      }
    };
  //  ------------- State Get Data From Reducer Code end --------------

  // ------------- District Get Data From Reducer Code Start --------------
  useEffect(() =>{
    if(selectedStateid){
      let requser ={  stateId: selectedStateid }
      dispatch(getdistrictdata(requser))
    }
  },[selectedStateid])
  
    const [selectedDistrictOption, setSelectedDistrictOption] = useState<{ label: string, value: string } | null>(null);
    const [selectedDistrictid, setSelectedDistrictid] = useState<string | null>(null);
    const [validateDistrict, setValidateDistrict] = useState(0);

    const IsDistrictdata = (data: any) => {
      if (!data) {
        setSelectedDistrictid("");
        setSelectedDistrictOption(null);
        setValidateDistrict(1)
        setSelectedTalukaid("");
        setSelectedTalukaOption(null);
        setValidateTaluka(1);
        setSelectedVillageid("");
        setSelectedVillageOption(null);
        setValidateVaillage(1)
      } else {
        setSelectedDistrictid(data.value);
        setSelectedDistrictOption(data);
        setValidateDistrict(0)
        setSelectedTalukaid("");
        setSelectedTalukaOption(null);
        setValidateTaluka(1);
        setSelectedVillageid("");
        setSelectedVillageOption(null);
        setValidateVaillage(1)
      }
    };
  //  ------------- District Get Data From Reducer Code end --------------

  // ------------- Taluka Get Data From Reducer Code Start --------------
  useEffect(() =>{
    if(selectedDistrictid){
    let requser ={ stateId: selectedStateid ,  districtId: selectedDistrictid }
    dispatch(gettalukadata(requser))
    }
  },[selectedDistrictid])

    const [selectedTalukaOption, setSelectedTalukaOption] = useState<{ label: string, value: string } | null>(null);
    const [selectedTalukaid, setSelectedTalukaid] = useState<string | null>(null);
    const [validateTaluka, setValidateTaluka] = useState(0);
  
    const IsTalukadata = (data: any) => {
      if (!data) {
        setSelectedTalukaid("");
        setSelectedTalukaOption(null);
        setValidateTaluka(1)
        setSelectedVillageid("");
        setSelectedVillageOption(null);
        setValidateVaillage(1)
      } else {
        setSelectedTalukaid(data.value);
        setSelectedTalukaOption(data);
        setValidateTaluka(0)
        setSelectedVillageid("");
        setSelectedVillageOption(null);
        setValidateVaillage(1)
      }
    };
  //  ------------- Taluka Get Data From Reducer Code end --------------
  
  // ------------- Village Get Data From Reducer Code Start --------------
  useEffect(() =>{
    if(selectedTalukaid){
      let requser ={ stateId: selectedStateid ,  districtId: selectedDistrictid,  talukaId: selectedTalukaid }
      dispatch(getvillagedata(requser))
    }
  },[selectedTalukaid]) 
  
    const [selectedVillageOption, setSelectedVillageOption] = useState<{ label: string, value: string } | null>(null);
    const [selectedVillageid, setSelectedVillageid] = useState<string | null>(null);
    const [validateVaillage, setValidateVaillage] = useState(0);
  
    const IsVillagedata = (data: any) => {
      if (!data) {
        setSelectedVillageid("");
        setSelectedVillageOption(null);
        setValidateVaillage(1)
      } else {
        setSelectedVillageid(data.value);
        setSelectedVillageOption(data);
        setValidateVaillage(0)
      }
    };
  //  ------------- Village Get Data From Reducer Code end --------------
  
  const [initialValues, setinitialValues] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    mobile_number: 0,
    address:"",
    alternate_number: "",
    state : "",
    district : "",
    taluka : "",
    village : "",
    pincode : "",
    post_office : "",
    land_area : "",
    land_type : "",
    irrigation_source : "",
    irrigation_type : "",
    smart_phone : "",
    crop : [],
    heard_about : "",
    ref_name : ""
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,

    validationSchema: Yup.object({
      firstname: Yup.string().required("Please enter first name").matches(/^[A-Za-z\s]+$/, "Please Enter valid name"),
      lastname: Yup.string().required("Please enter last name").matches(/^[A-Za-z\s]+$/, "Please Enter valid name"),
      address: Yup.string().required("Please enter address"),
      pincode: Yup.string().required("Please enter pincode").min(6, "Pincode must be minimum 6 digits") .max(6, "Pincode must be maximum 6 digits").matches(/^\d+$/, "Please enter valid pincode"),
      post_office: Yup.string().required("Please enter post office"),
      land_area: Yup.number().required("Please enter land area") .typeError("Please enter valid land area").min(0, "Please enter valid land area"),
      alternate_number: Yup.string().trim().test('is-empty-or-10-digit', 'Alternate number must be 10 digit mobile number',  value => { return !value || (/^\d{10}$/.test(value));}),
      ref_name: Yup.string().trim().test('is-empty-or-10-digit', 'Refrence number must be 10 digit mobile number',  value => { return !value || (/^\d{10}$/.test(value));}),
    }),

    onSubmit: (values) => {
      if (!selectedheaderaboutid) return setValidateheaderabout(1) 
        if (!selectedirrigationtypeid) return setValidateirrigationtype(1) 
        if (!selectedirrigationsourceid) return setValidateirrigationsource(1)
        if (!selectedlandtypeid) return setValidatelandtype(1)
        if (!selectedVillageid) return setValidateVaillage(1)
        if (!selectedTalukaid) return setValidateTaluka(1)
        if (!selectedDistrictid) return setValidateDistrict(1)
        if (!selectedStateid) return setValidateState(1)
        if (selectedcropid.length === 0) return setValidatecrop(1);
      let requserData :any = {
        firstname: values?.firstname.trim().charAt(0).toUpperCase() + values?.firstname.trim().slice(1).toLowerCase(),
        middlename: values?.middlename.trim().charAt(0).toUpperCase() + values?.middlename.trim().slice(1).toLowerCase(),
        lastname: values?.lastname.trim().charAt(0).toUpperCase() + values?.lastname.trim().slice(1).toLowerCase(),
        alternate_number: values?.alternate_number,
        address: values?.address,
        state : selectedStateid,
        district : selectedDistrictid,
        taluka : selectedTalukaid,
        village : selectedVillageid,
        pincode : values?.pincode.trim(),
        post_office : values?.post_office.trim(),
        land_area : values?.land_area,
        land_type : selectedlandtypeid,
        irrigation_source : selectedirrigationsourceid,
        irrigation_type : selectedirrigationtypeid,
        heard_about_agribharat : selectedheaderaboutid,
        smart_phone: true,
        crops:selectedcropid,
        ref_name : values?.ref_name
      }

      if(isEditFarmer){
        requserData.id = data?._id;
        dispatch(UpdateCustomerDatalist(requserData));
      }else{
        requserData.mobile_number =   Mobile_number?.trim(),
        dispatch(AddCustomerDatalist(requserData));
      }
    },
  });

  // -------------- Header about code start ---------
  const HeardAboutOprions = useMemo(() => [
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
  ], []);

  const [selectedheaderaboutOption, setSelectedheaderaboutOption] = useState<{ label: string, value: string } | null>(null);
  const [selectedheaderaboutid, setSelectedheaderaboutid] = useState<string | null>(null);
  const [validateheaderabout, setValidateheaderabout] = useState(0);

  const Isheardaboutdata = (data: any) => {
    if (!data) {
      setSelectedheaderaboutid("");
      setSelectedheaderaboutOption(null);
      setValidateheaderabout(1)
    } else {
      setSelectedheaderaboutid(data.value);
      setSelectedheaderaboutOption(data);
      setValidateheaderabout(0)
    }
  };
  // -------------- Header about code end ---------

  // --------------Crop code start ---------  
  const hasFetchedRef = useRef(false); // to persist across renders

  const CropOprions = useSelector((state: any) => state.Crop.Cropdatalist)?.map((item: any) => ({ label: item.name_eng, value: item._id }));
  const handleCropLoad = () => {
    if (!hasFetchedRef.current) {
      dispatch(getCroplist({all:"true"}));
      hasFetchedRef.current = true;
    }
  };

  const [selectedcropOption, setSelectedcropOption] = useState<{ label: string, value: string }[] | []>([]);
  const [selectedcropid, setSelectedcropid] = useState<string | string[]>([]);
  const [validatecrop, setValidatecrop] = useState(0);

  const Iscropdata = (data: any) => {
    if (!data) {
      setSelectedcropid([]);
      setSelectedcropOption([]);
      setValidatecrop(1)
    } else {
      const selectedIds = data.map((item: any) => item.value);
      setSelectedcropid(selectedIds);
      setSelectedcropOption(data);
      setValidatecrop(0)
    }
  };

  // --------------Crop code end ---------

  // -------------- Irrigation source code start ---------
  const IrrigationSourceOptions= [
    { label :"Well", value : "well"},
    { label :"Borwell", value : "borwell"},
    { label :"Canal", value : "canal"},
    { label :"Other", value : "other"},
    { label :"No source", value : "no source"},
  ]

  const [selectedirrigationsourceOption, setSelectedirrigationsourceOption] = useState<{ label: string, value: string } | null>(null);
  const [selectedirrigationsourceid, setSelectedirrigationsourceid] = useState<string | null>(null);
  const [validateirrigationsource, setValidateirrigationsource] = useState(0);

  const Isirrigationsourcedata = (data: any) => {
    if (!data) {
      setSelectedirrigationsourceid("");
      setSelectedirrigationsourceOption(null);
      setValidateirrigationsource(1)
    } else {
      setSelectedirrigationsourceid(data.value);
      setSelectedirrigationsourceOption(data);
      setValidateirrigationsource(0)
    }
  };
  // -------------- Irrigation source code end ---------

  // -------------- Irrigation type code start ---------
  const IrrigationTypeOptions= [
    { label :"Drip", value : "drip"},
    { label :"Sprinkler", value : "sprinkler"},
    { label :"Flood", value : "flood"},
  ]

  const [selectedirrigationtypeOption, setSelectedirrigationtypeOption] = useState<{ label: string, value: string } | null>(null);
  const [selectedirrigationtypeid, setSelectedirrigationtypeid] = useState<string | null>(null);
  const [validateirrigationtype, setValidateirrigationtype] = useState(0);
  
  const Isirrigationtypedata = (data: any) => {
    if (!data) {
      setSelectedirrigationtypeid("");
      setSelectedirrigationtypeOption(null);
      setValidateirrigationtype(1)
    } else {
      setSelectedirrigationtypeid(data.value);
      setSelectedirrigationtypeOption(data);
      setValidateirrigationtype(0)
    }
  };
  // -------------- Irrigation type code end ---------

  // -------------- Land type code start ---------
  const LandTypeOptions= [
    { label :"Acre", value : "acre"},
    { label :"Bigha", value : "bigha"},
    { label :"Hacter", value : "hacter"},
  ]

  const [selectedlandtypeOption, setSelectedlandtypeOption] = useState<{ label: string, value: string } | null>(null);
  const [selectedlandtypeid, setSelectedlandtypeid] = useState<string | null>(null);
  const [validatelandtype, setValidatelandtype] = useState(0);
  
  const Islandypedata = (data: any) => {
    if (!data) {
      setSelectedlandtypeid("");
      setSelectedlandtypeOption(null);
      setValidatelandtype(1)
    } else {
      setSelectedlandtypeid(data.value);
      setSelectedlandtypeOption(data);
      setValidatelandtype(0)
    }
  };
  // -------------- Land type code end ---------

  // -------------- Ref name code start ---------------
  const [selectedRefnumber, setSelectedRefnumber] = useState<string | number>("");
  const [selectedRef_id, setSelectedRef_id] = useState<string>("");
  const handlePhoneNumberChange  =(data:string) => {
    setSelectedRefnumber(data);
  };

  // useEffect(() =>{
  //   if(selectedRefnumber.length === 10){
  //       let requser={   number : selectedRefnumber  }
  //       dispatch(CheckCustomerExist(requser))
  //   }
  // },[selectedRefnumber])

  // const CheckCustomerExistlist = useSelector((state: any) => state.Customer.CheckCustomerExistlist);
  //   useEffect(() => {
  //     if (selectedRefnumber && CheckCustomerExistlist?.success == true) {
  //       setSelectedRef_id(CheckCustomerExistlist?.data?._id);
  //     }
  //     else if (selectedRefnumber && CheckCustomerExistlist?.success == false) {
  //      toast.error(CheckCustomerExistlist?.msg);
  //      setSelectedRef_id("")
  //     }
  //   }, [CheckCustomerExistlist, selectedRefnumber]);
  // -------------- Ref name code end ---------------

  const CloseCall = () =>{
    if(isEditFarmer == true){
      setFarmerAdded(false)
    }
    else{
      handleAccept(false)
    }
  }

  // ------------- Get  Data From Reducer Code Start --------------
    const  AddCustomerlist = useSelector((state: any) => state.Customer.AddCustomerlist)
    const  UpdateCustomerlist = useSelector((state: any) => state.Customer.UpdateCustomerlist)

    useEffect(() =>{  
      if(AddCustomerlist?.success == true || UpdateCustomerlist?.success  == true){
        try {
          if(UpdateCustomerlist?.success){
              toast.success(UpdateCustomerlist?.msg || "Customer updated successfully");
              CloseAddmodal(false);
              setFarmerAdded(false);
          }else if(AddCustomerlist.success){
            toast.success(AddCustomerlist?.msg || "Customer added successfully");
            CloseAddmodal(false);
            setFarmerAdded(false);
          }
        } catch (error) {
          toast.error(String(error));
        }finally{
          validation.resetForm();
          CloseAddmodal(false);
          setFarmerAdded(false)
          dispatch(ResetCustomerDatalist())
        }
      }
    },[AddCustomerlist, UpdateCustomerlist])
  //  ------------- Get  Data From Reducer Code end --------------

  return (
   <div className='mt-[2rem]'>
      <div className='flex justify-between'>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> {isEditFarmer == true ? "Update Farmer"  : "Add Farmer" }  </div>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100 flex self-center cursor-pointer " onClick={() => CloseCall()}> <FaWindowClose /> </div>
      </div>

      <Form onSubmit={(e) => {  
        e.preventDefault(); 
        validation.handleSubmit(); 
        if (!selectedheaderaboutOption) setValidateheaderabout(1) 
        if (!selectedirrigationtypeOption) setValidateirrigationtype(1) 
        if (!selectedirrigationsourceOption) setValidateirrigationsource(1)
        if (selectedcropid.length == 0) return setValidatecrop(1)
        if (!selectedlandtypeOption) setValidatelandtype(1)
        if (!selectedVillageOption) setValidateVaillage(1)
        if (!selectedTalukaOption) setValidateTaluka(1)
        if (!selectedDistrictOption) setValidateDistrict(1)
        if (!selectedStateOption) setValidateState(1)
      }} >
        <div className="dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-500 space-y-3  md:grid grid-cols-3 gap-[1rem]">
          <div className='mt-3'>
            <Label htmlFor="Name"> First Name <span className='text-red-500'>*</span> </Label>
            <div className="mt-1">
              <Input
                id="firstname"
                name="firstname"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter firstname"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.firstname.trim()|| ""}
                invalid={validation.touched?.firstname && validation.errors?.firstname ? true : false}
              />
              {validation.touched.firstname && validation.errors?.firstname ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.firstname} </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="middlename"> Middle Name </Label>
            <div className="mt-1">
              <Input
                id="middlename"
                name="middlename"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter middlename"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.middlename.trim()|| ""}
                invalid={validation.touched?.middlename && validation.errors?.middlename ? true : false}
              />
              {validation.touched.middlename && validation.errors?.middlename ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.middlename} </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="lastname"> Last Name <span className='text-red-500'>*</span></Label>
            <div className="mt-1">
              <Input
                id="lastname"
                name="lastname"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter lastname"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.lastname.trim()|| ""}
                invalid={validation.touched?.lastname && validation.errors?.lastname ? true : false}
              />
              {validation.touched.lastname && validation.errors?.lastname ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.lastname} </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="Name"> Mobile No <span className='text-red-500'>*</span></Label>
            <div className="mt-1">
              <Input
                id="mobile_number"
                name="mobile_number"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter mobile"
                type="tel"
                value={Mobile_number|| validation.values.mobile_number}
                disabled
              />
              {validation.touched?.mobile_number && validation.errors?.mobile_number ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.mobile_number} </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="alternate_number"> Alternate Mobile No  </Label>
            <div className="mt-1">
              <Input
                id="alternate_number"
                name="alternate_number"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter alternate mobile no"
                type="number"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.alternate_number}
                invalid={validation.touched?.alternate_number && validation.errors?.alternate_number ? true : false}
              />
              {validation.touched.alternate_number && validation.errors?.alternate_number ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.alternate_number} </FormFeedback>) : null}
            </div>
          </div>

           <div>
            <Label htmlFor="crops"> Crops <span className='text-red-500'>*</span></Label>
            <div className="mt-1" onClick={ () => handleCropLoad ()} >
              <Select
                className="w-full dark:text-white"
                classNames={{
                  control: () => "react-select__control",
                  singleValue: () => "react-select__single-value",
                  menu: () => "react-select__menu",
                  option: ({ isSelected }) =>
                    isSelected ? "react-select__option--is-selected" : "react-select__option",
                  placeholder: () => "react-select__placeholder",
                }}
                value={selectedcropOption}
                onChange={(e) => { Iscropdata(e) }}
                options={CropOprions}
                isClearable={true}
                isMulti={true}
              />
              {validatecrop == 1 ? (<FormFeedback type="invalid" className="text-red-500 text-sm"> Please select crop </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="address"> Address <span className='text-red-500'>*</span></Label>
            <div className="mt-1">
              <Input
                id="address"
                name="address"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter address"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.address || ""}
                invalid={validation.touched?.address && validation.errors?.address ? true : false}
              />
              {validation.touched.address && validation.errors?.address ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.address} </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="Status"> State <span className='text-red-500'>*</span></Label>
            <div className="mt-1" onClick={ () => handleStateLoad ()}>
              <Select
                className="w-full dark:text-white"
                classNames={{
                  control: () => "react-select__control",
                  singleValue: () => "react-select__single-value",
                  menu: () => "react-select__menu",
                  option: ({ isSelected }) =>
                    isSelected ? "react-select__option--is-selected" : "react-select__option",
                  placeholder: () => "react-select__placeholder",
                }}
                value={selectedStateOption}
                onChange={(e) => { IsStatedata(e) }}
                options={stateoption}
                isClearable={true}
              />
              {validateState == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select state </FormFeedback> ) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="district"> District <span className='text-red-500'>*</span></Label>
            <div className="mt-1">
              <Select
                className="w-full dark:text-white"
                classNames={{
                  control: () => "react-select__control",
                  singleValue: () => "react-select__single-value",
                  menu: () => "react-select__menu",
                  option: ({ isSelected }) =>
                    isSelected ? "react-select__option--is-selected" : "react-select__option",
                  placeholder: () => "react-select__placeholder",
                }}
                value={selectedDistrictOption}
                onChange={(e) => { IsDistrictdata(e) }}
                options={districtoption}
                isClearable={true}
              />
              {validateDistrict == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select district </FormFeedback> ) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="taluka"> Taluka <span className='text-red-500'>*</span></Label>
            <div className="mt-1">
              <Select
                className="w-full dark:text-white"
                classNames={{
                  control: () => "react-select__control",
                  singleValue: () => "react-select__single-value",
                  menu: () => "react-select__menu",
                  option: ({ isSelected }) =>
                    isSelected ? "react-select__option--is-selected" : "react-select__option",
                  placeholder: () => "react-select__placeholder",
                }}
                value={selectedTalukaOption}
                onChange={(e) => { IsTalukadata(e) }}
                options={talukaoption}
                isClearable={true}
              />
              {validateTaluka == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select taluka </FormFeedback> ) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="village"> Village <span className='text-red-500'>*</span></Label>
            <div className="mt-1">
              <Select
                className="w-full dark:text-white"
                classNames={{
                  control: () => "react-select__control",
                  singleValue: () => "react-select__single-value",
                  menu: () => "react-select__menu",
                  option: ({ isSelected }) =>
                    isSelected ? "react-select__option--is-selected" : "react-select__option",
                  placeholder: () => "react-select__placeholder",
                }}
                value={selectedVillageOption}
                onChange={(e) => { IsVillagedata(e) }}
                options={villageoption}
                isClearable={true}
              />
              {validateVaillage == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select village </FormFeedback> ) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="pincode"> Pincode <span className='text-red-500'>*</span></Label>
            <div className="mt-1">
              <Input
                id="pincode"
                name="pincode"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter pincode"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.pincode.trim()|| ""}
                invalid={validation.touched?.pincode && validation.errors?.pincode ? true : false}
              />
              {validation.touched.pincode && validation.errors?.pincode ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.pincode} </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="post_office"> Post Office <span className='text-red-500'>*</span></Label>
            <div className="mt-1">
              <Input
                id="post_office"
                name="post_office"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter post office"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.post_office || ""}
                invalid={validation.touched?.post_office && validation.errors?.post_office ? true : false}
              />
              {validation.touched.post_office && validation.errors?.post_office ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.post_office} </FormFeedback>) : null}
            </div>
          </div>

          <div className='flex gap-x-3'>
            <div className='flex-1'>
              <Label htmlFor="land_area"> Land Area <span className='text-red-500'>*</span></Label>
              <div className="mt-1">
                <Input
                  id="land_area"
                  name="land_area"
                  className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                  placeholder="Enter land area"
                  type="number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values?.land_area|| ""}
                  invalid={validation.touched?.land_area && validation.errors?.land_area ? true : false}
                />
                {validation.touched.land_area && validation.errors?.land_area ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.land_area} </FormFeedback>) : null}
              </div>
            </div>

            <div className='flex-1'>
              <Label htmlFor="land_type"> Land Type <span className='text-red-500'>*</span></Label>
              <div className="mt-1">
                <Select
                  className="w-full dark:text-white"
                  classNames={{
                    control: () => "react-select__control",
                    singleValue: () => "react-select__single-value",
                    menu: () => "react-select__menu",
                    option: ({ isSelected }) =>
                      isSelected ? "react-select__option--is-selected" : "react-select__option",
                    placeholder: () => "react-select__placeholder",
                  }}
                  value={selectedlandtypeOption}
                  onChange={(e) => { Islandypedata(e) }}
                  options={LandTypeOptions}
                  isClearable={true}
                />
                {validatelandtype == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select land type </FormFeedback> ) : null}
              </div>
            </div>
          </div>
        
          <div>
            <Label htmlFor="landarea"> Irrigation Source <span className='text-red-500'>*</span></Label>
            <div className="mt-1">
              <Select
                className="w-full dark:text-white"
                classNames={{
                  control: () => "react-select__control",
                  singleValue: () => "react-select__single-value",
                  menu: () => "react-select__menu",
                  option: ({ isSelected }) =>
                    isSelected ? "react-select__option--is-selected" : "react-select__option",
                  placeholder: () => "react-select__placeholder",
                }}
                value={selectedirrigationsourceOption}
                onChange={(e) => { Isirrigationsourcedata(e) }}
                options={IrrigationSourceOptions}
                isClearable={true}
              />
              {validateirrigationsource == 1 ? (<FormFeedback type="invalid" className="text-Red text-sm"> Please select Irrigation source </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="irrigation_type"> Irrigation Type <span className='text-red-500'>*</span></Label>
            <div className="mt-1">
              <Select
                className="w-full dark:text-white"
                classNames={{
                  control: () => "react-select__control",
                  singleValue: () => "react-select__single-value",
                  menu: () => "react-select__menu",
                  option: ({ isSelected }) =>
                    isSelected ? "react-select__option--is-selected" : "react-select__option",
                  placeholder: () => "react-select__placeholder",
                }}
                value={selectedirrigationtypeOption}
                onChange={(e) => { Isirrigationtypedata(e) }}
                options={IrrigationTypeOptions}
                isClearable={true}
              />
              {validateirrigationtype == 1 ? (<FormFeedback type="invalid" className="text-Red text-sm"> Please select Irrigation type </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="heard_aboutus"> Heard About us <span className='text-red-500'>*</span></Label>
            <div className="mt-1">
              <Select
                className="w-full dark:text-white"
                classNames={{
                  control: () => "react-select__control",
                  singleValue: () => "react-select__single-value",
                  menu: () => "react-select__menu",
                  option: ({ isSelected }) =>
                    isSelected ? "react-select__option--is-selected" : "react-select__option",
                  placeholder: () => "react-select__placeholder",
                }}
                value={selectedheaderaboutOption}
                onChange={(e) => { Isheardaboutdata(e) }}
                options={HeardAboutOprions}
                isClearable={true}
              />
              {validateheaderabout == 1 ? (<FormFeedback type="invalid" className="text-Red text-sm"> Please select Heard Aboutus </FormFeedback>) : null}
            </div>
          </div>

         

          <div>
            <Label htmlFor="ref_name"> Refrence Number </Label>
            <div className="mt-1">
              <Input
                id="ref_name"
                name="ref_name"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter refrence number"
                type="tel"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.ref_name || ""}
                invalid={validation.touched?.ref_name && validation.errors?.ref_name ? true : false}
              />
              {validation.touched.ref_name && validation.errors?.ref_name ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.ref_name} </FormFeedback>) : null}
            </div>
          </div>
        </div>

          <div className="flex gap-x-3 justify-end flex-end self-end mt-[1rem]">
            <Button className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl  border-0" type="submit" ><div className="flex items-center gap-x-3 text-[1.2rem]"> <FaUser className="text-xl" />  {isEditFarmer == true ? "Update Farmer" : "Add Farmer"} </div> </Button>
          </div>
      </Form>
      
   </div>
  )
}

export default SalesAddFarmer