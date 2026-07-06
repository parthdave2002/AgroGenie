/* eslint-disable jsx-a11y/anchor-is-valid */
import { lazy,FC, Suspense, useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "flowbite-react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import moment from "moment";
import { useNavigate } from "react-router";
import { FaExchangeAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getWalletRulelist, DeleteWalletRulelist, ChangeStatusWalletRulelist } from "../../../Store/actions";
import UseAccessList from "../../../hooks/useAccessList";
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));
const ChangeStausModal = lazy(() => import("../../../components/common/modal/changeStatusModal"));
const CommonTable = lazy(() => import("../../../components/common/table/commonTable"));
const DeleteModalPage = lazy(() => import("../../../components/common/modal/deleteModal"));
const ToastMessage = lazy(() => import("../../../components/common/toastmessage/ToastMessage"));
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const WalletRuleListPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [ReferralRulelistdata, setReferralRulelistdata] = useState([]);
  
  //------------ Access Data Code start------------
    const { WalletRulelist,  WalletRulelistSize, TotalWalletRuleData, CurrentPage, permissionsdata } = useSelector((state: any) => ({
      WalletRulelist: state.Wallet.WalletRulelist,
      WalletRulelistSize: state.Wallet.WalletRulelistSize,
      TotalWalletRuleData: state.Wallet.TotalWalletRuleData,
      CurrentPage: state.Wallet.CurrentPage,
      permissionsdata: state.Login.permissionsdata
    }));

    const accessList = UseAccessList(permissionsdata, "Wallet Rules");
  //--------- Access Data Code end------------------

  // ----------- next Button  Code Start -------------
    const [TotalListData, setTotalListData] = useState(0);
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

  // ---------------- Search User code start ----------------
    const [searchData, setSearchData] = useState<string | null>(null);
    const Changename = useCallback((value: string) => {
      const timeout = setTimeout(() => {
        setSearchData(value.trim());
        setPageNo(1);
      }, 500); // 500ms debounce
      return () => clearTimeout(timeout);
    }, []);
  // ---------------- Search User code end ----------------

  // ------------- Get  Data From Reducer Code Start --------------
    useEffect(() => {
      let requserdata: { page: number; size: number; search?: string } = {
        page: PageNo,
        size: RoePerPage
      };
      if (searchData)  requserdata.search = searchData;
      dispatch(getWalletRulelist(requserdata));
    }, [dispatch, PageNo, RoePerPage, searchData]);

    useEffect(() => {  
      setReferralRulelistdata(WalletRulelist ? WalletRulelist : null);
      setTotalListData(TotalWalletRuleData ? TotalWalletRuleData : 0);
      setCurrentPageNo(CurrentPage ? CurrentPage : 1);
    }, [WalletRulelist,  WalletRulelistSize, TotalWalletRuleData, CurrentPage]);
  //  ------------- Get Data From Reducer Code end --------------

  // ------------  Delete Code Start ------------
    const [Delete_id, set_Delete_id] = useState(0);
    const DeleteFuncall = (id: any) => {
      set_Delete_id(id);
      setisOpenDelteModel(true);
    };

    const DeleteCrop = () => {
      let rqeuserdata = { id: Delete_id };
      dispatch(DeleteWalletRulelist(rqeuserdata));
      setisOpenDelteModel(false);
    };
  // -------  Delete Code End ---------------

  const OpenAddModel = () =>{
    navigate("/wallet-rules/add")
  }

   const [ confirmationModal, setConfirmationModal ] = useState(false);
    const [ changeStausid, setChangeStatusid ] = useState("")
    const ChangestatusFuncall = (id: any) =>{
      setConfirmationModal(true);
      setChangeStatusid(id)
    }
    const ChangestatusCall = () =>{
      let requserdata = { id: changeStausid};
      dispatch(ChangeStatusWalletRulelist(requserdata)); 
      setConfirmationModal(false);
      setChangeStatusid("")
    }

  const UpdatestatusFuncall = (id: string) =>{
    navigate(`/wallet-rules/edit/${id}`);
  }

  let Name = "Wallet Rules List";
  let Searchplaceholder = "Search For Wallet Rules";
  let AddAccess = accessList?.add;

  const userColumns = useMemo(() => [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "amount",
      label: "Amount",
    },
    {
      key: "is_active",
      label: "Status",
      render: (row: any) => row.is_active ? <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div> : <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Deactive </div>
    },
    {
      key: "added_at",
      label: "Created Date",
      render: (row: any) => (
        <div>{moment(row?.added_at).format("DD-MM-YYYY hh:mm:ss")}</div>
      )
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex items-center gap-x-3">
          {accessList?.edit ? <Button className="PurpleButton" onClick={() => UpdatestatusFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton min-w-[5rem] text-center font-semibold"> <HiOutlinePencilAlt className="text-lg font-semibold" />  Update Wallet Rules </div> </Button> : null}
          {accessList?.edit ? <Button className="PurpleButton" onClick={() => ChangestatusFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton min-w-[5rem] text-center font-semibold"> <FaExchangeAlt className="text-lg font-semibold" />  Change status </div> </Button> : null}
          {/* {accessList?.delete ? <Button className="PinkButton" onClick={() => DeleteFuncall(row?._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Delete Wallet Rules</div> </Button> : null} */}
        </div>
      ),
    },
  ], [accessList, DeleteFuncall]);

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true} >
        <ExampleBreadcrumb Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename={Changename} isOpenAddModel={OpenAddModel} AddAccess={AddAccess} />

        <div className="flex items-center justify-center my-3">
          <p className="text-[1.3rem] dark:text-White"> 1 Point = ₹1.00 </p>
        </div>

        <CommonTable columns={userColumns} data={ReferralRulelistdata || []} />
        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} RowsPerPageValue={RoePerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
      </NavbarSidebarLayout>
    
        {isOpenDelteModel && (
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-Cosmos bg-opacity-75 z-50"> <div className="text-White">Loading...</div> </div> }>
            <DeleteModalPage  isOpenDelteModel={isOpenDelteModel}  name={"Referral Rule"} setisOpenDelteModel={setisOpenDelteModel}  DelCall={DeleteCrop} />
          </Suspense>
        )}

        {confirmationModal && (
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-Cosmos bg-opacity-75 z-50"> <div className="text-White">Loading...</div> </div>}>
            <ChangeStausModal confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal} ConfirmCall={ChangestatusCall} />
          </Suspense>
        )}
      <ToastMessage />       
    </>
  );
};

export default WalletRuleListPage;