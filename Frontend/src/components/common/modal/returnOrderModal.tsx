import { Button, Modal,} from "flowbite-react"; 
import { FC } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface ReturnOrderModalProps{
    isOpenReturnOrderModel: boolean  | undefined;
    setisOpenReturnOrderModel: (value: boolean) => void;
    ReturnCall: () => void;
    modal : string;
}

const ReturnOrderModalPage: FC<ReturnOrderModalProps>= function ({ isOpenReturnOrderModel,modal, setisOpenReturnOrderModel, ReturnCall }) {
    return (
        <Modal onClose={() => setisOpenReturnOrderModel(false)}  show={isOpenReturnOrderModel} size="md">
            <Modal.Header className="px-6 pt-6 pb-0"> <span className="sr-only"> {modal} Order</span></Modal.Header>
            <Modal.Body className="px-6 pt-0 pb-6">
                <div className="flex flex-col items-center gap-y-6 text-center"> <HiOutlineExclamationCircle className="text-7xl text-red-500" /> <p className="text-xl text-gray-500 dark:text-gray-100"> Are you sure you want to  {modal}  this order ? </p>
                    <div className="flex items-center gap-x-3">
                        <Button color="failure"   onClick={() => ReturnCall()}>  Yes, I'm sure </Button> 
                        <Button color="gray"  onClick={() => setisOpenReturnOrderModel(false)}> No, cancel </Button> 
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ReturnOrderModalPage;