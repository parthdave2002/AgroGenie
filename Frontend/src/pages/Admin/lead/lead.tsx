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
// Define columns for each status type
const columnsOrder = [
  { key: "name", label: "Name" },
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
    </>
  );
}

export default LeadListPage;