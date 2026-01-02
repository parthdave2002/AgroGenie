import { Button, Label, Modal,} from "flowbite-react"; 
import { FC } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Input } from "reactstrap";

interface ConfirmationModalProps{
    isOpenConfirmModel: boolean  | undefined;
    isOrderTypeModel : string;
    isOrderStatusModel :string;
    setisOpenConfirmModel: (value: boolean) => void;
    PlaceCall: () => void;
    setSelectedFutureDate: (value : any) => void;
    future_date ?:any;
}

const ConfirmationModalPage: FC<ConfirmationModalProps>= function ({ isOpenConfirmModel, setisOpenConfirmModel, isOrderTypeModel,isOrderStatusModel, PlaceCall, setSelectedFutureDate,future_date }) {
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const formattedMinDate = tomorrow.toISOString().split("T")[0];

    return (
        <Modal onClose={() => setisOpenConfirmModel(false)}  show={isOpenConfirmModel} size="xl">
            <Modal.Header className="px-6 pt-6 pb-0"> <span className="sr-only"> Confirmation  </span></Modal.Header>
            <Modal.Body className="px-6 pt-0 pb-6">
                <div className="flex flex-col items-center gap-y-6 "> <HiOutlineExclamationCircle className="text-7xl text-red-500" /> 
                    <p className="text-xl text-gray-500"> Are you sure you want to {isOrderStatusModel == "extend" ? "Create future" : isOrderStatusModel} this order ? </p>

                    {isOrderTypeModel == "future"  && isOrderStatusModel == "extend" ?
                        <div className="flex gap-x-3">
                            <div className="self-center dark:text-gray-50"> Callback Date : </div>
                            <div className="mt-1">
                                <Input
                                    id="callbackDate"
                                    name="callbackDate"
                                    className="w-[15rem] bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2 rounded-lg text-gray-900 text-sm w-full"
                                    type="date"
                                    min={formattedMinDate}
                                    value={future_date}
                                    onChange={(e) => setSelectedFutureDate(e.target.value)}
                                />
                            </div>
                        </div>
                    : null}

                    <div className="flex items-center gap-x-3">
                        <Button color="failure" onClick={() => PlaceCall()}>  Yes, I'm sure </Button> 
                        <Button color="gray"  onClick={() => setisOpenConfirmModel(false)}> No, cancel </Button> 
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmationModalPage;