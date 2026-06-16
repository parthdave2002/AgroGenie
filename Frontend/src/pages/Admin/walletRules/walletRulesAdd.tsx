import { FC, lazy, useEffect, useState } from "react";
import { Label, Button } from "flowbite-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "react-select";
import { useNavigate, useParams } from "react-router";
import { Form, FormFeedback } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { isactiveoption, WalletAmtType, WalletPerson, WalletRuletypeoption } from "../../../types/dropdown";
import { AddWalletRulelist, getWalletRulelist, ResetWalletRulelist } from "../../../Store/actions";
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));
const Inputbox = lazy(() => import("../../../components/common/inputComponent/inputbox"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const AddWalletRulesPage : FC = function () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(ResetWalletRulelist())
            
        if(id){
            let requserdata = {  id: id };
            dispatch(getWalletRulelist(requserdata))
        } 
        else{
            validation.values.wallet_name=  "";
            validation.values.wallet_amt= 0;
            setSelectedactiveid(null);
            setSelectedactiveOption(null)
        }   
    },[id])

    const [WalletDataRuleView, setWalletDataRuleView] = useState<any>();
    const  WalletView  = useSelector((state: any) => state.Wallet.WalletRulelist)
          
    useEffect(() => {
        setWalletDataRuleView(WalletView ? WalletView  : null);
    }, [WalletView]);

    useEffect(() => { 
        if(WalletDataRuleView){
            setinitialValues(prev => ({
                ...prev,
                wallet_name: WalletDataRuleView?.name ?? "",
                wallet_amt : WalletDataRuleView?.amount ?? "",
                min_order_amount : WalletDataRuleView?.min_order_amount ?? ""
            }));

            if (WalletDataRuleView?.is_active !== undefined && WalletDataRuleView?.is_active !== null &&  isactiveoption.length > 0) {
                const selectedSatus :any = isactiveoption.find((data:any) => data.value === WalletDataRuleView.is_active);
                setSelectedactiveOption(selectedSatus);
                setSelectedactiveid(selectedSatus?.value ?? null);
            }

            if (WalletDataRuleView?.event_type !== undefined && WalletDataRuleView?.event_type !== null &&  WalletRuletypeoption.length > 0) {
                const selectedSatus :any = WalletRuletypeoption.find((data:any) => data.value === WalletDataRuleView.event_type);
                setSelectedWalletTypeOption(selectedSatus);
                setSelectedWalletTypeid(selectedSatus?.value ?? null);
            }

            if (WalletDataRuleView?.reward_receiver !== undefined && WalletDataRuleView?.reward_receiver !== null &&  WalletPerson.length > 0) {
                const selectedSatus :any = WalletPerson.find((data:any) => data.value === WalletDataRuleView.reward_receiver);
                setSelectedWalletPersonOption(selectedSatus);
                setSelectedWalletPersonid(selectedSatus?.value ?? null);
            }

            if (WalletDataRuleView?.reward_type !== undefined && WalletDataRuleView?.reward_type !== null &&  WalletAmtType.length > 0) {
                const selectedSatus :any = WalletAmtType.find((data:any) => data.value === WalletDataRuleView.reward_type);
                setSelectedWalletAmtTypenOption(selectedSatus);
                setSelectedWalletAmtTypeid(selectedSatus?.value ?? null);
            }
        }
    },[WalletDataRuleView])


    // ------ status code start ------
    const [selectedactiveOption, setSelectedactiveOption] = useState(null);
    const [selectedactiveid, setSelectedactiveid] = useState<boolean | null>(null);
    const [validateactive, setValidateactive] = useState(0);
  
    const IsActivedata = (data: any) => {
      if (!data) {
        setSelectedactiveid(null);
        setSelectedactiveOption(null);
        setValidateactive(1)
      } else {
        setSelectedactiveid(data.value);
        setSelectedactiveOption(data);
        setValidateactive(0)
      }
    };
    // ------ status code end ------

    // ------------ wallet option code start -----------
    const [selectedWalletTypeOption, setSelectedWalletTypeOption] = useState(null);
    const [selectedWalletTypeid, setSelectedWalletTypeid] = useState<string>("");
    const [validatewalletType, setValidatewalletType] = useState(0);

    const IsWalletTypedata = (data: any) => {
      if (!data) {
          setSelectedWalletTypeid("");
          setSelectedWalletTypeOption(null);
          setValidatewalletType(1);
      } else {
          setSelectedWalletTypeid(data.value);
          setSelectedWalletTypeOption(data);
          setValidatewalletType(0)
      }
    };
    // ------------ wallet option code end -----------

     // ------------ wallet option code start -----------
    const [selectedWalletPersonOption, setSelectedWalletPersonOption] = useState(null);
    const [selectedWalletPersonid, setSelectedWalletPersonid] = useState<string>("");
    const [validatewalletPerson, setValidatewalletPerson] = useState(0);

    const IsWalletPersondata = (data: any) => {
      if (!data) {
          setSelectedWalletPersonid("");
          setSelectedWalletPersonOption(null);
          setValidatewalletPerson(1);
      } else {
          setSelectedWalletPersonid(data.value);
          setSelectedWalletPersonOption(data);
          setValidatewalletPerson(0)
      }
    };
    // ------------ wallet option code end -----------

     // ------------ wallet amount type code start -----------
    const [selectedWalletAmtTypenOption, setSelectedWalletAmtTypenOption] = useState(null);
    const [selectedWalletAmtTypeid, setSelectedWalletAmtTypeid] = useState<string>("");
    const [validatewalletAmtType, setValidatewalletAmtType] = useState(0);

    const IsWalletAmtTypedata = (data: any) => {
      if (!data) {
          setSelectedWalletAmtTypeid("");
          setSelectedWalletAmtTypenOption(null);
          setValidatewalletAmtType(1);
      } else {
          setSelectedWalletAmtTypeid(data.value);
          setSelectedWalletAmtTypenOption(data);
          setValidatewalletAmtType(0)
      }
    };
    // ------------ wallet amount type code end -----------
    
    const [initialValues, setinitialValues] = useState({
        wallet_amt: 0,
        wallet_name: "",
        status: "",
        event_type: "",
        reward_receiver: "",
        reward_type : "" ,
        min_order_amount : ""
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
            wallet_name: Yup.string().required("Please enter wallet name"),
            wallet_amt: Yup.number().required("Please enter wallet amount")
        }),
        
        onSubmit: (values) => {
          if(selectedactiveid == null) return setValidateactive(1);
          if(selectedWalletTypeid == null) return  setValidatewalletType(1);
          if(selectedWalletPersonid == null) return setValidatewalletPerson(1)
          if(selectedWalletAmtTypeid == null) return setValidatewalletAmtType(1)

            let Requser ={
                event_type : selectedWalletTypeid,
                name : values?.wallet_name,
                amount : values?.wallet_amt,
                is_active : selectedactiveid,
                reward_receiver : selectedWalletPersonid,
                reward_type : selectedWalletAmtTypeid,
                min_order_amount : values?.min_order_amount,
                ...(id && { _id: id })
            }
          dispatch(AddWalletRulelist(Requser));
        },
    });

    // ------------- Get  Data From Reducer Code Start --------------
        const AddWalletRulelistData = useSelector((state: any) =>  state.Wallet.AddWalletRulelist);

        useEffect(() => {  
            if(AddWalletRulelistData?.success == true){
                dispatch(ResetWalletRulelist())
                navigate("/wallet-rules/list")
                validation.resetForm();
                setSelectedactiveid(null);
                setSelectedactiveOption(null);
                setValidateactive(1)
            }
        }, [AddWalletRulelistData]);
    //  ------------- Get Data From Reducer Code end --------------

    let Name = id ? "Wallet Rules Update" : "Wallet Rules Add" ;
    let ParentName = "Wallet Rules List";
    let ParentLink = "/wallet-rules/list";

    return (
        <>  
            <NavbarSidebarLayout isSidebar={true} isNavbar={true} >
                <ExampleBreadcrumb Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-White dark:bg-Cosmos p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                       
                            <div className="my-[1rem]">
                                <Inputbox
                                    id="wallet_name"
                                    name="wallet_name"
                                    label="Wallet Name"
                                    required={true}
                                    placeholder="Enter wallet name"
                                    type="text"
                                    validation={validation}
                                />
                            </div>

                            <div className="my-[1rem]" >
                                <Label htmlFor="Status">Wallet Rules <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Select
                                    className="w-full dark:text-White"
                                    classNames={{
                                        control: () => "react-select__control",
                                        singleValue: () => "react-select__single-value",
                                        menu: () => "react-select__menu",
                                        option: ({ isSelected }) =>
                                            isSelected ? "react-select__option--is-selected" : "react-select__option",
                                        placeholder: () => "react-select__placeholder",
                                    }}
                                    value={selectedWalletTypeOption}
                                    onChange={(e) => { IsWalletTypedata(e) }}
                                    options={WalletRuletypeoption}
                                    isClearable={true}
                                />
                                {validatewalletType == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select Referral Type </FormFeedback> : null}
                                </div>
                            </div>

                            <div className="my-[1rem]">
                                <Label htmlFor="Status"> Wallet Point Given To <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Select
                                    className="w-full dark:text-White"
                                    classNames={{
                                        control: () => "react-select__control",
                                        singleValue: () => "react-select__single-value",
                                        menu: () => "react-select__menu",
                                        option: ({ isSelected }) =>
                                            isSelected ? "react-select__option--is-selected" : "react-select__option",
                                        placeholder: () => "react-select__placeholder",
                                    }}
                                    value={selectedWalletPersonOption}
                                    onChange={(e) => { IsWalletPersondata(e) }}
                                    options={WalletPerson}
                                    isClearable={true}
                                />
                                {validatewalletPerson == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select Wallet Point Given To </FormFeedback> : null}
                                </div>
                            </div>
                       
                            <div className="my-[1rem]">
                                <Label htmlFor="Status"> Wallet Point Type <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Select
                                    className="w-full dark:text-White"
                                    classNames={{
                                        control: () => "react-select__control",
                                        singleValue: () => "react-select__single-value",
                                        menu: () => "react-select__menu",
                                        option: ({ isSelected }) =>
                                            isSelected ? "react-select__option--is-selected" : "react-select__option",
                                        placeholder: () => "react-select__placeholder",
                                    }}
                                    value={selectedWalletAmtTypenOption}
                                    onChange={(e) => { IsWalletAmtTypedata(e) }}
                                    options={WalletAmtType}
                                    isClearable={true}
                                />
                                {validatewalletAmtType == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select Wallet Point Type </FormFeedback> : null}
                                </div>
                            </div>

                            {selectedWalletTypeid === "ORDER_COMPLETED" &&  
                                <div className="my-[1rem]">
                                    <Inputbox
                                        id="min_order_amount"
                                        name="min_order_amount"
                                        label="Min Order Amount"
                                        required={true}
                                        placeholder="Enter wallet min order amount"
                                        type="number"
                                        validation={validation}
                                    />
                                </div>
                            }

                            <div className="my-[1rem]">
                                <Inputbox
                                    id="wallet_amt"
                                    name="wallet_amt"
                                    label="Wallet Amount"
                                    required={true}
                                    placeholder="Enter wallet amount"
                                    type="number"
                                    validation={validation}
                                />
                            </div>
                          
                            <div className="my-[1rem]">
                                <Label htmlFor="Status">Status <span className='text-red-500'>*</span> </Label>
                                <Select
                                    className="w-full dark:text-White"
                                    classNames={{
                                        control: () => "react-select__control",
                                        singleValue: () => "react-select__single-value",
                                        menu: () => "react-select__menu",
                                        option: ({ isSelected }) =>
                                            isSelected ? "react-select__option--is-selected" : "react-select__option",
                                        placeholder: () => "react-select__placeholder",
                                    }}
                                
                                    value={selectedactiveOption}
                                    onChange={(e) => { IsActivedata(e) }}
                                    options={isactiveoption}
                                    isClearable={true}
                                />
                                {validateactive == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select status </FormFeedback> : null}
                            </div>

                        <div className="flex gap-x-3 justify-end">
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > { id ? "Update Wallet Rules"  : "Add Wallet Rules"}  </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate("/wallet-rules/list")}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default AddWalletRulesPage;