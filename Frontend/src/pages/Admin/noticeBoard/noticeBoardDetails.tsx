
import { lazy, FC, useEffect, useState, useRef, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoticeBoardlist } from "../../../Store/actions";
import { useParams } from "react-router";
import moment from "moment";
import { FaFilePdf } from "react-icons/fa";
import { Modal, ModalHeader, ModalBody } from "flowbite-react";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));

const NoticeBoardDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const hasFetched = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!hasFetched.current && id != "undefined" && id != "null" ) {
      // setLoading(true)
      hasFetched.current = true;
      dispatch(getNoticeBoardlist({ id: id }))
    }
  }, [id]);

  const Boardlist = useSelector((state: any) => state.NoticeBoard.Baorddatalist);


  let Name = "Noice Board Details";
  let ParentName = "Notice Board List";
  let ParentLink = "/notice-board/list";

  const isPdf = Boardlist?.document_pics && Boardlist?.document_pics.toLowerCase().endsWith(".pdf");
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
        <ExampleBreadcrumb Name={Name} ParentName={ParentName} ParentLink={ParentLink} />
        <div className="mt-[2rem] bg-White dark:bg-Cosmos p-4">
          <div>

            {Boardlist?.document_pics &&
              <>
                <h3 className="text-Hydrocarbon dark:text-SoothingBlueGrey font-semibold">Document Image</h3>
                {isPdf ? 
                  <div className=" text-red-600 hover:text-red-700 p-2" onClick={handleOpenModal}> <FaFilePdf style={{ fontSize: "48px" }} />  <p className="text-xs mt-1">View PDF</p> </div>
                :  <img src={Boardlist?.document_pics} alt="Uploaded Document" className=" object-cover p-2" />}
              </>
             }

            <div className="grid grid-cols-3 gap-6 mt-4">
              <div className="p-2 rounded-lg">
                <h3 className="text-Hydrocarbon dark:text-SoothingBlueGrey font-semibold">Name</h3>
                <p className="text-DarkBackground dark:text-White">{Boardlist?.name || "N/A"}</p>
              </div>

              <div className="p-2 rounded-lg">
                <h3 className="text-Hydrocarbon dark:text-SoothingBlueGrey font-semibold"> Document Type</h3>
                <p className="text-DarkBackground dark:text-White">{Boardlist?.type_document && Boardlist?.type_document.charAt(0).toUpperCase() + Boardlist?.type_document.slice(1).toLowerCase() || "N/A"}</p>
              </div>

              <div className="p-2 rounded-lg">
                <h3 className="text-Hydrocarbon dark:text-SoothingBlueGrey font-semibold"> Document URL</h3>
                <p className="text-DarkBackground dark:text-White break-words whitespace-pre-line">{Boardlist?.document_text || "N/A"}</p>
              </div>



              <div className="p-2 rounded-lg">
                <h3 className="text-Hydrocarbon dark:text-SoothingBlueGrey font-semibold"> Whom to Send</h3>
                <p className="text-DarkBackground dark:text-White">{Boardlist?.send_to && Boardlist?.send_to.charAt(0).toUpperCase() + Boardlist?.send_to.slice(1).toLowerCase() || "N/A"}</p>
              </div>

              <div className="p-2 rounded-lg">
                <h3 className="text-Hydrocarbon dark:text-SoothingBlueGrey font-semibold"> List of Employee</h3>
                <p className="text-DarkBackground dark:text-White">{Boardlist?.employee || "N/A"}</p>
              </div>

              <div>

              </div>

              <div className="p-2 rounded-lg">
                <h3 className="text-Hydrocarbon dark:text-SoothingBlueGrey font-semibold">Duration </h3>
                <p className="text-DarkBackground dark:text-White">{Boardlist?.duration && Boardlist?.duration.charAt(0).toUpperCase() + Boardlist?.duration.slice(1).toLowerCase() || "N/A"}</p>
              </div>

              <div className="p-2 rounded-lg">
                <h3 className="text-Hydrocarbon dark:text-SoothingBlueGrey font-semibold"> Start Time</h3>
                <p className="text-DarkBackground dark:text-White"> {Boardlist?.start_date ? moment(Boardlist.start_date).format("DD-MM-YYYY HH:mm:ss") : "N/A"}</p>
              </div>


              <div className="p-2 rounded-lg">
                <h3 className="text-Hydrocarbon dark:text-SoothingBlueGrey font-semibold">End Time</h3>
                <p className="text-DarkBackground dark:text-White"> {Boardlist?.end_date ? moment(Boardlist.end_date).format("DD-MM-YYYY HH:mm:ss") : "N/A"}</p>
              </div>



              <div className="p-2 rounded-lg">
                <h3 className="text-Hydrocarbon dark:text-SoothingBlueGrey font-semibold">Created Date</h3>
                <p className="text-DarkBackground dark:text-White">
                  {Boardlist?.createdAt ? moment(Boardlist.createdAt).format("DD-MM-YYYY HH:mm:ss") : "N/A"}
                </p>
              </div>

              <div className="p-2 rounded-lg">
                <h3 className="text-Hydrocarbon dark:text-SoothingBlueGrey font-semibold">Status</h3>
                <p className="text-DarkBackground dark:text-White ">
                  {Boardlist?.is_active == true ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Modal onClose={handleCloseModal}  show={isModalOpen} size="2xl">
           <ModalHeader className="p-2"> <span className="sr-only">   </span></ModalHeader>
            <ModalBody className="px-6 pt-0 pb-6 h-[30rem]">
            <iframe  src={`${Boardlist?.document_pics}#toolbar=0&navpanes=0&scrollbar=0`} title="PDF Preview"  className="w-full h-full border-none" />
            </ModalBody>
        </Modal>
      </NavbarSidebarLayout>
    </>
  );
};

export default NoticeBoardDetailsPage;