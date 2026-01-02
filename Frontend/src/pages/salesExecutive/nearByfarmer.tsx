import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { getNearbyFarmerDatalist } from '../../Store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import ExamplePagination from '../../components/common/pagination/pagination';
import CommonTable from '../../components/common/table/commonTable';

const NeaByFarmer : FC  = () => {
  const dispatch = useDispatch()

    const [FarmerDataList, setFarmerDataList] = useState([]);    

  // ----------- next Button  Code Start -------------
    const [TotalListData, setTotalListData] = useState(0);
    const [CurrentPageNo, setCurrentPageNo] = useState(0);
    const [PageNo, setPageNo] = useState(1);
    const [RoePerPage, setRoePerPage] = useState(5);

    const RowPerPage = useCallback((rows: number) => {
      const value = Number(rows)
       setRoePerPage(value);
       setPageNo(1)
    }, []);

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
        size: RoePerPage
      };
        dispatch(getNearbyFarmerDatalist(requser));
    }
  },[dispatch, PageNo, RoePerPage ])

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
        setCurrentPageNo(CurrentPage? CurrentPage?.page : 1);  
    }, [Farmerlist, FarmerlistSize, TotalFarmerData, CurrentPage]);
  //  ------------- Get  Data From Reducer Code end --------------

    const farmerColumns = useMemo (
    () => [
      {
        key: "customer",
        label: "Customer Name",
        render: (row: any) =>  `${row?.firstname || ""} ${row?.middlename || ""} ${row?.lastname || ""}`,
      },
       {
        key: "mobile_number",
        label: "Mobile Number",
      },
      {
        key: "added_at",
        label: "Date & Time",
        render: (row: any) => moment(row.added_at).format("DD-MM-YYYY hh:mm:ss"),
      },
      {
        key: "advisor_name",
        label: "Crop",
        render: (row: any) => row?.crops[0]?.name_eng || "-",
      },
      // {
      //   key: "heard_about_agribharat",
      //   label: "know About Agribharat",
      // },
      {
        key: "",
        label: "Land Details",
        render: (row: any) => ` ${row?.land_area} ${row?.land_type} `,
      },
    ],[]);

  return (
    <>
      <div className='mt-3 border dark:border-gray-600 rounded-xl w-full py-2 px-5'>
              <>
                  {FarmerDataList && FarmerDataList.length > 0 ?
                      <CommonTable columns={farmerColumns} data={FarmerDataList || []} />
                      : <div className='text-center py-4 dark:text-gray-50'>No DataFound </div>}
              </>
        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
      </div>
    </>
  )
}

export default NeaByFarmer