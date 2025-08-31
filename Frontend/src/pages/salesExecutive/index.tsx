import { FC, useEffect, useState } from "react";
import SalesHeaderPage from "./salesHeader";
import SalesDashboardPage from "./salesDashboard";
import SalesUpcomingComplainPage from "./salesUpcomingcomplain";
import SalesFarmerDetailsPage from "./salesFarmer";
import SalesProduct from "./salesProduct";
import SalesOrder from "./salesOrder";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const SalesCRMPage : FC = function () {

    const navigate = useNavigate();
    const [ openProfile, setOpenProfile] = useState(false);
    const [ openComplain, setOpenComplain] = useState("");
    const [active, setActive] = useState("Dashboard");
    const ActiveData = (data:string) =>{
        setActive(data)
    }

    const [data, setData] = useState(null);
    const customerDataString = Cookies.get("customer_data");
    useEffect(() =>{
        if (customerDataString && customerDataString !== "undefined") {
            try {
                const customerData = customerDataString ? JSON.parse(customerDataString) : null    
                setData(customerData?._id ? customerData?._id  : null);
            } catch (error) {
                console.error("Failed to parse customer data", error);
                Cookies.remove("customer_data");
                navigate("/login");
                toast.error("Invalid session data");
            }
        }
    },[])

    useEffect(() =>{
        if(data)  setActive("Farmer")
    },[data])

    return (
        <>  
            <div className="p-3 bg-[#f4f9fd] dark:bg-gray-800 min-h-screen">
                <div className="py-2 px-4  shadow shadow-lg shadow-indigo-400/40 rounded-xl"> <SalesHeaderPage openProfile={openProfile} setDatactive={ActiveData} active={active} />  </div>
                    
                    <div className="flex flex-col p-3 "> 
                        {active ===  "Dashboard" ? 
                            <div> <SalesDashboardPage setDatactive={ActiveData}  openProfile={openProfile} setOpenProfile={setOpenProfile} /> </div>
                        : active ===  "Farmer" ? 
                            <div> <SalesFarmerDetailsPage openProfile={openProfile} setOpenProfile={setOpenProfile} setDatactive={ActiveData}  /></div>
                        : active ===  "Products" ? 
                            <div> <SalesProduct setDatactive={ActiveData}  /></div>
                        : active ===  "Order" ? 
                            <div> <SalesOrder openProfile={openProfile} setOpenProfile={setOpenProfile}  setDatactive={ActiveData}  /></div>
                        : active ===  "Complain" ? 
                            <div> <SalesUpcomingComplainPage openProfile={openProfile} setOpenProfile={setOpenProfile} openComplain={openComplain} setOpenComplain={setOpenComplain}   setDatactive={ActiveData}  /> </div>
                        : null
                        }
                    </div>
            </div>
        </>
    );
}

export default SalesCRMPage;