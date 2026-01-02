import { Button, Modal,} from "flowbite-react"; 
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
        <Modal onClose={() => setisOpenDelteModel(false)}  show={isOpenDelteModel} size="md">
            <Modal.Header className="px-6 pt-6 pb-0"> <span className="sr-only">Delete {name}</span></Modal.Header>
            <Modal.Body className="px-6 pt-0 pb-6">
                <div className="flex flex-col items-center gap-y-6 text-center"> <HiOutlineExclamationCircle className="text-7xl text-red-500" /> <p className="text-xl text-gray-500"> Are you sure you want to delete this {name}? </p>
                    <div className="flex items-center gap-x-3">
                        <Button color="failure"   onClick={() => DelCall()}>  Yes, I'm sure </Button> 
                        <Button color="gray"  onClick={() => setisOpenDelteModel(false)}> No, cancel </Button> 
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteModalPage;