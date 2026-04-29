import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { getNearbyFarmerDatalist } from '../../Store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import SmallPagination from '../../components/common/pagination/smallPagination';

const NeaByFarmer : FC  = () => {
  const dispatch = useDispatch()

    const [FarmerDataList, setFarmerDataList] = useState([]);    

  // ----------- next Button  Code Start -------------
    const [TotalListData, setTotalListData] = useState(0);
    const [CurrentPageNo, setCurrentPageNo] = useState(0);
    const [PageNo, setPageNo] = useState(1);

    const PageDataList = (data:any) =>{ setPageNo(data)}
  // ------------- Next button Code End -------------

    const getCustomerId = () => {
    try {
      const data = Cookies.get("customer_data");
      return data ? JSON.parse(data)?._id : null;
    } catch {
      return null;
    }
  };
  useEffect(() =>{
    const customerId = getCustomerId();
    if (!customerId) return;
    if (customerId) {
      const requser = {
        customer_id: customerId,
        page: PageNo,
        size: 5
      };
        dispatch(getNearbyFarmerDatalist(requser));
    }
  },[dispatch, PageNo ])

  // ------------- Get  Data From Reducer Code Start --------------

    const { Farmerlist, FarmerlistSize, TotalFarmerData, CurrentPage } = useSelector((state: any) => ({
      Farmerlist: state.Customer.Farmerlist,
      FarmerlistSize: state.Customer.FarmerlistSize,
      TotalFarmerData: state.Customer.TotalFarmerData,
      CurrentPage: state.Customer.CurrentPage,
    }));

    useEffect(() => {
      setFarmerDataList(Farmerlist? Farmerlist : []);
      setTotalListData(TotalFarmerData? TotalFarmerData : 0);
      setCurrentPageNo(CurrentPage? CurrentPage : 1);  
    }, [Farmerlist, FarmerlistSize, TotalFarmerData, CurrentPage]);
    //  ------------- Get  Data From Reducer Code end --------------

  return (
    <>
      <div className="w-full rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100"> Nearby Farmers </h2>
          <span className="text-xs text-gray-400"> {FarmerDataList?.length || 0} results </span>
        </div>

        {FarmerDataList && FarmerDataList.length > 0 ? (
          <div className="space-y-3">
            {FarmerDataList.map((item: any, index: number) => (
              <div  key={index} className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-700 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition" >
                <div>
                  <p className="text-md text-gray-800 dark:text-gray-100"> {item.firstname} {item.lastname}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400"> {item.Crop?.[0]?.name_eng || "No crop info"} </p>
                </div>

                <div className="text-right">
                  <p className="text-md text-gray-700 dark:text-gray-200"> {item.mobile_number} </p>
                  <p className="text-xs text-gray-400"> {moment(item.added_at).format("DD MMM YYYY")} </p>
                </div>
              </div>
            ))}

            <SmallPagination PageData={PageDataList} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
          </div>
        ):(
          <div className="flex flex-col items-center justify-center py-10 text-gray-400 dark:text-gray-500">
            <p className="text-sm">No nearby farmers found</p>
          </div>
        )}
      </div>
    </>
  )
}

export default NeaByFarmer