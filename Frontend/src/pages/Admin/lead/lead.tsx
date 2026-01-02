import { FC, lazy, useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { FormFeedback, Input } from "reactstrap";
import { GiCheckMark } from "react-icons/gi";
import moment from "moment";
import { getleadlist } from "../../../Store/actions";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import { LeadList } from "../../../types/types";
const ExamplePagination = lazy(() => import("../../../components/common/pagination/pagination"));
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const CommonTable = lazy(() => import("../../../components/common/table/commonTable"));



const LeadListPage: FC = function () {
  const dispatch = useDispatch();
  const [PageNo, setPageNo] = useState<number>(1);
  const [RoePerPage, setRoePerPage] = useState<number>(5);
  const RowPerPage = (value: number) => setRoePerPage(value);
  const PageDataList = (data: number) => setPageNo(data);

  const [searchData, setSearchData] = useState<string | null>(null);
  const Changename = (data: string) => setSearchData(data);

  const Leaddatalist: LeadList = useSelector((state: any) => state.Lead.Leaddatalist) || {};
  const UserDataList = Leaddatalist.data || [];
  const TotalListData = Leaddatalist.totalData || 0;
  const CurrentPageNo = Leaddatalist.page || 1;

  // Define columns for each status type
  const columnsOrder = [
  { key: "name", label: "Name", render: (row: any) => <span className="text-blue-600 cursor-pointer " onClick={() => OpenOrderModal(row?.products)}> {row.name} </span>  },
  { key: "mobile_number", label: "Phone number" },
  { key: "added_at", label: "Created Date", render: (row: any) => moment(row.added_at).format("DD-MM-YYYY hh:ss:mm") },
  { key: "status", label: "Status" },
];

const columnsHelp = [
  { key: "name", label: "Name" },
  { key: "mobile_number", label: "Phone Number" },
  { key: "comment", label: "Comment", render: (row: any) => <span className="truncate max-w-[15rem]">{row.comment}</span> },
  { key: "added_at", label: "Created At", render: (row: any) => moment(row.added_at).format("DD-MM-YYYY hh:ss:mm") },
  { key: "status", label: "Status" },
];

const columnsContactUs = [
  { key: "name", label: "Name" },
  { key: "user_type", label: "Reason" },
  { key: "email", label: "Email" },
  { key: "mobile_number", label: "Phone" },
  { key: "comment", label: "Comment", render: (row: any) => <span className="truncate max-w-[15rem]">{row.comment}</span> },
  { key: "added_at", label: "Created At", render: (row: any) => moment(row.added_at).format("DD-MM-YYYY hh:ss:mm") },
  { key: "status", label: "Status" },
];

  // -------- order open modal -------------
      const [ProductModal, setProductModal] = useState(false);
      const [ProductItemModal, setProductItemModal] = useState({});
  
      const OpenOrderModal = (item: any) =>{
        setProductModal(true)
        setProductItemModal(item)
      }
    // ------------ order open modal --------------

  // Status option state
  const [selectedStatusOption, setSelectedStatusOption] = useState<{ label: string; value: string } | null>(null);
  const [selectedStatusid, setSelectedStatusid] = useState<string>("");
  const IsActivedata = (data: { label: string; value: string } | null) => {
    if (!data) {
      setSelectedStatusid("");
      setSelectedStatusOption(null);
    } else {
      setSelectedStatusid(data.value);
      setSelectedStatusOption(data);
    }
  };

  const isactiveoption = [
    { label: "Contact Us Page", value: "contactus" },
    { label: "Help Page", value: "help" },
    { label: "Order", value: "order" }
  ];

  const Name = "Lead List";
  const Searchplaceholder = "Search For Lead";

  // Modal state and handlers (if needed for future use)
  const [isOpenDelteModel, setisOpenCommentModel] = useState(false);
  const [commentData, setcommentData] = useState("");
  const [commentDataValidation, setcommentDataValidation] = useState(0);
  const OpenDesModal = () => {
    setcommentData("");
    setisOpenCommentModel(true);
  };
  const CommentAddCall = () => {
    if (commentData === "") {
      setcommentDataValidation(1);
    } else {
      setcommentDataValidation(0);
      // dispatch(AddRoleslist(requserData));
      setisOpenCommentModel(false);
    }
  };
  const DataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setcommentDataValidation(0);
    setcommentData(e.target.value);
  };

  useEffect(() => {
    if (!selectedStatusid) return;
    const requserdata: { page: number; size: number; search?: string; type: string } = {
      page: PageNo,
      size: RoePerPage,
      type: selectedStatusid,
    };
    if (searchData) requserdata.search = searchData;
    dispatch(getleadlist(requserdata));
  }, [dispatch, PageNo, RoePerPage, searchData, selectedStatusid]);

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true} >
        <ExampleBreadcrumb Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename={Changename} />

        <div className="bg-white dark:bg-gray-800 p-4 flex gap-x-4">
          <Select
            className="w-[15rem] dark:text-white"
            classNames={{
              control: () => "react-select__control",
              singleValue: () => "react-select__single-value",
              menu: () => "react-select__menu",
              option: ({ isSelected }) =>
                isSelected ? "react-select__option--is-selected" : "react-select__option",
              placeholder: () => "react-select__placeholder",
            }}
            value={selectedStatusOption}
            onChange={(e) => { IsActivedata(e) }}
            options={isactiveoption}
            isClearable={true}
          />
        </div>


        <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
          {selectedStatusid === "order" && (
            <CommonTable columns={columnsOrder} data={UserDataList} emptyMessage="No order leads found" />
          )}
          {selectedStatusid === "help" && (
            <CommonTable columns={columnsHelp} data={UserDataList} emptyMessage="No help leads found" />
          )}
          {selectedStatusid === "contactus" && (
            <CommonTable columns={columnsContactUs} data={UserDataList} emptyMessage="No contact us leads found" />
          )}
        </div>

        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage} PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData} />
      </NavbarSidebarLayout>

      <Modal onClose={() => setisOpenCommentModel(false)} show={isOpenDelteModel} size="md">
        <Modal.Header className="p-2">
          <div> Closing Comment</div>
        </Modal.Header>
        <Modal.Body className="px-2 pt-6 pb-6">
          <div className="flex flex-col items-center gap-y-6 text-center">

            <div className="mt-1">
              <Input
                id="comment"
                name="comment"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-[22rem]"
                placeholder="Enter comment"
                type="textarea"
                onChange={(e) => { DataChange(e) }}
                value={commentData}
              />
              {commentDataValidation && commentDataValidation ?
                <FormFeedback type="invalid" className="text-Red text-sm text-left"> Please Enter Comment </FormFeedback>
                : null}
            </div>

            <Button gradientDuoTone="greenToBlue" onClick={() => CommentAddCall()}>  <div className="flex items-center gap-x-2"> <GiCheckMark className="text-xl" />  Submit  </div> </Button>
          </div>
        </Modal.Body>
      </Modal>

         {ProductModal == true ?
                      <Modal
                        onClose={() => setProductModal(false)}
                        show={ProductModal}
                        size="2xl"
                        className="font-sans"
                      >
      {/* Header */}
                        <Modal.Header className="px-6 pt-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Product Details
                          </h2>
                        </Modal.Header>

                        {/* Body */}
                        <Modal.Body className="px-6 py-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                          {Array.isArray(ProductItemModal) && ProductItemModal.length > 0 ? (
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                              {ProductItemModal.map((item, k) => (
                                <div
                                  key={k}
                                  className="py-3 grid grid-cols-2 md:grid-cols-4 gap-3 items-center"
                                >
                                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {item?._id?.name?.englishname || "-"}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {item?._id?.categories?.name_eng || "-"}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {item?._id?.packaging || "-"}  {item?._id?.packagingtype?.type_eng || "-"}
                                  </p>
                                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    Qty: {item?.quantity || 0}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                              No product details available.
                            </p>
                          )}
                        </Modal.Body>

                      </Modal>
            : null}
    </>
  );
}

export default LeadListPage;