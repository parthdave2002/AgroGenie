import { FC, lazy,Suspense, useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ManagerDashboardTabData } from "../../types/dropdown";
import { getleadlist, MarkasReadLeadlist } from "../../Store/actions";
const ExamplePagination = lazy(() => import("../../components/common/pagination/pagination"));
const CommonTable = lazy(() => import("../../components/common/table/commonTable"));
const ChangeStausModal = lazy(() => import("../../components/common/modal/changeStatusModal"));

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

    const ChangestatusCall = () =>{
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
                    <h3 className="mb-4 text-[2rem] font-bold leading-none text-DarkBackground dark:text-White"> Lead List </h3>

                    <div className="flex items-center gap-x-6 bg-TitaniumWhite dark:bg-DarkBackground p-3 rounded-xl">
                        <ul className="flex items-center gap-x-6">
                            {ManagerDashboardTabData.map((data: any, k: number) => (
                            <li key={k} className={`relative flex flex-col items-center justify-center gap-1 py-2 px-2 cursor-pointer transition-all duration-300 ease-in-out font-medium text-sm ${selectedTabbar === data.title ? "text-green-500 font-semibold" : "text-SharkGray dark:text-SilverSteel"}`} onClick={() => TabSelection(data.title)} >
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
                            : <div className='text-center py-4 dark:text-White'>No DataFound </div>
                        }
                        <ExamplePagination PageData={LeadPageDataList} RowPerPage={LeadRowPerPage} RowsPerPageValue={RowLeadPerPage} PageNo={LeadPageNo} CurrentPageNo={leadCurrentPageNo} TotalListData={TotalLeadListData} />
                    </div>
            </div>   
                  
            {confirmationModal ?
                <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-Cosmos bg-opacity-75 z-50"> <div className="text-White">Loading...</div> </div>}>
                    <ChangeStausModal confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal} ConfirmCall={ChangestatusCall} />
                </Suspense>
            : null}

            {ProductModal == true ?
                <Modal onClose={() => setProductModal(false)} show={ProductModal} size="2xl" className="font-sans" >
                        <ModalHeader className="px-6 pt-6 pb-2 border-b border-WhiteMarble dark:border-TranquilBlack"> <h2 className="text-lg font-semibold text-DarkBackground dark:text-White"> Product Details </h2> </ModalHeader>
                        <ModalBody className="px-6 py-4 space-y-4 bg-White dark:bg-DarkBackground">
                            {Array.isArray(ProductItemModal) && ProductItemModal.length > 0 ? (
                                <div className="divide-y divide-WhiteMarble dark:divide-TranquilBlack">
                                {ProductItemModal.map((item, k) => (
                                    <div key={k} className="py-3 grid grid-cols-2 md:grid-cols-4 gap-3 items-center">
                                    <p className="text-sm font-medium text-TranquilBlack dark:text-SoothingBlueGrey"> {item?._id?.name?.englishname || "-"} </p>
                                    <p className="text-sm text-Hydrocarbon dark:text-SilverSteel"> {item?._id?.categories?.name_eng || "-"}</p>
                                    <p className="text-sm text-Hydrocarbon dark:text-SilverSteel"> {item?._id?.packaging || "-"}  {item?._id?.packagingtype?.type_eng || "-"}</p>
                                    <p className="text-sm font-semibold text-Cosmos dark:text-WhiteMarble"> Qty: {item?.quantity || 0}  </p>
                                    </div>
                                ))}
                                </div>
                            ) : (
                                <p className="text-sm text-SharkGray dark:text-SilverSteel text-center py-4">  No product details available. </p>
                            )}
                        </ModalBody>
                </Modal>
            : null}         
        </>
    )
};

export default ManagerDashboardPage;