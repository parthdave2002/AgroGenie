import React, { FC, useEffect, useMemo, useState } from 'react';
import { getNearbyFarmerOrder } from '../../Store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'flowbite-react';
import moment from 'moment';
import { NearByFarmerProps } from '../../types/types';
import CommonTable from '../../components/common/table/commonTable';
import ExamplePagination from '../../components/common/pagination/pagination';

const NeaByFarmerDetails : FC  <NearByFarmerProps> = ({farmerId,OpenFarmerDetailsModal, setisOpenConfirmModel, SelectedFarmerDetails}) => {
    const dispatch = useDispatch()
    const [FarmerDataList, setFarmerDataList] = useState([]);    

  // ----------- next Button Code Start -------------
     const [TotalListData, setTotalListData] = useState(0);
     const [CurrentUserListSize, setCurrentUserListSize] = useState();
     const [CurrentPageNo, setCurrentPageNo] = useState(0);
     const [PageNo, setPageNo] = useState(1);
     const [RoePerPage, setRoePerPage] = useState(5);
 
     const RowPerPage = (event: any) => {
       const value = Number(event)
        setRoePerPage(value);
        setPageNo(1)
      };
     const PageDataList = (data:any) =>{ setPageNo(data)}
  // ------------- Next button Code End -------------

  useEffect(() =>{
    let requser = {
        id: farmerId,
        page: PageNo,
        size: RoePerPage
      };
    dispatch(getNearbyFarmerOrder(requser));
  },[dispatch,farmerId, PageNo, RoePerPage ])

  // ------------- Get  Data From Reducer Code Start --------------

    const { FarmerOrderlist, FarmerOrderlistSize, TotalFarmerOrderData, CurrentPage } = useSelector((state: any) => ({
      FarmerOrderlist: state.Customer.FarmerOrderlist,
      FarmerOrderlistSize: state.Customer.FarmerOrderlistSize,
      TotalFarmerOrderData: state.Customer.TotalFarmerOrderData,
      CurrentPage: state.Customer.CurrentPage,
    }));

    useEffect(() => {
      setFarmerDataList(FarmerOrderlist? FarmerOrderlist : []);
      setTotalListData(TotalFarmerOrderData? TotalFarmerOrderData : 0);
      setCurrentPageNo(CurrentPage? CurrentPage : 1);  
    }, [FarmerOrderlist, FarmerOrderlistSize, TotalFarmerOrderData, CurrentPage]);
  //  ------------- Get  Data From Reducer Code end --------------

    const orderColumns  = useMemo(() => [
        {
          key: "order_id",
          label: "Order ID",
        },
        {
          key: "products",
          label : "Product",
          render : (row:any) =>(
            <div className='flex flex-col gap-y-1'>
              {
                row?.products?.map((item:any, index:number) =>(
                  <div key={index} className='flex items-center gap-x-2'>
                    <span>{item?.id?.name?.englishname}</span>
                  </div>
                ))
              }
            </div>
          )
        },
        {
          key: "quantity",
          label: "Quantity",
          render : (row:any) =>(
            <div className='flex flex-col gap-y-1'>
              {
                row?.products?.map((item:any, index:number) =>(
                  <div key={index} className='flex items-center gap-x-2'>
                    <span>{item?.quantity}</span>
                  </div>
                ))
              }
            </div>
          )
        },
        {
          key: "packagingtype",
          label: "Packing",
          render : (row:any) =>(
            <div className='flex flex-col gap-y-1'>
              {
                row?.products?.map((item:any, index:number) =>(
                  <div key={index} className='flex items-center gap-x-2'>
                    <span>{item?.id?.packaging} {item?.id?.packagingtype?.type_eng}</span>
                  </div>
                ))
              }
            </div>
          )
        },
        {
          key: "total_amount",
          label: "Amount",
          render: (row: any) => `₹ ${Math.round(row?.total_amount)}`,
        },
        {
          key: "added_at",
          label: "Date & Time",
          render: (row: any) => moment(row.added_at).format("DD-MM-YYYY hh:mm:ss"),
        },
    ],[]);

  return (
    <>
       <Modal onClose={() => setisOpenConfirmModel()}  show={OpenFarmerDetailsModal} size="6xl">
        <Modal.Header> NearBy Order Details </Modal.Header>
        <Modal.Body>
          <div className='flex flex-col gap-y-3'>
          <div className='flex grid grid-cols-3 gap-4 items-center justify-between dark:bg-gray-800 bg-gray-100 dark:text-gray-50 p-3 rounded-md'>
            <p> Name : {SelectedFarmerDetails?.firstname} {SelectedFarmerDetails?.middlename} {SelectedFarmerDetails?.lastname} </p>
            <p> Taluka : {SelectedFarmerDetails?.taluka?.name} </p>
            <p> Village : {SelectedFarmerDetails?.village?.name} </p>
            <p> Crops : {SelectedFarmerDetails?.crops?.map((crop: any) => crop.name).join(", ")} </p>
          </div>

           <CommonTable columns={orderColumns} data={FarmerDataList || []} />
           <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
          </div>
        </Modal.Body>
       </Modal>
    </>
  )
}

export default NeaByFarmerDetails