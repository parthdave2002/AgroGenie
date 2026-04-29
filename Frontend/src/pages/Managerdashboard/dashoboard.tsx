import { FC, lazy, useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";;
import { Button, Modal } from "flowbite-react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ManagerDashboardTabData } from "../../types/dropdown";
import { getleadlist, MarkasReadLeadlist } from "../../Store/actions";
const ExamplePagination = lazy(() => import("../../components/common/pagination/pagination"));
const CommonTable = lazy(() => import("../../components/common/table/commonTable"));

const ManagerDashboardPage: FC = function () {
    const dispatch = useDispatch();
    const LeadDataList = useSelector((state: any) => state.Lead.Leaddatalist);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [LeadeId, setLeadeId] = useState("");
    const [selectedTabbar, setselectedTabbar] = useState("Pending");
    const [leadData, setLeadData] = useState<any>(null)
    const [TotalLeadListData, setTotalLeadListData] = useState(0);
    const [leadCurrentPageNo, setleadCurrentPageNo] = useState(0);
    const [LeadPageNo, setLeadPageNo] = useState(1);
    const [RowLeadPerPage, setRowLeadPerPage] = useState(5);
    const [ProductModal, setProductModal] = useState(false);
    const [ProductItemModal, setProductItemModal] = useState({});

    const LeadRowPerPage = (event: any) => {
        const value = Number(event)
        setRowLeadPerPage(value);
    };
    
    const LeadPageDataList = (data: any) => { setLeadPageNo(data) }
        useEffect(() =>{
        setTotalLeadListData(LeadDataList?.totalData)
        setLeadData(LeadDataList?.data)
        setleadCurrentPageNo( LeadDataList?.page)
    },[LeadDataList])

    const DelCall = () =>{
        let requser={ status :"completed", _id : LeadeId }
        dispatch(MarkasReadLeadlist(requser))
        setConfirmationModal(false);
    }

    // ----------- Tabnavbar code start --------------------    
    const TabSelection = (data: string) => {
        setselectedTabbar(data);
        setRowLeadPerPage(5);
        setLeadPageNo(1);
        setleadCurrentPageNo(0)
        setLeadData([])
        setTotalLeadListData(0)
    }
    
    useEffect(() =>{
        dispatch(getleadlist({ status: selectedTabbar, page: LeadPageNo, size: RowLeadPerPage }))
    },[dispatch,selectedTabbar, LeadPageNo, RowLeadPerPage])
    // ----------- Tabnavbar code end --------------------

    const OPenConfirmModal = (data: string) => {
        setConfirmationModal(true);
        setLeadeId(data);
    };

    const OpenModal = (item: any) =>{
      setProductModal(true)
      setProductItemModal(item)
    }

    const Columns = [
        {
            key: "name",
            label: "Name",
            render: (item: any) => (
                <span className="cursor-pointer" onClick={() => OpenModal(item?.products)}>{item?.name || "-"}</span>
            ),
        },
        {
            key: "type",
            label: "Lead From",
            render: (item: any) => item?.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1).toLowerCase() : "-",
        },
        {
            key: "user_type",
            label: "Reason",
            render: (item: any) => item?.user_type ? item.user_type.charAt(0).toUpperCase() + item.user_type.slice(1).toLowerCase() : "-",
        },
        {
            key: "mobile_number",
            label: "Phone number",
        },
        {
            key: "email",
            label: "Email",
        },
        {
            key: "comment",
            label: "Comment",
            render: (item: any) => item?.comment || "-",
        },
        // {
        //     key: "status",
        //     label: "Status",
        //     render: (item: any) => item?.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase() : "-",
        // },
        {
            key: "added_at",
            label: "Created Date",
            render: (item: any) => item?.added_at ? moment(item.added_at).format("DD-MM-YYYY hh:mm:ss") : "-",
        },
        {
            key: "action",
            label: "Action",
            render: (item: any) => (item?.status === "pending" ? <Button onClick={() => OPenConfirmModal(item._id)}>Mark As Read</Button> : "-"),
        },
    ];

    return(
        <>
            <div className="mt-[4rem]">
                    <h3 className="mb-4 text-[2rem] font-bold leading-none text-gray-900 dark:text-white"> Lead List </h3>

                    <div className="flex items-center gap-x-6 bg-gray-100 dark:bg-gray-900 p-3 rounded-xl">
                        <ul className="flex items-center gap-x-6">
                            {ManagerDashboardTabData.map((data: any, k: number) => (
                            <li key={k} className={`relative flex flex-col items-center justify-center gap-1 py-2 px-2 cursor-pointer transition-all duration-300 ease-in-out font-medium text-sm ${selectedTabbar === data.title ? "text-green-500 font-semibold" : "text-gray-500 dark:text-gray-400"}`} onClick={() => TabSelection(data.title)} >
                                <span className="flex items-center text-[1rem] font-semibold gap-x-4">{data.icon} {data.title.charAt(0).toUpperCase() + data.title.slice(1)}</span>
                                {selectedTabbar === data.title && (<span className="px-2 absolute bottom-[-4px] left-0 w-full h-[2px] bg-green-500">
                                </span>)}
                            </li>
                            ))}
                        </ul>
                    </div>

                    <div className='mt-[1.5rem] px-4'>
                        {leadData && leadData.length > 0 ?
                            <CommonTable columns={Columns} data={leadData || []} />
                            : <div className='text-center py-4 dark:text-gray-50'>No DataFound </div>
                        }
                        <ExamplePagination PageData={LeadPageDataList} RowPerPage={LeadRowPerPage} RowsPerPageValue={RowLeadPerPage} PageNo={LeadPageNo} CurrentPageNo={leadCurrentPageNo} TotalListData={TotalLeadListData} />
                    </div>
            </div>   
                  
            {confirmationModal ?
                    <Modal onClose={() => setConfirmationModal(false)} show={confirmationModal} size="md">
                        <Modal.Header className="px-6 pt-6 pb-0"> <span className="sr-only"> Change status</span></Modal.Header>
                        <Modal.Body className="px-6 pt-0 pb-6">
                        <div className="flex flex-col items-center gap-y-6 text-center"> <HiOutlineExclamationCircle className="text-7xl text-red-500" /> <p className="text-xl text-gray-500"> Are you sure you want to chnage status ? </p>
                            <div className="flex items-center gap-x-3">
                            <Button color="failure" onClick={() => DelCall()}>  Yes, I'm sure </Button>
                            <Button color="gray" onClick={() => setConfirmationModal(false)}> No, cancel </Button>
                            </div>
                        </div>
                        </Modal.Body>
                    </Modal>
            : null}

            {ProductModal == true ?
                <Modal onClose={() => setProductModal(false)} show={ProductModal} size="2xl" className="font-sans" >
                        <Modal.Header className="px-6 pt-6 pb-2 border-b border-gray-200 dark:border-gray-700"> <h2 className="text-lg font-semibold text-gray-900 dark:text-white"> Product Details </h2> </Modal.Header>
                        <Modal.Body className="px-6 py-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                            {Array.isArray(ProductItemModal) && ProductItemModal.length > 0 ? (
                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {ProductItemModal.map((item, k) => (
                                    <div key={k} className="py-3 grid grid-cols-2 md:grid-cols-4 gap-3 items-center">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300"> {item?._id?.name?.englishname || "-"} </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400"> {item?._id?.categories?.name_eng || "-"}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400"> {item?._id?.packaging || "-"}  {item?._id?.packagingtype?.type_eng || "-"}</p>
                                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200"> Qty: {item?.quantity || 0}  </p>
                                    </div>
                                ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">  No product details available. </p>
                            )}
                        </Modal.Body>
                </Modal>
            : null}         
        </>
    )
};

export default ManagerDashboardPage;