
import { lazy, FC, useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoticeBoardlist } from "../../../Store/actions";
import { useParams } from "react-router";
import moment from "moment";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import { FaFilePdf } from "react-icons/fa";
import { Modal } from "flowbite-react";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const NoticeBoardDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [BoardList, setBoardList] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      // setLoading(true)
      dispatch(getNoticeBoardlist({ id: id }))
    }
  }, [id]);

  const Boardlist = useSelector((state: any) => state.NoticeBoard.Baorddatalist);

  useEffect(() => {
    setBoardList(Boardlist ? Boardlist : null);
  }, [Boardlist]);

  let Name = "Noice Board Details";
  let ParentName = "Notice Board List";
  let ParentLink = "/notice-board/list";

  const isPdf = BoardList?.document_pics && BoardList?.document_pics.toLowerCase().endsWith(".pdf");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
        <ExampleBreadcrumb Name={Name} ParentName={ParentName} ParentLink={ParentLink} />
        <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
          <div>

            {BoardList?.document_pics &&
              <>
                <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Document Image</h3>
                {isPdf ? 
                  <div className=" text-red-600 hover:text-red-700 p-2" onClick={handleOpenModal}> <FaFilePdf style={{ fontSize: "48px" }} />  <p className="text-xs mt-1">View PDF</p> </div>
                :  <img src={BoardList?.document_pics} alt="Uploaded Document" className=" object-cover p-2" />}
              </>
             }

            <div className="grid grid-cols-3 gap-6 mt-4">
              <div className="p-2 rounded-lg">
                <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Name</h3>
                <p className="text-gray-900 dark:text-white">{BoardList?.name || "N/A"}</p>
              </div>

              <div className="p-2 rounded-lg">
                <h3 className="text-gray-600 dark:text-gray-300 font-semibold"> Document Type</h3>
                <p className="text-gray-900 dark:text-white">{BoardList?.type_document && BoardList?.type_document.charAt(0).toUpperCase() + BoardList?.type_document.slice(1).toLowerCase() || "N/A"}</p>
              </div>

              <div className="p-2 rounded-lg">
                <h3 className="text-gray-600 dark:text-gray-300 font-semibold"> Document URL</h3>
                <p className="text-gray-900 dark:text-white break-words whitespace-pre-line">{BoardList?.document_text || "N/A"}</p>
              </div>



              <div className="p-2 rounded-lg">
                <h3 className="text-gray-600 dark:text-gray-300 font-semibold"> Whom to Send</h3>
                <p className="text-gray-900 dark:text-white">{BoardList?.send_to && BoardList?.send_to.charAt(0).toUpperCase() + BoardList?.send_to.slice(1).toLowerCase() || "N/A"}</p>
              </div>

              <div className="p-2 rounded-lg">
                <h3 className="text-gray-600 dark:text-gray-300 font-semibold"> List of Employee</h3>
                <p className="text-gray-900 dark:text-white">{BoardList?.employee || "N/A"}</p>
              </div>

              <div>

              </div>

              <div className="p-2 rounded-lg">
                <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Duration </h3>
                <p className="text-gray-900 dark:text-white">{BoardList?.duration && BoardList?.duration.charAt(0).toUpperCase() + BoardList?.duration.slice(1).toLowerCase() || "N/A"}</p>
              </div>

              <div className="p-2 rounded-lg">
                <h3 className="text-gray-600 dark:text-gray-300 font-semibold"> Start Time</h3>
                <p className="text-gray-900 dark:text-white"> {BoardList?.start_date ? moment(BoardList.start_date).format("DD-MM-YYYY HH:mm:ss") : "N/A"}</p>
              </div>


              <div className="p-2 rounded-lg">
                <h3 className="text-gray-600 dark:text-gray-300 font-semibold">End Time</h3>
                <p className="text-gray-900 dark:text-white"> {BoardList?.end_date ? moment(BoardList.end_date).format("DD-MM-YYYY HH:mm:ss") : "N/A"}</p>
              </div>



              <div className="p-2 rounded-lg">
                <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Created Date</h3>
                <p className="text-gray-900 dark:text-white">
                  {BoardList?.createdAt ? moment(BoardList.createdAt).format("DD-MM-YYYY HH:mm:ss") : "N/A"}
                </p>
              </div>

              <div className="p-2 rounded-lg">
                <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Status</h3>
                <p className="text-gray-900 dark:text-white ">
                  {BoardList?.is_active == true ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Modal onClose={handleCloseModal}  show={isModalOpen} size="2xl">
           <Modal.Header className="p-2"> <span className="sr-only">   </span></Modal.Header>
            <Modal.Body className="px-6 pt-0 pb-6 h-[30rem]">
            <iframe  src={`${BoardList?.document_pics}#toolbar=0&navpanes=0&scrollbar=0`} title="PDF Preview"  className="w-full h-full border-none" />
            </Modal.Body>
        </Modal>
      </NavbarSidebarLayout>
    </>
  );
};

export default NoticeBoardDetailsPage;