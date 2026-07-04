import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { FC, useEffect, useState } from "react";
import Inputbox from "../inputComponent/inputbox";

interface AddWalletPointModalProps {
    OpenWalletAddModal: boolean;
    setOpenWalletAddModal: (value: boolean) => void;
    setSelectedWalletAmt: (value: string) => void;
    SelectedWalletAmt: string;
    PlaceCall: (value: string) => void;
}

const AddWalletpointModal: FC<AddWalletPointModalProps> = function ({ OpenWalletAddModal, setOpenWalletAddModal, PlaceCall, setSelectedWalletAmt, SelectedWalletAmt }) {
    const [walletAmount, setWalletAmount] = useState(SelectedWalletAmt);

    useEffect(() => {
        setWalletAmount(SelectedWalletAmt);
    }, [SelectedWalletAmt]);

    const validation = {
        values: { wallet_amt: walletAmount },
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setWalletAmount(value);
            setSelectedWalletAmt(value);
        },
        handleBlur: () => {},
        touched: { wallet_amt: false },
        errors: {},
    };

    return (
        <Modal onClose={() => setOpenWalletAddModal(false)} show={OpenWalletAddModal} size="xl">
            <ModalHeader className="px-6 py-3">
                <p >Are You sure you want to add wallet points</p>
            </ModalHeader>
            <ModalBody className="px-6 py-3">
                <div className="flex flex-col items-center gap-y-6">
                    <div className="mb-3 flex-1 w-full">
                        <Inputbox
                            id="wallet_amt"
                            name="wallet_amt"
                            label="Wallet Amount"
                            required={true}
                            placeholder="Enter Wallet Amount"
                            type="number"
                            validation={validation}
                        />
                    </div>

                    <div className="flex items-center gap-x-3">
                        <Button className="GreenButton border-0 w-[8rem]"
                            onClick={() => {
                                PlaceCall(walletAmount);
                                setOpenWalletAddModal(false);
                            }}
                        > Save </Button>
                        <Button color="gray" onClick={() => setOpenWalletAddModal(false)}> No, cancel </Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default AddWalletpointModal;