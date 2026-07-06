import { Button } from "flowbite-react"; 
import { FC } from "react";
import { IoMdSwap } from "react-icons/io";
import { ConfirmationModalProps } from "../../../types/types";

const ChangeStatusModal: FC<ConfirmationModalProps> = function ({ confirmationModal, setConfirmationModal, ConfirmCall }) {
    if (!confirmationModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setConfirmationModal(false)} />
            <div role="dialog" aria-modal="true" className="relative w-full max-w-md rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg text-center text-gray-900 dark:text-gray-100">
                <div className="flex flex-col items-center gap-6"> 
                            <IoMdSwap className="text-7xl text-red-500" />
                            <p className="text-xl text-SharkGray dark:text-gray-100"> Are you sure you want to change status?</p>
                            <div className="flex items-center gap-x-3">
                                <Button className="bg-deletebutton text-white dark:bg-red-600 dark:text-white" onClick={() => setConfirmationModal(false)}>No, cancel</Button>
                                <Button className="bg-addbutton text-white dark:bg-green-500 dark:text-white" onClick={() => ConfirmCall()}>Yes, I'm sure</Button>
                            </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeStatusModal;