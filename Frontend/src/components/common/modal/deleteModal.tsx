import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react"; 
import { FC } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface DeleteModalProps{
    isOpenDelteModel: boolean  | undefined;
    name:string;
    setisOpenDelteModel: (value: boolean) => void;
    DelCall: () => void;
}

const DeleteModalPage: FC<DeleteModalProps>= function ({ name,isOpenDelteModel, setisOpenDelteModel, DelCall }) {
    return (
        <Modal dismissible show={Boolean(isOpenDelteModel)} onClose={() => setisOpenDelteModel(false)}  size="md"  position="center" className="z-[9999] bg-black/30 backdrop-blur-sm" >
            <ModalBody className="px-6 py-6 text-center">
                <div className="flex flex-col items-center gap-y-6">
                    <HiOutlineExclamationCircle className="text-7xl text-red-500" />
                    <p className="text-xl text-SharkGray"> Are you sure you want to delete this {name}?  </p>
                    <div className="flex items-center gap-x-3">
                        <Button className="bg-deletebutton text-white dark:bg-red-600 dark:text-white" onClick={() => setisOpenDelteModel(false)}>No, cancel</Button>
                        <Button className="bg-addbutton text-white dark:bg-green-500 dark:text-white" onClick={() => DelCall()}>Yes, I'm sure</Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default DeleteModalPage;