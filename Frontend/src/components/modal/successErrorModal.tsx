import { Button, Modal,} from "flowbite-react"; 
import { FC } from "react";
import { FaThumbsUp } from "react-icons/fa";

interface SucessOrderModalProps{
    isOpenSuccessOrderModel: boolean  | undefined;
    setisOpenSuccessOrderModel: (value: boolean) => void;
    OkayCall: (value: any) => void;
    message : string;
}

const SuccessErrorModalPage: FC<SucessOrderModalProps>= function ({ isOpenSuccessOrderModel, setisOpenSuccessOrderModel,OkayCall, message }) {
    return (
        <Modal onClose={() => setisOpenSuccessOrderModel(false)}  show={isOpenSuccessOrderModel} size="md" className="backdrop-blur-sm p-3">
            <Modal.Body className="p-6">
                <div className="flex flex-col items-center gap-y-6 text-center"> <FaThumbsUp  className="text-7xl text-green-500 border rounded-full p-3 border-green-500" /> 
                    <p className="text-xl text-gray-500 dark:text-gray-100"> {message} </p>
                    <div className="flex items-center gap-x-3">  <Button color="gray"  onClick={OkayCall}> Okay </Button>   </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SuccessErrorModalPage;