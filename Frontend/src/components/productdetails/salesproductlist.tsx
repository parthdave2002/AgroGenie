import React, { lazy, FC, useEffect, useMemo, useState } from 'react'
import { Button } from "flowbite-react";
import { getProductlist } from '../../Store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { FaCartArrowDown } from 'react-icons/fa';
const ExamplePagination = lazy(() => import("../common/pagination/pagination"));
const CommonTable = lazy(() => import("../../components/common/table/commonTable"));
const LoaderPage = lazy(() => import("../common/loader/loader"));

interface PorductData  {
    searchData ?: string;
    ProductDetailsCall : (value: string ) => void;
    isLoggedin : boolean;
    AddtoCartCall : (value: any) => void;
}

const Salesproductlist : FC <PorductData> = ({searchData, ProductDetailsCall, isLoggedin, AddtoCartCall}) => {
  const dispatch =useDispatch();
  const [ProductData, setProductData] = useState([]);
  // ----------- next Button  Code Start -------------
    const [TotalListData, setTotalListData] = useState(0);
    const [CurrentPageNo, setCurrentPageNo] = useState(0);
    const [PageNo, setPageNo] = useState(1);
    const [RoePerPage, setRoePerPage] = useState(5);
    const [Loader, setLoader] = useState(false);

    const RowPerPage = (event: any) => {
      const value = Number(event)
      setRoePerPage(value);
      setPageNo(1)
    };
    const PageDataList = (data:any) =>{ setPageNo(data)}
  // ------------- Next button Code End -------------

    useEffect(() => {
        let requserdata: { page: number; size: number; search?: string } = {
          page: PageNo,
          size: RoePerPage
        };
        if (searchData) requserdata.search = searchData;
        dispatch(getProductlist(requserdata));
        setLoader(true)
    }, [dispatch, searchData, PageNo,RoePerPage ]);
  
    const Productlist = useSelector((state: any) => state.Product.Productlist);
    useEffect(() => {
      setCurrentPageNo(Productlist?.page)
      setTotalListData(Productlist?.totalData)
      setProductData(Productlist?.data);
      setLoader(false)
    }, [Productlist]);

    const ProductColumns  = useMemo(() => [
        {
          key: "order_id",
          label: "Name",
          render: (row: any) => (
             <span className="whitespace-nowrap text-base font-medium text-DarkBackground dark:text-White py-0 cursor-pointer max-w-[35rem]" onClick={() => ProductDetailsCall(row?._id)} >
              <div className='flex gap-x-2'>
                <img className='w-[3rem] h-[3rem] flex self-center rounded-md' src={row?.product_pics?.[0]} alt='product' />
                  <div className='flex flex-col'>
                    <span className='truncate max-w-[30rem] overflow-hidden  text-ellipsis'>{row?.name?.englishname}  ( {row?.company?.name_eng} )  </span>
                    <span className='dark:text-SilverSteel  text-SharkGray text-[0.9rem] truncate max-w-[30rem]'>{row?.tech_name?.english_tech_name} </span>
                  </div>
              </div>
            </span>
          )
        },
        {
          key: "added_at",
          label: "Packing size",
          render: (row: any) => <span> {row?.packaging} {row?.packagingtype?.type_eng} </span>
        },
        {
          key: "avl_qty",
          label: "Qty",
          render: (row: any) => row?.avl_qty ? row?.avl_qty  : 0
        },
        {
          key: "price",
          label: "price (RS.)",
          render: (row: any) => row?.price ? Math.round(row?.price) :  0,
        },
        {
          key: "discount",
          label: "discount (RS.)",
          render: (row: any) => row?.discount ? Math.round(row?.discount) : 0
        },
        {
          key: "final_price",
          label: "final price",
          render: (row: any) =>  Math.round((row?.price || 0) - (row?.discount || 0)),
        },
        ...(isLoggedin? [
            { key: "action", label: "Action",
              render: (item: any) => item?.avl_qty !== 0 ? (
                  <span className="whitespace-nowrap text-base font-medium text-DarkBackground dark:text-White py-0">
                    <Button className="bg-gradient-to-br from-green-400 to-blue-600 text-White hover:bg-gradient-to-bl border-0" onClick={() => AddtoCartCall(item)} >
                      <div className="flex items-center gap-x-3"> <FaCartArrowDown className="text-xl" />  Add to Cart </div>
                    </Button>
                  </span>
                ) : (
                  <div className="text-center flex justify-center self-center p-4"> -  </div>
                ),
            },
          ]
        : [])
      ],[]);

  return (
    <>
      {Loader ? <LoaderPage /> :
 
        <div className="mt-[2rem]">
          <CommonTable columns={ProductColumns} data={ProductData || []} />
          <ExamplePagination  PageData={PageDataList} RowPerPage={RowPerPage}   RowsPerPageValue={RoePerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
        </div>
      }
    </>
  )
}

export default Salesproductlist